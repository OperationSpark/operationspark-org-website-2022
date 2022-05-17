import { GoogleAuth } from 'google-auth-library';

export type RunCloudFunctionArgs = {
  url: string;
  body: { [key: string]: string | undefined };
};

export const runCloudFunction = async ({ url, body }: RunCloudFunctionArgs) => {
  const serviceAccount = process.env.GOOGLE_SERVICE_ACCOUNT;
  const credentials = serviceAccount && JSON.parse(serviceAccount);
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
    },
    body: JSON.stringify(body),
  });
};
