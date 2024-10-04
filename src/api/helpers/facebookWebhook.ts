import crypto from 'crypto';
import type { Readable } from 'node:stream';

import axios, { isAxiosError } from 'axios';

import { getInfoSessionDates, ISessionDates } from '@this/pages-api/infoSession/dates';
import { parsePhoneNumber } from '@this/src/components/Form/helpers';
import { getStateFromZipCode } from '@this/src/helpers/zipLookup';
import { Req, ReqMiddleware } from '@this/types/request';
import { FormDataSignup, ISession, ISessionSignup } from '@this/types/signups';
import { formatSignupPayload } from '../formatSignupPayload';

const { FB_ACCESS_TOKEN } = process.env;

export type FacebookPayloadFieldKey = 'day' | 'time' | 'name' | 'email' | 'phone' | 'zip';
const REQUIRED_SIGNUP_FIELDS: (keyof ISessionSignup)[] = [
  'nameFirst',
  'nameLast',
  'email',
  'cell',
  'zipCode',
];

export type FacebookPayloadField = {
  name: FacebookPayloadFieldKey;
  values: string[];
};

export type InfoSessionFacebookPayload = {
  /** @example '2015-02-28T08:49:14+0000' */
  created_time: string;
  /** Lead ID */
  id: string;
  /** Ad ID */
  ad_id: string;
  /** Form ID */
  form_id: string;
  /** User Responses */
  field_data: FacebookPayloadField[];
};
export type FacebookPayloadChange = {
  field: string;
  value: {
    ad_id: string;
    form_id: string;
    leadgen_id: string;
    created_time: number;
    page_id: string;
    adgroup_id: string;
  };
};

export type ParsedWebhookQuery = {
  mode: string;
  challenge: string;
  token: string;
};

export type WebhookQuery = {
  'hub.mode': string;
  'hub.challenge': string;
  'hub.verify_token': string;
};

export type WebhookBody = {
  object: 'page';
  entry: {
    id: string;
    time: number;
    changes: FacebookPayloadChange[];
  }[];
};

export const fb = axios.create({
  baseURL: 'https://graph.facebook.com/v20.0',
});

export const fetchLead = async (id: string): Promise<InfoSessionFacebookPayload | null> => {
  try {
    const { data } = await fb.get(`/${id}`, {
      params: {
        access_token: FB_ACCESS_TOKEN,
        fields: ['created_time', 'id', 'ad_id', 'form_id', 'field_data'].join(','),
      },
    });

    return data ?? null;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err.response?.data?.error);
    }

    return null;
  }
};

/**
 * Middleware to parse and verify the webhook query `hub` object and token:
 * - ✓ the request `hub.mode` ***is*** `subscribe`
 * - ✓ the request `hub.verify_token` matches the environment variable `FB_WEBHOOK_TOKEN`
 * - ✓ the request `hub.challenge` is returned as the response
 *
 * ### Does not end the request if:
 * - ✗ the request `hub.mode` ***IS NOT*** `subscribe`
 * - ✗ the request `hub.verify_token` does not match the environment variable `FB_WEBHOOK_TOKEN`
 *
 * @param req - The incoming request object
 * @param res - The outgoing response object
 *
 * @returns
 * - `false` if the request ***IS NOT*** a webhook subscription verification
 *   - Does NOT end the request
 *   - `hub.mode` ***IS NOT*** `subscribe`
 * - `true` if the request is an initial webhook subscription
 *   - Ends the request
 *   - `hub.mode` ***IS*** `subscribe`
 *
 *  token does not match the environment variable `FB_WEBHOOK_TOKEN` AND the request `hub.mode` is `subscribe`
 */
export const handleWebhookSubscribe: ReqMiddleware<WebhookQuery, WebhookBody, boolean> = (
  req,
  res,
) => {
  const { FB_WEBHOOK_TOKEN } = process.env;
  const { query } = req;

  const hubKeys = [
    { key: 'hub.mode', transformKey: 'mode' },
    { key: 'hub.challenge', transformKey: 'challenge' },
    { key: 'hub.verify_token', transformKey: 'token' },
  ] as const;

  const hub = hubKeys.reduce((acc, { key, transformKey }) => {
    acc[transformKey] = query[key];
    return acc;
  }, {} as ParsedWebhookQuery);

  if ((!hub.token && !hub.challenge && !hub.mode) || hub.mode !== 'subscribe') {
    // Not an incoming webhook subscription verification
    return false;
  }

  if (!hub.token || hub.token !== FB_WEBHOOK_TOKEN) {
    // Incoming webhook subscription with invalid token
    res.status(403).json({ message: 'Invalid subscription token' });
    return true;
  }

  res.status(200).end(hub.challenge);
  return true;
};

/**
 * Parse the raw body of the request into a string
 */
const getRawBody = async (
  readable: Readable & { body?: Record<string, string> },
): Promise<string> => {
  if (readable.body && typeof readable.body === 'object') {
    return JSON.stringify(readable.body);
  }
  try {
    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks).toString();
  } catch (err) {
    console.error(err);
    return '';
  }
};

const safeParse = (str?: string) => {
  try {
    return JSON.parse(str ?? '') ?? {};
  } catch {
    return {};
  }
};

export const verifyWebhook = async <Q extends {}, B extends {}>(
  req: Req<Q, B>,
): Promise<{ verified: boolean; body: B | null }> => {
  const { FB_APP_SECRET } = process.env;
  const rawBody = await getRawBody(req);

  const payloadSha = crypto.createHmac('sha256', FB_APP_SECRET).update(rawBody).digest('hex');

  const headerSha = (req.headers['x-hub-signature-256'] as string)?.split('=')[1];

  if (headerSha !== payloadSha) {
    return {
      verified: false,
      body: null,
    };
  }

  return {
    verified: true,
    body: safeParse(rawBody),
  };
};

/**
 * Extract the form data from the Facebook payload to a key-value object
 */
export const extractFacebookFormData = (
  data: InfoSessionFacebookPayload,
): Record<FacebookPayloadFieldKey, string> => {
  const fields = data.field_data.reduce((acc, field) => {
    acc[field.name] = field.values[0];
    return acc;
  }, {} as Record<FacebookPayloadFieldKey, string>);
  return fields;
};

/**
 * Format the session object to match the Greenlight API
 */
export const formatSessionObject = (session: ISessionDates): ISession => {
  return {
    id: session._id,
    programId: session.programId,
    cohort: session.cohort,
    startDateTime: session.times.start.dateTime,
    locationType: session.locationType,
    googlePlace: session.googlePlace,
    code: session.code,
  };
};

const extractTimeInfo = (time?: string) => {
  if (!time)
    return {
      hours: 5,
      minutes: 30,
      amPm: 'PM',
    };
  const [hour, minuteInfo] = time.split(':');
  const hours = Number(hour);
  const minutes = Number(minuteInfo?.replaceAll(/\D/g, ''));
  const amPm = minuteInfo?.replaceAll(/\d/g, '')?.toLowerCase() ?? 'pm';
  return {
    hours: isNaN(hours) ? 5 : hours,
    minutes: isNaN(minutes) ? 30 : minutes,
    amPm,
  };
};

const createCohortTimes = (time?: string) => {
  const { hours, minutes, amPm } = extractTimeInfo(time);

  const mins = minutes || 30;

  const flip = hours === 12;

  return [
    `${hours - 1}${flip ? 'am' : amPm}`,
    `${hours - 1}-${mins}${flip ? 'am' : amPm}`,
    `${hours}${amPm}`,
    `${hours}-${mins}${amPm}`,
    `${flip ? 1 : hours + 1}${amPm}`,
    `${flip ? 1 : hours + 1}-${mins}${amPm}`,
  ];
};

/**
 * Find the best session based on the day and time provided
 * - If no day or time is provided, return the next session
 * - If no session is found by day and time, try again with only time, then only day
 */
export const findBestSession = (
  sessions: ISessionDates[],
  day?: string,
  time?: string,
): ISession | undefined => {
  if (!sessions.length) {
    return;
  }

  if (!day && !time) {
    return formatSessionObject(sessions[0]);
  }

  const d = day?.toLowerCase() === 'tuesday' ? 'TU' : 'TH';

  const selectedDay = day ? d : undefined;

  const cohortTimes = !!time && createCohortTimes(time);

  const session = sessions.find((s) => {
    const byDay = s.times.byday;
    const cohort = s.cohort;
    if (selectedDay && cohortTimes) {
      return byDay === selectedDay && cohortTimes.some((t) => cohort.endsWith(t));
    }
    if (cohortTimes) {
      return cohortTimes.some((t) => cohort.endsWith(t));
    }
    if (selectedDay) {
      return byDay === selectedDay;
    }
  });

  if (session) return formatSessionObject(session);

  if (!day || !time) {
    // If no day or time is provided, return so we can try again with only time or day below (this will only hit for the recursive call, which may not be the final return)
    return;
  }

  // If no session is found by day and time. Try again with only time
  const bestTime = findBestSession(sessions, undefined, time);
  if (bestTime) return bestTime;

  // If no session is found by time, try again with only day
  const bestDay = findBestSession(sessions, day);
  if (bestDay) return bestDay;

  // If no session is found by day or time, return the next session
  return formatSessionObject(sessions[0]);
};

const stripSpecialChars = (str: string) => (!str ? '' : str.replaceAll(/[^a-zA-Z0-9]/g, '')).trim();

/**
 * Format the Facebook payload into a Greenlight signup payload
 */
export const formatFacebookPayload = async (
  data: InfoSessionFacebookPayload | null,
): Promise<ISessionSignup | null> => {
  if (!data?.field_data) return null;
  const fields = extractFacebookFormData(data);
  const sessions = await getInfoSessionDates();

  // Change to 'true' if we want to opt in by default
  const smsOptIn = 'false' as const;

  const session = findBestSession(sessions, fields.day, fields.time);
  const [fullFirstName, ...names] = fields.name.split(' ');
  const firstName = stripSpecialChars(fullFirstName);
  const lastName = stripSpecialChars(names.pop() ?? '');
  const zipCode = fields.zip?.replaceAll(/\D/g, '') || '70117';
  const state = getStateFromZipCode(Number(zipCode)) ?? 'No State';
  const phone = parsePhoneNumber(fields.phone) || '555-555-5555';

  const payload: FormDataSignup = {
    email: fields.email,
    firstName,
    lastName,
    phone,
    zipCode,

    userLocation: {
      name: state,
      value: state,
      additionalInfo: '',
    },
    referencedBy: {
      name: 'referencedBy',
      value: 'Facebook',
      additionalInfo: JSON.stringify({ formId: data.form_id, adId: data.ad_id, leadId: data.id }),
    },
    smsOptIn,
    attendingLocation: 'VIRTUAL' as const,
    session,
  };
  return formatSignupPayload(payload);
};

export const validateAndFilterPayloads = (
  payloads: (ISessionSignup | null)[],
): ISessionSignup[] => {
  return payloads.filter((payload) => {
    if (!payload || payload === null) {
      return false;
    }

    const missingFields = REQUIRED_SIGNUP_FIELDS.filter(
      (field) => !payload[field as keyof ISessionSignup],
    );
    if (missingFields.length) {
      console.error('Missing required fields on payload', { payload, missingFields });
      return false;
    }

    return true;
  }) as ISessionSignup[];
};
