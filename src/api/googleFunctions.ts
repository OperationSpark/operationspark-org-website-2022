import { GoogleAuth } from 'google-auth-library';

export type RunCloudFunctionArgs = {
  url: string;
  body: { [key: string]: string | undefined };
  headers?: { [key: string]: string | undefined };
};

export const runCloudFunction = async ({ url, body, headers = {} }: RunCloudFunctionArgs) => {
  const { GOOGLE_SERVICE_ACCOUNT } = process.env;
  const credentials = GOOGLE_SERVICE_ACCOUNT && JSON.parse(GOOGLE_SERVICE_ACCOUNT);
  if (!credentials) {
    throw new Error('Invalid credentials');
  }

  const auth = new GoogleAuth({ credentials });
  const client = await auth.getIdTokenClient(url);

  await client.request({
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
};
