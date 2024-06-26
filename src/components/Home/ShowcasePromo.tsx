import { FC, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Content from '@this/components/layout/Content';
import { Showcase } from '@this/data/types/gradShowcase';
import { toDayJs } from '@this/src/helpers/time';
import { circuitBoardBg } from '@this/src/theme/styled/mixins/circuitBoardBg';
import { CountdownTimer } from '../Elements/Countdown';

type ShowcasePromoProps = {
  info: Showcase;
  clearShowcase: () => void;
};

const ShowcasePromo: FC<ShowcasePromoProps> = ({ info, clearShowcase }) => {
  const showcaseStart = toDayJs(info.startDateTime);
  const doorsOpen = toDayJs(new Date(info.startDateTime)).subtract(30, 'minute');

  const [animationSpeed, setAnimationSpeed] = useState(10);
  const [circuitOpacity, setCircuitOpacity] = useState(65);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key, metaKey, ctrlKey, shiftKey } = e;
      const isCtrl = metaKey || ctrlKey;

      if (isCtrl && shiftKey) {
        if (key === 'ArrowUp') {
          e.preventDefault();
          setAnimationSpeed((prev) => {
            const s = prev + 1 > 25 ? 25 : prev + 1;
            console.info('Animation Speed: ', s);
            return s;
          });
        }

        if (key === 'ArrowDown') {
          setAnimationSpeed((prev) => {
            const s = prev - 1 < 1 ? 1 : prev - 1;
            console.info('Animation Speed: ', s);
            return s;
          });
        }

        if (key === 'ArrowLeft') {
          e.preventDefault();
          setCircuitOpacity((prev) => {
            const o = prev - 1 < 0 ? 0 : prev - 1;
            console.info('Circuit Opacity: ', o);
            return o;
          });
        }

        if (key === 'ArrowRight') {
          e.preventDefault();
          setCircuitOpacity((prev) => {
            const o = prev + 1 > 100 ? 100 : prev + 1;
            console.info('Circuit Opacity: ', o);
            return o;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ShowcasePromoStyles speed={animationSpeed} opacity={circuitOpacity}>
      <div className='circuit-board-overlay'></div>
      <Content className='promo-content dynamic-txt'>
        <div className='showcase-header'>
          <h1 className='showcase-title dynamic-xl'>GRADUATION</h1>
          <h1 className='showcase-title dynamic-xl'>SHOWCASE</h1>
        </div>
        <div className='cohort-badge'>
          <span className='bullet'></span> COHORT {info.cohortName.toUpperCase()}
          <span className='bullet'></span>
        </div>
        <div className='date-time-info'>
          <div className='date-time-container'>
            <div className='start-date'>{showcaseStart.format('dddd, MMMM D, YYYY')}</div>
            <div className='start-time'>
              Doors Open: <span className='primary-green time'>{doorsOpen.format('h:mma')}</span>
              <span className='timezone'>{doorsOpen.format('z')}</span>
            </div>
            <div className='start-time'>
              Starts: <span className='primary-green time'>{showcaseStart.format('h:mma')}</span>
              <span className='timezone'>{showcaseStart.format('z')}</span>
            </div>
          </div>

          <CountdownTimer endTime={new Date(info.startDateTime)} onComplete={clearShowcase} />
        </div>

        <div className='register-section'>
          <button
            className='showcase-website-button'
            onClick={() =>
              window.open(
                'https://showcase.operationspark.org/share/Operation%20Spark%20Website',
                '_blank',
              )
            }
          >
            Learn more or get tickets here!
          </button>
        </div>
      </Content>
    </ShowcasePromoStyles>
  );
};

export default ShowcasePromo;

const circuitAnimation = keyframes`
  0% {
    transform: scale(3) translate(0, 0);
  }
  20% { // zoom in
    transform: scale(3) translate(25%, 0);
  }
  40% { // scroll bottom right
    transform: scale(3) translate(25%, 25%);
  }
  50% { // scroll left
    transform: scale(3) translate(0%, 25%);
  }
  60% {
    transform: scale(3) translate(-25%, 25%);
  }
  70% {
    transform: scale(3) translate(-25%, 0);
  }
  80% {
    transform: scale(2.5)  translate(0, 0);
  }
  100% {
    transform: scale(1.75) translate(0, 0);
  }
`;
const fireworkAnimation = keyframes`
 0% {
    opacity: 0.15;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.15;
  }
`;

export const ShowcasePromoStyles = styled.div<{ speed: number; opacity: number }>`
  user-select: none;
  position: relative;
  z-index: 0;
  padding-top: ${({ theme }) => theme.navHeight}px;
  overflow: hidden;

  .circuit-board-overlay {
    position: absolute;
    inset: 0;

    ${circuitBoardBg};
    transform-style: preserve-3d;
    animation: ${circuitAnimation} ${(p) => p.speed * 12}s ease-in-out infinite alternate;

    zoom: 0.25;
    opacity: ${(p) => p.opacity / 100};
    z-index: -2;
  }

  ::before {
    position: absolute;
    inset: 0;
    content: '';
    background-image: url('/images/display/celebrate.webp');
    animation: ${fireworkAnimation} ${(p) => p.speed * 12}s ease-in-out infinite;

    z-index: -3;
  }

  .promo-content {
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 2rem;
    z-index: 10;
  }
  .showcase-header {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(-0.1rem 0.1rem 0.25rem rgba(25, 25, 25, 0.75));
    .showcase-title {
      text-shadow: 0 0 0.5rem ${({ theme }) => theme.alpha.bg25};
      background: ${({ theme }, { secondary } = theme) => `
      linear-gradient(
        100deg,
        ${secondary[700]} 0%,
        ${secondary[300]} 25%,
        ${secondary[300]} 75%,
        ${secondary[700]} 100%
      )`};
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .cohort-badge {
    font-size: 1.5rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 0.25rem 0.5rem;
    border-radius: 1em;
    font-weight: 900;
    filter: drop-shadow(-0.1rem 0.1rem 0.25rem rgba(25, 25, 25, 0.5));
    background: ${({ theme }, { secondary } = theme) => `
    linear-gradient(
      0deg,
      ${secondary[600]} 0%,
      ${secondary[200]} 40%,
      ${secondary[200]} 60%,
      ${secondary[600]} 100%
    )`};

    color: ${({ theme }) => theme.primary[700]};
  }
  .bullet {
    align-items: center;
    justify-content: center;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;

    margin: 0 0.5rem;

    background: ${({ theme }) => theme.primary[700]};
  }
  .showcase-title {
    line-height: 1.2em;
  }

  .date-time-info {
    display: flex;
    flex-flow: column;
    background: ${({ theme }) => theme.alpha.bg25};
    color: ${({ theme }) => (theme.isLightMode ? 'rgba(25,25,25,1)' : 'rgba(232,232,232,1)')};
    box-shadow: ${({ theme }) => `
      -1px -1px 3px ${theme.secondary[300]},
      1px 1px 3px  ${theme.secondary[800]},
      0 0 6px 1px ${theme.black} inset
    `};

    backdrop-filter: blur(3px);
    padding: 1.5rem 3rem;
    border-radius: 1rem;
    gap: 1rem;

    .date-time-container {
      font-size: calc(1.1rem + 0.4vw);

      font-weight: 500;
      display: flex;
      flex-flow: column;
      align-items: center;
    }
    .start-date {
      word-spacing: 0.25em;
      padding-bottom: 0.5em;
    }
    .start-time {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.1rem;
      .time {
        font-family: 'Kalam', cursive;
        /* font-family: 'Source Code Pro', monospace; */
        font-weight: 700;
        margin-left: 0.5rem;
      }
    }
    .timezone {
      display: flex;
      line-height: 1.2em;
      font-size: 0.5em;
      font-weight: 700;
      padding: 0.1rem 0.25rem;
      margin-left: 0.5em;
      background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg : theme.alpha.bg)};
      color: ${({ theme }) => theme.green[0]};
      border-radius: 0.5em;
    }
  }
  .primary-green {
    color: ${({ theme: { isLightMode, green, primary } }) =>
      isLightMode ? primary[900] : green[300]};
  }

  .register-section {
    .showcase-website-button {
      font-size: 1.25rem;
      font-weight: 700;
      padding: 1rem 2rem;
      border-radius: 1rem;
      background: ${({ theme }) => theme.alpha.bg25};

      box-shadow: ${({ theme }) => `
        -1px -1px 3px ${theme.secondary[300]},
        1px 1px 3px  ${theme.secondary[800]},
        0 0 6px 1px ${theme.black} inset
      `};
      backdrop-filter: blur(3px);
      border: none;
      color: ${({ theme }, { isLightMode, primary, secondary } = theme) =>
        isLightMode ? primary[900] : secondary[700]};
      cursor: pointer;
      transition: all 0.25s ease-in-out;

      :hover {
        transform: scale(1.01);
        box-shadow: ${({ theme }) => `
          -1px -1px 3px ${theme.secondary[300]},
          1px 1px 3px  ${theme.secondary[800]},
          0 0 2px 1px ${theme.black} inset
        `};
      }
      :active {
        transform: scale(0.98);
      }
    }
  }

  @media screen and (max-width: 768px) {
    .date-time-info {
      .date-time-container {
        font-size: 1.2rem;
      }
      padding: 1rem 2rem;
    }
  }

  @media screen and (min-width: 1400px) {
    .date-time-info {
      .date-time-container {
        font-size: 1.5rem;
      }
    }
  }
`;
