import crypto from 'crypto';

import dayjs from 'dayjs';
import advanced from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { ISessionDates } from '@this/pages-api/infoSession/dates';
import { InfoSessionFacebookPayload, WebhookBody } from '@this/src/api/helpers/facebookWebhook';
import { GooglePlace } from '@this/types/signups';

dayjs.extend(advanced);
dayjs.extend(timezone);
dayjs.extend(utc);

export type ByDay = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
export type Time = '11:00AM' | '11:30AM' | `${12 | 1 | 4 | 5 | 6}:${0 | 3}${0}PM`;

export const toSessionObj = (session: ISessionDates) => {
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

export const setCentralTime = (
  date: string | Date,
  hours: number,
  minutes: number,
  weeks?: number,
) => {
  const d = dayjs(date)
    .tz('America/Chicago')
    .set('hour', hours)
    .set('minute', minutes)
    .set('seconds', 0)
    .set('milliseconds', 0);

  if (weeks) {
    return d.add(Math.round(weeks * 7), 'days').toDate();
  }

  return d.toDate();
};

export const findNextDay = (day: ByDay, time: Time): dayjs.Dayjs => {
  const [hourStr, minuteAndAmPm] = time.split(':');
  const amPm = minuteAndAmPm.replaceAll(/[^apm]/gi, '')?.toLowerCase() ?? 'pm';
  const add12 = amPm === 'pm' && hourStr !== '12' ? 12 : 0;
  const hour = parseInt(hourStr) + add12;
  const minute = parseInt(minuteAndAmPm.replaceAll(/\D/g, ''));

  const dayNum = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].indexOf(day) + 1;
  const now = dayjs().tz('America/Chicago', true).set('second', 0).set('millisecond', 0);

  const today = now.day();

  if (today === dayNum) {
    return now.set('hour', hour).set('minute', minute);
  }

  if (today > dayNum) {
    return now.add(1, 'week').set('day', dayNum).set('hour', hour).set('minute', minute);
  }

  const addDays = dayNum - today;
  return now.add(addDays, 'day').set('hour', hour).set('minute', minute);
};

export const createSessionTimes = (
  day: ByDay,
  time: Time,
  weeks?: number,
): { cohort: string; times: ISessionDates['times'] } => {
  const start = findNextDay(day, time).add(weeks ?? 0, 'weeks');
  const end = dayjs(start).add(1, 'hour').toDate();
  const until = dayjs(start).add(1, 'day').toDate();
  const cohortMonth = start.format('MMM').toLowerCase().slice(0, 3);
  const cohortTime = start.format('D-YY');
  const isTopHour = start.minute() === 0;
  const hours = isTopHour ? start.format('ha') : start.format('h-mma');

  return {
    cohort: `is-${cohortMonth}-${cohortTime}-${hours}`,
    times: {
      start: { dateTime: start.toDate(), timeZone: 'America/Chicago' },
      end: { dateTime: end, timeZone: 'America/Chicago' },
      until,
      byday: day,
    },
  };
};

export const createId = (len: number): string => {
  const tenChars = () => Math.random().toString(36).slice(2, 12);
  return new Array(Math.ceil(len % 10)).fill(0).map(tenChars).join('').slice(0, len);
};

export const createSessionDates = (day: ByDay, time: Time, weeks?: number): ISessionDates => {
  const { times, cohort } = createSessionTimes(day, time, weeks);

  return {
    _id: createId(17),
    code: createId(4),
    programId: createId(17),
    cohort,
    times,
    locationType: 'VIRTUAL',
    googlePlace: {} as GooglePlace,
  };
};

export const createWebhookPayload = (leadIds: string[]): WebhookBody => {
  const commonIds = {
    ad_id: createId(15),
    form_id: createId(15),
    page_id: createId(15),
    adgroup_id: createId(15),
  };
  return {
    object: 'page',
    entry: leadIds.map((leadId) => ({
      id: createId(15),
      time: Date.now(),
      changes: [
        {
          field: 'leadgen',
          value: {
            ...commonIds,
            leadgen_id: leadId,
            created_time: Date.now(),
          },
        },
      ],
    })),
  };
};

export const createLeadEntry = (leadId: string): InfoSessionFacebookPayload => {
  return {
    id: leadId,
    form_id: createId(15),
    ad_id: createId(15),
    created_time: `${Date.now() / 1000}`,
    field_data: [
      { name: 'name', values: ['Halle Bot'] },
      { name: 'email', values: ['hallebot@operationspark.org'] },
      { name: 'phone', values: ['+15555555555'] },
      { name: 'day', values: ['Thursday'] },
      { name: 'time', values: ['5:30PM'] },
      { name: 'zip', values: ['70117'] },
    ],
  };
};

export const createSignature = (payload: string, secret: string) => {
  return `sha256=${crypto.createHmac('sha256', secret).update(payload).digest('hex')}`;
};
