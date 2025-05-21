import { IInfoSession } from '@this/data/types/infoSession';
import { ILogo } from '@this/data/types/logos';
import { motion } from 'framer-motion';
import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Content, Main, Section } from '@this/components/layout';
import { TOption } from '@this/data/types/bits';
import useKeyCombo from '@this/hooks/useKeyCombo';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import { referencedByOptions } from '@this/src/Forms/formData/referenceOptions';
import { getFormattedDateTime } from '@this/src/helpers/timeUtils';
import useInfoSession from '@this/src/hooks/useInfoSession';
import { cardShadow, cardShadowLtr, cardShadowRtl } from '@this/src/theme/styled/mixins/shadows';
import { useEffect, useState } from 'react';

const WorkforceForm = dynamic(() => import('@this/src/Forms/Form.Workforce'));
const Carousel = dynamic(() => import('@this/components/Elements/Carousel'));

interface InfoSessionProps extends IInfoSession {
  logos: ILogo[];
}

const InfoSession: NextPage<InfoSessionProps> = ({ commonQuestions, logos }) => {
  const router = useRouter();
  const isKeyComboActive = useKeyCombo('o', 's');
  const sessionDates = useInfoSession({ showPrivate: isKeyComboActive });
  const nextSessionDate = sessionDates.find((s) => !s.private);
  const nextSession = getFormattedDateTime(nextSessionDate?.times?.start?.dateTime);

  const [referredBy, setReferredBy] = useState<TOption | undefined>();

  useEffect(() => {
    const { referred_by = '' } = router.query;
    const referredByStr = Array.isArray(referred_by) ? referred_by[0] : referred_by;
    if (!referredByStr) return;
    const [referredType, referredValue] = referredByStr.split('@');
    const defaultOption = {
      name: 'Other Advertising',
      value: 'other-advertising',
      additionalInfoLabel: 'Where did you hear about us?',
      additionalInfo: referredType,
    };
    const referredByOption = referencedByOptions.find(
      (option) => option.value === referredType.toLowerCase(),
    );

    if (!referredByOption) {
      setReferredBy(defaultOption);
      return;
    }

    if (referredByOption.additionalInfo) {
      referredValue &&
        setReferredBy({
          ...referredByOption,
          additionalInfoLabel: referredByOption.additionalInfo,
          additionalInfo: referredValue,
        });
      return;
    }

    setReferredBy(referredByOption);
  }, [router.query]);

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
                <h1 className='dynamic-xl primary-secondary mb0 mt0'>
                  Attend a Free
                  <br />
                  Info Session!
                </h1>
              </div>
              <div className='whats-to-learn'>
                <h2 className='dynamic-h2 text-center mb0'>{`YOU'LL LEARN ABOUT`}</h2>
                <ul className='what-to-learn-list'>
                  <li>Coding and career opportunities</li>
                  <li>Our program and job search support</li>
                  <li>What it takes to be successful in our program</li>
                  <li>How to enroll at Operation Spark</li>
                </ul>
                <a className='anchor' href='#common-questions' style={{ alignSelf: 'center' }}>
                  Learn More
                </a>
              </div>

              <motion.div
                className='video-container'
                initial={{ opacity: 0, x: 0, y: 150, scale: 0.6 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ type: 'tween', duration: 0.8 }}
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
                  <Link href='/programs/highschool/requestInfo' className='anchor'>
                    {'please complete this form.'}
                  </Link>
                </div>

                <div>
                  <h3 className='dynamic-h3 form-title primary-secondary text-center next-session'>
                    Next information session:
                  </h3>
                  {!nextSession ? null : (
                    <h4
                      className='dynamic-h4 form-title date-time text-center source-code'
                      data-test-id='next-session-date-time'
                    >
                      {nextSession.date} <br /> {nextSession.time} ({nextSession.tz})
                    </h4>
                  )}
                </div>
                <h2 className='dynamic-h2 form-title primary-secondary text-center'>
                  Register for an info session
                </h2>

                <WorkforceForm sessionDates={sessionDates} referredBy={referredBy} />
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
            <h1 className='dynamic-h1 primary-secondary'>Our grads work at great companies</h1>
            <h2 className='dynamic-h2'>$67,000 average starting salary</h2>
          </Content>
        </Section>
        <Carousel logos={logos} style={{ marginTop: '3rem' }} />
        <Section>
          <div id='common-questions' className='page-marker'></div>
          <Content className='common-questions'>
            <h1 className='dynamic-h2'>Common Questions</h1>
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
        padding-top: 1rem;
        li {
          font-size: 1.25rem;
          font-weight: 500;
          margin-left: 1.25rem;
          position: relative;
          line-height: 1.5em;
          padding: 0.5rem 0 0.75rem 1.5rem;

          ::before {
            content: '✓';
            color: ${({ theme }) => theme.green[0]};
            font-weight: 900;
            font-size: 2rem;
            position: absolute;
            left: -1.25rem;
            height: 100%;
            top: 0;
            display: flex;
            align-items: center;
            filter: drop-shadow(0 0 3px rgba(0, 255, 0, 1));
            text-shadow: 0 0 3px rgba(0, 0, 0, 1);
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
      ${cardShadowLtr};
      display: flex;
      flex-flow: column;
      grid-gap: 1rem;
      position: relative;
      height: fit-content;
      .form-title.date-time {
        color: ${({ theme }) => (theme.isLightMode ? theme.magenta[0] : theme.green[0])};
        font-weight: 500;
        margin: 0;
      }
      .form-title.next-session {
        margin: 0;
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

    .question-answer {
      width: 100%;
    }
  }
`;
