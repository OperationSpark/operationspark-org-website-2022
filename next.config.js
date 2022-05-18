const {
  PHASE_PRODUCTION_BUILD,
  PHASE_DEVELOPMENT_SERVER,
} = require('next/constants');
const color = require('cli-color');

const { validateData } = require('./data/validate');

module.exports = (phase, { defaultConfig }) => {
  if (
    !process.env.GITHUB_ACTION &&
    [PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER].includes(phase)
  ) {
    console.info(color.yellow('Validating environment variables'));
    checkEnvVars([
      'MAILCHIMP_API_KEY',
      'MAILCHIMP_AUDIENCE_ID',
      'GREENLIGHT_API_ENDPOINT',
      'SIGNUP_API_ENDPOINT',
      'GOOGLE_SERVICE_ACCOUNT',
      'HIGHSCHOOL_FORM_RESPONSES_ID',
      'HIGHSCHOOL_FORM_RESPONSES_NAME',
      'WUFOO_HOST',
      'WUFOO_TOKEN',
      'WUFOO_CONTACT_FORM_ID',
    ]);
    console.info(color.yellow('Validating credentials and data'));
    validateData();
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
  };
};

function checkEnvVars(requiredVars) {
  for (const requiredVar of requiredVars) {
    if (!process.env[requiredVar]) {
      throw new Error(`"${requiredVar}" environment variable not found.`);
    }
    console.info(`${color.green('  ✓')} ${requiredVar}`);
  }
}
