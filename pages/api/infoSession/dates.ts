import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import config from '@this/config';
import { GooglePlace, LocationType } from '@this/types/signups';

const { GREENLIGHT_API_ENDPOINT } = config;

export type DateTime = {
  dateTime: string;
  timeZone: 'America/Chicago';
};

export interface ISessionDates {
  _id: string;
  cohort: string;
  programId: string;
  private?: boolean;
  code?: string;
  times: {
    start: DateTime;
    end: DateTime;
    until: string;
  };
  googlePlace: GooglePlace;
  locationType: LocationType;
}

export default async function infoSession(
  req: NextApiRequest,
  res: NextApiResponse<ISessionDates[]>,
) {
  const sessionDates = await getInfoSessionDates();
  if (!sessionDates?.length) {
    return res.status(404).end();
  }
  return res.status(200).json(sessionDates);
}

export const getInfoSessionDates = async (): Promise<ISessionDates[]> => {
  const endpoint = GREENLIGHT_API_ENDPOINT + '/sessions/open?programId=5sTmB97DzcqCwEZFR&limit=6';

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
