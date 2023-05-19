import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

import { CourseSessions } from '@this/data/types/schedule';
import { PhaseInfoWindow } from './PhaseInfoWindow';
import SessionRow from './SessionRow';
import Spinner from '../Elements/Spinner';

const getPhaseById = (phaseId: string) => {
  const phases: Record<string, string> = {
    pr: 'Prep',
    bc: 'Bootcamp',
    ip: 'Immersion Precourse',
    imj: 'Immersion Junior',
    ims: 'Immersion Senior',
  };
  return phases[phaseId] ?? '';
};

type PhaseColumnProps = {
  phaseId: string;
};

const PhaseColumn = ({ phaseId }: PhaseColumnProps) => {
  const [isLoading, setLoading] = useState<boolean>(true);

  const [phase, setPhase] = useState<CourseSessions | null>(null);

  // sessions visible upcoming sessions to 5
  const sessions = phase?.sessions?.slice(0, 5) || [];

  useEffect(() => {
    setLoading(true);

    axios
      .get<CourseSessions>(`/api/programs/${phaseId}`)
      .then(({ data }) => setPhase(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [phaseId]);
  console.log(phase);
  if (!phase || (!phase?.sessions && !isLoading)) {
    return null;
  }
  return isLoading ? (
    <div style={{ width: '15rem', height: '20rem' }}>
      <div className='text-center dynamic-h3 primary-secondary' style={{ paddingBottom: '1rem' }}>
        {getPhaseById(phaseId)} Sessions
      </div>
      <Spinner size={4} />
    </div>
  ) : (
    <PhaseColumnStyles>
      <motion.div
        className='schedule-cohort-container'
        variants={{
          hidden: {
            opacity: 0,
            transition: { staggerChildren: 0.1, duration: 0.2 },
          },
          show: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
        initial='hidden'
        animate={isLoading ? 'hidden' : 'show'}
      >
        <div className='schedule-block-header'>
          <h3 className='dynamic-h3 schedule-block cohort-name primary-secondary'>
            {phase.immersion && 'Immersion'} {phase.title}
          </h3>

          {phase?.sessions && <PhaseInfoWindow phase={phase} />}
        </div>

        {sessions.map((session) => (
          <SessionRow key={session.cohortId} session={session} />
        ))}
      </motion.div>
    </PhaseColumnStyles>
  );
};

export default PhaseColumn;

export const PhaseColumnStyles = styled.div`
  flex: 1;
  width: 20rem;
  min-width: 21rem;

  .programs-header {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }
  .programs-header-content {
    background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg50 : theme.alpha.bg50)};
    width: fit-content;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    backdrop-filter: blur(8px);
    color: ${({ theme }) => theme.white};
  }

  .schedule-container {
    display: flex;
    flex-flow: row wrap;
    padding: 1rem;
    grid-gap: 1.5rem;
    margin: 0 auto;
  }
  .schedule-cohort {
    flex: 1;
    min-width: 20rem;
  }
  .schedule-cohort-container {
    width: 100%;
    page-break-inside: avoid;
    display: flex;
    flex-flow: column;
    grid-gap: 0.5rem;

    border-radius: 0.25rem;
    background: ${({ theme }) => theme.bg};
    .cohort-name {
      text-align: center;
    }
  }

  .schedule-block {
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
    p {
      display: flex;
    }
    .session-time {
      color: ${({ theme }) => theme.grey[500]};
      font-weight: 400;
      font-size: 0.9rem;
    }
  }
  .dim-label {
    color: ${({ theme }) => theme.grey[500]};
    width: 50px;
  }
  .schedule-block-header {
    position: relative;
  }
  .schedule-block-course {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    font-size: 0.8rem;
    border-radius: 0.25rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => (theme.isLightMode ? theme.magenta[700] : theme.magenta[100])};
    background: ${({ theme }) => theme.black};
    padding: 0.2rem 0.4rem;
    line-height: 1em;
    filter: saturate(4);
  }
  .schedule-block-text {
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
  .schedule-block.next-session {
    /* background-image: url('/images/textures/cream-paper.png'); */

    background-color: ${({ theme }) => (theme.isLightMode ? theme.green[300] : theme.green[900])};
    font-weight: 700;
    p * {
      color: ${({ theme }) => theme.fg};
    }
  }
  .schedule-block.current-session {
    color: ${({ theme }) => theme.alpha.fg25};
    background: ${({ theme }) => theme.alpha.fg10};
    box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg25};
    font-weight: 300;
    .schedule-block-inner {
      background: none;
      * {
        font-weight: 400;
        color: ${({ theme }) => theme.alpha.fg25};
      }
    }
    .schedule-block-course {
      color: ${({ theme }) => theme.alpha.fg25};
      background: ${({ theme }) => theme.alpha.fg10};
      box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg25};
    }
  }
  .schedule-block-inner {
    background: ${({ theme }) => (theme.isLightMode ? theme.alpha.bg : theme.alpha.bg)};
    backdrop-filter: blur(1px);
    position: relative;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    print-color-adjust: exact;
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
    .schedule-block-course {
      position: static;
      padding: 0;
      font-weight: 900;
      print-color-adjust: exact;

      background: transparent !important;
      -webkit-print-color-adjust: economy;
    }
    .schedule-block-header {
      grid-column: span 4;
      page-break-before: auto;
      background: inherit;
    }
    .schedule-block {
      width: fit-content;
      print-color-adjust: exact;
      background: rgba(255, 255, 255, 0);
    }
    .schedule-block-inner {
      background: rgba(255, 255, 255, 0);
    }

    .schedule-block.next-session {
      background: rgba(50, 175, 100, 1);
      .schedule-block-inner {
        background: rgba(255, 255, 255, 1);
      }
    }
  }
`;
