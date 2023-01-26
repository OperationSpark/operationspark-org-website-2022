import { useEffect, useState } from 'react';

export const useMounted = (timeout?: number) => {
  const [isMounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), timeout ?? 0);

    return () => {
      setMounted(false);
    };
  }, [timeout]);
  return isMounted;
};
