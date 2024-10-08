import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedUrlQuery } from 'querystring';

export type Body = Record<string, unknown>;
export type Query = ParsedUrlQuery;

export interface Req<Q extends Query = {}, B extends Body = {}> extends NextApiRequest {
  query: Q;
  body: B;
}

export type ReqMiddleware<
  Q extends Query = {},
  B extends Body = {},
  R extends unknown = unknown,
> = (req: Req<Q, B>, res: NextApiResponse) => R;

export type ReqHandler<Q extends Query = {}, B extends Body = {}> = (
  req: Req<Q, B>,
  res: NextApiResponse,
) => unknown | Promise<unknown>;
