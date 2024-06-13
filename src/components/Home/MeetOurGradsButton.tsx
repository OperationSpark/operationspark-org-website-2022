import { AnimatePresence, motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

import { SlashDivider } from '@this/components/Elements/SlashDivider';
import { FC, Fragment } from 'react';

const alumUrl = 'https://alum.operationspark.org';

const MeetOurGradsButton = () => {
  return (
    <Fragment>
      <MeetOurGradsButtonStyles
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 2, type: 'spring', bounce: 0.5, damping: 10, stiffness: 100 }}
      >
        <div className='grads-container'>
          <div className='rotate-hue divider'>
            <SlashDivider style={{ height: '0.5rem' }} />
          </div>
          <div className='grads-content'>
            <h3 className='dynamic-h3 header rotate-hue'>
              Are you an employer looking for talent?
            </h3>

            <RedirectLink href={alumUrl} target='_blank'>
              Meet our grads here
            </RedirectLink>
          </div>
          <div className='rotate-hue divider'>
            <SlashDivider style={{ height: '0.5rem' }} />
          </div>
        </div>
      </MeetOurGradsButtonStyles>
    </Fragment>
  );
};

export const MeetGradsNavButton: FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <FixedRedirectLink
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          transition={{
            duration: 1,
            type: 'spring',
            bounce: 0.4,
            damping: 8,
            stiffness: 100,
          }}
          href={alumUrl}
          target='_blank'
        >
          Meet our grads here
        </FixedRedirectLink>
      )}
    </AnimatePresence>
  );
};

export default MeetOurGradsButton;

const hueRotate = keyframes`
  0% {
    filter: hue-rotate(0deg) saturate(150%);
  }
  100% {
    filter: hue-rotate(360deg) saturate(150%);
  }
`;

const outerBoxShadow = keyframes`
  0% {
    filter: saturate(150%);
    box-shadow:
      0 0 0.25rem 1px rgba(32,32,32,1),
      0 0 0.1rem 0.25rem inset rgb(255, 230, 0),
      0 0 0 0.35rem rgb(179, 0, 255),
      0 0 1rem 0.5rem rgba(32, 32, 32, 0.75);
  }
  100% {
    filter: saturate(150%);
    box-shadow:
      0 0 0.25rem 1px rgba(32,32,32,1),
      0 0 0.1rem 0.25rem inset rgb(179, 0, 255),
      0 0 0 0.35rem rgb(255, 230, 0),
      0 0 1rem 0.5rem rgba(32, 32, 32, 0.75);
  }
`;

const MeetOurGradsButtonStyles = styled(motion.div)`
  margin-bottom: 2rem;
  color: rgba(0, 255, 119, 1);
  text-align: center;
  min-height: fit-content;
  .grads-container {
    width: 100%;
    max-width: 650px;
    height: 100%;

    margin: 0 auto;
    background: rgba(32, 32, 32, 0.25);

    border-radius: 0.5rem;

    transform: translateY(0) scale(1);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(1px);
    transition: all 225ms;
    padding: 0.5rem;
    :hover {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    :after {
      content: '';
      position: absolute;
      user-select: none;
      pointer-events: none;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 0.5rem;

      animation: ${outerBoxShadow} 15s infinite alternate;
      background: rgba(0, 0, 0, 0);
      z-index: -1;
    }
  }

  .header {
    font-weight: 700;
  }
  .grads-content {
    padding: 1rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .rotate-hue {
    animation: ${hueRotate} 15s infinite;
  }

  .divider {
    background: rgba(0, 255, 119, 0.75);
    border-radius: 0.5rem;
    position: absolute;
  }
`;

const RedirectLink = styled(motion.a)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: inherit;
  box-shadow: 0 0 8px 3px rgba(0, 255, 119, 0.75), 0 0 3px 0px inset rgba(0, 0, 0, 0.25);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: rgba(32, 32, 32, 0.2);
  transition: all 225ms;
  animation: ${hueRotate} 15s infinite;

  :hover,
  :focus-visible {
    background: rgba(0, 255, 119, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 0 8px 5px rgba(0, 255, 119, 0.75), 0 0 6px 1px inset rgba(0, 0, 0, 0.5);
  }
  :active {
    transition: all 75ms;
    background: rgba(0, 255, 119, 0.1);
    box-shadow: 0 0 2px rgba(0, 255, 119, 0.75), 0 0 2px 1px inset rgba(0, 0, 0, 0.5);
    transform: translateY(1px);
    animation-play-state: paused;
  }
`;

const FixedRedirectLink = styled(RedirectLink)`
  position: fixed;
  top: ${({ theme }) => theme.navHeight - 32}px;
  left: 0.5rem;
  z-index: 100;
  background: rgba(32, 32, 32, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  animation: unset;
  :hover,
  :focus-visible {
    background: rgba(32, 32, 32, 0.9);
  }
  :active {
    background: rgba(32, 32, 32, 0.65);
  }
`;
