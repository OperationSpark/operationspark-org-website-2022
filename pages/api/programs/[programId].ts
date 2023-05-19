import { NextApiRequest as Req, NextApiResponse as Res } from 'next';

import programsData from '@this/data/programs.json';
import type { ICourseInfo, ISessionRow } from '@this/data/types/schedule';
import axios from 'axios';

const courseData = programsData.adult.courses.flatMap<ICourseInfo>(
  ({ id, title, length, cost, preReqs, days, hours, isImmersion, description }) => {
    if (!id) {
      return [];
    }
    return {
      id,
      title,
      length,
      cost,
      preReqs,
      days,
      hours,
      isImmersion: !!isImmersion,
      description: description?.join('\n') || '',
    };
  },
);

const fetchSessions = async (phaseId: string, isNext?: boolean) => {
  const next = isNext ? '&next=true' : '';
  const query = `?phase=${phaseId}${next}`;
  try {
    const { data } = await axios.get<ISessionRow[]>(
      `https://tools.operationspark.org/api/sessions${query}`,
    );
    return data;
  } catch (err) {
    console.error(err);
    return isNext ? null : [];
  }
};

export default async function getProgramsReqHandler(req: Req, res: Res) {
  const { programId, next } = req.query;

  const phaseInfo = courseData.find(({ id }) => id === programId);
  if (!phaseInfo || typeof programId !== 'string') {
    return res.status(404).end(`Phase ${programId} not found`);
  }

  // Return a single session if next=true
  if (next === 'true') {
    const phase = {
      ...phaseInfo,
      session: await fetchSessions(programId, true),
    };
    return res.status(200).send(phase);
  }

  // Return multiple sessions
  const phase = {
    ...phaseInfo,
    sessions: await fetchSessions(programId),
  };
  res.status(200).send(phase);
}
