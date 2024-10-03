import { ReqHandler } from '@this/types/request';

import {
  fetchLead,
  formatFacebookPayload,
  validateAndFilterPayloads,
  verifyWebhook,
  verifyWebhookSubscribe,
  WebhookBody,
  WebhookQuery,
} from '@this/src/api/helpers/facebookWebhook';

export const config = {
  api: {
    bodyParser: false,
  },
};

type WebhookHandler = ReqHandler<WebhookQuery, WebhookBody>;

const webhookHandler: WebhookHandler = async (req, res) => {
  // Handle webhook initial subscribe verification
  const subscribeQuery = verifyWebhookSubscribe(req.query);

  if (subscribeQuery) {
    res.status(200).end(subscribeQuery.challenge);
    return;
  }

  const { verified, body } = await verifyWebhook(req);

  if (!verified) {
    console.error('Invalid Signature', {
      headers: req.headers,
      query: req.query,
    });
    res.status(403).json({ message: 'Invalid Signature' });
    return;
  }

  if (!body) {
    console.error('No body found', { body });
    res.status(400).json({ message: 'No body found' });
    return;
  }

  if (body.object === 'page') {
    // Flatten all lead IDs
    const leadIds = body.entry?.flatMap(
      (entry) => entry.changes.flatMap((change) => change.value.leadgen_id) ?? [],
    );
    // Fetch lead form data
    const data = await Promise.all(leadIds.map(fetchLead));

    // Format payload for submission
    const formattedPayloads = await Promise.all(data.map((lead) => formatFacebookPayload(lead)));

    const payloads = validateAndFilterPayloads(formattedPayloads);

    // TODO: Handle multiple payload submissions
    // TODO: Add instructions on how to refresh access token to the README
    console.log(payloads);

    res.status(200).end();
    return;
  }

  res.status(400).json({ message: 'Request not valid' });
};

export default webhookHandler;
