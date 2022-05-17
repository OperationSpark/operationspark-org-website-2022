import type { NextApiRequest, NextApiResponse } from 'next';

export interface IContactForm extends NextApiRequest {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  };
}

export default async function handleContactForm(
  req: IContactForm,
  res: NextApiResponse,
) {
  console.log('Do something with this data → ', req.body);
  res.status(200).end();
}
