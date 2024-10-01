import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { Showcase } from '@this/data/types/gradShowcase';

const getShowcase = async () => {
  try {
    const { data: showcase, status } = await axios.get<Showcase>('/api/showcase');
    // Status 204 (no content) - showcase is inactive / not created yet
    if (!showcase?.id || status === 204) {
      return null;
    }

    return showcase;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 404) {
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
