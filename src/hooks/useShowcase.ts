import axios, { isAxiosError } from 'axios';

import { Showcase } from '@this/data/types/gradShowcase';
import { toDayJs } from '@this/src/helpers/time';
import { useEffect, useState } from 'react';

const getShowcase = async () => {
  try {
    const { data } = await axios.get<Showcase>('/api/showcase');

    if (!data || !data.startDateTime || !data.websiteActive || !data.active) {
      return null;
    }

    const disableTime = toDayJs(data.startDateTime).add(data.doorsOffset ?? 30, 'minutes');

    if (disableTime.isBefore(toDayJs())) {
      console.info('Showcase inactive');
      return null;
    }

    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 404) {
      console.info('Showcase inactive');
      return null;
    }
    console.error('Showcase fetch error: ', err);
    return null;
  }
};

export const useShowcase = () => {
  const [showcase, setShowcase] = useState<Showcase | null>();

  useEffect(() => {
    getShowcase().then((showcase) => showcase && setShowcase(showcase));
  }, []);

  return {
    showcase,
    clearShowcase: () => setShowcase(null),
    refreshShowcase: () => getShowcase().then((showcase) => showcase && setShowcase(showcase)),
  };
};
