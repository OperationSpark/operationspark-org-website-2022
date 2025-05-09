// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { browserTracingIntegration } from '@sentry/browser';
import * as Sentry from '@sentry/nextjs';
import config from '@this/config';

const { SIGNUP_API_ENDPOINT } = config;

Sentry.init({
  dsn: 'https://2b3b08a6edc118c629a1e68874df48ae@o4508836956078080.ingest.us.sentry.io/4508966651494400',

  integrations: [browserTracingIntegration(), Sentry.replayIntegration()],

  tracePropagationTargets: [SIGNUP_API_ENDPOINT],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
