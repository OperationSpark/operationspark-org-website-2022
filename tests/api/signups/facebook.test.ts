import { beforeEach, describe, expect, test } from '@jest/globals';
import nock from 'nock';
import { createMocks } from 'node-mocks-http';

import handler from '@this/pages-api/signups/info/facebook';

describe('should accept webhook challenge GET /api/signups/info/facebook', () => {
  beforeEach(() => {
    nock('https://graph.facebook.com')
      .get('/v20.0/123456789')
      .query(true)
      .reply(200, { data: [{ id: '123456789' }] });
  });

  test('should accept incoming webhook and respond with correct challenge code and status of 200', async () => {
    process.env.FB_WEBHOOK_TOKEN = 'FAKE_TESTING_WEBHOOK_TOKEN';
    const challengeCode = Math.random().toString(36).substring(2);
    const { req, res } = createMocks({
      path: '/',
      query: {
        'hub.mode': 'subscribe',
        'hub.verify_token': 'FAKE_TESTING_WEBHOOK_TOKEN',
        'hub.challenge': challengeCode,
      },
    });
    // @ts-expect-error - Not worth matching type exactly
    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toBe(challengeCode);
  });
  test('should not accept an incoming webhook with an invalid `hub.verify_token` and respond with 400', async () => {
    process.env.FB_WEBHOOK_TOKEN = 'FAKE_TESTING_WEBHOOK_TOKEN';
    const challengeCode = Math.random().toString(36).substring(2);
    const { req, res } = createMocks({
      path: '/',
      query: {
        'hub.mode': 'subscribe',
        'hub.verify_token': 'FAKE_INVALID_TESTING_WEBHOOK_TOKEN',
        'hub.challenge': challengeCode,
      },
    });

    // @ts-expect-error - Not worth matching type exactly
    await handler(req, res);

    expect(res._getStatusCode()).toBe(403);
    expect(res._getData()).not.toBe(challengeCode);
  });

  test('should not accept an incoming webhook with a missing `hub.verify_token`', async () => {
    process.env.FB_WEBHOOK_TOKEN = 'FAKE_TESTING_WEBHOOK_TOKEN';
    const challengeCode = Math.random().toString(36).substring(2);
    const { req, res } = createMocks({
      path: '/',
      query: {
        'hub.mode': 'subscribe',
        'hub.challenge': challengeCode,
      },
    });

    // @ts-expect-error - Not worth matching type exactly
    await handler(req, res);

    expect(res._getStatusCode()).toBe(403);
    expect(res._getData()).not.toBe(challengeCode);
  });

  test('should not accept an incoming webhook if `FB_WEBHOOK_TOKEN` is "missing" but technically "match"', async () => {
    process.env.FB_WEBHOOK_TOKEN = '';
    const challengeCode = Math.random().toString(36).substring(2);
    const { req, res } = createMocks({
      path: '/',
      query: {
        'hub.mode': 'subscribe',
        FAKE_TESTING_WEBHOOK_TOKEN: '',
        'hub.challenge': challengeCode,
      },
    });

    // @ts-expect-error - Not worth matching type exactly
    await handler(req, res);

    expect(res._getStatusCode()).toBe(403);
    expect(res._getData()).not.toBe(challengeCode);
  });
});
