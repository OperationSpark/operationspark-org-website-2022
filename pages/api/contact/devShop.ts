import * as Sentry from '@sentry/nextjs';
import { capitalize } from 'lodash';

import { DevShopFormInputs } from '@this/data/types/devShop';
import {
  addDevShopContactRowToSheet,
  checkMissingFields,
  formOutputOrder,
  getDevShopConfirmEmailDetails,
  parseDevShopSpreadsheetValues,
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

  const formValues = formOutputOrder.map((field) => ({
    name: field,
    label: capitalize(field),
    value: req.body[field],
  }));

  const { header, row, valueMap } = parseDevShopSpreadsheetValues(formValues);

  const emailDetails = getDevShopConfirmEmailDetails(valueMap);

  try {
    await addDevShopContactRowToSheet('Dev Shop Inquiries', {
      header,
      row,
    });

    // Send the response. don't wait for the email or slack message to finish
    res.status(201).end();
    // Continue with the email and slack message below
  } catch (error) {
    console.error('Error handling contact form:', error);

    Sentry.captureException(error, {
      tags: { type: 'dev-shop-inquiry' },
      extra: {
        message: 'Error adding dev shop contact to sheet',
        formValues,
      },
    });

    res.status(500).end();
    // Don't continue with the email and slack message if the sheet fails
    return;
  }

  ////////////////////////////////////////////////////////////
  // Complete non-blocking tasks after sending the response //
  ////////////////////////////////////////////////////////////

  try {
    // Send the confirmation email to the user
    await sendDevShopConfirmEmail(valueMap.email, emailDetails);
  } catch (error) {
    console.error('Error sending confirmation email:', error);

    Sentry.captureException(error, {
      tags: { type: 'dev-shop-inquiry' },
      extra: {
        message: 'Error sending confirmation email',
        formValues,
      },
    });
  }

  try {
    // Send the inquiry to Slack
    await sendDevShopInquirySlackMessage(valueMap);
  } catch (error) {
    console.error('Error sending Slack message:', error);

    Sentry.captureException(error, {
      tags: { type: 'dev-shop-inquiry' },
      extra: {
        message: 'Error sending Slack message',
        formValues,
      },
    });
  }
};

export default handleContactDevShop;
