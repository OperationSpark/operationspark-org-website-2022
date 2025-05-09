import formData from 'form-data';
import Mailgun from 'mailgun.js';
import type { NextApiRequest, NextApiResponse } from 'next';

import { addRow, createSpreadsheetTab, getSheets } from '@this/api/googleSheets';
import { TeacherTrainingInfo } from '@this/data/types/teacherTraining';
import { connectSlack } from '@this/src/api/slack';

const {
  TEACHER_TRAINING_FORM_RESPONSES_ID = '',
  MG_API_KEY = '',
  MG_DOMAIN = 'mail.operationspark.org',
  TEACHER_TRAINING_SLACK_CHANNEL_ID,
} = process.env;

const badge = (text: string) => `
  <span style="
    display: inline-block;
    padding: 2px 4px;
    border-radius: 4px;
    background-color:rgba(50, 0, 100, 1);
    border: 1px solid rgba(118, 0, 233, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 0.9em;
    font-weight: 600;
    line-height: 1;
  ">${text?.trim()}</span>
`;

type FormValueType = {
  name: string;
  label: string;
  value: string;
};

interface ISignupReq extends NextApiRequest {
  body: {
    formName: string;
    courseInfo: TeacherTrainingInfo;
    values: FormValueType[];
  };
}

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: MG_API_KEY,
});

const formOutputOrder = [
  'timestamp',
  'level',
  'firstName',
  'lastName',
  'email',
  'position',
  'district',
  'schools',
  'proxyFirstName',
  'proxyLastName',
  'proxyPosition',
  'proxyEmail',
  'billingName',
  'billingEmail',
  'comments',
] as const;

const requiredFields = [
  'level',
  'firstName',
  'lastName',
  'email',
  'position',
  'district',
  'schools',
  'billingName',
  'billingEmail',
] as const;

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

const hasAllValidFields = (values: Record<FormKey, string>) => {
  return requiredFields.every((field) => values[field]);
};

export default async function handleContactForm(req: ISignupReq, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const spreadsheetId = TEACHER_TRAINING_FORM_RESPONSES_ID ?? '';
  const { formName, values, courseInfo } = req.body;

  const requiredBodyFields = ['formName', 'values', 'courseInfo'] as const;

  const missingBody = requiredBodyFields.filter((key) => !req.body[key]);
  if (missingBody.length) {
    res.status(400).end(`Missing body fields: ${missingBody.join(', ')}`);
    return;
  }

  const sheets = getSheets();
  const { header, row, valueMap } = parseSpreadsheetValues(values);
  if (!hasAllValidFields(valueMap)) {
    res.status(400).end();
    return;
  }

  const times = courseInfo.times;

  const proxyFieldNames = ['proxyFirstName', 'proxyLastName', 'proxyEmail'] as const;

  const hasProxy = proxyFieldNames.every((field) => valueMap[field]);

  const proxyEmail = hasProxy ? valueMap.proxyEmail : undefined;

  const proxyDetails = hasProxy
    ? [
        {
          label: 'Signed Up By',
          value: `
          <div>
            <div><b>${valueMap.proxyFirstName} ${valueMap.proxyLastName}</b></div>
            <div style="color: #A6A6A6; font-size: 12px;">${proxyEmail}</div>
          </div>
          `,
          plainValue: `${valueMap.proxyFirstName} ${valueMap.proxyLastName} <${proxyEmail}>`,
        },
      ]
    : [];

  const emailDetails = [
    {
      label: 'Name',
      value: `${valueMap.firstName} ${valueMap.lastName}`,
      plainValue: `${valueMap.firstName} ${valueMap.lastName} <${valueMap.email}>`,
    },
    ...proxyDetails,
    {
      label: 'Course',
      value: `${courseInfo.subtitle}`,
      plainValue: `${courseInfo.subtitle}`,
    },
    {
      label: 'IBC',
      value: `Level ${courseInfo.level} (${courseInfo.levelName}) <span style="color: #A6A6A6; font-size: 12px;">${courseInfo.ibcCode}</span>`,
      plainValue: `Level ${courseInfo.level} (${courseInfo.levelName}) ${courseInfo.ibcCode}`,
    },
    {
      label: 'Dates',
      value: `
      <div>
        <div><b>${times.startDate}</b> - <b>${times.endDate}</b></div>
        <div>${times.startTime} - ${times.endTime}</div>
        <div style="color: #A6A6A6; font-size: 12px;">${times.days ?? 'Weekdays'}</div>
      </div>
      `,
      plainValue: `${times.startDate} - ${times.endDate}\n${times.startTime} - ${times.endTime}\n${
        times.days ?? 'Weekdays'
      }`,
      noBorder: true,
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

    const plainTextEmail = `Thank you for signing up for Operation Spark's Teacher Training program starting ${
      times.startDate
    } at ${times.startTime}. We will be in touch soon with more details.\
      \n\nDetails:\n${emailDetails.map((detail) => `${detail.label}: ${detail.value}`).join('\n')}`;
    const mgVariables: MgVariables = {
      title: `Teacher Training Signup Confirmation`,
      subject: `${formName} Confirmation`,
      details: emailDetails,
      body: `Thank you for signing up for Operation Spark's Teacher Training program starting ${badge(
        courseInfo.times.startDate,
      )} at ${badge(courseInfo.times.startTime)}. We will be in touch soon with more details.`,
    };

    const sendEmail = async () => {
      try {
        // Send email
        await mg.messages.create(MG_DOMAIN, {
          from: 'Operation Spark <highschool@operationspark.org>',
          to: valueMap.email,
          cc: proxyEmail,
          subject: mgVariables.subject,
          template: 'teacher-training-confirmation',
          text: plainTextEmail,
          'h:X-Mailgun-Variables': JSON.stringify(mgVariables),
        });
        return 'QUEUED';
      } catch (error) {
        // Don't fail for email
        console.error('Error sending email:', error);
        return 'FAIL';
      }
    };
    const emailCreateStatus = await sendEmail();

    try {
      const slackMessage = `*${valueMap.firstName} ${valueMap.lastName}* signed up for *${
        courseInfo.title
      } ${courseInfo.season}*\
          \n*Email:* ${valueMap.email} ${
        emailCreateStatus === 'FAIL' ? ' :caution-neon: `FAIL`' : ''
      }\
          \n*Level:* ${courseInfo.level} (${courseInfo.levelName})\
          \n*Dates:* ${times.startDate} - ${times.endDate} \
          \n*Times:* ${times.startTime} - ${times.endTime} ${
        hasProxy
          ? `\n*Signed Up By:* ${valueMap.proxyFirstName} ${valueMap.proxyLastName} (${valueMap.proxyEmail})`
          : ''
      }`;
      const slackClient = connectSlack();
      await slackClient.chat.postMessage({
        channel: TEACHER_TRAINING_SLACK_CHANNEL_ID,
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
}
