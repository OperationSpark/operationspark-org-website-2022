import styled from 'styled-components';
import { motion } from 'framer-motion';
import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { IInfoSession } from '@this/data/types/infoSession';
import { ILogo } from '@this/data/types/logos';

import { cardShadow, cardShadowLtr, cardShadowRtl } from '@this/src/theme/styled/mixins/shadows';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import { Main, Section, Content } from '@this/components/layout';
import useInfoSession from '@this/src/hooks/useInfoSession';
import { getFormattedDateTime } from '@this/src/helpers/timeUtils';

const WorkforceForm = dynamic(() => import('@this/src/Forms/Form.Workforce'));
const Carousel = dynamic(() => import('@this/components/Elements/Carousel'));

interface InfoSessionProps extends IInfoSession {
  logos: ILogo[];
}

const InfoSession: NextPage<InfoSessionProps> = ({ commonQuestions, logos }) => {
  const sessionDates = useInfoSession();

  const nextSession = getFormattedDateTime(
    sessionDates?.[sessionDates.length - 1]?.times?.start?.dateTime,
  );

  return (
    <Main>
      <InfoSessionStyles>
        <Section>
          <Content className='free-info-session'>
            <div className='info-session-left'>
              <div className='left-header'>
                <h1 className='dynamic-h2'>
                  Interested in our <br />
                  Adult Workforce Program?
                </h1>
                <h1 className='dynamic-xl primary-secondary'>
                  Attend a Free
                  <br />
                  Info Session!
                </h1>
              </div>
              <div className='whats-to-learn'>
                <h2 className='dynamic-h2 '>{`IN THIS SESSION YOU'LL LEARN`}</h2>
                <ul className='what-to-learn-list'>
                  <li>about coding and career opportunities</li>
                  <li>about our programs and job search support</li>
                  <li>what it takes to be successful in our program</li>
                </ul>
              </div>

              <motion.div
                className='video-container'
                initial={{ opacity: 0, x: 0, y: -400, rotate: 90 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.8, stiffness: 100 }}
              >
                <video width='100%' height='auto' controls>
                  <source
                    src='https://player.vimeo.com/progressive_redirect/playback/721476393/rendition/1080p/file.mp4?loc=external&signature=a21ad59e5f01881f352c50593562321d778b43fbda9f6577e4270e699706f46b'
                    type='video/mp4'
                  />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </div>
            <div className='info-session-right'>
              <div className='info-session-form'>
                <div className='info-highschool'>
                  <b>HIGH SCHOOL INFORMATION</b>
                  <br />
                  Info sessions discuss <i style={{ fontWeight: 600 }}>Adult Workforce programs</i>.
                  To sign up or get more information about our{' '}
                  <i style={{ fontWeight: 600 }}>High School to High Wage program</i>,{' '}
                  <Link href='/programs/highschool/requestInfo'>
                    <a className='anchor'>please complete this form.</a>
                  </Link>
                </div>

                <div>
                  <h3 className='dynamic-h3 form-title primary-secondary text-center'>
                    Next information session:
                  </h3>
                  {!nextSession ? null : (
                    <h4 className='dynamic-h4 form-title date-time text-center source-code'>
                      {nextSession.date} <br /> {nextSession.time} ({nextSession.tz})
                    </h4>
                  )}
                </div>
                <h2 className='dynamic-h2 form-title primary-secondary text-center'>
                  Register for an info session
                </h2>

                <WorkforceForm sessionDates={sessionDates} />
              </div>
            </div>
          </Content>

          <Content className='video-container mobile-video-container'>
            <video width='100%' height='auto' controls>
              <source
                src='https://player.vimeo.com/progressive_redirect/playback/721476393/rendition/1080p/file.mp4?loc=external&signature=a21ad59e5f01881f352c50593562321d778b43fbda9f6577e4270e699706f46b'
                type='video/mp4'
              />
              Your browser does not support the video tag.
            </video>
          </Content>
        </Section>
        <Section>
          <Content className='great-companies'>
            <h1 className='dynamic-h1 primary-secondary'>Our grads work at great companies!</h1>
            <div className='stats'>
              <h2 className='dynamic-h2'>100% Job Placement</h2>
              <h2 className='dynamic-h2'>$62,000 avg starting salary</h2>
            </div>
          </Content>
        </Section>
        <Carousel logos={logos} style={{ marginTop: '3rem' }} />
        <Section>
          <Content className='common-questions'>
            {commonQuestions.map(({ question, answer }) => (
              <div key={question.join('')} className='question-answer'>
                <h3 className='dynamic-h3'>{question}</h3>
                <p>{answer}</p>
              </div>
            ))}
          </Content>
        </Section>
      </InfoSessionStyles>
    </Main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const commonQuestions: IInfoSession['commonQuestions'] = await getStaticAsset(
    'infoSession',
    'commonQuestions',
  );
  const logos: ILogo = await getStaticAsset('logos', 'partners');

  return {
    props: { commonQuestions, logos },
  };
};

export default InfoSession;

const InfoSessionStyles = styled.div`
  display: flex;
  flex-flow: column;
  .free-info-session {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    justify-content: space-between;

    .halle-img {
      width: 100%;
      height: 20vw;
      max-height: 200px;
      position: relative;
      img {
        transform: rotate(45deg);
      }
    }

    .whats-to-learn {
      margin: 0 auto;
      display: flex;
      flex-flow: column;
      justify-content: center;
    }

    .info-session-left {
      width: 100%;

      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      grid-gap: 1.5rem;
      .left-header {
        width: 100%;
        text-align: center;
        display: grid;
      }
      ul {
        list-style: none;

        li {
          font-size: 1.25rem;
          font-weight: 500;
          margin-left: 1.25rem;
          position: relative;
          line-height: 1em;
          padding: 0.5rem 0;
          ::before {
            content: '✓';
            color: green;
            font-weight: 900;
            position: absolute;
            left: -1.25rem;
          }
        }
      }
    }

    .info-session-right {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-end;
    }
    .info-session-form {
      overflow: hidden;
      padding: 1rem;
      border-radius: 0.5rem;
      max-width: 500px;
      min-width: 400px;
      ${cardShadowLtr}
      display: flex;
      flex-flow: column;
      grid-gap: 1rem;
      position: relative;
      .form-title.date-time {
        color: ${({ theme }) => (theme.isLightMode ? theme.magenta[0] : theme.green[0])};
        font-weight: 500;
      }
    }

    .info-highschool {
      b {
        color: ${({ theme }) => theme.red[0]};
      }
      max-width: 100%;
      padding: 1rem;
      border-radius: 0.25rem;
      ${cardShadowRtl}
    }
  }
  .video-container {
    display: flex;
    width: 100%;
    align-items: flex-end;
    margin: 0;
    border-radius: 0.5rem;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    filter: drop-shadow(
      0 0 1rem ${({ theme }) => (theme.isLightMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1)')}
    );
    video {
      border-radius: 0.25rem;
    }
  }
  .video-container.mobile-video-container {
    display: none;
  }

  .stats {
    display: flex;
    flex-flow: row nowrap;
    .dynamic-h2 {
      :last-child {
        padding-left: 0.5rem;
        ::before {
          content: '| ';
        }
      }
    }
  }

  .question-answer {
    box-shadow: 0 0 4px ${({ theme }) => theme.primary[200]};
    border-radius: 0.25rem;
    padding: 1rem;

    width: 100%;
    margin-bottom: 2rem;
    ${cardShadow}

    .dynamic-h3 {
      font-weight: 700;
    }
    p {
      padding: 0.5rem 0;
      font-weight: 300;
    }
  }

  @media screen and (max-width: 900px) {
    .free-info-session {
      grid-template-rows: 1fr auto;
      grid-template-columns: 1fr;
      .halle-img {
        display: none;
      }
      .info-session-left {
        .video-container {
          display: none;
        }
      }

      .info-session-right {
        margin-top: 2rem;
        justify-content: center;
        .info-session-form {
          width: 100%;
          max-width: 600px;
          min-width: 0;
        }
      }
    }
    .video-container.mobile-video-container {
      margin-top: 2rem;
      display: flex;
    }
    .great-companies {
      .stats {
        display: flex;
        flex-flow: column;
      }
    }
    .question-answer {
      width: 100%;
    }
    .stats {
      display: flex;
      flex-flow: row nowrap;
      .dynamic-h2 {
        :last-child {
          padding-left: 0;
          ::before {
            content: '';
          }
        }
      }
    }
  }
`;
