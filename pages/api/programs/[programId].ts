import { NextApiRequest as Req, NextApiResponse as Res } from 'next';

import programsData from '@this/data/programs.json';
import type { ICourseInfo, ISessionRow } from '@this/data/types/schedule';
import axios from 'axios';

const courseData = programsData.adult.courses.flatMap<ICourseInfo>(
  ({ id, title, length, cost, preReqs, days, hours, immersion }) => {
    if (!id) {
      return [];
    }
    return { id, title, length, cost, preReqs, days, hours, immersion: !!immersion };
  },
);

const fetchSessions = async (phaseId: string) => {
  try {
    const { data } = await axios.get<ISessionRow[]>(
      `https://tools.operationspark.org/api/sessions?phase=${phaseId}`,
    );
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default async function getProgramsReqHandler(req: Req, res: Res) {
  const { programId } = req.query;

  const phaseInfo = courseData.find(({ id }) => id === programId);
  if (!phaseInfo || typeof programId !== 'string') {
    return res.status(404).end(`Phase ${programId} not found`);
  }

  const phase = {
    ...phaseInfo,
    sessions: await fetchSessions(programId),
  };
  res.status(200).send(phase);
}
