import { NextApiRequest as Req, NextApiResponse as Res } from 'next';

import { Showcase } from '@this/data/types/gradShowcase';
import axios, { isAxiosError } from 'axios';

import dayjs from 'dayjs';

export default async function showcaseHandler(req: Req, res: Res) {
  if (req.method === 'GET') {
    try {
      const { data: showcase } = await axios.get<Showcase>(
        'https://showcase.operationspark.org/api/showcases/active',
      );
      if (!showcase) {
        res.status(404).end('Showcase inactive');
        return;
      }

      const { startDateTime, doorsOffset, websiteActive, active } = showcase;

      if (!startDateTime || !websiteActive || !active) {
        res.status(404).end('Showcase inactive');
        return;
      }

      const disableTime = dayjs(startDateTime).add(doorsOffset ?? 30, 'minutes');

      if (disableTime.isBefore(dayjs())) {
        console.info('Showcase inactive');
        res.status(404).end('Showcase inactive');
        return;
      }

      res.status(200).json(showcase);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 404) {
        console.info('Showcase inactive');
        res.status(404).end('Showcase inactive');
        return;
      }
      console.error('Showcase fetch error: ', err);
      res.status(500).end('Showcase fetch error');
      return;
    }
  }

  res.status(405).end('Method Not Allowed');
}
