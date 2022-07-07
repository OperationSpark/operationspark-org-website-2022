import dynamic from 'next/dynamic';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import { IGradShowcase } from '@this/data/types/gradShowcase';
import { Main, Content } from '@this/components/layout';
import { toCentTime } from '@this/src/helpers/timeUtils';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import { BgImg } from '@this/src/components/Elements';

const Countdown = dynamic(() => import('@this/components/Elements/Countdown'));

const GradShowcase: NextPage<IGradShowcase> = ({ startDateTime, cohortName, eventbriteUrl }) => {
  const [showcaseDate] = useState<Date | null>(toCentTime(startDateTime));

  return (
    <Main style={{ paddingTop: 0 }}>
      <ShowcaseSignupStyles>
        <BgImg src='/images/display/celebrate.webp' overlay={{ bg: 'transparent' }}>
          <Content className='showcase-header'>
            <div className='showcase-header-container'>
              <h1 className='dynamic-xl title secondary'>Graduation Showcase</h1>
              <h2 className='dynamic-h2 cohort-name secondary'>
                <br />
                <span style={{ fontWeight: 900 }}>Cohort </span>
                <br />
                <span className='cursive'>{cohortName}</span>
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
                  Come celebrate with our graduates from cohort{' '}
                  <b className='primary-secondary'>{cohortName}</b> as they show off their final
                  project created at Operation Spark!
                </h3>
              </div>
              <div className='sign-up-link'>
                {eventbriteUrl ? (
                  <a target='_blank' href={eventbriteUrl} rel='noreferrer'>
                    <div className='eventbrite-link'>
                      <a
                        href='https://opsparkjuly2022.eventbrite.com/'
                        target='_blank'
                        rel='noreferrer'
                      >
                        <div>Register at</div>
                        <Image
                          src='/images/logos/etc/eventbrite.png'
                          width={125}
                          height={25}
                          alt='Eventbrite'
                        />
                      </a>
                    </div>
                  </a>
                ) : (
                  <h4 className='dynamic-h4 primary-secondary'>Link will be available soon</h4>
                )}
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
  }
  .showcase-header {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    .showcase-header-container {
      background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg : theme.alpha.bg)};
      padding: 2rem;
      border-radius: 0.5rem;
      backdrop-filter: blur(4px);
      box-shadow: 0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.8);
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
  .eventbrite-link {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    font-weight: 600;
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: fit-content;
      flex-flow: column;

      font-weight: 600;
      letter-spacing: -1px;
      font-size: 1.25rem;
      user-select: none;
      -webkit-user-drag: none;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      text-decoration: none;

      color: ${({ theme }) => theme.white};
      background: rgba(209, 65, 12, 1);
      box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.alpha.fg};
      transition: box-shadow 125ms, background-color 125ms;
      :hover {
        background: rgba(220, 75, 20, 1);
        box-shadow: 0px 0px 4px 2px ${({ theme }) => theme.alpha.fg};
      }
      :active {
        background: rgba(200, 60, 8, 1);

        box-shadow: 0px 0px 3px 0px ${({ theme }) => theme.alpha.fg};
      }
    }
    img {
      user-select: none;
      -webkit-user-drag: none;
      margin-top: 0.25rem;
    }
  }
`;
