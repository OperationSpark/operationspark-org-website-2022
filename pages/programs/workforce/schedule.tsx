import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import axios from 'axios';
import { Main, Section, Content } from '@this/components/layout';
import { BgImg } from '@this/src/components/Elements';
import { ICourseInfo, ISessionRow } from '@this/data/types/schedule';
const CohortSchedule: NextPage = () => {
  const [groupBy, setGroupBy] = useState<string>('course');
  const [isLoading, setLoading] = useState<boolean>(true);
  const [sessionDates, setSessionDates] = useState<CohortState[]>([]);

  useEffect(() => {
    const q = `?group=${groupBy}`;
    setLoading(true);
    axios.get<CohortState[]>(`/api/schedule/cohorts${q}`).then(({ data }) => {
      setSessionDates(data);
      setLoading(false);
    });
  }, [groupBy]);

  return (
    <Main style={{ paddingTop: 0 }}>
      <CohortScheduleStyles>
        <BgImg src='/images/display/cal-image.webp' height='25rem'>
          <Section className='programs-header'>
            <Content className='programs-header-content'>
              <h1 className='dynamic-xl secondary'>Workforce Calendar</h1>
              <h3 className='dynamic-h3'>View schedule for upcoming sessions</h3>
            </Content>
          </Section>
        </BgImg>
      </CohortScheduleStyles>
    </Main>
  );
};
export default CohortSchedule;
export const CohortScheduleStyles = styled.div`
  .programs-header {
    height: 20rem;
    height: 100%;
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
`;
