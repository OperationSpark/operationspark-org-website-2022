import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Content, Main } from '@this/components/layout';
import { IGradShowcase } from '@this/data/types/gradShowcase';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import { toCentTime } from '@this/src/helpers/timeUtils';

const Countdown = dynamic(() => import('@this/components/Elements/Countdown'));

const GradShowcaseStyles = styled.div`
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

  .register {
    display: flex;
    justify-content: center;
    margin: 0.5rem 0;
  }
  .vid {
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
    border-radius: 0.25rem;
    overflow: hidden;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 1);
  }
`;

const GradShowcase: NextPage<IGradShowcase> = ({ startDateTime, cohortName, isActive }) => {
  const [showcaseDate] = useState<Date | null>(toCentTime(startDateTime));
  const [vidLoaded, setVidLoaded] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    !isActive && router.replace('/');
  }, [router, isActive]);

  return !startDateTime ? (
    <Main />
  ) : (
    <Main>
      <GradShowcaseStyles>
        <Content className='date-countdown'>
          <h1 className='dynamic-h1 title'>Graduation Showcase</h1>
          <h2 className='dynamic-h2 cohort-name'>Cohort: {cohortName}</h2>
          <Countdown endTime={showcaseDate} />
          <div className='register'>
            <h3 className='dynamic-h3 form-title anchor'>
              <Link href='/gradShowcase/register'>{'Register'}</Link>
            </h3>
          </div>
          <div className='vid' style={{ opacity: vidLoaded ? 1 : 0 }}>
            <video
              controls
              onLoadedData={() => setVidLoaded(true)}
              poster={'/images/showcase/Cohort_Tango_Showcase_April_7_2022.png'}
            >
              <source
                src='https://drive.google.com/uc?export=download&id=179ry496_aM_bE_nMx60Y_5TXdUtvdCtI'
                type='video/mp4'
              />
            </video>
          </div>
        </Content>
      </GradShowcaseStyles>
    </Main>
  );
};

export default GradShowcase;

export const getStaticProps: GetStaticProps<IGradShowcase> = async () => {
  const props: IGradShowcase = await getStaticAsset('gradShowcase');

  return { props };
};
