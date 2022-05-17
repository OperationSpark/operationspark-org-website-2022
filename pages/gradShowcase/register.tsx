import dynamic from 'next/dynamic';
import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';

import { IGradShowcase } from '@this/data/types/gradShowcase';
import { Main, Content } from '@this/components/layout';
import { toCentTime } from '@this/src/helpers/timeUtils';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import Button from '@this/components/Elements/Button';

const Countdown = dynamic(() => import('@this/components/Elements/Countdown'));

const GradShowcase: NextPage<IGradShowcase> = ({
  startDateTime,
  cohortName,
  eventbriteUrl,
}) => {
  const [showcaseDate] = useState<Date | null>(toCentTime(startDateTime));

  return (
    <Main>
      <ShowcaseSignupStyles>
        <Content className='date-countdown'>
          <h1 className='dynamic-h1 title'>Graduation Showcase</h1>
          <h2 className='dynamic-h2 cohort-name'>Cohort: {cohortName}</h2>
          <Countdown endTime={showcaseDate} />
          <div className='register'>
            <div className='showcase-form'>
              <div className='sign-up-link'>
                <a target='_blank' href={eventbriteUrl} rel='noreferrer'>
                  <Button color='yellow'>Sign up here</Button>
                </a>
              </div>
            </div>
          </div>
        </Content>
      </ShowcaseSignupStyles>
    </Main>
  );
};

export default GradShowcase;

export const getStaticProps: GetStaticProps<IGradShowcase> = async () => {
  const props: IGradShowcase = await getStaticAsset('gradShowcase');

  return { props };
};

const ShowcaseSignupStyles = styled.div`
  .cohort-name,
  .time-segments,
  .title {
    text-align: center;
    color: ${({ theme: { isLightMode, primary, secondary } }) =>
      isLightMode ? primary[700] : secondary[500]};
  }
  .cohort-name {
    padding-bottom: 2rem;
    color: ${({ theme }) => theme.fg};
    font-weight: 200;
  }
  .showcase-form {
    max-width: 500px;
    width: 100%;
    padding: 3rem 0;
    .form-title {
      text-align: center;
      font-weight: 700;
      padding-bottom: 0.5rem;
    }
  }
  .register {
    display: flex;
    justify-content: center;
  }
  .sign-up-link {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
