import type { NextApiRequest, NextApiResponse } from 'next';
import { addRow, createSpreadsheetTab, getSheets } from '@this/api/googleSheets';
import moment from 'moment';

const { HIGHSCHOOL_FORM_RESPONSES_ID = '' } = process.env;

export type TFormOption = {
  name: string;
  value: string;
  additionalInfo: string;
};

export type FormValueType = string | TFormOption | { [key: string]: boolean } | undefined;

export type THighschoolForm = {
  [key: string]: FormValueType;
  date: string;
  tabName: string;
  studentFirstName: string;
  studentLastName: string;
  studentEmail: string;
  studentPhone: string;
  studentDOB: string;
  schoolAttended: string;
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianPhone: string;
  gradYear: TFormOption;
  course: TFormOption;
  courseTime: TFormOption;
  interestLevel: TFormOption;
  availability: TFormOption;
  referencedBy: TFormOption;
  ethnicities: {
    [key: string]: boolean;
  };
  equipment: {
    [key: string]: boolean;
  };
  equipmentExplanation?: string;
  policyAgreement?: TFormOption;
  message?: string;
};

interface ISignupReq extends NextApiRequest {
  body: THighschoolForm;
}

const formOutputOrder = [
  'date',
  'studentFirstName',
  'studentLastName',
  'studentEmail',
  'studentPhone',
  'studentDOB',
  'schoolAttended',
  'gender',
  'guardianFirstName',
  'guardianLastName',
  'guardianEmail',
  'guardianPhone',
  'gradYear',
  'course',
  'courseTime',
  'interestLevel',
  'availability',
  'referencedBy',
  'ethnicities',
  'equipment',
  'equipmentExplanation',
  'policyAgreement',
  'message',
];

const getOutputOrder = (obj: THighschoolForm) => {
  const output = new Map<string, FormValueType>();

  formOutputOrder.forEach((k) => {
    if (obj.hasOwnProperty(k) && obj[k]) {
      output.set(k, obj[k]);
    }
  });
  return {
    keys: Array.from(output.keys()),
    values: Array.from(output.values()),
  };
};

const formatFormValues = (val: FormValueType) => {
  if (!val) {
    return '';
  }
  if (typeof val === 'string') {
    return val;
  }
  if (val.hasOwnProperty('additionalInfo')) {
    return `${val.name}${val.additionalInfo ? '\n\n' + val.additionalInfo : ''}`;
  }
  return Object.keys(val).join('\n');
};

export default async function handleContactForm(req: ISignupReq, res: NextApiResponse) {
  const { tabName = 'NO TAB NAME', date } = req.body;
  const sheets = getSheets();
  const formValues: THighschoolForm = {
    ...req.body,
    date: moment(new Date(date)).format('MM/DD/YYYY HH:mm:ss'),
  };
  const output = getOutputOrder(formValues);
  const spreadsheetId = HIGHSCHOOL_FORM_RESPONSES_ID ?? '';

  await createSpreadsheetTab({
    sheets,
    spreadsheetId,
    tabName,
    header: output.keys,
  });

  await addRow({
    sheets,
    spreadsheetId,
    tabName,
    values: output.values.map(formatFormValues),
  });

  res.status(200).end();
}
