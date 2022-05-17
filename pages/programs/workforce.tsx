import { Fragment } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import styled, { useTheme } from 'styled-components';

import { IAdultPrograms } from '@this/data/types/programs';
import { Main, Section, Content } from '@this/components/layout';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import MacCard from '@this/components/Cards/MacCard';
import MacContent from '@this/components/Cards/content/MacContent';
import PlainCard from '@this/components/Cards/PlainCard';
import { SlashDivider } from '@this/components/Elements/SlashDivider';
import NavLink from '@this/components/Navbar/elements/NavLink';
import { TwoColumns } from '@this/components/Elements/Columns';

const AdultPrograms: NextPage<IAdultPrograms> = ({
  overview,
  courses,
  header,
}) => {
  const theme = useTheme();
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
                <MacCard onNextClick={() => {}} onPrevClick={() => {}}>
                  <MacContent
                    body={`“Operation Spark is a true disruptor of the classical software
                  engineering education domain. Their graduates possess real-world
                  experience in today's modern technologies. For this reason,
                  we have had great success hiring their graduates.”`}
                    imageUrl='/images/people/employers/tim-blackmon.jpg'
                    name='Tim Blackmon'
                    role='CIO, Hired 6 grads at Mumms Software'
                    logoImageUrl={`/images/logos/supporters/mumms-software-${theme.colorMode}.png`}
                    logoUrl='https://mumms.com/'
                  />
                </MacCard>
              }
              rightCol={
                <Fragment>
                  <p
                    className='dynamic-txt'
                    style={{
                      padding: '2rem 0',
                      maxWidth: '90%',
                      margin: '0 auto',
                      color: 'rgba(25,25,25,1)',
                    }}
                  >
                    <b>
                      Does your company need developers? We foster employer
                      partnerships in the community. Become a partner and gain
                      valuable talent for your company.
                    </b>
                  </p>
                  <NavLink href='/partners'>Employer Partnerships</NavLink>
                </Fragment>
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
                  <h2 className='dynamic-h2 program-title'>{title}</h2>
                  <p className='dynamic-txt program-length'>
                    <b>Length: {length}</b>
                  </p>
                  {description.map((desc) => (
                    <p key={desc} className='dynamic-txt program-desc'>
                      {desc}
                    </p>
                  ))}
                  {nextStartDate && (
                    <p className='dynamic-txt program-next-start'>
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

export const getStaticProps: GetStaticProps<IAdultPrograms> = async () => {
  const { overview, courses, header }: IAdultPrograms = await getStaticAsset(
    'programs',
    'adult',
  );

  return {
    props: { overview, courses, header },
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
    h1 {
      color: ${({ theme }) => theme.primary[700]};
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
