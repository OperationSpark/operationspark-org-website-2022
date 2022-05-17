const color = require('cli-color');
const alertInfo = require('./alert.json');
const { GOOGLE_SERVICE_ACCOUNT } = process.env;

const checkValidDate = (d) => !isNaN(new Date(d).valueOf());

exports.validateAlertData = ({ start, end, message }) => {
  if (end && message && !checkValidDate(end)) {
    throw new Error(`
      Invalid end date/time: '${end}'
      Date/time should be 'MM/DD/YYYY hh:mm' with time in 24 hour format
    `);
  }
  if (start && end && message && !checkValidDate(start)) {
    throw new Error(`
      Invalid start date/time: '${start}'
      Date/time should be 'MM/DD/YYYY hh:mm' with time in 24 hour format
    `);
  }
  console.info(`${color.green('  ✓')} Alert data valid`);
};

exports.validateGoogleAuth = () => {
  // Check if service_account credentials exist and include required properties.
  // There is no way to validate the credentials until used.
  const credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT || '{}');

  if (!credentials) {
    throw new Error('Invalid "GOOGLE_SERVICE_ACCOUNT"');
  }

  ['client_email', 'private_key'].forEach((key) => {
    if (!credentials.hasOwnProperty(key)) {
      throw new Error(
        `Invalid "GOOGLE_SERVICE_ACCOUNT"\nMissing property: "${key}"`,
      );
    }
  });

  console.info(`${color.green('  ✓')} Google credentials valid`);
};

exports.validateData = () => {
  exports.validateAlertData(alertInfo);
  exports.validateGoogleAuth();
};
