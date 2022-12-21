import { useState, useEffect } from 'react';

export const useValidCss = (cssProp: string, cssVal: string) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      CSS && CSS.supports(cssProp, cssVal) && setIsValid(true);
    }
  }, [cssProp, cssVal]);
  return isValid;
};
