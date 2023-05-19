import styled from 'styled-components';

import PhaseColumn from './PhaseColumn';

const SessionSchedule = () => {
  const phases = ['pr', 'bc', 'ip', 'imj', 'ims'];

  return (
    <SessionScheduleStyles>
      {phases.map((phase) => (
        <PhaseColumn phaseId={phase} key={phase} />
      ))}
    </SessionScheduleStyles>
  );
};

export default SessionSchedule;

export const SessionScheduleStyles = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 1rem;
  grid-gap: 1.5rem;
  margin: 0 auto;
`;
