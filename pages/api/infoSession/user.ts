import type { NextApiRequest, NextApiResponse } from 'next';
import { SelectItem } from '@this/data/types/bits';
import { runCloudFunction } from '@this/api/googleFunctions';
import { config } from '../config';

const { SIGNUP_API_ENDPOINT, GREENLIGHT_API_TOKEN = '' } = config;

export interface ISessionUser extends NextApiRequest {
  body: FormDataSignup;
}
interface ISession {
  id: string;
  cohort: string;
  startDateTime: string;
  programId: string;
}

export type FormDataSignup = {
  session?: ISession;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  referencedBy: SelectItem;
};

export interface ISessionSignup {
  [key: string]: string | undefined;
  programId: string;
  nameFirst: string;
  nameLast: string;
  email: string;
  cell: string;
  referrer: string;
  referrerResponse: string;
  startDateTime?: string;
  cohort: string;
  sessionId: string;
  token: string;
}

export default async function handleInfoSessionForm(req: ISessionUser, res: NextApiResponse) {
  try {
    const payload: ISessionSignup = formatPayload(req.body);
    await runCloudFunction({
      url: SIGNUP_API_ENDPOINT,
      body: payload,
      headers: {
        'X-Greenlight-Signup-Api-Key': GREENLIGHT_API_TOKEN,
      },
    });
    res.status(200).end();
  } catch (error) {
    console.error('Could not POST to signup service', error);
    res.status(500).end();
  }
}

function formatPayload(form: FormDataSignup): ISessionSignup {
  const { session, email, firstName, lastName, phone, referencedBy } = form;

  return {
    nameFirst: firstName,
    nameLast: lastName,
    email,
    cell: phone,
    sessionId: session?.id ?? '',
    programId: session?.programId ?? '',
    startDateTime: session?.startDateTime,
    cohort: session?.cohort ?? '',
    referrerResponse: referencedBy.additionalInfo,
    referrer: referencedBy?.value,
    token: GREENLIGHT_API_TOKEN ?? '',
  };
}
