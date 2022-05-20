import dynamic from 'next/dynamic';
import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';

import { IGradShowcase } from '@this/data/types/gradShowcase';
import { Main, Content } from '@this/components/layout';
import { toCentTime } from '@this/src/helpers/timeUtils';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import Button from '@this/components/Elements/Button';
import { BgImg } from '@this/src/components/Elements';

const Countdown = dynamic(() => import('@this/components/Elements/Countdown'));

const GradShowcase: NextPage<IGradShowcase> = ({
  startDateTime,
  cohortName,
  eventbriteUrl,
}) => {
  const [showcaseDate] = useState<Date | null>(toCentTime(startDateTime));

  return (
    <Main style={{ paddingTop: 0 }}>
      <ShowcaseSignupStyles>
        <BgImg
          src='/images/display/celebrate.png'
          overlay={{ bg: 'transparent' }}
        >
          <Content className='showcase-header'>
            <div className='showcase-header-container'>
              <h1 className='dynamic-h1 title secondary'>
                Graduation Showcase
              </h1>
              <h2 className='dynamic-h2 cohort-name secondary cursive'>
                {cohortName}
              </h2>
            </div>
          </Content>
        </BgImg>
        <Content className='date-countdown'>
          <Countdown endTime={showcaseDate} />
          <div className='register'>
            <div className='showcase-form'>
              <div style={{ paddingBottom: '2rem' }}>
                <h3 className='dynamic-h3 text-center'>
                  Come celebrate with our grads as they show off their final
                  project at Operation Spark!
                </h3>
              </div>
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
  }
  .cohort-name {
    font-weight: 600;
    font-style: italic;
  }
  .showcase-header {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    .showcase-header-container {
      background: ${({ theme }) =>
        theme.isLightMode ? theme.alpha.fg : theme.alpha.bg};
      padding: 2rem;
      border-radius: 0.5rem;
    }
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
