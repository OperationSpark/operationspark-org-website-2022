import { NextApiRequest as Req, NextApiResponse as Res } from 'next';

import programsData from '@this/data/programs.json';
import type { ICourseInfo, ISessionRow } from '@this/data/types/schedule';
import axios from 'axios';

const courseData = programsData.adult.courses.flatMap<ICourseInfo>(
  ({ id, title, length, cost, preReqs, days, hours }) => {
    if (!id) {
      return [];
    }
    return { id, title, length, cost, preReqs, days, hours };
  },
);

export default async function getProgramsReqHandler(_req: Req, res: Res) {
  try {
    const courses = courseData.map(async (course) => ({
      title: course.title,
      course,
      courses: await axios
        .get<ISessionRow[]>(`https://tools.operationspark.org/api/sessions?phase=${course.id}`)
        .then(({ data }) => data)
        .catch((err) => {
          console.error(err);
          return [];
        }),
    }));

    const programs = await Promise.all(courses);

    res.status(200).send(programs);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}
