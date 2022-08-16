import { getSheets } from '@this/src/api/googleSheets';
import { NextApiRequest, NextApiResponse } from 'next';

import programsData from '@this/data/programs.json';
import type { ISessionRow, ICourseInfo } from '@this/data/types/schedule';

type ScheduleRequest = { query?: { cohort?: string; group?: string } } & NextApiRequest;
export default async function getCohortScheduleReqHandler(
  req: ScheduleRequest,
  res: NextApiResponse,
) {
  const { cohort, group } = req.query;
  const schedule = await getCohortSchedule(cohort, group);
  res.status(200).send(schedule);
}

const getCohortSchedule = async (filter?: string, group?: string) => {
  const sheets = getSheets();
  const spreadsheetId = '1qsAEaPn9FvwRxZBwzKkMuvIXvN0-mQ3ClS2zjvYmHwA';

  const range = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: '[OUTPUT] Cohort Dashboard',
  });

  const cohortData = parseCohortData(range.data.values?.slice(2));

  if (filter === 'next') {
    return filterNextSessions(cohortData);
  }
  return cohortData;
};
const filterNextSessions = (data?: ISessionRow[]): { [key: string]: ISessionRow } => {
  if (!data || !data.length) {
    return {};
  }

  const nextDates = data
    .filter(({ isNext }) => isNext)
    .reduce<{ [key: string]: ISessionRow }>((sessions, session) => {
      sessions[session.course] = session;
      return sessions;
    }, {});

  return nextDates;
};

/**
 * Converts each row of spreadsheet to object
 * @param cohortData data retrieved from spreadsheet
 */
const parseCohortData = (cohortData?: string[][]): ISessionRow[] => {
  if (!cohortData) {
    return [];
  }
  const today = new Date();
  return cohortData.map(([course, cohort, year, start, end, char, isNext, order, bg, fg]) => ({
    course,
    cohort,
    year: Number(year),
    start: new Date(start),
    end: new Date(end),
    char,
    isNext: isNext === 'TRUE',
    isPast: today > new Date(start),
    order: Number(order),
    bg,
    fg,
  }));
};
