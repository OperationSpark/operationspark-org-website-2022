import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import styled, { CSSProperties, useTheme } from 'styled-components';

import Button from '@this/components/Elements/Button';
import { cardShadowLtr } from '@this/src/theme/styled/mixins/shadows';

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
  const theme = useTheme();
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
        className={`_abs-win-btn ${isOpen ? 'open' : 'closed'}}`}
        onClick={onClick}
      >
        {isOpen ? <IoMdClose size={20} /> : text}
      </Button>
      <AnimatePresence mode='sync'>
        {isOpen && (
          <motion.div
            className='_abs-win'
            ref={winRef}
            initial={{
              maxHeight: `24px`,
              width: '100px',
              maxWidth: 'calc(100vw - 1rem)',
              opacity: 0,
            }}
            animate={{
              maxHeight: `calc(100vh - (${theme.navHeight}px + 1rem))`,
              width: style?.width || '500px',
              maxWidth: 'calc(100vw - 2rem)',
              opacity: 1,
            }}
            exit={{ maxHeight: `24px`, width: '100px', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.25 }}
            style={isOpen ? { ...style, overflow: 'auto' } : { ...style, overflow: 'hidden' }}
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
  right: 0.75rem;
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
    overflow: hidden;
    ${cardShadowLtr}
    filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.75));
    border-radius: 0.25rem;
    background: ${({ theme }) => theme.bg};
    padding: 1rem;
  }
  ._abs-win-scroll {
    width: 100%;
    transform-origin: top right;
    position: absolute;
    top: 0;
    inset: 0;
    overflow-x: hidden;
    ${cardShadowLtr}
    filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.75));
    border-radius: 0.25rem;
    background: ${({ theme }) => theme.bg};
    padding: 1rem;
  }

  ._abs-win-btn {
    position: absolute;
    margin: 0;
    right: 0.8rem;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ._abs-win-btn .open {
    background: ${({ theme }) => theme.red[500]};
  }

  @media screen and (max-width: 768px) {
    top: calc(${({ theme }) => theme.navHeight}px - 2rem);
  }
`;
