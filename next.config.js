const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const color = require('cli-color');

const { validateData } = require('./data/validate');

const { OVERRIDE_NODE_ENV = '' } = process.env;

module.exports = (phase, { defaultConfig }) => {
  console.info(color.magentaBright.bold('\nValidating... '));
  if (
    !process.env.GITHUB_ACTION &&
    [PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER].includes(phase)
  ) {
    checkEnvVars([
      'MAILCHIMP_API_KEY',
      'MAILCHIMP_AUDIENCE_ID',
      'GREENLIGHT_API_ENDPOINT',
      'SIGNUP_API_ENDPOINT',
      'GOOGLE_SERVICE_ACCOUNT',
      'HIGHSCHOOL_FORM_RESPONSES_ID',
      'WUFOO_HOST',
      'WUFOO_TOKEN',
      'WUFOO_CONTACT_FORM_ID',
      'GOOGLE_EVENTS_CALENDAR_ID',
    ]);
    validateData();
  }
  if (PHASE_DEVELOPMENT_SERVER === phase) {
    console.info(color.blueBright.bold('\nhttp://localhost:3000\n'));
  }
  /**
   * @type {import('next').NextConfig}
   */
  return {
    ...defaultConfig,
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
    env: {
      OVERRIDE_NODE_ENV,
    },
    async redirects() {
      return [
        {
          source: '/info-session',
          destination: '/programs/workforce/infoSession',
          permanent: true,
        },
        {
          source: '/infoSession',
          destination: '/programs/workforce/infoSession',
          permanent: true,
        },
        // Uncomment to remove high school application route
        // {
        //   source: '/programs/highschool/apply',
        //   destination: '/programs/highschool',
        //   permanent: false,
        // },
        {
          source: '/privacy',
          destination: '/privacyPolicy',
          permanent: true,
        },
      ];
    },
  };
};

function checkEnvVars(requiredVars) {
  for (const requiredVar of requiredVars) {
    if (!process.env[requiredVar]) {
      throw new Error(`"${requiredVar}" environment variable not found.`);
    }
  }
  console.info(color.green('  ✓'), 'Validating credentials and data');
}
