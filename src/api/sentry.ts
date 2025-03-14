import { IncomingMessage } from 'node:http';

/**
 * Extracts the Sentry tracing headers from the request object.
 * Allows the Sentry SDK to continue the request trace as it passes through
 * other services.
 * https://docs.sentry.io/platforms/javascript/tracing/distributed-tracing/custom-instrumentation/
 *
 * https://docs.sentry.io/platforms/javascript/guides/nextjs/tracing/distributed-tracing/custom-instrumentation/#inject-tracing-information-into-outgoing-requests
 * @param req
 * @returns
 */
export const extractSentryHeadersFromRequest = (
  req: IncomingMessage,
): { baggage?: string; 'sentry-trace'?: string } => {
  const headers: { [key: string]: string | undefined } = {};
  if (typeof req.headers.baggage === 'string') {
    headers.baggage = req.headers.baggage;
  }
  if (typeof req.headers['sentry-trace'] === 'string') {
    headers['sentry-trace'] = req.headers['sentry-trace'];
  }
  return headers;
};
