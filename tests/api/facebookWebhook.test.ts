import { describe, expect, test } from '@jest/globals';
import { findBestSession } from '@this/src/api/helpers/facebookWebhook';

import { ISessionDates } from '@this/pages-api/infoSession/dates';
import { createSessionDates, setCentralTime, toSessionObj } from '../support/facebookWebhook';

describe('findBestSession', () => {
  const tues1200pm = createSessionDates('TU', '12:00PM');
  const tues530pm = createSessionDates('TU', '5:30PM');
  const nextTues1200pm = createSessionDates('TU', '12:00PM', 1);
  const nextTues530pm = createSessionDates('TU', '5:30PM', 1);

  const allSessions = [tues1200pm, tues530pm, nextTues1200pm, nextTues530pm];
  const nextWeekSessions = [nextTues1200pm, nextTues530pm];

  describe('Find exact match', () => {
    const testCases = [
      [createTime(tues1200pm, 12, 0), tues1200pm, allSessions],
      [createTime(tues530pm, 17, 30), tues530pm, allSessions],
      [createTime(nextTues1200pm, 12, 0), nextTues1200pm, nextWeekSessions],
      [createTime(nextTues530pm, 17, 30), nextTues530pm, nextWeekSessions],
    ] as const;

    testCases.forEach(([time, initialSession, sessions]) => {
      test(`should return correct session for time: "${time}"`, () => {
        const got = findBestSession(sessions, time);
        const expected = toSessionObj(initialSession);
        expect(got).toEqual(expected);
      });
    });
  });

  describe('Find best match', () => {
    test('should return next session if no day or time provided', () => {
      const got = findBestSession(allSessions);
      expect(got).toEqual(toSessionObj(tues1200pm));
    });

    test('should return undefined if no sessions', () => {
      const time = createTime(tues1200pm, 17, 30);
      const got = findBestSession([], time);
      expect(got).toBeUndefined();
    });

    test('should return next session if no day or time provided', () => {
      const got = findBestSession(allSessions);
      expect(got).toEqual(toSessionObj(tues1200pm));
    });

    test('should return correct time if next session is in future, but before best time (find 5:30pm next week NOT 12pm next week)', () => {
      const time = createTime(tues530pm, 17, 30);
      const got = findBestSession(nextWeekSessions, time);
      expect(got).toEqual(toSessionObj(nextTues530pm));
    });
  });
});

function createTime(session: ISessionDates, hours: number, minutes: number, weeks?: number) {
  return setCentralTime(session.times.start.dateTime, hours, minutes, weeks);
}
