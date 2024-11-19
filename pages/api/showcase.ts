import { NextApiRequest as Req, NextApiResponse as Res } from 'next';

import { Showcase } from '@this/data/types/gradShowcase';
import axios, { isAxiosError } from 'axios';

import dayjs from 'dayjs';

export default async function showcaseHandler(req: Req, res: Res) {
  const NO_SHOWCASE_STATUS = 204;
  if (req.method === 'GET') {
    try {
      const { data: showcase } = await axios.get<Showcase>(
        'https://showcase.operationspark.org/api/showcases/active',
      );
      if (!showcase) {
        res.status(NO_SHOWCASE_STATUS).end();
        return;
      }

      const { startDateTime, doorsOffset, websiteActive, active } = showcase;

      if (!startDateTime || !websiteActive || !active) {
        res.status(NO_SHOWCASE_STATUS).end();
        return;
      }

      const disableTime = dayjs(startDateTime).add(doorsOffset ?? 30, 'minutes');

      if (disableTime.isBefore(dayjs())) {
        res.status(NO_SHOWCASE_STATUS).end();
        return;
      }

      res.status(200).json(showcase);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 404) {
        res.status(NO_SHOWCASE_STATUS).end();
        return;
      }
      console.error('Showcase fetch error: ', err);
      res.status(500).end('Showcase fetch error');
      return;
    }
  }

  res.status(405).end('Method Not Allowed');
}
