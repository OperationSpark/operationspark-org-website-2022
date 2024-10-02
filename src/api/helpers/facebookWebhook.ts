import crypto from 'crypto';
import type { Readable } from 'node:stream';

import axios, { isAxiosError } from 'axios';

import { getInfoSessionDates, ISessionDates } from '@this/pages-api/infoSession/dates';
import { getStateFromZipCode } from '@this/src/helpers/zipLookup';
import { Req } from '@this/types/request';
import { FormDataSignup, ISession, ISessionSignup } from '@this/types/signups';
import { formatSignupPayload } from '../formatSignupPayload';

const { FB_WEBHOOK_TOKEN, FB_ACCESS_TOKEN, FB_APP_SECRET } = process.env;

export type FacebookPayloadFieldKey = 'day' | 'time' | 'name' | 'email' | 'phone' | 'zip';

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
      console.error(err.response?.data);
    }

    return null;
  }
};

/**
 * Parse and verify the webhook query `hub` object and verify the token
 * - If the token is invalid, return null
 * - If the token is valid, return the parsed query object
 */
export const verifyWebhookSubscribe = (query: WebhookQuery): ParsedWebhookQuery | null => {
  const hubKeys = [
    { key: 'hub.mode', transformKey: 'mode' },
    { key: 'hub.challenge', transformKey: 'challenge' },
    { key: 'hub.verify_token', transformKey: 'token' },
  ] as const;

  const hub = hubKeys.reduce((acc, { key, transformKey }) => {
    acc[transformKey] = query[key];
    return acc;
  }, {} as ParsedWebhookQuery);

  if (!hub.token || hub.token !== FB_WEBHOOK_TOKEN) {
    return null;
  }
  return hub;
};

/**
 * Parse the raw body of the request into a string
 */
const getRawBody = async (readable: Readable): Promise<string> => {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString();
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
  const cohortTime = time?.toLowerCase().replace(':', '-');

  const session = sessions.find((s) => {
    const byDay = s.times.byday;
    const cohort = s.cohort;
    if (selectedDay && cohortTime) {
      return byDay === selectedDay && cohort.includes(cohortTime);
    }
    if (cohortTime) {
      return cohort.includes(cohortTime);
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

/**
 * Format the Facebook payload into a Greenlight signup payload
 */
export const formatFacebookPayload = async (
  data: InfoSessionFacebookPayload | null,
): Promise<ISessionSignup | null> => {
  if (!data) return null;
  const fields = extractFacebookFormData(data);
  const sessions = await getInfoSessionDates();

  const session = findBestSession(sessions, fields.day, fields.time);
  const [firstName, ...names] = fields.name.split(' ');
  const lastName = names.pop() ?? '';

  const payload: FormDataSignup = {
    email: fields.email,
    firstName,
    lastName,
    phone: fields.phone,
    zipCode: fields.zip,

    userLocation: {
      name: 'userLocation',
      value: getStateFromZipCode(Number(fields.zip)),
      additionalInfo: '',
    },
    referencedBy: {
      name: 'referencedBy',
      value: 'Facebook',
      additionalInfo: '',
    },
    smsOptIn: 'false' as const,
    attendingLocation: 'VIRTUAL' as const,
    session,
  };
  return formatSignupPayload(payload);
};
