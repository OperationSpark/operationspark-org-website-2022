const envVars = [
  'GREENLIGHT_API_ENDPOINT',
  'GREENLIGHT_API_TOKEN',
  'MAILCHIMP_API_KEY',
  'MAILCHIMP_AUDIENCE_ID',
  'SIGNUP_API_ENDPOINT',
] as const;

export type EnvVar = (typeof envVars)[number];

export const config = envVars.reduce((acc, key) => {
  acc[key as EnvVar] = process.env[key] ?? '';
  return acc;
}, {} as Record<EnvVar, string>);

export default config;
