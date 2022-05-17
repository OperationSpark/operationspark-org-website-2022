import {
  useState,
  useRef,
  useEffect,
  RefObject,
  Dispatch,
  SetStateAction,
} from 'react';

export const useClickAway = (
  callback?: () => void,
): [RefObject<HTMLDivElement>, boolean, Dispatch<SetStateAction<boolean>>] => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) {
      return;
    }
    const checkIsElement = (e: MouseEvent) => {
      const { current } = menuRef;
      if (e.target instanceof HTMLElement) {
        if (!current?.contains(e.target)) {
          setShow(false);
          callback && callback();
        }
      }
    };

    document.addEventListener('click', checkIsElement);
    return () => {
      document.removeEventListener('click', checkIsElement);
    };
  }, [callback, show]);

  return [menuRef, show, setShow];
};
