import { NextPage } from 'next';
import styled from 'styled-components';

import { Main, Section, Content } from '@this/components/layout';
import { BgImg } from '@this/src/components/Elements';
import SessionSchedule from '@this/src/components/SessionSchedule';

const CohortSchedule: NextPage = () => {
  return (
    <Main style={{ paddingTop: 0 }}>
      <CohortScheduleStyles>
        <BgImg src='/images/display/cal-image.webp' height='25rem'>
          <Section className='programs-header'>
            <Content className='programs-header-content'>
              <h1 className='dynamic-xl secondary text-center'>Workforce Calendar</h1>
              <h3 className='dynamic-h3 text-center'>Current schedule for upcoming cohorts</h3>
            </Content>
          </Section>
        </BgImg>

        <Content>
          <p className='schedule-disclaimer dynamic-txt'>
            Operation Spark includes 6 - 7 months of escalated, intense instruction geared towards a
            career in software engineering. With breaks and schedule holidays, full completion can
            take less than a year. Please see the schedule below for more details.
          </p>
          <p className='schedule-disclaimer dynamic-txt text-center'>
            <i>
              Dates subject to change, email
              <a href='mailto:admissions@operationspark.org' className='anchor'>
                admissions@operationspark.org
              </a>
              to confirm.
            </i>
          </p>
        </Content>
        <SessionSchedule />
      </CohortScheduleStyles>
    </Main>
  );
};

export default CohortSchedule;

export const CohortScheduleStyles = styled.div`
  cursor: default;

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

  .schedule-disclaimer {
    padding: 0.5rem 0;
    a {
      font-family: 'Roboto', sans-serif;
      font-size: 1em;
      line-height: 1em;
      font-weight: 400;
      padding: 0 0.25rem;
      margin: 0 0.25rem;
    }
  }
`;
