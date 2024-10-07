import { beforeEach, describe, expect, test } from '@jest/globals';
import nock from 'nock';
import { createMocks } from 'node-mocks-http';

import handler from '@this/pages-api/signups/info/facebook';
import {
  createLeadEntry,
  createSessionDates,
  createSignature,
  createWebhookPayload,
} from '../support/facebookWebhook';

describe('Facebook Info Session Signup Webhook', () => {
  afterAll(() => {
    nock.cleanAll();
    nock.restore();
  });
  describe('Initial Webhook Subscription | GET /api/signups/info/facebook', () => {
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

  describe('Page → Leadgen Webhook | POST /api/signups/info/facebook', () => {
    beforeEach(() => {
      nock('https://graph.facebook.com/v20.0')
        .get(/.*/)
        .query(true)
        .reply(200, createLeadEntry('123456789'));
      // createSessionDates
      nock('https://greenlight.operationspark.org/api/sessions/opens')
        .get(/.*/)
        .reply(200, { sessions: [createSessionDates('TU', '12:30PM')] });
    });

    test('should reject incoming webhook with no signature', async () => {
      process.env.FB_APP_SECRET = 'APP_SECRET';
      const payload = createWebhookPayload(['123456789']);

      const { req, res } = createMocks({
        method: 'POST',
        body: payload,
      });

      // @ts-expect-error - Not worth matching type exactly
      await handler(req, res);

      expect(res._getStatusCode()).toBe(403);
    });
    test('should reject incoming webhook with invalid signature', async () => {
      process.env.FB_APP_SECRET = 'APP_SECRET';

      const payload = createWebhookPayload(['123456789']);
      const payloadStr = JSON.stringify(payload);
      const signature = createSignature(payloadStr, 'INVALID_SECRET');

      const { req, res } = createMocks({
        method: 'POST',
        headers: { 'x-hub-signature-256': signature },
        body: payload,
      });

      // @ts-expect-error - Not worth matching type exactly
      await handler(req, res);

      expect(res._getStatusCode()).toBe(403);
    });

    test('should respond with 400 if `leadId` is provided but cannot be found from the facebook API', async () => {
      process.env.FB_APP_SECRET = 'APP_SECRET';
      process.env.GREENLIGHT_API_ENDPOINT = 'https://greenlight.operationspark.org/api';

      // Clear previous nocks so we can send back empty payload
      nock.cleanAll();

      nock('https://graph.facebook.com/v20.0').get(/.*/).query(true).reply(200, {});

      const payload = createWebhookPayload(['123456789']);
      const payloadStr = JSON.stringify(payload);
      const signature = createSignature(payloadStr, 'APP_SECRET');

      const { req, res } = createMocks({
        method: 'POST',
        headers: { 'x-hub-signature-256': signature },
        body: payload,
      });

      // @ts-expect-error - Not worth matching type exactly
      await handler(req, res);

      expect(res._getStatusCode()).toBe(400);

      nock.cleanAll();
    });

    test('should accept incoming webhook with valid signature', async () => {
      process.env.FB_APP_SECRET = 'APP_SECRET';
      process.env.GREENLIGHT_API_ENDPOINT = 'https://greenlight.operationspark.org/api';

      const payload = createWebhookPayload(['123456789']);
      const payloadStr = JSON.stringify(payload);
      const signature = createSignature(payloadStr, 'APP_SECRET');

      const { req, res } = createMocks({
        method: 'POST',
        headers: { 'x-hub-signature-256': signature },
        body: payload,
      });

      // @ts-expect-error - Not worth matching type exactly
      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
    });
  });
});
