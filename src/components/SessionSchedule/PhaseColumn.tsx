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
  const [isLoading, setLoading] = useState<boolean>(false);

  const [phase, setPhase] = useState<CourseSessions | null>(null);

  // sessions visible upcoming sessions to 5
  const sessions = phase?.sessions?.slice(0, 5) || new Array(5).fill(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get<CourseSessions>(`/api/programs/${phaseId}`)
      .then(({ data }) => setPhase(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [phaseId]);

  if (!phase) {
    return null;
  }
  return isLoading || !phase ? (
    <LoadingPlaceholder>
      <div className='text-center dynamic-h3 primary-secondary' style={{ paddingBottom: '1rem' }}>
        {getPhaseById(phaseId)} Sessions
      </div>
      <div className='loading-spinner'>
        <Spinner style={{ opacity: 0.5 }} size={3} />
      </div>
    </LoadingPlaceholder>
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
            {phase.isImmersion && 'Immersion'} {phase.title}
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

export const LoadingPlaceholder = styled.div`
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg};
  border-radius: 0.25rem;
  max-width: 600px;
  min-width: 21rem;
  height: 20rem;
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex: 1;

  .loading-spinner {
    display: flex;
    justify-content: center;
    flex: 1;
  }
`;
export const PhaseColumnStyles = styled.div`
  flex: 1;
  min-width: fit-content;

  .programs-header {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
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

  .schedule-block-header {
    position: relative;
  }
`;
