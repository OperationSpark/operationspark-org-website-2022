import { FC, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Content from '@this/components/layout/Content';
import { circuitBoardBg } from '@this/src/theme/styled/mixins/circuitBoardBg';
import { IGradShowcase } from '@this/data/types/gradShowcase';
import { CountdownTimer } from '../Elements/Countdown';
import { toDayJs } from '@this/src/helpers/time';

type ShowcasePromoProps = {
  info: IGradShowcase;
};

const ShowcasePromo: FC<ShowcasePromoProps> = ({ info }) => {
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
              Door {doorsOpen.format('h:mma')}
              <span className='timezone'>{doorsOpen.format('(z)')}</span>
            </div>
            <div className='start-time'>
              Start <span className='primary-green time'>{showcaseStart.format('h:mma')}</span>
              <span className='timezone'>{showcaseStart.format('(z)')}</span>
            </div>
          </div>

          <CountdownTimer endTime={new Date(info.startDateTime)} />
        </div>
      </Content>
    </ShowcasePromoStyles>
  );
};

export default ShowcasePromo;

const circuitAnimation = keyframes`
  0% {
    transform: scale(3) translate3d(0, 0, 0);
  }
  20% { // zoom in
    transform: scale(3) translate3d(25%, 0, 8em)

  }
  40% { // scroll bottom right
    transform: scale(3) translate3d(25%, 25%, 8em)
  }
  50% { // scroll left
    transform: scale(3) translate3d(0%, 25%, 8em)
  }
  60% {
    transform: scale(3) translate3d(-25%, 25%, 8em)
  }
  70% {
    transform: scale(3) translate3d(-25%, 0, 8em)
  }
  80% {
    transform: scale(2.5)  translate3d(0, 0, 0);
  }
  100% {
    transform: scale(1.75) translate3d(0, 0, 0);
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
  position: relative;
  z-index: 1;

  padding-top: ${({ theme }) => theme.navHeight}px;
  overflow: hidden;

  ::after {
    position: absolute;
    inset: 0;
    content: '';
    ${circuitBoardBg};
    transform-style: preserve-3d;
    animation: ${circuitAnimation} ${(p) => p.speed * 12}s ease-in-out infinite alternate;

    zoom: 0.25;
    opacity: ${(p) => p.opacity / 100};
    z-index: -1;
  }

  ::before {
    position: absolute;
    inset: 0;
    content: '';
    background-image: url('/images/display/celebrate.webp');
    animation: ${fireworkAnimation} ${(p) => p.speed * 12}s ease-in-out infinite;

    z-index: -2;
  }

  .promo-content {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 2.5rem;
  }
  .showcase-header {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(-0.1rem 0.1rem 0.25rem rgba(25, 25, 25, 0.75));
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
    box-shadow: -0.1rem 0.1rem 0.5rem rgba(25, 25, 25, 0.5);
    backdrop-filter: blur(3px);
    padding: 1rem 2rem;
    border-radius: 1rem;
    gap: 1rem;

    .date-time-container {
      font-size: 1.4rem;
      text-align: center;
      font-weight: 500;
      display: flex;
      flex-flow: column;
      align-items: center;
      gap: 0.5rem;
    }
    .start-date {
      word-spacing: 0.25em;
    }
    .start-time {
      display: flex;
      align-items: center;
      justify-content: center;
      .time {
        margin-left: 0.5rem;
      }
    }
    .timezone {
      font-size: 0.5em;
      align-self: flex-start;
      padding: 0.5em 0.5em;
    }
  }
  .primary-green {
    color: ${({ theme: { isLightMode, green, primary } }) =>
      isLightMode ? primary[800] : green[300]};
  }
`;
