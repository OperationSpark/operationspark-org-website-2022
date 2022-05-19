import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

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

const formatPayload = ({
  firstName,
  lastName,
  email,
  message,
}: IContactForm): string => {
  return Object.entries({
    Field1: firstName,
    Field2: lastName,
    Field3: email,
    Field4: message,
  })
    .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
    .join('&');
};

export default async function handleContactForm(
  req: IContactFormRequest,
  res: NextApiResponse,
) {
  try {
    const formUrl = `https://${WUFOO_HOST}.wufoo.com/api/v3/forms/${WUFOO_CONTACT_FORM_ID}/entries.json`;
    const headers = { Authorization: `Basic ${WUFOO_TOKEN}` };
    const form = formatPayload(req.body);

    await axios.post(formUrl, form, { headers });
    res.status(201).end();
  } catch (err) {
    console.error('Failed to submit form\n', err);
    res.status(500).end();
  }
}
