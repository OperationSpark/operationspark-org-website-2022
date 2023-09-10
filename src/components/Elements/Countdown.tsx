import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { getCountdownTime, parseShowcaseTime, TCountdownTime } from '@this/src/helpers/timeUtils';
import { toDayJs } from '@this/src/helpers/time';

const CountdownStyles = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  border-radius: 0.25rem;
  overflow: hidden;
  user-select: none;
  background: ${({ theme }) => theme.alpha.bg};
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
    background: ${({ theme }) => theme.alpha.bg25};

    color: ${({ theme: { isLightMode, primary, secondary } }) =>
      isLightMode ? primary[0] : secondary[0]};

    .time {
      display: flex;
      align-items: center;
      .tz {
        font-size: 0.8rem;
        margin-left: 0.25rem;
        font-weight: 300;
      }
    }
  }
`;

interface CountdownProps {
  endTime: Date | null;
  onComplete?: () => void;
}

const Countdown = ({ endTime, onComplete }: CountdownProps) => {
  const time = useMemo(() => (endTime ? toDayJs(endTime) : null), [endTime]);
  const isPast = useMemo(() => time?.isBefore(toDayJs(), 'minute'), [time]);

  return !time || isPast ? null : (
    <CountdownStyles>
      <div className='countdown-date-time'>
        <div className='date'>{time.format('MMM D, YYYY')}</div>
        <div className='time'>
          {time.format('h:mm A')} <span className='tz'>({time.format('z')})</span>
        </div>
      </div>
      <CountdownTimer endTime={endTime} onComplete={onComplete} />
    </CountdownStyles>
  );
};

const formatNamePlural = (name: string, val: number) => {
  const str = name[0].toUpperCase() + name.slice(1);
  return val === 1 ? str.slice(0, -1) : str;
};

export const CountdownTimer = ({ endTime, onComplete }: CountdownProps) => {
  const [time, updateTime] = useState<TCountdownTime | null>(null);

  type timeStrings = 'days' | 'hours' | 'minutes' | 'seconds';
  const timeInc: timeStrings[] = ['days', 'hours', 'minutes', 'seconds'];

  useEffect(() => {
    if (!endTime || typeof window === 'undefined') {
      return;
    }
    updateTime(getCountdownTime(endTime));
    const interval = setInterval(() => {
      const t = getCountdownTime(endTime);

      if (t.isComplete) {
        // If countdown is over, check if parsed info still exists (i.e.a little buffer time before removing promo)
        const parsedInfo = parseShowcaseTime(endTime.toISOString?.());
        if (!parsedInfo) {
          clearInterval(interval);
          onComplete?.();
        }
      }
      updateTime(t.isComplete ? null : t);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [endTime, onComplete]);

  return !time || time.isComplete ? null : (
    <CountdownTimerStyles>
      {timeInc.map((inc, i) =>
        timeInc.slice(0, i + 1).every((val) => !time[val]) ? null : (
          <div className='time-segment' key={inc}>
            <h2 className='dynamic-h2 source-code time-num'>{time[inc]}</h2>
            <p className='dynamic-txt time-inc'>{formatNamePlural(inc, time[inc])}</p>
          </div>
        ),
      )}
    </CountdownTimerStyles>
  );
};

const CountdownTimerStyles = styled.div`
  color: ${({ theme }) => theme.green[500]};
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  gap: 0.5rem;

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
    width: 3.5rem;
    background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg50 : theme.alpha.bg50)};
    box-shadow: 0 0 2px 1px ${({ theme }) => theme.green[400]};
    border-radius: 0.5rem;

    .time-num {
      font-size: 1.5em;
    }
    .time-inc {
      font-size: 0.6rem;
      font-weight: 400;
      line-height: 1em;
      padding-top: 0.25rem;
    }
  }
`;

export default Countdown;
