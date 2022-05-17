import dynamic from 'next/dynamic';
import { GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';
import axios from 'axios';

import { IInfoSession } from '@this/data/types/infoSession';
import { ILogo } from '@this/data/types/logos';

import {
  cardShadow,
  cardShadowLtr,
  cardShadowRtl,
} from '@this/src/theme/styled/mixins/shadows';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import { ISessionDates } from '@this/pages-api/infoSession/dates';
import { Main, Section, Content } from '@this/components/layout';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const WorkforceForm = dynamic(() => import('@this/src/Forms/Form.Workforce'));
const Carousel = dynamic(() => import('@this/components/Elements/Carousel'));

interface InfoSessionProps extends IInfoSession {
  logos: ILogo[];
}

const InfoSession: NextPage<InfoSessionProps> = ({
  commonQuestions,
  logos,
}) => {
  const [sessionDates, setSessionDates] = useState<ISessionDates[]>([]);

  useEffect(() => {
    axios
      .get('/api/infoSession/dates')
      .then(({ data }) => setSessionDates(data));
  }, []);
  return (
    <Main>
      <InfoSessionStyles>
        <Section>
          <Content className='free-info-session'>
            <div className='info-session-left'>
              <div className='left-header'>
                <h1 className='dynamic-h3'>
                  Interested in our Adult Workforce Program?
                </h1>
                <h1 className='dynamic-xl'>Attend a Free Info Session!</h1>
              </div>
              <div className='whats-to-learn'>
                <h2 className='dynamic-h2'>
                  IN THIS SESSION YOU&apos;LL LEARN
                </h2>
                <ul className='what-to-learn-list'>
                  <li>about coding and career opportunities</li>
                  <li>about our programs and job search support</li>
                  <li>what it takes to be successful in our program</li>
                </ul>
              </div>
            </div>
            <div className='info-session-right'>
              <div className='info-session-form'>
                <div className='info-highschool'>
                  <b>HIGH SCHOOL INFORMATION</b>
                  <br />
                  Info sessions discuss{' '}
                  <i style={{ fontWeight: 600 }}>adult workforce programs</i>.
                  To sign up or get more information about our{' '}
                  <i style={{ fontWeight: 600 }}>
                    High School to High Wage program
                  </i>
                  ,{' '}
                  <Link href='/programs/highschool/signup'>
                    <a className='anchor'>please complete this form.</a>
                  </Link>
                </div>
                <h2 className='dynamic-h3'>
                  Register for upcoming info session
                </h2>
                <WorkforceForm sessionDates={sessionDates} />
              </div>
            </div>
          </Content>
        </Section>
        <Section>
          <Content className='great-companies'>
            <h1 className='dynamic-h1'>Our grads work at great companies!</h1>
            <div className='stats'>
              <h2 className='dynamic-h2'>100% Job Placement</h2>
              <h2 className='dynamic-h2'>$60,000 average salary</h2>
            </div>
            <Carousel logos={logos} style={{ marginTop: '3rem' }} />
          </Content>
        </Section>
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
    grid-gap: 2rem;
    justify-content: space-between;

    .dynamic-xl {
      line-height: 1em;
      padding: 1rem 0;
      height: 100%;
      display: flex;
      align-items: center;
      color: ${({ theme }) =>
        theme.isLightMode ? theme.primary[500] : theme.secondary[400]};
    }
    .dynamic-h3 {
      font-weight: 700;
    }
    .whats-to-learn {
      .dynamic-h2 {
        font-weight: 900;
      }
      padding-top: 1rem;
    }

    .info-session-left {
      width: 100%;

      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;

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
      justify-content: flex-end;
    }
    .info-session-form {
      overflow: hidden;
      padding: 1rem;
      border-radius: 0.5rem;
      max-width: 500px;
      min-width: 400px;
      ${cardShadowLtr}
    }
    h2 {
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    .info-highschool {
      ${cardShadowRtl}
      b {
        color: ${({ theme }) => theme.red[0]};
      }
      max-width: 100%;
      padding: 1rem;
      border-radius: 0.25rem;
    }
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
  .great-companies {
    h1.dynamic-h1 {
      color: ${({ theme }) =>
        theme.isLightMode ? theme.primary[500] : theme.secondary[400]};
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

  @media screen and (max-width: 768px) {
    .free-info-session {
      grid-template-rows: 1fr auto;
      grid-template-columns: 1fr;
      .info-session-right {
        margin-top: 2rem;
        justify-content: center;
        .info-session-form {
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }
      }
    }
    .great-companies {
      h1 {
      }
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
