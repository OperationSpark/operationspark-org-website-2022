import { useEffect, useState } from 'react';

export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(
    typeof window !== 'undefined' ? window.scrollY : null,
  );

  useEffect(() => {
    if (scrollY === null) {
      return;
    }
    const updateScrollY = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', updateScrollY);
    return () => {
      window.removeEventListener('scroll', updateScrollY);
    };
  }, [scrollY]);

  return scrollY;
};
