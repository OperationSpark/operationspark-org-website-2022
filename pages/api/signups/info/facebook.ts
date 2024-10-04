import { ReqHandler } from '@this/types/request';

import { runCloudFunction } from '@this/src/api/googleFunctions';
import {
  fetchLead,
  formatFacebookPayload,
  handleWebhookSubscribe,
  validateAndFilterPayloads,
  verifyWebhook,
  WebhookBody,
  WebhookQuery,
} from '@this/src/api/helpers/facebookWebhook';
import { ISessionSignup } from '@this/types/signups';

/**
 * Disabled body parser to allow for raw body parsing
 * - This is necessary for verifying the webhook signature
 */
export const config = { api: { bodyParser: false } };

type WebhookHandler = ReqHandler<WebhookQuery, WebhookBody>;

const webhookHandler: WebhookHandler = async (req, res) => {
  // Handle webhook initial subscribe verification
  if (handleWebhookSubscribe(req, res)) {
    // Return early if the request is a subscribe verification
    // Request is handled by the `handleWebhookSubscribe` function
    return;
  }

  // Handle webhook POST request
  const { verified, body } = await verifyWebhook(req);
  if (!verified) {
    res.status(403).json({ message: 'Invalid Signature' });
    return;
  }

  if (!body) {
    console.error('No body found', { body });
    res.status(400).json({ message: 'No body found' });
    return;
  }

  if (body.object !== 'page') {
    console.error('Request not valid');
    res.status(400).json({ message: 'Request not valid' });
    return;
  }
  // Flatten all lead IDs
  const leadIds = body.entry?.flatMap(
    (entry) => entry.changes.flatMap((change) => change.value.leadgen_id) ?? [],
  );
  // Fetch lead form data
  const data = await Promise.all(leadIds.map(fetchLead));

  // Format payload for submission
  const formattedPayloads = await Promise.all(data.map((lead) => formatFacebookPayload(lead)));

  const payloads = validateAndFilterPayloads(formattedPayloads);

  if (!payloads.length) {
    res.status(400).json({ message: 'No valid payloads found' });
    return;
  }

  const { GREENLIGHT_API_TOKEN, SIGNUP_API_ENDPOINT } = process.env;
  await Promise.all(
    payloads.map(async (payload) => {
      try {
        return await runCloudFunction<ISessionSignup, { url: string }>({
          url: SIGNUP_API_ENDPOINT,
          body: payload,
          headers: {
            'X-Greenlight-Signup-Api-Key': GREENLIGHT_API_TOKEN,
          },
        });
      } catch (err) {
        console.error('Could not POST to signup service', err);
      }
    }),
  );

  res.status(200).json({ message: 'Success' });
};

export default webhookHandler;
