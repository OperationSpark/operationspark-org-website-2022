import formData from 'form-data';
import Mailgun from 'mailgun.js';

import { addRow, createSpreadsheetTab, getSheets } from '@this/api/googleSheets';
import { DevShopFormInputs } from '@this/data/types/devShop';
import { connectSlack } from '@this/src/api/slack';
import { ReqHandler } from '@this/types/request';
import { capitalize } from 'lodash';

const {
  DEV_SHOP_INQUIRIES_SHEET_ID,
  MG_API_KEY = '',
  MG_DOMAIN = 'mail.operationspark.org',
  DEV_SHOP_CONTACT_SLACK_CHANNEL_ID,
} = process.env;

type FormValueType = {
  name: string;
  label: string;
  value: string;
};

const spreadsheetId = DEV_SHOP_INQUIRIES_SHEET_ID ?? '';
const formName = 'Dev Shop Inquiries';
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: MG_API_KEY,
});

const formOutputOrder = ['name', 'company', 'email', 'description'] as const;
const requiredFields = ['name', 'company', 'email', 'description'] as const;

type FormKey = (typeof formOutputOrder)[number];

const parseSpreadsheetValues = (formValues: FormValueType[]) => {
  const outputValues = {
    header: [] as string[],
    row: [] as string[],
    valueMap: {} as Record<FormKey, string>,
  };

  formOutputOrder.forEach((key) => {
    const { label, value } = formValues.find((formValue) => formValue.name === key) ?? {};

    outputValues.valueMap[key] = value || '';
    outputValues.header.push(label || '');
    outputValues.row.push(value || '');
  });

  return outputValues;
};

const handleContactDevShop: ReqHandler<{}, DevShopFormInputs> = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const missingFields = requiredFields.filter((field) => !req.body?.[field]);

  if (missingFields.length) {
    res.status(400).end(`Missing fields: ${missingFields.join(', ')}`);
    return;
  }

  const formValues = requiredFields.map((field) => ({
    name: field,
    label: capitalize(field),
    value: req.body[field],
  }));

  const sheets = getSheets();
  const { header, row, valueMap } = parseSpreadsheetValues(formValues);

  const emailDetails = [
    {
      label: 'Name',
      value: valueMap.name,
      plainValue: `${valueMap.name} <${valueMap.email}>`,
    },
    {
      label: 'Company',
      value: valueMap.company,
      plainValue: valueMap.company,
    },
    {
      label: 'Description',
      value: valueMap.description,
      plainValue: valueMap.description,
    },
  ];

  try {
    // Create the tab if it doesn't exist
    await createSpreadsheetTab({
      sheets,
      spreadsheetId,
      tabName: formName,
      header,
    });

    // Add a new row to the spreadsheet
    await addRow({
      sheets,
      spreadsheetId,
      tabName: formName,
      values: row,
    });

    // Send the response. don't wait for the email or slack message to finish
    res.status(201).end();

    // Finish sending the email and slack message
    type MgVariables = {
      title: string;
      subject: string;
      body?: string;
      details: {
        label: string;
        value: string;
      }[];
    };

    const plainTextEmail = `Thank you contacting Operation Spark's Dev Shop.  We will be in touch soon! \n\nDetails:\n${emailDetails
      .map((detail) => `${detail.label}: ${detail.value}`)
      .join('\n')}`;
    const mgVariables: MgVariables = {
      title: 'Operation Spark | Dev Shop Inquiry Confirmation',
      subject: 'Dev Shop Inquiry Confirmation',
      details: emailDetails,
      body: `Thank you contacting Operation Spark's Dev Shop.  We will be in touch soon!`,
    };

    const sendEmail = async () => {
      try {
        // Send email
        await mg.messages.create(MG_DOMAIN, {
          from: 'Operation Spark <noreply@operationspark.org>',
          to: valueMap.email,
          subject: mgVariables.subject,
          template: 'dev-shop-contact-confirmation',
          text: plainTextEmail,
          'h:X-Mailgun-Variables': JSON.stringify(mgVariables),
        });
      } catch (error) {
        // Don't fail for email
        console.error('Error sending email:', error);
      }
    };
    await sendEmail();

    try {
      const slackMessage = `\
      \n*${valueMap.name}* has contacted the Dev Shop!\
      \n*Email:* ${valueMap.email}\
      \n*Company:* ${valueMap.company}\
      \n*Description:*\n> ${valueMap.description.split('\n').join('\n> ')}`;

      const slackClient = connectSlack();
      await slackClient.chat.postMessage({
        channel: DEV_SHOP_CONTACT_SLACK_CHANNEL_ID,
        text: slackMessage,
        blocks: [{ type: 'section', text: { type: 'mrkdwn', text: slackMessage } }],
      });
    } catch (error) {
      // Don't fail for slack
      console.error('Error sending Slack message:', error);
    }

    // Status sent after details added to spreadsheet above
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).end();
  }
};

export default handleContactDevShop;
