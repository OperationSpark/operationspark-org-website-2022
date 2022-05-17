import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getCountdownTime, TCountdownTime } from '@this/src/helpers/timeUtils';

const CountdownStyles = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  border-radius: 0.25rem;
  overflow: hidden;
  user-select: none;
  background: ${({ theme }) => theme.bg};
  --countdown-shadow: 0 0 2px
    ${({ theme: { isLightMode, primary, secondary } }) =>
      isLightMode ? primary[700] : secondary[400]};
  box-shadow: var(--countdown-shadow);

  .countdown-date-time {
    display: flex;
    justify-content: space-around;
    padding: 0 0.5rem;
    box-shadow: var(--countdown-shadow);
    font-weight: 600;
    font-size: 1.25rem;
    background: ${({ theme: { isLightMode, grey } }) =>
      isLightMode ? grey[100] : grey[900]};

    color: ${({ theme: { isLightMode, primary, secondary } }) =>
      isLightMode ? primary[700] : secondary[400]};
  }

  .countdown-clock {
    color: ${({ theme: { isLightMode, green, red } }) =>
      isLightMode ? red[500] : green[500]};
    display: flex;
    justify-content: space-evenly;
    text-align: center;

    p {
      font-size: 0.8rem;
      font-weight: 300;
      line-height: 1em;
      padding-top: 0.25rem;
    }
    h2 {
      font-weight: 700;
      line-height: 1em;
    }

    .time-segment {
      flex: 1;
      display: flex;
      flex-flow: column;
      padding: 0.5rem 0;
    }
  }
`;

interface CountdownProps {
  endTime: Date | null;
}

const Countdown = ({ endTime }: CountdownProps) => {
  const [time, updateTime] = useState<TCountdownTime | null>(null);

  type timeStrings = 'days' | 'hours' | 'minutes' | 'seconds';
  const timeInc: timeStrings[] = ['days', 'hours', 'minutes', 'seconds'];

  useEffect(() => {
    if (!endTime || typeof window === 'undefined') {
      return;
    }
    updateTime(getCountdownTime(endTime));
    const interval = setInterval(() => {
      updateTime(getCountdownTime(endTime));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [endTime]);

  return !time || time.isComplete ? null : (
    <CountdownStyles>
      <div className='countdown-date-time'>
        <div className='date'>{time.m.format('MMM D, YYYY')}</div>
        <div className='time'>{time.m.format('h:mm A')}</div>
      </div>
      <div className='countdown-clock'>
        {timeInc.map((inc, i) =>
          timeInc.slice(0, i + 1).every((val) => !time[val]) ? null : (
            <div className='time-segment' key={inc}>
              <h2 className='dynamic-h2 source-code'>{time[inc]}</h2>
              <p className='dynamic-txt'>
                {inc[0].toUpperCase() + inc.slice(1)}
              </p>
            </div>
          ),
        )}
      </div>
    </CountdownStyles>
  );
};

export default Countdown;
