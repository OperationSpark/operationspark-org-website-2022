import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ISessionRow } from '@this/data/types/schedule';
import { toDayJs } from '@this/src/helpers/time';
import { GiftIcon } from '../icons/gift';
import CursorTooltip from '@this/src/Typography/elements/CursorTooltip';

type SessionRowProps = {
  session: ISessionRow;
};

const SessionRow = ({ session }: SessionRowProps) => {
  const nextSessionClassName = session.isNext ? 'next-session' : '';
  const currentSessionClassName = session.isCurrent ? 'current-session' : '';
  const startDate = toDayJs(session.startDate);
  const endDate = toDayJs(session.endDate);
  const orientationDate = toDayJs(session.orientationDate);
  const cohortName = `${session.cohort}${session.iteration ? ` (${session.iteration})` : ''}`;

  const isPastStart = startDate.isAfter(Date.now());
  const isPastOrientation = orientationDate.isAfter(Date.now(), 'hour');

  const transitionVariants = {
    hidden: { y: -50, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <SessionRowStyles
      variants={transitionVariants}
      className={nextSessionClassName || currentSessionClassName}
    >
      <div className='session-row-content'>
        <div className='session-info'>
          {isPastStart && (
            <p>
              <span className='dim-label'>Start:</span>{' '}
              <b className={session.isNext ? 'primary-secondary' : ''}>
                {startDate.format('MMM D, YYYY')}
              </b>
            </p>
          )}
          <p>
            <span className='dim-label'>End: </span> {endDate.format('MMM D, YYYY')}
          </p>
          <p>
            <span className='dim-label'>Time: </span> {startDate.format('h:mma')}
            {' - '}
            {endDate.format('h:mma (z)')}
          </p>
          {session.isOrientation && isPastOrientation && (
            <div>
              <span>Orientation: </span>
              {orientationDate.format('M/D/YYYY @ h:mma (z)')}
            </div>
          )}
        </div>
        <div className='session-badges'>
          <CursorTooltip title={`Cohort name: ${cohortName}`}>
            <span
              className='cohort-name source-code primary-secondary'
              style={!session.isCurrent ? { color: session.color } : {}}
            >
              {cohortName}
            </span>
          </CursorTooltip>
          {session.isBreak && (
            <CursorTooltip title='This session is broken up by a holiday'>
              <span className='session-badge break-session'>
                <GiftIcon size={16} /> Holiday
              </span>
            </CursorTooltip>
          )}
          {session.isNext && (
            <CursorTooltip title='This cohort is up next'>
              <span className='session-badge next-session'>Up Next</span>
            </CursorTooltip>
          )}
          {session.isCurrent && (
            <CursorTooltip title='This cohort is currently in session'>
              <span className='session-badge current-session'>Active Cohort</span>
            </CursorTooltip>
          )}
        </div>
      </div>
    </SessionRowStyles>
  );
};

export default SessionRow;

export const SessionRowStyles = styled(motion.div)`
  position: relative;
  padding: 0.2rem;
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg};
  border-radius: 0.25rem;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;

  .session-row-content {
    background: ${({ theme }) => theme.alpha.bg};
    backdrop-filter: blur(1px);
    position: relative;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    print-color-adjust: exact;
    display: flex;
    justify-content: space-between;
    max-width: 100%;
    p {
      display: flex;
      white-space: pre;
    }
  }

  .dim-label {
    color: ${({ theme }) => theme.grey[500]};
    width: 50px;
  }

  .session-time {
    color: ${({ theme }) => theme.grey[500]};
    font-weight: 400;
    font-size: 0.9rem;
  }

  .cohort-name {
    font-size: 0.8rem;
    border-radius: 0.25rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: flex;
    white-space: pre;
    background: ${({ theme }) => theme.black};
    padding: 0.2rem 0.4rem;
    line-height: 1em;
    filter: saturate(4);
  }

  .session-badges {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: 0.25rem;
  }
  .session-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;

    gap: 0.25rem;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.25rem;
    line-height: 1em;
    border-radius: 0.25rem;
    /* Session badges */
    &.current-session {
      font-weight: 400;
      color: ${({ theme }) => theme.alpha.fg50};
      font-style: italic;
    }
    &.next-session {
      color: ${({ theme }) => theme.green[300]};
      background: ${({ theme }) => theme.black};
      font-style: italic;
    }
    &.break-session {
      color: ${({ theme }) => (theme.isLightMode ? theme.magenta[0] : theme.magenta[100])};
    }
  }
  /* Next session for entire block */
  &.next-session {
    background-image: url('/images/textures/cream-paper.png');

    background-color: ${({ theme }) => (theme.isLightMode ? theme.green[300] : theme.green[900])};
    font-weight: 700;
    p * {
      color: ${({ theme }) => theme.fg};
    }
  }
  /* Current session for entire block */
  &.current-session {
    color: ${({ theme }) => theme.alpha.fg25};
    background: ${({ theme }) => theme.alpha.fg10};
    box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg25};
    font-weight: 300;
    .session-row-content {
      background: none;
      * {
        font-weight: 400;
        color: ${({ theme }) => theme.alpha.fg25};
      }
    }
    .cohort-name {
      color: ${({ theme }) => theme.alpha.fg25};
      background: ${({ theme }) => theme.alpha.fg10};
      box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg25};
    }
  }
`;
