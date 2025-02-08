const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const color = require('cli-color');

const { validateData } = require('./data/validate');

const {
  NODE_ENV,
  OVERRIDE_NODE_ENV = '',
  FB_PIXEL_ID,
  GOOGLE_ANALYTICS_ID,
  // Default to current date if not set
  HIGHSCHOOL_FORM_ACTIVE_UNTIL = new Date().toISOString(),
  HIGHSCHOOL_FORM_RESPONSES_NAME = '__TAB_NAME_NOT_SET__',
} = process.env;

const hsFormActiveUntil = new Date(HIGHSCHOOL_FORM_ACTIVE_UNTIL);

module.exports = (phase, { defaultConfig }) => {
  const isHsFormActive = hsFormActiveUntil > new Date();

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
      'TEACHER_TRAINING_FORM_RESPONSES_ID',
      'WUFOO_HOST',
      'WUFOO_TOKEN',
      'WUFOO_CONTACT_FORM_ID',
      'GOOGLE_EVENTS_CALENDAR_ID',
      'HIGHSCHOOL_FORM_RESPONSES_NAME',
      'GOOGLE_ANALYTICS_ID',
    ]);
    validateData();
  }
  if (PHASE_DEVELOPMENT_SERVER === phase) {
    const port = process.env.PORT;
    console.info(color.blueBright.bold('\nhttp://localhost:' + (port ?? '3000') + '\n'));
  }
  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    ...defaultConfig,
    reactStrictMode: true,
    compiler: {
      styledComponents: {
        pure: true,
        displayName: true,
      },
    },
    env: {
      OVERRIDE_NODE_ENV: OVERRIDE_NODE_ENV || NODE_ENV || '',
      FB_PIXEL_ID,
      HIGHSCHOOL_FORM_ACTIVE_UNTIL,
      HIGHSCHOOL_FORM_RESPONSES_NAME,
      GOOGLE_ANALYTICS_ID: GOOGLE_ANALYTICS_ID || '',
    },

    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'storage.googleapis.com',
        },
      ],
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
        {
          source: `/noladevs`,
          destination: '/getInvolved/noladevs',
          permanent: false,
        },
        {
          source: `/donate`,
          destination: '/getInvolved/donate',
          permanent: false,
        },

        // High School Program
        {
          source: '/high-school',
          destination: '/programs/highschool',
          permanent: true,
        },
        {
          source: '/highschool',
          destination: '/programs/highschool',
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
        {
          source: '/teacher-training',
          destination: '/programs/highschool/teacherTraining',
          permanent: true,
        },
        {
          source: '/teacher-training/info/:slug',
          destination: '/programs/highschool/teacherTraining/info/:slug',
          permanent: true,
        },
        {
          source: '/teacher-training/register/:slug',
          destination: '/programs/highschool/teacherTraining/register/:slug',
          permanent: true,
        },
        // Filter out false/undefined/null routes
      ].filter(Boolean);
    },
  };

  return config;
};

function checkEnvVars(requiredVars) {
  for (const requiredVar of requiredVars) {
    if (!process.env[requiredVar]) {
      throw new Error(`"${requiredVar}" environment variable not found.`);
    }
  }
  console.info(color.green('  ✓'), 'Validating credentials and data');
}
