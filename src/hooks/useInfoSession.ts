import axios from 'axios';
import { useEffect, useState } from 'react';

import { ISessionDates } from '@this/pages-api/infoSession/dates';

type UseInfoSessionArgs = {
  nextOnly?: boolean;
  showPrivate?: boolean;
};

const useInfoSession = (options: UseInfoSessionArgs = {}): ISessionDates[] => {
  const { nextOnly, showPrivate } = options;

  const [sessionDates, setSessionDates] = useState<ISessionDates[]>([]);
  console.log(sessionDates);
  useEffect(() => {
    axios.get('/api/infoSession/dates').then(({ data }) => setSessionDates(data));
  }, []);

  if (nextOnly) {
    const nextSession = sessionDates.find((s) => !s.private);
    return nextSession ? [nextSession] : [];
  }
  return sessionDates.filter((session) => !session.private || showPrivate);
};

export default useInfoSession;
