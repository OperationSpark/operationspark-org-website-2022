import { addRow, createSpreadsheetTab, getSheets } from '@this/api/googleSheets';
import type { NextApiRequest, NextApiResponse } from 'next';

const { TEACHER_TRAINING_FORM_RESPONSES_ID = '' } = process.env;

type FormValueType = {
  name: string;
  label: string;
  value: string;
};

interface ISignupReq extends NextApiRequest {
  body: {
    formName: string;
    values: FormValueType[];
  };
}

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
] as const;

const createFormRow = (formValues: FormValueType[]) => {
  const header = formOutputOrder.map((key) => {
    const value = formValues.find((formValue) => formValue.name === key);
    return value?.label || '';
  });
  const row = formOutputOrder.map((key) => {
    const value = formValues.find((formValue) => formValue.name === key);
    return value?.value || '';
  });

  return { header, row };
};

export default async function handleContactForm(req: ISignupReq, res: NextApiResponse) {
  const spreadsheetId = TEACHER_TRAINING_FORM_RESPONSES_ID ?? '';
  const { formName, values } = req.body;
  const sheets = getSheets();
  const { header, row } = createFormRow(values);

  await createSpreadsheetTab({
    sheets,
    spreadsheetId,
    tabName: formName,
    header,
  });

  await addRow({
    sheets,
    spreadsheetId,
    tabName: formName,
    values: row,
  });

  // TODO: Send email confirmation with details
  res.status(200).end();
}
