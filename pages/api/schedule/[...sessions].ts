import { getSheets } from '@this/src/api/googleSheets';
import { NextApiRequest, NextApiResponse } from 'next';

import programsData from '@this/data/programs.json';
import type { ISessionRow, ICourseInfo } from '@this/data/types/schedule';
import { toCentTime } from '@this/src/helpers/timeUtils';
import { sheets_v4 } from '@googleapis/sheets';

const courseData = programsData.adult.courses.reduce<{ [key: string]: ICourseInfo }>(
  (courses, { title, length, cost, preReqs, days, hours }) => {
    if (title && length && cost && preReqs && days && hours) {
      courses[title] = { title, length, cost, preReqs, days, hours };
    }
    return courses;
  },
  {},
);

type ScheduleRequest = {
  query: {
    /**
     * `GET /api/schedule/<cohort|course>`
     *
     * `GET /api/schedule/<cohort|course>/<filter>`
     *
     * `['cohort', 'X']`
     */
    sessions: ['cohort' | 'course', string];
  };
} & NextApiRequest;

export default async function getCohortScheduleReqHandler(
  req: ScheduleRequest,
  res: NextApiResponse,
) {
  const [group, cohort] = req.query.sessions;
  const schedule = await getCohortSchedule(group, cohort);
  res.status(200).send(schedule);
}

export const getCohortSchedule = async (group: 'cohort' | 'course', filter?: string) => {
  const sheets = getSheets();
  const spreadsheetId = '1qsAEaPn9FvwRxZBwzKkMuvIXvN0-mQ3ClS2zjvYmHwA';

  const getRange = async (retry?: boolean): Promise<sheets_v4.Schema$ValueRange> => {
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: '[OUTPUT] Cohort Dashboard',
    });

    if (retry) {
      return await getRange(false);
    }
    return data;
  };
  const range = await getRange(true);

  const cohortData = parseCohortData(range.values?.slice(2));

  if (filter === 'next') {
    return filterNextSessions(cohortData);
  }

  if (group === 'cohort') {
    return groupCohort(filter ? filterCohort(cohortData, filter) : cohortData);
  }

  if (group === 'course') {
    return groupCourse(cohortData);
  }

  if (filter) {
    return filterCohort(cohortData, filter);
  }

  return cohortData;
};

const groupCourse = (data: ISessionRow[]) => {
  const groupedCohorts = data.reduce<{
    [key: string]: {
      title: string;
      course: ICourseInfo;
      courses: ISessionRow[];
    };
  }>((sessions, session) => {
    const courseKey = session.course.split(' ')[0];
    if (!sessions.hasOwnProperty(courseKey)) {
      sessions[courseKey] = {
        title: courseKey,
        course: courseData[courseKey],
        courses: [session],
      };
    } else {
      sessions[courseKey].courses.push(session);

      if (!sessions[courseKey].title) {
        sessions[courseKey].title = session.course;
      }
    }

    return sessions;
  }, {});
  return Object.values(groupedCohorts)
    .map((c) => ({
      ...c,
      courses: c.courses.sort(({ start: a }, { start: b }) => a.getTime() - b.getTime()),
    }))
    .sort(({ courses: a }, { courses: b }) => a[0]?.order - b[0]?.order);
};

const groupCohort = (data: ISessionRow[]) => {
  const groupedCohorts = data.reduce<{
    [key: string]: {
      title: string;
      courses: { [key: string]: ISessionRow | null };
    };
  }>((sessions, session) => {
    const courseKey = session.course.split(' ')[0];
    if (!sessions.hasOwnProperty(session.cohort)) {
      sessions[session.cohort] = {
        title: session.cohort,
        courses: {
          Prep: null,
          Bootcamp: null,
          Precourse: null,
          Junior: null,
          Senior: null,
          [courseKey]: session,
        },
      };
    } else {
      const existingSession = sessions[session.cohort].courses[courseKey];
      if (
        !existingSession ||
        (existingSession && session.start < existingSession.start && !!session.isPast)
      ) {
        sessions[session.cohort].courses[courseKey] = session;
      }
      if (!sessions[session.cohort].title) {
        sessions[session.cohort].title = session.cohort;
      }
    }

    return sessions;
  }, {});
  return Object.values(groupedCohorts)
    .map((v) => ({
      title: v.title,
      courses: Object.values(v.courses),
    }))
    .sort(({ title: a }, { title: b }) => (a > b ? 1 : a < b ? -1 : 0));
};

const filterCohort = (data: ISessionRow[], filter: string) => {
  const filterChar = filter[0].toLowerCase();
  return data
    ?.filter(({ char }) => char.toLowerCase() === filterChar)
    .sort(({ order: a }, { order: b }) => a - b);
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

  return cohortData.map(([course, cohort, year, start, end, char, isNext, order, bg, fg]) => {
    const startDate = toCentTime(`${start} 9:00`);
    const endDate = toCentTime(`${end} 9:00`);

    return {
      course,
      cohort,
      year: Number(year),
      start: startDate,
      end: endDate,
      char,
      isNext: isNext === 'TRUE',
      isPast: today > startDate,
      order: Number(order),
      bg,
      fg,
    };
  });
};
