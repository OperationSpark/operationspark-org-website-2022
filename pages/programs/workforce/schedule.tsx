import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';
import { IoMdCloseCircle as CloseIcon } from 'react-icons/io';

import { Main, Section, Content } from '@this/components/layout';
import { BgImg } from '@this/src/components/Elements';
import { ICourseInfo, ISessionRow } from '@this/data/types/schedule';
import Spinner from '@this/src/components/Elements/Spinner';
import { useClickAway } from '@this/src/hooks/useClickAway';
import { toDayJs } from '@this/src/helpers/time';

type CohortState = {
  title: string;
  course?: ICourseInfo;
  courses: ISessionRow[];
};

const CohortSchedule: NextPage = () => {
  const [isLoading, setLoading] = useState<boolean>(true);

  const [courses, setCourses] = useState<CohortState[]>([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get<CohortState[]>('/api/programs')
      .then(({ data }) => setCourses(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Main style={{ paddingTop: 0 }}>
      <CohortScheduleStyles>
        <BgImg src='/images/display/cal-image.webp' height='25rem'>
          <Section className='programs-header'>
            <Content className='programs-header-content'>
              <h1 className='dynamic-xl secondary'>Workforce Calendar</h1>
              <h3 className='dynamic-h3 text-center'>Current schedule for upcoming cohorts</h3>
            </Content>
          </Section>
        </BgImg>

        <Content>
          <p className='schedule-disclaimer dynamic-txt'>
            Operation Spark includes 6 - 7 months of escalated, intense instruction geared towards a
            career in software engineering. With breaks and schedule holidays, full completion can
            take less than a year. Please see the schedule below for more details.
          </p>
          <p className='schedule-disclaimer dynamic-txt text-center'>
            <i>
              Dates subject to change, email
              <a href='mailto:admissions@operationspark.org' className='anchor'>
                admissions@operationspark.org
              </a>
              to confirm.
            </i>
          </p>
        </Content>

        {isLoading && <Spinner size={6} />}
        <div className='schedule-container'>
          {courses.map(
            ({ title, courses, course }, i) =>
              title && (
                <motion.div
                  className='schedule-cohort'
                  key={`cohort-${i}`}
                  style={{
                    gridRow: `span ${courses.length + 3}`,
                  }}
                  variants={{
                    hidden: { transition: { duration: 0 } },
                    show: { transition: { staggerChildren: 0.1, duration: 0.5 } },
                  }}
                  initial='hidden'
                  animate={isLoading ? 'hidden' : 'show'}
                >
                  <motion.div
                    className='schedule-cohort-container'
                    variants={{
                      hidden: {
                        opacity: 0,
                        transition: { staggerChildren: 0.1, duration: 0.2 },
                      },
                      show: { opacity: 1, transition: { staggerChildren: 0.05 } },
                    }}
                    initial='hidden'
                    animate={isLoading ? 'hidden' : 'show'}
                  >
                    <div className='schedule-block-header'>
                      <h3 className='dynamic-h3 schedule-block cohort-name primary-secondary'>
                        {`${i + 1}.`} {title}
                      </h3>

                      {course && <CourseInfo course={course} />}
                    </div>

                    {/* Limit list size when filtering by course only. When filtering by cohort, slicing will prevent showing every phase */}
                    {courses?.slice(0, 5)?.map((s) => (
                      <motion.div
                        variants={{
                          hidden: { y: -50, opacity: 0 },
                          show: { y: 0, opacity: 1 },
                        }}
                        className={`schedule-block ${
                          s.isNext ? 'next-session' : s.isCurrent ? 'current-session' : ''
                        }`}
                        key={`${s.phase}-${s.cohort}-${s.startDate}`}
                      >
                        <div className='schedule-block-inner'>
                          <span
                            className='schedule-block-course'
                            style={!s.isCurrent ? { color: s.color } : {}}
                          >
                            {s.cohort}
                          </span>
                          <p>
                            <span className='dim-label'>Start:</span>{' '}
                            <b className={s.isNext ? 'primary-secondary' : ''}>
                              {toDayJs(s.startDate).format('MMM D, YYYY')}
                            </b>
                          </p>
                          <p>
                            <span className='dim-label'>End: </span>{' '}
                            {toDayJs(s.endDate).format('MMM D, YYYY')}
                          </p>
                          <p className='session-time'>
                            <span className='dim-label'>Time: </span>{' '}
                            {toDayJs(s.startDate).format('h:mma')}
                            {' - '}
                            {toDayJs(s.endDate).format('h:mma (z)')}
                          </p>
                          {s.isNext && (
                            <span className='schedule-block-text next-session'>Up Next</span>
                          )}
                          {s.isCurrent && (
                            <span className='schedule-block-text current-session'>
                              Active Cohort
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ),
          )}
        </div>
      </CohortScheduleStyles>
    </Main>
  );
};

export default CohortSchedule;

export const CohortScheduleStyles = styled.div`
  cursor: default;
  .schedule-disclaimer {
    padding: 0.5rem 0;
    a {
      font-family: 'Roboto', sans-serif;
      font-size: 1em;
      line-height: 1em;
      font-weight: 400;
      padding: 0 0.25rem;
      margin: 0 0.25rem;
    }
  }
  select {
    color: ${({ theme }) => theme.fg};
    background: ${({ theme }) => theme.bg};
    padding: 0.5rem;
    border: none;
    outline: none;
    box-shadow: 0 0 3px ${({ theme }) => theme.alpha.fg};
    border-radius: 0.25rem;
    margin: 1rem;
    :focus {
      outline: 2px solid ${({ theme }) => theme.secondary[800]};
    }
    option {
      :disabled {
        background: ${({ theme }) => theme.grey[500]};
        color: ${({ theme }) => theme.white};
      }
    }
    option.reset-option {
      background: ${({ theme }) => theme.red[0]};
      color: ${({ theme }) => theme.white};
    }
  }
  .programs-header {
    height: 20rem;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }
  .programs-header-content {
    background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg50 : theme.alpha.bg50)};
    width: fit-content;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    backdrop-filter: blur(8px);
    color: ${({ theme }) => theme.white};
  }

  .schedule-container {
    display: flex;
    flex-flow: row wrap;
    padding: 1rem;
    grid-gap: 1.5rem;
    margin: 0 auto;
  }
  .schedule-cohort {
    flex: 1;
    min-width: 20rem;
  }
  .schedule-cohort-container {
    width: 100%;
    page-break-inside: avoid;
    display: flex;
    flex-flow: column;
    grid-gap: 0.5rem;

    border-radius: 0.25rem;
    background: ${({ theme }) => theme.bg};
    .cohort-name {
      text-align: center;
    }
  }

  .schedule-block {
    position: relative;
    padding: 0.2rem;
    background: ${({ theme }) => theme.bg};
    box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg};
    border-radius: 0.25rem;
    max-width: 600px;
    width: 100%;
    margin: 0 auto;

    :first-child {
      box-shadow: none;
    }
    p {
      display: flex;
    }
    .session-time {
      color: ${({ theme }) => theme.grey[500]};
      font-weight: 400;
      font-size: 0.9rem;
    }
  }
  .dim-label {
    color: ${({ theme }) => theme.grey[500]};
    width: 50px;
  }
  .schedule-block-header {
    position: relative;
  }
  .schedule-block-course {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    font-size: 0.8rem;
    border-radius: 0.25rem;
    font-weight: 500;
    font-size: 1.1rem;
    color: ${({ theme }) => (theme.isLightMode ? theme.magenta[700] : theme.magenta[100])};
    background: ${({ theme }) => theme.black};
    padding: 0.2rem 0.4rem;
    line-height: 1em;
    filter: saturate(4);
  }
  .schedule-block-text {
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.2rem 0.4rem;
    line-height: 1em;
    border-radius: 0.25rem;
    font-style: italic;

    &.current-session {
      font-weight: 400;
      color: ${({ theme }) => theme.alpha.fg50};
    }
    &.next-session {
      color: ${({ theme }) => theme.green[300]};
      background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg50 : theme.alpha.bg)};
    }
  }
  .schedule-block.next-session {
    box-shadow: 0 0 3px ${({ theme }) => (theme.isLightMode ? theme.green[900] : theme.green[300])};

    background-color: ${({ theme }) => theme.bg};
    background-image: ${({ theme }) =>
      theme.isLightMode
        ? 'url(/images/textures/cream-paper-purple.png)'
        : 'url(/images/textures/cream-paper-yellow.png)'};
    font-weight: bold;
  }
  .schedule-block.current-session {
    color: ${({ theme }) => theme.alpha.fg25};
    background: ${({ theme }) => theme.alpha.fg10};
    box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg25};
    .schedule-block-inner {
      background: none;
    }
    .schedule-block-course {
      color: ${({ theme }) => theme.alpha.fg25};
      background: ${({ theme }) => theme.alpha.fg10};
      box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg25};
    }
  }
  .schedule-block-inner {
    background: ${({ theme }) => (theme.isLightMode ? theme.alpha.bg50 : theme.alpha.bg)};
    backdrop-filter: blur(1px);
    position: relative;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    print-color-adjust: exact;
  }

  @media print {
    .schedule-container {
      display: flex;
      flex-flow: column;
    }
    .schedule-cohort-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    grid-column: span 4;
    .schedule-block-next,
    .schedule-block-course {
      position: static;
      padding: 0;
      font-weight: 900;
      print-color-adjust: exact;

      background: transparent !important;
      -webkit-print-color-adjust: economy;
    }
    .schedule-block-header {
      grid-column: span 4;
      page-break-before: auto;
      background: inherit;
    }
    .schedule-block {
      width: fit-content;
      print-color-adjust: exact;
      background: rgba(255, 255, 255, 0);
    }
    .schedule-block-inner {
      background: rgba(255, 255, 255, 0);
    }

    .schedule-block.next-session {
      background: rgba(50, 175, 100, 1);
      .schedule-block-inner {
        background: rgba(255, 255, 255, 1);
      }
    }
  }
`;

const CourseInfo = ({ course }: { course: ICourseInfo }) => {
  const [iconRef, isOpen, setOpen] = useClickAway();
  const { cost, days, hours, length, preReqs, title } = course;

  const dayRange = `${days[0]} - ${days[days.length - 1]}`;

  const CloseOrInfoIcon = isOpen ? CloseIcon : InfoIcon;

  return (
    <CourseInfoStyles ref={iconRef}>
      <div className='course-info-container'>
        <button className={`info-icon ${isOpen ? 'open' : ''}`} onClick={() => setOpen(!isOpen)}>
          <CloseOrInfoIcon size={20} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='course-info'
              initial={{ y: '-50%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-50%', opacity: 0 }}
              transition={{ type: 'tween', duration: 0.15 }}
            >
              <div className='course-info-section'>
                <p className='primary-secondary bold'> {title}</p>
              </div>
              <div className='course-info-section'>
                <p className='dim italic'> {length}</p>
              </div>
              <div className='course-info-section'>
                <p className='dim bold'>{dayRange}</p>
                {hours.map((hour) => (
                  <p className='dim' key={hour}>
                    {hour}
                  </p>
                ))}
              </div>
              <div className='course-info-section'>
                <p className='dim bold italic'>{cost}</p>
              </div>
              <div className='course-info-section'>
                <p className='dim bold'>Prerequisites</p>
                <p className='dim italic'>{preReqs}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CourseInfoStyles>
  );
};

const CourseInfoStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: calc(100% - 1rem);
  margin: 0 0.5rem;
  display: flex;
  justify-content: center;
  z-index: 100;

  .course-info-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    padding: 0.5rem;
  }
  .info-icon {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    width: fit-content;
    color: ${({ theme }) => (theme.isLightMode ? theme.primary[0] : theme.secondary[0])};
    :hover,
    &.open {
      z-index: 101;
    }
    :hover {
      color: ${({ theme }) => (theme.isLightMode ? theme.grey[600] : theme.grey[300])};
    }
    &.open {
      color: ${({ theme }) => (theme.isLightMode ? theme.red[300] : theme.red[300])};
      :hover {
        color: ${({ theme }) => (theme.isLightMode ? theme.red[500] : theme.red[400])};
      }
    }
    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.secondary[800]};
    }
  }
  .course-info {
    /* position: absolute; */
    overflow: hidden;

    top: 0;
    z-index: 100;
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    background: ${({ theme }) => theme.bg};

    backdrop-filter: blur(8px);
    box-shadow: 0 0 0.25rem ${({ theme }) => theme.alpha.fg50};
    border-radius: 0.25rem;
    padding: 0.5rem 0;
    .dim {
      color: ${({ theme }) => (theme.isLightMode ? theme.grey[600] : theme.grey[400])};
    }
    p.bold {
      font-weight: 700;
    }
    p.italic {
      font-style: italic;
    }
    .course-info-section {
      padding: 0.25rem 0;
      text-align: center;
      :first-of-type {
        padding-top: 0;
      }
      :last-of-type {
        padding-bottom: 0;
      }
    }
  }
`;
