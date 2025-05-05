import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const { WUFOO_TOKEN, WUFOO_CONTACT_FORM_ID, WUFOO_HOST } = process.env;

export interface IContactForm {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface IContactFormRequest extends NextApiRequest {
  body: IContactForm;
}

const encodeForm = ({ firstName, lastName, email, message }: IContactForm): string => {
  const params = new URLSearchParams({
    Field1: firstName,
    Field2: lastName,
    Field3: email,
    Field4: message,
  });
  return params.toString();
};

export default async function handleContactForm(req: IContactFormRequest, res: NextApiResponse) {
  try {
    const formUrl = `https://${WUFOO_HOST}.wufoo.com/api/v3/forms/${WUFOO_CONTACT_FORM_ID}/entries.json`;
    const headers = { Authorization: `Basic ${WUFOO_TOKEN}` };
    const form = encodeForm(req.body);

    await axios.post(formUrl, form, { headers });
    res.status(201).end();
  } catch (err) {
    Sentry.captureException(err);
    console.error('Failed to submit form\n', err);
    res.status(500).end();
  }
}
