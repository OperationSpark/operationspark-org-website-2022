import { describe, expect, test } from '@jest/globals';
import { ISessionDates } from '@this/pages-api/infoSession/dates';
import { findBestSession } from '@this/src/api/helpers/facebookWebhook';

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
  const tu1230 = createSession('TU', '12:30PM');
  const tu1730 = createSession('TU', '5:30PM');
  const th1230 = createSession('TH', '12:30PM');
  const th1730 = createSession('TH', '5:30PM');

  const allSessions = [tu1230, tu1730, th1230, th1730];

  test('should exist', () => {
    expect(findBestSession).toBeInstanceOf(Function);
  });

  const testCases = [
    ['Tuesday', '12:30PM', tu1230],
    ['Tuesday', '5:30PM', tu1730],
    ['Thursday', '12:30PM', th1230],
    ['Thursday', '5:30PM', th1730],
  ] as const;

  testCases.forEach(([day, time, initialSession]) => {
    test(`should return correct session for "${day} at ${time}"`, () => {
      const session = findBestSession(allSessions, day, time);
      expect(session).toEqual(toSessionObj(initialSession));
    });
  });

  test('should return next session if no day or time provided', () => {
    const session = findBestSession(allSessions);
    expect(session).toEqual(toSessionObj(tu1230));
  });

  test('should return best day if no time matches', () => {
    const sessions = [tu1230, th1230];
    const session = findBestSession(sessions, 'Tuesday', '5:30PM');
    expect(session).toEqual(toSessionObj(tu1230));
  });

  test('should return best time if no day matches', () => {
    const sessions = [th1230, th1730];
    const session = findBestSession(sessions, 'Tuesday', '5:30PM');
    expect(session).toEqual(toSessionObj(th1730));
  });

  test('should return best time on different day if time of selected day is unavailable', () => {
    const sessions = [tu1230, th1230, th1730];
    const session = findBestSession(sessions, 'Tuesday', '5:30PM');
    expect(session).toEqual(toSessionObj(th1730));
  });

  test('should return undefined if no sessions', () => {
    const session = findBestSession([], 'Tuesday', '5:30PM');
    expect(session).toBeUndefined();
  });
});

type ByDay = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
type Time = '12:30PM' | '5:30PM';

function createSession(day: ByDay, time: Time): ISessionDates {
  const t = time.toLowerCase().replace(':', '-');
  return {
    _id: createId(17),
    code: createId(4),
    cohort: `is-oct-1-24-${t}`,
    programId: createId(17),
    times: {
      start: { dateTime: '2024-10-01T22:30:00.000Z', timeZone: 'America/Chicago' },
      end: { dateTime: '2024-10-01T23:30:00.000Z', timeZone: 'America/Chicago' },
      until: '2024-10-02T22:30:00.000Z',
      byday: day,
    },
    locationType: 'VIRTUAL',
    googlePlace: {
      placesId: 'ChIJ7YchCHSmIIYRYsAEPZN_E0o',
      name: 'Operation Spark',
      address: '514 Franklin Ave, New Orleans, LA 70117, USA',
      phone: '+1 504-534-8277',
      website: 'https://www.operationspark.org/',
      geometry: { lat: 29.96325999999999, lng: -90.052138 },
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
