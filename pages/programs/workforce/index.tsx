import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import styled, { useTheme } from 'styled-components';
import axios from 'axios';
import moment from 'moment';

import { Main, Section, Content } from '@this/components/layout';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import MacCard from '@this/components/Cards/MacCard';
import MacContent from '@this/components/Cards/content/MacContent';
import PlainCard from '@this/components/Cards/PlainCard';
import { SlashDivider } from '@this/components/Elements/SlashDivider';
import { IQuote, ITitleDescription } from '@this/data/types/bits';
import { ICourses } from '@this/data/types/programs';
import { BgImg } from '@this/src/components/Elements';
import useInfoSession from '@this/src/hooks/useInfoSession';
import { ISessionRow } from '@this/data/types/schedule';

export interface AdultProgramsProps {
  header: ITitleDescription;
  overview: ITitleDescription;
  courses: ICourses[];
  companyQuotes: IQuote[];
}

const AdultPrograms: NextPage<AdultProgramsProps> = ({
  overview,
  courses,
  header,
  companyQuotes,
}) => {
  const theme = useTheme();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [nextSessionDates, setNextSessionDates] = useState<{ [key: string]: ISessionRow }>({});

  const quote = companyQuotes[quoteIndex];

  const nextInfoSession = useInfoSession(true);

  const nextInfoSessionDate = !nextInfoSession
    ? null
    : moment(nextInfoSession.times.start.dateTime).format('dddd, MMMM Do h:mma');

  const handleShift = (n: number) => {
    setIsPaused(true);

    const newIndex = quoteIndex + n;

    if (newIndex < 0) {
      setQuoteIndex(companyQuotes.length - 1);
    } else if (newIndex >= companyQuotes.length) {
      setQuoteIndex(0);
    } else {
      setQuoteIndex(newIndex);
    }
    setTimeout(() => setIsPaused(false), 20000);
  };

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (!isPaused) {
      interval = setInterval(() => {
        if (quoteIndex + 1 < companyQuotes.length) {
          setQuoteIndex(quoteIndex + 1);
        } else {
          setQuoteIndex(0);
        }
      }, 20000);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [companyQuotes.length, isPaused, quoteIndex]);

  useEffect(() => {
    axios
      .get<{ [key: string]: ISessionRow }>('/api/schedule/cohorts?cohort=next')
      .then(({ data }) => setNextSessionDates(data));
  }, []);

  return (
    <Main style={{ paddingTop: 0 }}>
      <AdultProgramsStyles>
        <BgImg src='/images/display/laptop-code.webp' height='35rem'>
          <Section className='programs-header'>
            <Content className='programs-header-content'>
              <h1 className='dynamic-xl secondary'>{header.title}</h1>
              <h2 className='dynamic-h3'>{header.description}</h2>
            </Content>
          </Section>
        </BgImg>
        <SlashDivider />
        <Section>
          <Content
            style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
            className='program-overview'
          >
            <h2 className='dynamic-h2'>{overview.title}</h2>
            {overview.description.map((desc) => (
              <p className='dynamic-txt' key={desc} style={{ padding: '1rem 0' }}>
                {desc}
              </p>
            ))}
            <Link href='/cultureOfCode'>
              <a className='anchor'>Culture of Code</a>
            </Link>
          </Content>
        </Section>

        <Section className='employer-love'>
          <Content style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 className='dynamic-h1 primary'>Employers love our grads!</h1>
            <div className='need-developers'>
              <p className='dynamic-txt'>
                <b>Does your company need developers?</b>
              </p>
              <p className='dynamic-txt'>
                <b>
                  We foster employer partnerships in the community. Become a partner and gain
                  valuable talent for your company.
                </b>
              </p>
              <Link href='/contact'>
                <a
                  className='anchor right-arr-left '
                  aria-label='Contact to learn about employer partnerships'
                  title='Contact to learn about employer partnerships'
                >
                  Contact us to learn more about employer partnerships
                </a>
              </Link>
            </div>

            <div className='company-quotes'>
              <MacCard
                onNextClick={() => handleShift(1)}
                onPrevClick={() => handleShift(-1)}
                onPauseClick={() => setIsPaused(!isPaused)}
                isPaused={isPaused}
              >
                <MacContent
                  body={quote.body}
                  imageUrl={quote.imageUrl}
                  name={quote.name}
                  role={quote.role}
                  logoSrc={theme.isLightMode ? quote.logoSrcLight : quote.logoSrcDark}
                  logoHref={quote.logoHref}
                />
              </MacCard>
            </div>
          </Content>
        </Section>
        <Section className='adult-courses'>
          <Content style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Link href='/programs/workforce/schedule'>
              <a className='anchor right-arr-left'>Schedule</a>
            </Link>
            {/* <a
              className='anchor right-arr-left'
              href='https://docs.google.com/spreadsheets/d/e/2PACX-1vSw9Cv2WDZUVM3MzFztGUFaqeyx_WVNGHg-BZy2Su8uL6E5A8kqoU1gJTRpritJtc2XgzBkyQVTO_6v/pubhtml?gid=208699637&single=true'
              target='_blank'
              rel='noreferrer'
            >
              Our cohort schedule can be found here
            </a> */}

            <h1 className='dynamic-h1'>Courses</h1>
            {courses.map(({ title, length, cost, description, infoMessage, preReqs }) => (
              <PlainCard
                className='program-card _progress'
                id={title.toLowerCase().split(' ').join('-')}
                shadow='alternate'
                key={title}
              >
                <div className='program-card-body'>
                  <div className='program-card-body-left'>
                    <h2 className='dynamic-h2 primary-secondary program-title'>{title}</h2>
                    <div className='program-info-row'>
                      {cost && (
                        <p className='dynamic-txt program-info'>
                          <i>{cost}</i>
                        </p>
                      )}
                      <p className='dynamic-txt program-info'>
                        <i>{length}</i>
                      </p>
                      {preReqs && (
                        <p className='dynamic-txt program-info' style={{ paddingBottom: '0.5rem' }}>
                          <b>Prerequisites: </b> <br />
                          <i>{preReqs}</i>
                        </p>
                      )}
                    </div>
                    {nextSessionDates[title] && !infoMessage && (
                      <div>
                        <p className='dynamic-txt primary-secondary program-next-start program-info'>
                          <b className='dim'>Next start date:</b>
                        </p>
                        <p className='dynamic-txt primary-secondary program-next-start'>
                          <b>{moment(nextSessionDates[title].start).format('MMMM DD, yyyy')}</b>
                        </p>
                      </div>
                    )}
                    {infoMessage && (
                      <div>
                        <div>
                          <p className='dynamic-txt'>
                            <b className='dim'>Next info session:</b>
                          </p>
                          <p className='dynamic-txt primary-secondary indent'>
                            <b>{nextInfoSessionDate}</b>
                          </p>
                        </div>
                        <p
                          className='dynamic-txt program-next-start primary-secondary'
                          style={{ paddingTop: '0.5rem' }}
                        >
                          <Link href='/infoSession'>
                            <a className='anchor right-arr-left'>Sign up here</a>
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className='program-card-body-right'>
                    {description.map((desc) => (
                      <p key={desc} className='dynamic-txt program-desc'>
                        {desc}
                      </p>
                    ))}
                    {infoMessage && (
                      <p className='dynamic-txt info-message'>
                        <b>{infoMessage}</b>
                      </p>
                    )}
                  </div>
                </div>
              </PlainCard>
            ))}
          </Content>
        </Section>
      </AdultProgramsStyles>
    </Main>
  );
};

export const getStaticProps: GetStaticProps<AdultProgramsProps> = async () => {
  const { overview, courses, header }: AdultProgramsProps = await getStaticAsset(
    'programs',
    'adult',
  );
  const companyQuotes: IQuote[] = await getStaticAsset('quotes', 'company');

  return {
    props: { overview, courses, header, companyQuotes },
  };
};

export default AdultPrograms;

export const AdultProgramsStyles = styled.div`
  b.dim {
    color: ${({ theme }) => (theme.isLightMode ? theme.grey[600] : theme.grey[400])};
  }
  .programs-header {
    height: 20rem;
    height: 100%;
    .programs-header-content {
      height: 100%;
      display: flex;
      flex-flow: column;
      justify-content: flex-end;

      h1.dynamic-xl {
        padding-bottom: 1rem;
      }
      h2.dynamic-h3 {
        font-weight: 700;
        color: ${({ theme }) => theme.white};
      }
    }
  }
  .program-overview {
    h2.dynamic-h2 {
      color: ${({ theme: { isLightMode, primary, secondary } }) =>
        isLightMode ? primary[700] : secondary[500]};
    }
  }
  .employer-love {
    background: ${({ theme }) => theme.secondary[500]};
    display: flex;
    position: relative;
    margin-bottom: 15rem;
    padding-bottom: 20rem;
    .need-developers {
      p {
        color: ${({ theme }) => theme.black};
        padding: 1rem 0;
        max-width: 800px;
      }
      .anchor {
        color: ${({ theme }) => theme.primary[700]};
      }
      .anchor:hover {
        color: ${({ theme }) => theme.primary[900]};
        box-shadow: 0 0 2px 0px ${({ theme }) => theme.primary[600]};
      }
    }
    .company-quotes {
      position: absolute;
      left: 0;
      padding: 0 2rem;
      display: flex;
      width: 100%;
      justify-content: center;
    }
  }

  .adult-courses {
    h1 {
      padding-bottom: 2rem;
      color: ${({ theme }, { isLightMode, primary, secondary } = theme) =>
        isLightMode ? primary[700] : secondary[500]};
    }
    .program-info-row {
      padding-bottom: 0.5rem;
      p {
        padding: 0.5rem 0;
      }
    }

    .program-card-body {
      display: flex;
      grid-gap: 1rem;
      .program-card-body-left {
        width: 25%;
        display: flex;
        flex-flow: column;
      }
      .program-card-body-right {
        display: flex;
        flex-flow: column;
        justify-content: center;
        width: 75%;
      }
      .info-message {
        color: ${({ theme }) => (theme.isLightMode ? theme.magenta[400] : theme.magenta[200])};
      }
    }
    .program-card {
      margin-bottom: 2rem;
      .program-title {
        padding-bottom: 0rem;
      }
      .program-desc {
        padding: 1rem 0;
        :first-of-type {
          padding-top: 0;
        }
        :last-of-type {
          padding-bottom: 0;
        }
      }
      .program-info {
        color: ${({ theme }) => (theme.isLightMode ? theme.grey[600] : theme.grey[400])};
        font-size: 1rem;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .employer-love {
      .cols-2 {
        flex-flow: column;
        justify-content: space-between;
        .left-col,
        .right-col {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .left-col {
          height: 100%;
          padding-right: 0;
        }
        .right-col {
          flex-flow: column;
          align-items: flex-end;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .employer-love {
      .cols-2 {
        flex-flow: column;
        .left-col {
          width: 100%;
          padding-right: 0;
        }
        .right-col {
          width: 100%;
        }
      }
    }
    .adult-courses {
      .program-card {
        width: 100%;
      }
      .program-info-row {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        grid-gap: 1rem;
        p {
          min-width: 150px;
        }
      }
      .program-card-body {
        flex-flow: column;
        .program-card-body-left,
        .program-card-body-right {
          width: 100%;
        }
      }
    }
  }
`;
