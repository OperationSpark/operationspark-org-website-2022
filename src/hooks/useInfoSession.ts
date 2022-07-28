import axios from 'axios';
import { useEffect, useState } from 'react';

import { ISessionDates } from '@this/pages-api/infoSession/dates';

function useInfoSession(nextOnly: boolean): ISessionDates;
function useInfoSession(): ISessionDates[];

function useInfoSession(nextOnly?: boolean) {
  const [sessionDates, setSessionDates] = useState<ISessionDates[]>([]);

  useEffect(() => {
    axios.get('/api/infoSession/dates').then(({ data }) => setSessionDates(data));
  }, []);

  if (nextOnly) {
    return sessionDates[0] ?? null;
  }
  return sessionDates;
}

export default useInfoSession;
