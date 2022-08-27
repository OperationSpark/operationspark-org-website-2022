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
import { SlashDivider } from '@this/components/Elements/SlashDivider';
import { IQuote, ITitleDescription } from '@this/data/types/bits';
import { ICourses } from '@this/data/types/programs';
import { BgImg } from '@this/src/components/Elements';
import useInfoSession from '@this/src/hooks/useInfoSession';
import { ISessionRow } from '@this/data/types/schedule';
import ProgramInfoCard from '@this/src/components/Cards/ProgramInfoCard';

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
      .get<{ [key: string]: ISessionRow }>('/api/schedule/cohorts/next')
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
          <Content style={{ paddingTop: '2rem', paddingBottom: '0' }}>
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
          <Content style={{ paddingTop: '0', paddingBottom: '2rem' }}>
            <h1 className='dynamic-h1'>Courses</h1>
            <div className='course-resources'>
              <h3 className='dynamic-h3 primary-secondary'>Resource Links</h3>
              <div className='course-links'>
                <Link href='/programs/workforce/schedule'>
                  <a className='anchor right-arr-left'>Schedule</a>
                </Link>

                <a
                  className='anchor right-arr-left'
                  href='https://drive.google.com/uc?export=download&id=1EGrNIXw4DiaRPM0OM6BVVROLVQFZpoLf'
                  target='_blank'
                  rel='noreferrer'
                >
                  Student Handbook
                </a>
                <a
                  className='anchor right-arr-left'
                  href='https://drive.google.com/uc?export=download&id=11YBNYIzM-K7ciown_BMMu0cRVzh2hhW0'
                  target='_blank'
                  rel='noreferrer'
                >
                  Course Catalog
                </a>
              </div>
            </div>
            {courses.map((course) => (
              <ProgramInfoCard
                key={course.title + course.nextStartDate}
                {...course}
                nextInfoSessionDate={nextInfoSessionDate}
                nextSessionDates={nextSessionDates}
              />
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
    background: ${({ theme }) => `
      linear-gradient(180deg,
        ${theme.secondary[500]} 0%,
        ${theme.secondary[500]} 70%,
        ${theme.bg} 70%,
        ${theme.bg} 100%
      )

    `};
    padding-bottom: 0;
    display: flex;
    position: relative;

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
      left: 0;

      display: flex;
      width: 100%;
      justify-content: center;
    }
  }

  .adult-courses {
    h1 {
      color: ${({ theme }, { isLightMode, primary, secondary } = theme) =>
        isLightMode ? primary[700] : secondary[500]};
    }
    .course-resources {
      padding: 1rem 0;
    }
    .course-links {
      padding-left: 0.5rem;
      padding-top: 0.5rem;
      display: flex;
      flex-flow: column;
      grid-gap: 0.5rem;
    }
  }
`;
