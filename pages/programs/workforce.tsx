import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import styled, { useTheme } from 'styled-components';

import { Main, Section, Content } from '@this/components/layout';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import MacCard from '@this/components/Cards/MacCard';
import MacContent from '@this/components/Cards/content/MacContent';
import PlainCard from '@this/components/Cards/PlainCard';
import { SlashDivider } from '@this/components/Elements/SlashDivider';
import { TwoColumns } from '@this/components/Elements/Columns';
import { IQuote, ITitleDescription } from '@this/data/types/bits';
import { ICourses } from '@this/data/types/programs';

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
  const quote = companyQuotes[quoteIndex];

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

  return (
    <Main>
      <AdultProgramsStyles>
        <Section className='programs-header'>
          <Content className='programs-header-content'>
            <h1 className='dynamic-xl'>{header.title}</h1>
            <h2 className='dynamic-h3'>{header.description}</h2>
          </Content>
        </Section>
        <SlashDivider />
        <Section>
          <Content
            style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
            className='program-overview'
          >
            <h2 className='dynamic-h2'>{overview.title}</h2>
            {overview.description.map((desc) => (
              <p
                className='dynamic-txt'
                key={desc}
                style={{ padding: '1rem 0' }}
              >
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
            <h1 className='dynamic-h1'>Employers love our grads!</h1>
            <TwoColumns
              leftColStyle={{ width: '60%', paddingRight: '2rem' }}
              rightColStyle={{ width: '40%', paddingLeft: '2rem' }}
              leftCol={
                <MacCard
                  onNextClick={() => handleShift(1)}
                  onPrevClick={() => handleShift(-1)}
                >
                  <MacContent
                    body={quote.body}
                    imageUrl={quote.imageUrl}
                    name={quote.name}
                    role={quote.role}
                    logoSrc={
                      theme.isLightMode ? quote.logoSrcLight : quote.logoSrcDark
                    }
                    logoHref='https://mumms.com/'
                  />
                </MacCard>
              }
              rightCol={
                <div className='right-col-container'>
                  <div className='right-col'>
                    <p
                      className='dynamic-txt'
                      style={{
                        paddingBottom: '1rem',
                        maxWidth: '100%',

                        color: 'rgba(25,25,25,1)',
                      }}
                    >
                      <b>
                        Does your company need developers? We foster employer
                        partnerships in the community. Become a partner and gain
                        valuable talent for your company.
                      </b>
                    </p>
                    <Link href='/partners'>
                      <a
                        className='anchor right-arr-left'
                        aria-label='Learn about job placement'
                        title='Job Placement'
                      >
                        Learn more about employer partnerships
                      </a>
                    </Link>
                  </div>
                </div>
              }
            ></TwoColumns>
          </Content>
        </Section>
        <Section className='adult-courses'>
          <Content style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 className='dynamic-h1'>Courses</h1>
            {courses.map(({ title, length, description, nextStartDate }) => (
              <PlainCard
                className='program-card _progress'
                id={title.toLowerCase().split(' ').join('-')}
                shadow='alternate'
                key={title}
              >
                <div className='program-card-body '>
                  <h2 className='dynamic-h2 primary-secondary program-title'>
                    {title}
                  </h2>
                  <p className='dynamic-txt program-length'>
                    <i>Length: {length}</i>
                  </p>
                  {description.map((desc) => (
                    <p key={desc} className='dynamic-txt program-desc'>
                      {desc}
                    </p>
                  ))}
                  {nextStartDate && (
                    <p className='dynamic-txt primary-secondary program-next-start'>
                      <b>Next start date: {nextStartDate}</b>
                    </p>
                  )}
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
  const { overview, courses, header }: AdultProgramsProps =
    await getStaticAsset('programs', 'adult');
  const companyQuotes: IQuote[] = await getStaticAsset('quotes', 'company');

  return {
    props: { overview, courses, header, companyQuotes },
  };
};

export default AdultPrograms;

export const AdultProgramsStyles = styled.div`
  .programs-header {
    height: 20rem;
    .programs-header-content {
      height: 100%;
      display: flex;
      flex-flow: column;
      justify-content: center;
      h1 {
        color: ${({ theme: { isLightMode, primary, secondary } }) =>
          isLightMode ? primary[700] : secondary[500]};
      }
      h1.dynamic-xl {
        padding-bottom: 1rem;
      }
      h2.dynamic-h3 {
        font-weight: 700;
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
    min-height: 42rem;
    display: flex;

    h1 {
      color: ${({ theme }) => theme.primary[700]};
    }
    .right-col-container {
      display: flex;
      align-items: center;
      height: 100%;

      .right-col {
        display: flex;
        align-items: center;
        flex-flow: row wrap;

        .anchor {
          color: ${({ theme }) => theme.primary[700]};
        }
        .anchor:hover {
          color: ${({ theme }) => theme.primary[900]};
          box-shadow: 0 0 2px 0px ${({ theme }) => theme.primary[600]};
        }
      }
    }
  }

  .adult-courses {
    h1 {
      padding-bottom: 2rem;
      color: ${({ theme }, { isLightMode, primary, secondary } = theme) =>
        isLightMode ? primary[700] : secondary[500]};
    }
    .program-card {
      margin-bottom: 2rem;
      .program-title {
        padding-bottom: 1rem;
      }
      .program-desc {
        padding: 1rem 0;
      }
      .program-length {
        color: ${({ theme }) =>
          theme.isLightMode ? theme.grey[600] : theme.grey[400]};
        font-size: 1rem;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .employer-love {
      .cols-2 {
        flex-flow: column;

        .left-col,
        .right-col {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .left-col {
          padding-right: 0;
        }
        .right-col {
          flex-flow: column;
          align-items: center;
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
    }
  }
`;
