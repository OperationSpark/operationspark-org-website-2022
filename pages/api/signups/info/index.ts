import { runCloudFunction } from '@this/api/googleFunctions';
import config from '@this/config';
import { formatSignupPayload } from '@this/src/api/formatSignupPayload';
import { extractSentryHeadersFromRequest } from '@this/src/api/sentry';
import { ReqHandler } from '@this/types/request';
import { FormDataSignup, ISessionSignup } from '@this/types/signups';

import type { NextApiRequest, NextApiResponse as Res } from 'next';

const { SIGNUP_API_ENDPOINT, GREENLIGHT_API_TOKEN = '' } = config;

export interface Req extends NextApiRequest {
  body: FormDataSignup;
}

type SignupResult = { url: string };

const handleInfoSessionFormSubmit: ReqHandler<{}, FormDataSignup> = async (req: Req, res: Res) => {
  try {
    const payload = formatSignupPayload(req.body);
    const sentryHeaders = extractSentryHeadersFromRequest(req);

    const { data } = await runCloudFunction<ISessionSignup, SignupResult>({
      url: SIGNUP_API_ENDPOINT,
      body: payload,
      headers: {
        'X-Greenlight-Signup-Api-Key': GREENLIGHT_API_TOKEN,
        ...sentryHeaders,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Could not POST to signup service', error);
    res.status(500).end();
  }
};

export default handleInfoSessionFormSubmit;
