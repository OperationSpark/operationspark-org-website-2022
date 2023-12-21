const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const color = require('cli-color');

const { validateData } = require('./data/validate');

const {
  OVERRIDE_NODE_ENV = '',
  FB_PIXEL_ID,
  HIGHSCHOOL_FORM_ACTIVE = 'false',
  HIGHSCHOOL_FORM_RESPONSES_NAME = '__TAB_NAME_NOT_SET__',
} = process.env;

const isHsFormActive = HIGHSCHOOL_FORM_ACTIVE?.toLowerCase() === 'true';

/** @returns {import('next').NextConfig} */
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
      'HIGHSCHOOL_FORM_RESPONSES_NAME',
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
    // ...defaultConfig,
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
    env: {
      OVERRIDE_NODE_ENV,
      FB_PIXEL_ID,
      HIGHSCHOOL_FORM_ACTIVE: `${isHsFormActive}`,
      HIGHSCHOOL_FORM_RESPONSES_NAME,
    },

    // TODO: This will need to be updated when NextJS is updated due to change in 12.3.0 (Currently 12.1.0)
    // https://nextjs.org/docs/messages/next-image-unconfigured-host

    images: {
      domains: ['storage.googleapis.com'],
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
        /**
         * High School Application - `/programs/highschool/apply`
         * - When high school form is available, set env variable 'HIGHSCHOOL_FORM_ACTIVE' to 'true' otherwise 'false'
         */
        !isHsFormActive && {
          source: '/programs/highschool/apply',
          destination: '/programs/highschool',
          permanent: false,
        },
        {
          source: '/privacy',
          destination: '/privacyPolicy',
          permanent: true,
        },
        // Filter out false/undefined/null routes
      ].filter(Boolean);
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
