import { runCloudFunction } from '@this/api/googleFunctions';
import config from '@this/config';
import { formatSignupPayload } from '@this/src/api/formatSignupPayload';
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

    const headers: {
      [key: string]: string;
    } = {
      'X-Greenlight-Signup-Api-Key': GREENLIGHT_API_TOKEN,
    };

    if (typeof req.headers.baggage === 'string') {
      headers.baggage = req.headers.baggage;
    }
    if (typeof req.headers['sentry-trace'] === 'string') {
      headers['sentry-trace'] = req.headers['sentry-trace'];
    }
    const result = await runCloudFunction<ISessionSignup, SignupResult>({
      url: SIGNUP_API_ENDPOINT,
      body: payload,
      headers,
    });

    res.status(200).json(result.data);
  } catch (error) {
    console.error('Could not POST to signup service', error);
    res.status(500).end();
  }
};

export default handleInfoSessionFormSubmit;
