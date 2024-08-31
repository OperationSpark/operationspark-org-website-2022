import { useEffect, useState } from 'react';

export const useKeyCombo = (...keys: string[]) => {
  const [isCtrl, setCtrl] = useState(false);
  const [isOpt, setOpt] = useState(false);
  const [lastKey, setLastKey] = useState('');
  const [currentCombos, setCurrentCombos] = useState<string[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key?.toLocaleLowerCase('en-US');
      if (key === lastKey) {
        return;
      }
      if (key === 'control') {
        return setCtrl(true);
      }
      if (key === 'alt' || key === 'meta') {
        return setOpt(true);
      }
      if (isCtrl && isOpt && keys.includes(key) && key !== lastKey) {
        e.preventDefault();
        setLastKey(key);
        const combos = [...currentCombos, key];
        setCurrentCombos(combos);
        combos.join('') === keys.join('') && setIsActive(!isActive);
        return;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key?.toLocaleLowerCase();
      if (['control', 'alt'].includes(key)) {
        setCtrl(false);
        setOpt(false);
        setCurrentCombos([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentCombos, isActive, isCtrl, isOpt, keys, lastKey]);

  return isActive;
};
export default useKeyCombo;
