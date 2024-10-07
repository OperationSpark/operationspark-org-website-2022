import { describe, expect, test } from '@jest/globals';
import { findBestSession } from '@this/src/api/helpers/facebookWebhook';

import { createSessionDates, toSessionObj } from '../support/facebookWebhook';

describe('findBestSession', () => {
  const tues1230pm = createSessionDates('TU', '12:30PM');
  const tues530pm = createSessionDates('TU', '5:30PM');
  const thurs1230pm = createSessionDates('TH', '12:30PM');
  const thurs530pm = createSessionDates('TH', '5:30PM');

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
