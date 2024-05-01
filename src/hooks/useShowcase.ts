import axios, { isAxiosError } from 'axios';

import { Showcase } from '@this/data/types/gradShowcase';
import { useEffect, useState } from 'react';

const getShowcase = async () => {
  try {
    const { data: showcase } = await axios.get<Showcase>('/api/showcase');

    if (!showcase) {
      return null;
    }

    return showcase;
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
