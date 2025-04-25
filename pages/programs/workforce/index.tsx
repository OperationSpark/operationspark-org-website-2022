import axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineCloudDownload as DownloadIcon } from 'react-icons/ai';
import styled, { useTheme } from 'styled-components';

import MacCard from '@this/components/Cards/MacCard';
import MacContent from '@this/components/Cards/content/MacContent';
import { SlashDivider } from '@this/components/Elements/SlashDivider';
import { Content, Main, Section } from '@this/components/layout';
import { IQuote, ITitleDescription } from '@this/data/types/bits';
import { ICourses } from '@this/data/types/programs';
import { CourseSession } from '@this/data/types/schedule';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import ProgramInfoCard from '@this/src/components/Cards/ProgramInfoCard';
import { BgImg } from '@this/src/components/Elements';
import { toDayJs } from '@this/src/helpers/time';
import useInfoSession from '@this/src/hooks/useInfoSession';

export interface AdultProgramsProps {
  header: ITitleDescription;
  overview: ITitleDescription;
  courses: ICourses[];
  companyQuotes: IQuote[];
}

const fetchProgram = async (phaseId: string): Promise<CourseSession | null> => {
  try {
    const { data } = await axios.get<CourseSession>(`/api/programs/${phaseId}?next=true`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const AdultPrograms: NextPage<AdultProgramsProps> = ({
  overview,
  courses,
  header,
  companyQuotes,
}) => {
  const theme = useTheme();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [nextSessionDates, setNextSessionDates] = useState<Record<string, CourseSession>>({});

  const quote = companyQuotes[quoteIndex];

  const [nextInfoSession] = useInfoSession({ nextOnly: true });

  const nextInfoSessionDate = !nextInfoSession
    ? null
    : toDayJs(nextInfoSession.times.start.dateTime).format('dddd, MMMM Do h:mma (z)');

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
    let interval: NodeJS.Timeout;

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
    const fetchPrograms = async () => {
      const phases = ['ip', 'bc', 'ip', 'imj', 'ims'];
      const allPrograms = await Promise.all(phases.map(fetchProgram));
      const nextDates = {} as Record<string, CourseSession>;
      allPrograms.forEach((program) => {
        if (program?.session) {
          nextDates[program.id] = program;
        }
      });
      setNextSessionDates(nextDates);
    };
    fetchPrograms();
    // axios
    //   .get<CourseSessions[]>('/api/programs')
    //   .then(({ data }) => {
    //     const nextDates = {} as { [key: string]: ISessionRow };
    //     data.forEach((row) =>
    //       row.courses.forEach((course) => {
    //         if (course.isNext && !nextDates.hasOwnProperty(row.title)) {
    //           nextDates[row.title] = course;
    //         }
    //       }),
    //     );
    //     setNextSessionDates(nextDates);
    //   })
    //   .catch((err) => console.error(err));
  }, []);

  return (
    <Main style={{ paddingTop: 0 }}>
      <AdultProgramsStyles>
        <BgImg src='/images/display/laptop-code.webp' height='35rem'>
          <Section className='programs-header'>
            <Content className='programs-header-content'>
              <div className='header-content-card'>
                <h1 className='dynamic-xl secondary'>{header.title}</h1>
                <h2 className='dynamic-h3'>{header.description}</h2>
              </div>
            </Content>
          </Section>
        </BgImg>
        <SlashDivider />
        <Section>
          <Content
            style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
            className='program-overview basic-card'
          >
            <h2 className='dynamic-h2'>{overview.title}</h2>
            {overview.description.map((desc) => (
              <p className='dynamic-txt' key={desc} style={{ padding: '1rem 0' }}>
                {desc}
              </p>
            ))}
            <Link href='/cultureOfCode' className='anchor'>
              {'Culture of Code'}
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
              <Link
                href='/contact'
                className='anchor right-arr-left '
                aria-label='Contact to learn about employer partnerships'
                title='Contact to learn about employer partnerships'
              >
                {'Contact us to learn more about employer partnerships'}
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
              <Link className='anchor resource-link' href='/programs/workforce/schedule'>
                {'Schedule'}
              </Link>

              <a
                className='anchor resource-link'
                href='https://drive.google.com/uc?export=download&id=1EGrNIXw4DiaRPM0OM6BVVROLVQFZpoLf'
                download
              >
                Student Handbook <DownloadIcon size={18} />
              </a>
              <a
                className='anchor resource-link'
                href='https://drive.google.com/uc?export=download&id=1A8gLBRJIaPTtpGdu5jlH1P2aHvRRnLDf'
                download
              >
                Course Catalog <DownloadIcon size={18} />
              </a>
            </div>
            {courses.map((course) => (
              <ProgramInfoCard
                key={course.title + course.nextStartDate}
                {...course}
                nextInfoSessionDate={nextInfoSessionDate}
                nextSession={nextSessionDates[course.id]}
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
      align-items: center;
      text-align: center;
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
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
      grid-gap: 0.5rem;
      padding-bottom: 1rem;
    }

    .resource-link {
      width: 100%;
      padding: 0.2rem 0.5rem;
      box-shadow: 0 0 1px ${({ theme }) => theme.alpha.fg50};
      display: flex;
      align-items: center;
      justify-content: center;
      grid-gap: 0.5rem;

      :hover {
        box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg50};
        background: ${({ theme }) => theme.bgHover};
      }
    }
  }
  @media screen and (max-width: 768px) {
    .adult-courses .course-resources {
      grid-template-columns: 1fr;
    }
  }
`;
