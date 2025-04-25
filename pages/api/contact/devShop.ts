import * as Sentry from '@sentry/nextjs';
import { capitalize } from 'lodash';

import { DevShopFormInputs } from '@this/data/types/devShop';
import {
  addDevShopContactRowToSheet,
  checkMissingFields,
  getDevShopConfirmEmailDetails,
  parseDevShopSpreadsheetValues,
  requiredFields,
  sendDevShopConfirmEmail,
  sendDevShopInquirySlackMessage,
} from '@this/src/api/devShopHelpers';
import { ReqHandler } from '@this/types/request';

const handleContactDevShop: ReqHandler<{}, DevShopFormInputs> = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const missingFields = checkMissingFields(req.body);

  if (missingFields) {
    res.status(400).end(`Missing fields: ${missingFields.join(', ')}`);
    return;
  }

  const formValues = requiredFields.map((field) => ({
    name: field,
    label: capitalize(field),
    value: req.body[field],
  }));

  const { header, row, valueMap } = parseDevShopSpreadsheetValues(formValues);

  const emailDetails = getDevShopConfirmEmailDetails(valueMap);

  try {
    await addDevShopContactRowToSheet('Dev Shop Inquiries', { header, row });

    // Send the response. don't wait for the email or slack message to finish
    res.status(201).end();

    ////////////////////////////////////////////////////////////
    // Complete non-blocking tasks after sending the response //
    ////////////////////////////////////////////////////////////

    // Send the confirmation email to the user
    await sendDevShopConfirmEmail(valueMap.email, emailDetails);

    await sendDevShopInquirySlackMessage(valueMap);

    // Status sent after details added to spreadsheet above
    return;
  } catch (error) {
    // sendDevShopConfirmEmail and sendDevShopInquirySlackMessage will never throw. We only want it to fail if the sheet fails
    console.error('Error handling contact form:', error);

    Sentry.captureException(error, {
      tags: { type: 'dev-shop-inquiry' },
      extra: {
        message: 'Error adding dev shop contact to sheet',
        formValues,
      },
    });

    res.status(500).end();
  }
};

export default handleContactDevShop;
