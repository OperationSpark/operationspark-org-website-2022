import { GetStaticProps, NextPage } from 'next';

import Link from 'next/link';
import { FaArrowRight as RightArrowIcon } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import styled, { useTheme } from 'styled-components';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { IHighschoolPrograms } from '@this/data/types/programs';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import HighschoolApplicationForm from '@this/src/Forms/Form.HighschoolApplication';
import { courseTimes } from '@this/src/Forms/formData/highSchoolApplicationData';
import PlainCard from '@this/src/components/Cards/PlainCard';
import { BgImg } from '@this/src/components/Elements';
import Map from '@this/src/components/Elements/Map';
import { InfoIcon } from '@this/src/components/icons/Info';
import { Center } from '@this/src/components/layout/Center';
import { useClickAway } from '@this/src/hooks/useClickAway';
import { FC, Fragment, useState } from 'react';

const CourseTime: FC<{ courseTime: string }> = ({ courseTime }) => {
  const [startStr, endStr] = courseTime.split('→');
  const theme = useTheme();
  return (
    <Fragment>
      {startStr}
      <RightArrowIcon
        size={16}
        color={theme.isLightMode ? theme.primary[0] : theme.secondary[0]}
        style={{ margin: '0 0.25rem' }}
      />
      {endStr}
    </Fragment>
  );
};
type HighschoolSignupProps = {
  courses: IHighschoolPrograms['courses'];
};

const HighschoolSignup: NextPage<HighschoolSignupProps> = ({ courses }) => {
  const [courseInfo, setCourseInfo] = useState<IHighschoolPrograms['courses'][0] | null>(null);
  const [courseInfoRef, isOpen, setOpen] = useClickAway(() => setCourseInfo(null));

  const toggleCourseInfo = (course?: string) => {
    if (!course) {
      setCourseInfo(null);
      return setOpen(false);
    }
    const c = courses.find(({ id }) => course === id);
    if (!c || c.id === courseInfo?.id) {
      setCourseInfo(null);
      return setOpen(false);
    }

    setCourseInfo(c);
    setOpen(true);
  };

  return (
    <Main style={{ paddingTop: 0 }}>
      <HighschoolSignupStyles>
        <BgImg src='/images/display/hs-class-working.webp' height='42rem'>
          <Content
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'flex-end',
              flexFlow: 'row wrap',
            }}
          >
            <div className='program-header'>
              <div className='header-card'>
                <h1 className='dynamic-xl secondary'>Fall 2024</h1>
                <h2 className='dynamic-h2 secondary'>Coding Camp Application</h2>
                <p className='dynamic-txt'>
                  Open to sophomores, juniors, seniors
                  <b> (Graduating classes of 2025, 2026, and 2027)</b>.
                </p>
                {/* Common meeting time */}
                {/* <p className='dynamic-txt'>
                  Classes meet <b className='secondary'> three hours</b> a day,
                  <b className='secondary'> Monday</b> through <b className='secondary'>Friday</b>.
                </p> */}
                <p className='dynamic-txt'>
                  Fall classes start the week of <b className='secondary'>August 19th</b> and end
                  the week of <b className='secondary'>December 19th</b>.
                </p>
              </div>
              <Link
                href='/programs/highschool'
                style={{ display: 'flex', alignItems: 'center' }}
                className='anchor'
              >
                <span>
                  <FiChevronLeft style={{ marginRight: '0.25rem' }} />
                  Back to High School Programs
                </span>
              </Link>
            </div>
          </Content>
        </BgImg>
        <Content>
          <div className='hs-application-description dynamic-txt'>
            <PlainCard noDivider={true}>
              <div className='desc-columns'>
                <div className='left-col'>
                  <div className='hs-program-overview'>
                    <p>
                      {`This fall, we’re offering after-school courses, with in-person and virtual options. You can enroll in one or the other- there is no hybrid option. If you're able to arrange for reliable transportation to our learning center in the Marigny, we recommend in-person classes. We have a great lab with brand new equipment and an awesome staff to get you started on your coding journey. You'll also meet other students from a wide range of schools and backgrounds!`}
                    </p>
                    <br />

                    <div className='reqs-list'>
                      <b>For virtual classes, you will need:</b>
                      <ul>
                        <li>Laptop/desktop computer (Mac, Windows, or Chromebook)</li>
                        <li>Webcam and mic</li>
                        <li>Reliable internet connection </li>
                        <li>
                          Quiet place to work
                          <i className='primary-secondary' style={{ fontSize: '0.8em' }}>
                            {' (super-important!)'}
                          </i>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='right-col'>
                  <div>
                    <p>
                      <b>In person classes </b>
                      will be held at the Operation Spark Technical Learning Center
                    </p>
                    <br />
                    <Center style={{ height: 'fit-content' }}>
                      <a
                        target='_blank'
                        className='anchor right-arr-left'
                        href={'https://goo.gl/maps/X6eQ54sWbbH2RbVd8'}
                        rel='noreferrer'
                        style={{ maxWidth: '250px', justifySelf: 'flex-end' }}
                      >
                        514 Franklin Avenue
                        <br /> New Orleans, LA 70117
                      </a>
                    </Center>
                  </div>
                  <div className='opspark-map'>
                    <Map
                      href='https://goo.gl/maps/X6eQ54sWbbH2RbVd8'
                      address='514 Franklin Avenue, New Orleans, LA 70117'
                    />
                  </div>
                </div>
              </div>
            </PlainCard>
            <div className='program-time-details'>
              <h2 className='dynamic-h2'>
                <b>Fall Course Schedule:</b>
              </h2>
              <div className='course-title'>
                <b className='primary-secondary'>Fundamentals of HTML, CSS, and Javascript</b>
                <button
                  className='program-info-button'
                  onClick={() => toggleCourseInfo('fundamentals')}
                >
                  <InfoIcon />
                </button>
              </div>
              {isOpen && courseInfo?.id === 'fundamentals' && (
                <div className='course-description' ref={courseInfoRef}>
                  <PlainCard noDivider={true} shadow='none'>
                    <h3 className='dynamic-h3'> Program description </h3>
                    <p>{courseInfo.description}</p>
                    <div className='close-button'>
                      <button onClick={() => toggleCourseInfo()}>Close</button>
                    </div>
                  </PlainCard>
                </div>
              )}

              <p>
                <b>No Prerequisite</b>
              </p>

              <ul>
                {courseTimes.fundamentals.map((course) => (
                  <li key={course.value}>
                    <b className='primary-secondary'> {course.location}: </b>
                    <CourseTime courseTime={course.time} />
                  </li>
                ))}
              </ul>

              <br />
              <div className='course-title'>
                <p className='primary-secondary'>
                  <b>Advanced Javascript, Functional Programming and Web Development</b>
                </p>
                <button
                  className='program-info-button'
                  onClick={() => toggleCourseInfo('advanced')}
                >
                  <InfoIcon />
                </button>
              </div>
              {isOpen && courseInfo?.id === 'advanced' && (
                <div className='course-description' ref={courseInfoRef}>
                  <PlainCard noDivider={true} shadow='none'>
                    <h3 className='dynamic-h3'> Program description </h3>
                    <p>{courseInfo.description}</p>
                    <div className='close-button'>
                      <button onClick={() => toggleCourseInfo()}>Close</button>
                    </div>
                  </PlainCard>
                </div>
              )}
              <p>
                <b>Prerequisite: </b>Fundamentals of HTML, CSS, and Javascript
              </p>
              <ul>
                {courseTimes.advanced.map((course) => (
                  <li key={course.value}>
                    <b className='primary-secondary'> {course.location}: </b>
                    <CourseTime courseTime={course.time} />
                  </li>
                ))}
              </ul>
            </div>
            <PlainCard noDivider={true}>
              <p>
                {`Within 3 business days of completing this form, you will receive more detailed information about the course and next steps to finalize enrollment.`}
              </p>
              <br />
              <p>
                {`The course is free for students attending public, parochial, or home school in New Orleans. If you don't fit that description, we may be able to partner with your school district to cover the cost, and if not, we offer discounted tuition to families paying privately.`}
              </p>
              <br />
              <p>
                {`If you go to school in a neighboring parish outside New Orleans, we may be running a
                separate fall program in your school district. If this is the case, after you fill
                out the application, we will let you know who to contact to apply for the
                appropriate program.`}
              </p>
            </PlainCard>
          </div>
          <div className='hs-form'>
            <HighschoolApplicationForm />
          </div>
        </Content>
      </HighschoolSignupStyles>
    </Main>
  );
};

export default HighschoolSignup;

export const getStaticProps: GetStaticProps<HighschoolSignupProps> = async () => {
  const { courses }: IHighschoolPrograms = await getStaticAsset('programs', 'highschool');

  return { props: { courses } };
};

const HighschoolSignupStyles = styled.div`
  .program-header {
    margin: 0 auto;
    color: ${({ theme }) => theme.white};

    .anchor {
      color: ${({ theme }) => theme.secondary[0]};
      :hover,
      :focus-visible {
        box-shadow: 0 0 3px ${({ theme }) => (theme.isLightMode ? theme.alpha.bg : theme.alpha.fg)};
      }
    }
  }
  .header-card {
    padding: 1.5rem;
    background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg50 : theme.alpha.bg50)};
    border-radius: 0.5rem;
    backdrop-filter: blur(4px);
    box-shadow: 0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.8);
    margin-bottom: 1rem;
    max-width: 800px;
    p {
      margin: 1rem 0;
      :last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .course-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .course-description {
    width: 100%;
    margin: 0.5rem 0;
    box-shadow: 0 0 3px ${({ theme }) => theme.alpha.fg25};
    border-radius: 0.5rem;
    overflow: hidden;
    font-weight: 300;
    font-size: 1rem;
    h3 {
      margin-bottom: 0.5rem;
    }
    .close-button {
      text-align: center;
      margin-top: 1rem;
      button {
        color: ${({ theme }) => theme.red[500]};
      }
    }
  }
  .program-info-button {
    color: ${({ theme }) => theme.magenta[0]};
  }
  .program-time-details {
    margin: 2rem 0;
  }

  .plain-card-body {
    padding: 1rem;
  }

  .hs-program-overview {
    justify-content: center;
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  .hs-application-description {
    ul {
      padding-left: 2rem;
    }
    .reqs-list {
      margin: 1rem 0;
    }
    .desc-columns {
      display: flex;
      flex-flow: row wrap;
      gap: 2rem;
      .left-col {
        flex: 1;
      }
      li > s {
        color: ${({ theme }) => theme.grey[600]};
      }
      .right-col {
        display: flex;
        flex-flow: column;
        margin: 0 auto;
        margin-bottom: 2rem;
        max-width: 350px;
        justify-content: center;
        gap: 1rem;
        .opspark-map {
          max-width: 250px;
          margin: 0 auto;
          > div {
            margin: 0 0;
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .hs-application-description .desc-columns {
      flex-flow: column;
      .right-col {
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 500px;

        margin: 0 auto;
        .opspark-map {
          max-width: 150px;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    .hs-application-description .desc-columns .right-col {
      flex-flow: column;
      .opspark-map {
        max-width: 200px;
      }
    }
  }
`;
