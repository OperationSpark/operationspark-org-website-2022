import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import moment from 'moment';
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';
import { IoMdCloseCircle as CloseIcon } from 'react-icons/io';

import { Main, Section, Content } from '@this/components/layout';
import { BgImg } from '@this/src/components/Elements';
import { ICourseInfo, ISessionRow } from '@this/data/types/schedule';
import Spinner from '@this/src/components/Elements/Spinner';
import { useClickAway } from '@this/src/hooks/useClickAway';

type CohortState = {
  title: string;
  course?: ICourseInfo;
  courses: ISessionRow[];
};

const CohortSchedule: NextPage = () => {
  const [groupBy, setGroupBy] = useState<string>('course');
  const [isLoading, setLoading] = useState<boolean>(true);
  const [sessionDates, setSessionDates] = useState<CohortState[]>([]);

  useEffect(() => {
    const q = `?group=${groupBy}`;
    setLoading(true);
    axios.get<CohortState[]>(`/api/schedule/cohorts${q}`).then(({ data }) => {
      setSessionDates(data);
      setLoading(false);
    });
  }, [groupBy]);

  return (
    <Main style={{ paddingTop: 0 }}>
      <CohortScheduleStyles>
        <BgImg src='/images/display/cal-image.webp' height='25rem'>
          <Section className='programs-header'>
            <Content className='programs-header-content'>
              <h1 className='dynamic-xl secondary'>Workforce Calendar</h1>
              <h3 className='dynamic-h3'>View schedule for upcoming sessions</h3>
            </Content>
          </Section>
        </BgImg>

        <select onChange={(e) => setGroupBy(e.target.value)} value={groupBy}>
          {['course', 'cohort'].map((id) => (
            <option key={id} value={id}>
              {id[0].toUpperCase() + id.slice(1)}
            </option>
          ))}
        </select>

        {isLoading && <Spinner size={6} />}
        <div className='schedule-container'>
          {sessionDates.map(
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
                        {groupBy === 'course' && `${i + 1}.`} {title}
                      </h3>

                      {course && groupBy === 'course' && <CourseInfo course={course} />}
                    </div>
                    {courses?.map(
                      (s) =>
                        s &&
                        !s.isPast && (
                          <motion.div
                            variants={{
                              hidden: { y: -50, opacity: 0 },
                              show: { y: 0, opacity: 1 },
                            }}
                            className={`schedule-block ${s.isNext ? 'next-session' : ''}`}
                            key={`${s.course}-${s.cohort}-${s.year}`}
                          >
                            <div className='schedule-block-inner'>
                              <span
                                className='schedule-block-course'
                                style={
                                  groupBy === 'course' ? { color: s.fg, background: s.bg } : {}
                                }
                              >
                                {groupBy === 'course' ? s.cohort : s.course}
                              </span>
                              <p>
                                Start:{' '}
                                <b className={s.isNext ? 'primary-secondary' : ''}>
                                  {moment(s.start).format('MMM d, YYYY')}
                                </b>
                              </p>
                              <p>End: {moment(s.end).format('MMM d, YYYY')}</p>
                              {s.isNext && <span className='schedule-block-next'>Up Next</span>}
                            </div>
                          </motion.div>
                        ),
                    )}
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-template-rows: auto;

    padding: 1rem;
    grid-gap: 1rem;
    margin: 0 auto;
  }
  .schedule-cohort {
    width: 100%;
  }
  .schedule-cohort-container {
    width: 100%;
    display: flex;
    flex-flow: column;
    grid-gap: 0.5rem;
    padding: 0.5rem;

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

    :first-child {
      box-shadow: none;
    }
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
    font-weight: 600;
    color: ${({ theme }) => (theme.isLightMode ? theme.magenta[700] : theme.magenta[100])};
    background: ${({ theme }) => (theme.isLightMode ? theme.alpha.bg : theme.alpha.bg)};
    padding: 0.2rem 0.4rem;
    line-height: 1em;
  }
  .schedule-block-next {
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    font-size: 0.8rem;
    font-weight: 600;
    font-style: italic;
    color: ${({ theme }) => (theme.isLightMode ? theme.green[300] : theme.green[300])};
    background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg : theme.alpha.bg)};
    padding: 0.2rem 0.4rem;
    line-height: 1em;
    border-radius: 0.25rem;
  }
  .schedule-block.next-session {
    box-shadow: 0 0 3px
      ${({ theme }) => (theme.isLightMode ? theme.primary[0] : theme.secondary[0])};
    background-color: ${({ theme }) => theme.bg};
    background-image: ${({ theme }) =>
      theme.isLightMode
        ? 'url(/images/textures/cream-paper-purple.png)'
        : 'url(/images/textures/cream-paper-yellow.png)'};
    font-weight: bold;
  }
  .schedule-block-inner {
    background-color: ${({ theme }) => theme.bg};
    position: relative;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
  }
  .schedule-header {
  }
`;

const CourseInfo = ({ course }: { course: ICourseInfo }) => {
  const [iconRef, isOpen, setOpen] = useClickAway();
  const { cost, days, hours, length, preReqs, title } = course;

  const dayRange = `${days[0]} - ${days[days.length - 1]}`;

  const CloseOrInfoIcon = isOpen ? CloseIcon : InfoIcon;

  return (
    <CourseInfoStyles ref={iconRef}>
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
              {hours.map((hours) => (
                <p className='dim' key={hours}>
                  {hours}
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
    </CourseInfoStyles>
  );
};

const CourseInfoStyles = styled.div`
  position: absolute;
  top: 0rem;
  width: calc(100% - 1rem);
  margin: 0 0.5rem;
  .info-icon {
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
    width: fit-content;
    color: ${({ theme }) => (theme.isLightMode ? theme.grey[500] : theme.grey[400])};
    :hover,
    &.open {
      z-index: 101;
    }
    :hover {
      color: ${({ theme }) => (theme.isLightMode ? theme.grey[600] : theme.grey[300])};
    }
    &.open {
      color: ${({ theme }) => (theme.isLightMode ? theme.magenta[500] : theme.magenta[200])};
      :hover {
        color: ${({ theme }) => (theme.isLightMode ? theme.red[500] : theme.red[400])};
      }
    }
  }
  .course-info {
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    z-index: 100;
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    background: ${({ theme }) => theme.bg};

    backdrop-filter: blur(8px);
    box-shadow: 0 0 4px inset ${({ theme }) => theme.alpha.fg50};
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