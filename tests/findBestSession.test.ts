import { describe, expect, test } from '@jest/globals';
import { ISessionDates } from '@this/pages-api/infoSession/dates';
import { findBestSession } from '@this/src/api/helpers/facebookWebhook';
import { GooglePlace } from '@this/types/signups';

import dayjs from 'dayjs';

import advanced from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(advanced);
dayjs.extend(timezone);
dayjs.extend(utc);

const toSessionObj = (session: ISessionDates) => ({
  id: session._id,
  programId: session.programId,
  cohort: session.cohort,
  startDateTime: session.times.start.dateTime,
  locationType: session.locationType,
  googlePlace: session.googlePlace,
  code: session.code,
});

describe('findBestSession', () => {
  const tues1230pm = createSession('TU', '12:30PM');
  const tues530pm = createSession('TU', '5:30PM');
  const thurs1230pm = createSession('TH', '12:30PM');
  const thurs530pm = createSession('TH', '5:30PM');

  const allSessions = [tues1230pm, tues530pm, thurs1230pm, thurs530pm];

  describe('Find exact match', () => {
    const testCases = [
      ['Tuesday', '12:30PM', tues1230pm],
      ['Tuesday', '5:30PM', tues530pm],
      ['Thursday', '12:30PM', thurs1230pm],
      ['Thursday', '5:30PM', thurs530pm],
    ] as const;

    testCases.forEach(([day, time, initialSession]) => {
      test(`should return correct session for "${day} at ${time}"`, () => {
        const got = findBestSession(allSessions, day, time);
        const expected = toSessionObj(initialSession);
        expect(got).toEqual(expected);
      });
    });
  });

  describe('Find best match', () => {
    test('should return next session if no day or time provided', () => {
      const got = findBestSession(allSessions);
      expect(got).toEqual(toSessionObj(tues1230pm));
    });

    test('should return best day if no time matches', () => {
      const sessions = [tues1230pm, thurs1230pm];
      const got = findBestSession(sessions, 'Tuesday', '5:30PM');
      const expected = toSessionObj(tues1230pm);
      expect(got).toEqual(expected);
    });

    test('should return best time if no day matches', () => {
      const sessions = [thurs1230pm, thurs530pm];
      const got = findBestSession(sessions, 'Tuesday', '5:30PM');
      const expected = toSessionObj(thurs530pm);
      expect(got).toEqual(expected);
    });

    test('should return best time on different day if time of selected day is unavailable', () => {
      const sessions = [tues1230pm, thurs1230pm, thurs530pm];
      const got = findBestSession(sessions, 'Tuesday', '5:30PM');
      const expected = toSessionObj(thurs530pm);
      expect(got).toEqual(expected);
    });

    test('should return undefined if no sessions', () => {
      const got = findBestSession([], 'Tuesday', '5:30PM');
      expect(got).toBeUndefined();
    });

    test('should find afternoon session with time that is under by 30 minutes', () => {
      const got = findBestSession(allSessions, 'Tuesday', '12:00PM');
      const expected = toSessionObj(tues1230pm);
      expect(got).toEqual(expected);
    });
    test('should find afternoon session with time that is under by 1 hour', () => {
      const got = findBestSession(allSessions, 'Tuesday', '11:30AM');
      const expected = toSessionObj(tues1230pm);
      expect(got).toEqual(expected);
    });

    test('should find evening session with time that is under by 30 minutes', () => {
      const got = findBestSession(allSessions, 'Tuesday', '5:00PM');
      const expected = toSessionObj(tues530pm);
      expect(got).toEqual(expected);
    });

    test('should find evening session with time that is under by 1 hour', () => {
      const got = findBestSession(allSessions, 'Tuesday', '4:30PM');
      const expected = toSessionObj(tues530pm);
      expect(got).toEqual(expected);
    });

    test('should find evening session with time that is over by 30 minutes', () => {
      const got = findBestSession(allSessions, 'Tuesday', '6:00PM');
      const expected = toSessionObj(tues530pm);
      expect(got).toEqual(expected);
    });

    test('should find evening session with time that is over by 1 hour', () => {
      const got = findBestSession(allSessions, 'Tuesday', '6:30PM');
      const expected = toSessionObj(tues530pm);
      expect(got).toEqual(expected);
    });
  });
});

type ByDay = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
type Time = '11:00AM' | '11:30AM' | `${12 | 1 | 4 | 5 | 6}:${0 | 3}${0}PM`;

function findNextDay(day: ByDay, time: Time): dayjs.Dayjs {
  const [hourStr, minuteAndAmPm] = time.split(':');
  const amPm = minuteAndAmPm.replaceAll(/[^apm]/gi, '')?.toLowerCase() ?? 'pm';
  const add12 = amPm === 'pm' && hourStr !== '12' ? 12 : 0;
  const hour = parseInt(hourStr) + add12;
  const minute = parseInt(minuteAndAmPm.replaceAll(/\D/g, ''));

  const dayNum = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].indexOf(day) + 1;
  const now = dayjs().tz('America/Chicago').set('second', 0).set('millisecond', 0);

  const today = now.day();

  if (today === dayNum) {
    return now.set('hour', hour).set('minute', minute);
  }

  if (today > dayNum) {
    return now.add(1, 'week').set('day', dayNum).set('hour', hour).set('minute', minute);
  }

  const addDays = dayNum - today;
  return now.add(addDays, 'day').set('hour', hour).set('minute', minute);
}

function createSessionTimes(
  day: ByDay,
  time: Time,
): { cohort: string; times: ISessionDates['times'] } {
  const start = findNextDay(day, time);
  const end = dayjs(start).add(1, 'hour').toDate();
  const until = dayjs(start).add(1, 'day').toDate();
  const cohortMonth = start.format('MMM').toLowerCase().slice(0, 3);
  const cohortTime = start.format('D-YY');
  const isTopHour = start.minute() === 0;
  const hours = isTopHour ? start.format('ha') : start.format('h-mma');

  return {
    cohort: `is-${cohortMonth}-${cohortTime}-${hours}`,
    times: {
      start: { dateTime: start.toISOString(), timeZone: 'America/Chicago' },
      end: { dateTime: end.toISOString(), timeZone: 'America/Chicago' },
      until: until.toISOString(),
      byday: day,
    },
  };
}

function createId(len: number): string {
  return new Array(Math.ceil(len % 10))
    .fill(0)
    .map(() => Math.random().toString(36).substring(2, 12))
    .join('')
    .slice(0, len);
}

function createSession(day: ByDay, time: Time): ISessionDates {
  const { times, cohort } = createSessionTimes(day, time);

  return {
    _id: createId(17),
    code: createId(4),
    programId: createId(17),
    cohort,
    times,
    locationType: 'VIRTUAL',
    googlePlace: {} as GooglePlace,
  };
}
