import styled, { keyframes } from 'styled-components';

import { SlashDivider } from '@this/components/Elements/SlashDivider';
import { motion } from 'framer-motion';

const MeetOurGradsButton = () => {
  return (
    <MeetOurGradsButtonStyles>
      <div className='grads-container'>
        <div className='grads-content'>
          <h3 className='dynamic-h3 header'>Are you an employer looking for talent?</h3>
          <a className='grad-redirect-link rotate-hue' href='/' target='_blank'>
            Meet our grads here
          </a>
        </div>
        <div className='rotate-hue divider'>
          <SlashDivider style={{ height: '0.5rem' }} />
        </div>
      </div>
    </MeetOurGradsButtonStyles>
  );
};

export default MeetOurGradsButton;

const mainAnimation = keyframes`
  0% {
    transform: translateY(0) scale(1);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
  }
  50% {
    transform: translateY(-0.5rem) scale(1.02);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  100% {
    transform: translateY(0) scale(1);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
  }
`;

const hueRotate = keyframes`
  0% {
    filter: hue-rotate(0deg) saturate(150%);
  }
  100% {
    filter: hue-rotate(360deg) saturate(150%);
  }
`;

const MeetOurGradsButtonStyles = styled(motion.div)`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.green[300]};
  text-align: center;
  min-height: fit-content;
  .grads-container {
    width: 100%;
    max-width: 600px;
    height: 100%;

    margin: 0 auto;
    background: rgba(32, 32, 32, 0.25);
    box-shadow: 0 0 6px rgba(32, 32, 32, 1);
    border-radius: 0.5rem;

    animation: ${mainAnimation} 3s infinite;
    overflow: hidden;
    :hover {
      animation-play-state: paused;
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

  .grad-redirect-link {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    color: inherit;
    box-shadow: 0 0 8px ${({ theme }) => theme.green[300]};
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: rgba(0, 255, 119, 0.1);
    transition: all 225ms;

    :hover,
    :focus-visible {
      background: rgba(0, 255, 119, 0.25);
      transform: translateY(-2px);
    }
    :active {
      background: rgba(0, 255, 119, 0.1);
      box-shadow: 0 0 2px ${({ theme }) => theme.green[300]};
      transform: translateY(1px);
      animation-play-state: paused;
    }
  }

  .rotate-hue {
    animation: ${hueRotate} 15s infinite;
  }
  .divider {
    background: ${({ theme }) => theme.primary[300]};
  }
`;
