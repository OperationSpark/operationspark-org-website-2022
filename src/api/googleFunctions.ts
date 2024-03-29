import { GaxiosPromise } from '@googleapis/calendar';
import { GoogleAuth } from 'google-auth-library';

export type RunCloudFunctionArgs<T> = {
  url: string;
  body: T;
  headers?: { [key: string]: string | undefined };
};

export async function runCloudFunction<T, Res>({
  url,
  body,
  headers = {},
}: RunCloudFunctionArgs<T>): GaxiosPromise<Res> {
  const { GOOGLE_SERVICE_ACCOUNT } = process.env;
  const credentials = GOOGLE_SERVICE_ACCOUNT && JSON.parse(GOOGLE_SERVICE_ACCOUNT);
  if (!credentials) {
    throw new Error('Invalid credentials');
  }

  const auth = new GoogleAuth({ credentials });
  const client = await auth.getIdTokenClient(url);
  return await client.request({
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}
