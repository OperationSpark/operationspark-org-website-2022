import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { config } from '../config';

const { GREENLIGHT_API_ENDPOINT } = config;
export interface ISessionDates {
  _id: string;
  cohort: string;
  programId: string;
  times: {
    start: {
      dateTime: string;
      timeZone: 'America/Chicago';
    };
    end: {
      dateTime: string;
      timeZone: 'America/Chicago';
    };
    until: string;
  };
}

export default async function infoSession(
  req: NextApiRequest,
  res: NextApiResponse<ISessionDates[]>,
) {
  const sessionDates = await getInfoSessionDates();
  if (!sessionDates.length) {
    return res.status(404).end();
  }
  return res.status(200).json(sessionDates);
}

export const getInfoSessionDates = async (): Promise<ISessionDates[]> => {
  const endpoint =
    GREENLIGHT_API_ENDPOINT + '/sessions/open?programId=5sTmB97DzcqCwEZFR';

  try {
    const { data: sessionDates } = await axios.get<{
      sessions: ISessionDates[];
    }>(endpoint);

    return sessionDates.sessions;
  } catch (err) {
    console.error('Error fetching info session dates\n', err);
    return [];
  }
};
