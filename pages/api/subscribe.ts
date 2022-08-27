import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { config } from './config';

const { MAILCHIMP_API_KEY: API_KEY = '', MAILCHIMP_AUDIENCE_ID: AUDIENCE_ID } = config;

const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      title: 'Email is required',
      description: 'Please provide a valid email address',
      status: 'error',
    });
  }

  try {
    const DATA_CENTER = API_KEY.split('-')[1];
    const subscribeUrl = `https://${DATA_CENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const data = { email_address: email, status: 'subscribed' };
    const headers = { Authorization: `apikey ${API_KEY}` };

    await axios.post(subscribeUrl, data, { headers });

    return res.status(201).json({
      title: 'Congrats!',
      description: `${email} subscribed`,
      status: 'success',
    });
  } catch (err) {
    if (!axios.isAxiosError(err) || !err.response?.data.title) {
      return res.status(500).json({
        title: `Error signing you up for the newsletter :(`,
        description: `Shoot us an email at [support@operationspark.org] and we'll add you to the list`,
        status: 'error',
        duration: 8000,
      });
    }

    const errType = err.response.data.title;

    if (errType === 'Member Exists') {
      return res.status(200).json({
        title: 'Great news!',
        description: `"${email}" is already subscribed`,
        status: 'info',
      });
    }

    if (errType === 'Invalid Resource') {
      return res.status(400).json({
        title: `Error: Invalid email: "${email}"`,
        description: `Please check your email and try again`,
        status: 'error',
      });
    }
  }
};

export default subscribe;
