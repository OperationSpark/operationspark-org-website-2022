import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ISessionRow } from '@this/data/types/schedule';
import { toDayJs } from '@this/src/helpers/time';

type SessionRowProps = {
  session: ISessionRow;
};

const SessionRow = ({ session }: SessionRowProps) => {
  const nextSessionClassName = session.isNext ? 'next-session' : '';
  const currentSessionClassName = session.isCurrent ? 'current-session' : '';
  const startDate = toDayJs(session.startDate);
  const endDate = toDayJs(session.endDate);

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
        <span
          className='cohort-name source-code primary-secondary'
          style={!session.isCurrent ? { color: session.color } : {}}
        >
          {session.cohort} {session.iteration ? `(${session.iteration})` : ''}
        </span>
        <p>
          <span className='dim-label'>Start:</span>{' '}
          <b className={session.isNext ? 'primary-secondary' : ''}>
            {startDate.format('MMM D, YYYY')}
          </b>
        </p>
        <p>
          <span className='dim-label'>End: </span> {endDate.format('MMM D, YYYY')}
        </p>
        <p>
          <span className='dim-label'>Time: </span> {startDate.format('h:mma')}
          {' - '}
          {endDate.format('h:mma (z)')}
        </p>
        {session.isNext && <span className='session-badge next-session'>Up Next</span>}
        {session.isCurrent && <span className='session-badge current-session'>Active Cohort</span>}
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

  :first-child {
    box-shadow: none;
  }

  .session-row-content {
    background: ${({ theme }) => (theme.isLightMode ? theme.alpha.bg : theme.alpha.bg)};
    backdrop-filter: blur(1px);
    position: relative;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    print-color-adjust: exact;
  }

  p {
    display: flex;
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
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    font-size: 0.8rem;
    border-radius: 0.25rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;

    background: ${({ theme }) => theme.black};
    padding: 0.2rem 0.4rem;
    line-height: 1em;
    filter: saturate(4);
  }
  .session-badge {
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.2rem 0.4rem;
    line-height: 1em;
    border-radius: 0.25rem;
    font-style: italic;

    &.current-session {
      font-weight: 400;
      color: ${({ theme }) => theme.alpha.fg50};
    }
    &.next-session {
      color: ${({ theme }) => theme.green[300]};
      background: ${({ theme }) => theme.black};
    }
  }
  &.next-session {
    /* background-image: url('/images/textures/cream-paper.png'); */

    background-color: ${({ theme }) => (theme.isLightMode ? theme.green[300] : theme.green[900])};
    font-weight: 700;
    p * {
      color: ${({ theme }) => theme.fg};
    }
  }
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

  @media print {
    .schedule-container {
      display: flex;
      flex-flow: column;
    }
    .schedule-cohort-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    grid-column: span 4;
    .schedule-block-next,
    .cohort-name {
      position: static;
      padding: 0;
      font-weight: 900;
      print-color-adjust: exact;

      background: transparent !important;
      -webkit-print-color-adjust: economy;
    }

    .schedule-block {
      width: fit-content;
      print-color-adjust: exact;
      background: rgba(255, 255, 255, 0);
    }
    .session-row-content {
      background: rgba(255, 255, 255, 0);
    }

    .schedule-block.next-session {
      background: rgba(50, 175, 100, 1);
      .session-row-content {
        background: rgba(255, 255, 255, 1);
      }
    }
  }
`;
