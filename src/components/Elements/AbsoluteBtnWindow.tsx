import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { IoMdClose } from 'react-icons/io';

import { cardShadowLtr } from '@this/src/theme/styled/mixins/shadows';
import Button from '@this/components/Elements/Button';

interface AbsoluteBtnWindowProps {
  title: string;
  text: string;
  isOpen: boolean;
  style?: CSSProperties;
  onClick: () => void;
  children: ReactNode | ReactNode[];
}

const AbsoluteBtnWindow = ({
  title,
  text,
  isOpen,
  style,
  onClick,
  children,
}: AbsoluteBtnWindowProps) => {
  const winRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      // Timeout ensures it will find element
      setTimeout(() => winRef.current?.querySelector('input')?.focus(), 200);
    }
  }, [isOpen, winRef]);

  return (
    <AbsoluteBtnWindowStyles>
      <Button
        color={isOpen ? '' : 'yellow'}
        style={{
          padding: isOpen ? '0.25rem' : undefined,
        }}
        className='_abs-win-btn'
        onClick={onClick}
      >
        {isOpen ? <IoMdClose size={23} /> : text}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='_abs-win'
            ref={winRef}
            initial={{ scale: 0, x: -25, y: 25 }}
            animate={{ scale: 1, x: 0, y: 0 }}
            exit={{ scale: 0, x: -25, y: 25 }}
            transition={{ type: 'tween', duration: 0.2 }}
            style={style}
          >
            <h3 className='dynamic-h3 _abs-win-title'>{title}</h3>

            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </AbsoluteBtnWindowStyles>
  );
};

export default AbsoluteBtnWindow;

const AbsoluteBtnWindowStyles = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  z-index: 100;
  top: calc(${({ theme }) => theme.navHeight}px + 0.5rem);
  right: 0.5rem;
  width: calc(100% - 1rem);

  ._abs-win-title {
    font-weight: 700;
    padding-bottom: 1rem;
  }
  ._abs-win {
    width: 100%;
    transform-origin: top right;
    position: absolute;
    top: 0;

    max-height: calc(100vh - (${({ theme }) => theme.navHeight}px + 3rem));
    overflow-y: auto;
    overflow-x: hidden;
    ${cardShadowLtr}
    filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.75));
    border-radius: 0.25rem;
    background: ${({ theme }) => theme.bg};

    padding: 1rem;
  }

  ._abs-win-btn {
    position: absolute;
    margin-bottom: 0;
    right: 1rem;
    top: 0.5rem;
    z-index: 100;
  }
`;
