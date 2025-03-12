import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getConfig } from '@this/config';
import { GooglePlace, LocationType } from '@this/types/signups';

export type DateTime = {
  dateTime: string | Date;
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
    until: string | Date;
    byday: 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
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
  const { GREENLIGHT_API_ENDPOINT } = getConfig();
  const endpoint = GREENLIGHT_API_ENDPOINT + '/sessions/open?programId=5sTmB97DzcqCwEZFR&limit=6';

  try {
    const { data: sessionDates } = await axios.get<{
      sessions: ISessionDates[];
    }>(endpoint);

    return sessionDates.sessions;
  } catch (err) {
    Sentry.captureException(err);
    console.error('Error fetching info session dates\n', err);
    return [];
  }
};
