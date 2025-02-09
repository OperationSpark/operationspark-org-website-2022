import formData from 'form-data';
import Mailgun from 'mailgun.js';
import type { NextApiRequest, NextApiResponse } from 'next';

import { addRow, createSpreadsheetTab, getSheets } from '@this/api/googleSheets';
import { TeacherTrainingInfo } from '@this/data/types/teacherTraining';

const {
  TEACHER_TRAINING_FORM_RESPONSES_ID = '',
  MG_API_KEY = '',
  MG_DOMAIN = 'mail.operationspark.org',
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

const parseRowData = (formValues: FormValueType[]) => {
  const valueMap = {} as Record<FormKey, string>;

  const header = formOutputOrder.map((key) => {
    const value = formValues.find((formValue) => formValue.name === key);
    return value?.label || '';
  });
  const row = formOutputOrder.map((key) => {
    const value = formValues.find((formValue) => formValue.name === key);
    valueMap[key] = value?.value || '';
    return value?.value || '';
  });

  return { header, row, valueMap };
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
  const { header, row, valueMap } = parseRowData(values);
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
        },
      ]
    : [];

  const emailDetails = [
    {
      label: 'Name',
      value: `${valueMap.firstName} ${valueMap.lastName}`,
    },
    ...proxyDetails,
    {
      label: 'Course',
      value: `${courseInfo.subtitle}`,
    },
    {
      label: 'IBC',
      value: `Level ${courseInfo.level} (${courseInfo.levelName}) <span style="color: #A6A6A6; font-size: 12px;">${courseInfo.ibcCode}</span>`,
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
      noBorder: true,
    },
  ];

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

  // TODO: Send email confirmation with details

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

  // Send email
  await mg.messages.create(MG_DOMAIN, {
    from: 'Operation Spark <noreply@operationspark.org>',
    to: valueMap.email,
    cc: proxyEmail,
    // bcc: 'highschool@operationspark.org',
    subject: mgVariables.subject,
    template: 'teacher-training-confirmation',
    text: plainTextEmail,
    'h:X-Mailgun-Variables': JSON.stringify(mgVariables),
  });

  res.status(200).end();
}
