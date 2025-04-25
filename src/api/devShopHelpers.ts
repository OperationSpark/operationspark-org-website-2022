import { DevShopFormInputs } from '@this/data/types/devShop';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { addRow, createSpreadsheetTab, getSheets } from './googleSheets';
import { connectSlack } from './slack';

const {
  DEV_SHOP_INQUIRIES_SHEET_ID,
  MG_API_KEY = '',
  MG_DOMAIN = 'mail.operationspark.org',
  DEV_SHOP_CONTACT_SLACK_CHANNEL_ID,
} = process.env;

export const formOutputOrder = ['name', 'company', 'email', 'description'] as const;
export const requiredFields = ['name', 'company', 'email', 'description'] as const;

type FormKey = (typeof formOutputOrder)[number];

type FormValueType = {
  name: string;
  label: string;
  value: string;
};
type emailDetail = {
  label: string;
  value: string;
  plainValue: string;
};
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

type ParsedSheetValues = {
  header: string[];
  row: string[];
  valueMap: Record<FormKey, string>;
};

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: MG_API_KEY,
});

export const checkMissingFields = (values: DevShopFormInputs) => {
  if (!values) {
    return requiredFields;
  }

  const missingFields = requiredFields.filter((field) => !values[field]);

  if (!missingFields.length) {
    return null;
  }

  if (missingFields.length) {
    return missingFields;
  }
};

export const parseDevShopSpreadsheetValues = (formValues: FormValueType[]): ParsedSheetValues => {
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

export const getDevShopConfirmEmailDetails = (values: DevShopFormInputs): emailDetail[] => {
  return [
    {
      label: 'Name',
      value: values.name,
      plainValue: `${values.name} <${values.email}>`,
    },
    {
      label: 'Company',
      value: values.company,
      plainValue: values.company,
    },
    {
      label: 'Description',
      value: values.description,
      plainValue: values.description,
    },
  ];
};

export const sendDevShopConfirmEmail = async (toEmail: string, emailDetails: emailDetail[]) => {
  const plainTextEmail = `Thank you contacting Operation Spark's Dev Shop.  We will be in touch soon! \n\nDetails:\n${emailDetails
    .map((detail) => `${detail.label}: ${detail.value}`)
    .join('\n')}`;
  const mgVariables: MgVariables = {
    title: 'Operation Spark | Dev Shop Inquiry Confirmation',
    subject: 'Dev Shop Inquiry Confirmation',
    details: emailDetails,
    body: `Thank you contacting Operation Spark's Dev Shop.  We will be in touch soon!`,
  };
  try {
    // Send email
    await mg.messages.create(MG_DOMAIN, {
      from: 'Operation Spark <noreply@operationspark.org>',
      to: toEmail,
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

export const addDevShopContactRowToSheet = async (
  formName: string,
  parsedSheetValues: Omit<ParsedSheetValues, 'valueMap'>,
) => {
  const spreadsheetId = DEV_SHOP_INQUIRIES_SHEET_ID;
  const { header, row } = parsedSheetValues;
  const sheets = getSheets();

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
};

export const sendDevShopInquirySlackMessage = async (valueMap: DevShopFormInputs) => {
  const slackMessage = `\
  \n*${valueMap.name}* has contacted the Dev Shop!\
  \n*Email:* ${valueMap.email}\
  \n*Company:* ${valueMap.company}\
  \n*Description:*\n> ${valueMap.description.split('\n').join('\n> ')}`;

  try {
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
};
