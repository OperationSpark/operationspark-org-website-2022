import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

import { GiCoffeeCup as PrepIcon, GiWeightLiftingUp as TrainingIcon } from 'react-icons/gi';
import { HiOutlineCalendarDays as CalendarIcon } from 'react-icons/hi2';

import { MdOutlineRocketLaunch as DeliverIcon } from 'react-icons/md';
import { PiCertificate as CertifyIcon } from 'react-icons/pi';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { TeacherTraining } from '@this/data/types/teacherTraining';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import NeumorphismListCard from '@this/src/components/Cards/NeumorphismListCard';
import TeacherTrainingCard from '@this/src/components/Cards/TeacherTrainingCard';
import { BgImg } from '@this/src/components/Elements';
import ConnectingArrow from '@this/src/components/Elements/ConnectingArrow';
import GridList from '@this/src/components/Elements/GridList';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const HighSchool: NextPage<TeacherTraining> = ({ partners }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showScheduleMeeting, setShowScheduleMeeting] = useState<boolean>(false);

  return (
    <Main style={{ paddingTop: 0 }}>
      <HighschoolStyles>
        <BgImg src='/images/display/abstract-space.webp' height='24rem'>
          <Content className='page-header-container'>
            <div className='page-header-content'>
              <h1 className='dynamic-xl'>Teacher Training</h1>
              <div className='page-header-and'>and</div>
              <h1 className='fw-900 dynamic-h1'>Curriculum Partnership</h1>
            </div>
          </Content>
        </BgImg>

        <div className='fixed-subview-buttons'>
          <div className='subview-button-group level-1'>
            <div className='subview-button-group-label'>Level 1</div>
            <div className='subview-button-group-links'>
              <Link
                href='/programs/highschool/teacherTraining/info/level-1'
                className='subview-button'
              >
                Info
              </Link>
              <Link
                href='/programs/highschool/teacherTraining/register/level-1'
                className='subview-button'
              >
                Register
              </Link>
            </div>
          </div>
          <div className='subview-button-group level-2'>
            <div className='subview-button-group-label'>Level 2</div>
            <div className='subview-button-group-links'>
              <Link
                href='/programs/highschool/teacherTraining/info/level-2'
                className='subview-button'
              >
                Info
              </Link>
              <Link
                href='/programs/highschool/teacherTraining/register/level-2'
                className='subview-button'
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <Content className='flex-column gap-4'>
          <div className='intro-section-1'>
            <p className='dynamic-txt'>
              {`Operation Spark, an SCA training provider and certifying agency for both Basic and Advanced statewide Industry-Based Certifications (IBCs), partners with school districts and charter schools across Louisiana through our innovative Curriculum and Coaching
          Program.`}
            </p>
          </div>
          <div className='intro-section-2'>
            <p className='dynamic-txt'>
              {`We equip high school teachers to deliver our curriculum and prepare students for success in earning our statewide IBCs. During our intensive two-week summer training, teachers participate in live content instruction, complete hands-on projects, and undergo assessments for each course. On the final day of training, participants take the IBC exam, and those who meet specific benchmarks are certified by Operation Spark to deliver our courses to students.`}
            </p>
          </div>
        </Content>
        <Content>
          {/* <div className='TODO'>Insert School Accountability Blurb + Workforce Readiness Blurb</div> */}
          <NeumorphismListCard
            title='Accountability Framework'
            width='800px'
            style={{ margin: '0 auto' }}
            items={[
              <div key='accountability'>
                <p className='accountability-description'>
                  {`Under the state's new accountability framework for high schools, our courses and certifications provide schools with a variety of options under the Career Accelerator portion of the scorecard:`}
                </p>
                <div className='accountability-table'>
                  <div className='accountability-row'>
                    <div className='accountability-label'>Basic Bundle</div>
                    <div className='accountability-value'>
                      {`Fundamentals of Javascript, Functional Programming, and Web Development, Level 1 + IT Specialist Python IBC`}
                    </div>
                  </div>
                  <div className='accountability-row'>
                    <div className='accountability-label'>Statewide Advanced Credential</div>
                    <div className='accountability-value'>
                      {`Fundamentals of Javascript, Functional Programming, and Web Development, Level 2 Fast Forward Apprenticeship Pathway`}
                    </div>
                  </div>
                  <div className='accountability-row'>
                    <div className='accountability-label'>Fast Forward Apprenticeship Pathway</div>
                    <div className='accountability-value'>
                      {`A series of five Operation Spark courses, culminating in a registered apprenticeship with on-the-job training. Students earn our Basic and Advanced credentials along the way, and are prepared for high-wage roles as Software Engineers within six months of graduation.`}
                    </div>
                  </div>
                </div>
              </div>,
            ]}
          />
        </Content>

        <Content className='flex-column gap-4'>
          <h3 className='section-header'>Current Partners</h3>
          <GridList items={partners} />
        </Content>

        {/* <Content>
          <div className='TODO'>Insert some brief outcomes data</div>
        </Content> */}

        {/* <Content>
          <div className='TODO'>Insert Testimonials from Partners</div>
        </Content> */}

        <Content className='flex-column gap-4'>
          <h2 className='section-header'>Courses and IBCs</h2>
          <div className='flex-row flex-wrap gap-4'>
            {/* // TODO: Move data to "/data/teacherTraining.json" */}
            <TeacherTrainingCard
              level={1}
              levelColor='green'
              levelName='Fundamentals'
              ibcCode='080523'
              courseName='Fundamentals of HTML, CSS, and Javascript'
              ibcName='Fundamentals of Javascript, Functional Programming, and Web Development - Level 1 (Basic)'
              ibcNote='Included in an LDOE-approved Basic Bundle along with IT Specialists Python Certification'
              format='Trainings are remote and delivered over video call or hybrid, with select days in person with the instructor at our learning center in New Orleans.'
              startDate='Tuesday, July 8th'
              endDate='Friday, July 18th'
              startTime='9 AM'
              endTime='3 PM'
              days='Monday - Friday'
              about={`Students learn the fundamentals of web programming in JavaScript, HTML and CSS through designing and completing website, animation and video game projects. Projects appear within a portfolio on the student's website project.`}
              prerequisites={`No prerequisites`}
              prerequisiteNote='Teachers from any background are welcome. Participants should be prepared for academically rigorous coursework with a heavy emphasis on problem solving skills, as well as readiness to navigate multiple browser-based platforms comfortably.'
            />

            <TeacherTrainingCard
              level={2}
              levelColor='yellow'
              levelName='Advanced'
              ibcCode='080520'
              courseName='Javascript, Functional Programming, and Web Development'
              ibcName='Fundamentals of Javascript, Functional Programming, and Web Development - Level 2 (Advanced)'
              format='Trainings are remote and delivered over video call.'
              startDate='Tuesday, July 8th'
              endDate='Friday, July 18th'
              startTime='9 AM'
              endTime='3 PM'
              days='Monday - Friday'
              about={`Continuing from Fundamentals of HTML, CSS, and JavaScript, this course dives deeply into advanced programming concepts, including jQuery, functional programming, higher order functions.`}
              prerequisites={`Level 1 IBC + Teacher-level benchmarks`}
              prerequisiteNote={`Participants must have attained the Level 1 IBC and met teacher-level benchmarks in the level 1 training to enroll in the Level 2 training. We encourage teachers to deliver the Fundamentals course at least once before continuing on to Level 2 training.`}
            />
          </div>
        </Content>

        <Content>
          {/* <div className='TODO'>Schedule a Meeting with our High School Staff</div> */}
          <motion.div
            className='schedule-meeting-section'
            initial={{ opacity: 0 }}
            animate={{
              opacity: showScheduleMeeting ? 1 : 0,
              height: showScheduleMeeting ? '850px' : 0,
            }}
          >
            <iframe
              ref={iframeRef}
              src='https://calendly.com/mayukh-opspark/30min?embed_domain=http://localhost:3000&amp;embed_type=Inline'
              width='100%'
              height='100%'
            ></iframe>
          </motion.div>
          <div className='flex-row flex-center'>
            {showScheduleMeeting ? (
              <button
                className='close-schedule-meeting-btn'
                onClick={() => setShowScheduleMeeting(false)}
              >
                Close
              </button>
            ) : (
              <button className='schedule-meeting-btn' onClick={() => setShowScheduleMeeting(true)}>
                <CalendarIcon style={{ fontSize: '1.25em' }} />
                Schedule a Meeting
              </button>
            )}
          </div>
        </Content>
        <Content className='curriculum-coaching-program'>
          <div id='card-group-train' className='coaching-section'>
            <NeumorphismListCard
              color='blue'
              title='Train'
              Icon={TrainingIcon}
              items={[
                'Two week, intensive training in July',
                'Live instruction, virtual or hybrid',
                `Participants meeting exam score and deliverable requirements are certified to deliver curriculum`,
              ]}
            />
            <div id='arrow1' className='connecting-arrow'>
              <ConnectingArrow startColor='primary' endColor='primary' />
            </div>
          </div>
          <div id='card-group-prep' className='coaching-section'>
            <NeumorphismListCard
              color='primary'
              title='Prep'
              Icon={PrepIcon}
              items={[
                'Teacher attends training and coaching sessions with Op Spark staff',
                'Teacher works with Op Spark to develop scope and sequence, grading norms',
                'School IT dept. works with teacher and Op Spark to prepare tech and student permissions',
              ]}
            />
            <div id='arrow2' className='connecting-arrow'>
              <ConnectingArrow startColor='secondary' endColor='secondary' />
            </div>
          </div>

          <div id='card-group-deliver' className='coaching-section'>
            <NeumorphismListCard
              color='secondary'
              title='Deliver'
              Icon={DeliverIcon}
              items={[
                'Teacher meets with Op Spark coach for 30 minutes weekly',
                `Coaching tailored to each teacher's needs`,
                `Op Spark monitors student progress and provides updates to teacher and administration, upon request`,
              ]}
            />
            <div id='arrow3' className='connecting-arrow'>
              <ConnectingArrow startColor='green' endColor='green' />
            </div>
          </div>

          <div id='card-group-certify' className='coaching-section'>
            <NeumorphismListCard
              color='green'
              title='Certify'
              Icon={CertifyIcon}
              items={[
                `Students with complete portfolios are eligible to test`,
                `Teacher proctors exam in line with Op Spark Test Security Policies and procedures.`,
                `Students earn certs!`,
              ]}
            />
          </div>
        </Content>

        <Content>
          <div className='section-content-card'>
            <h2 className='section-header'>Flexible Training Options for Experienced Teachers</h2>
            <div className='section-body'>
              <p>
                {`Teachers with prior experience in software development, completion of two or more college-level Computer Science courses, or substantial experience teaching high school Computer Science in any coding language may qualify for our self-guided training program.`}
              </p>
              <p>
                {`This flexible option allows participants to schedule training at any time throughout the year. Over a 4-12 week period (based on the teacher's capacity), participants will complete required deliverables with guidance from Operation Spark staff through 3-4 check-ins. The program culminates in the IBC exam.`}
              </p>
            </div>
          </div>
        </Content>

        <Content>
          <div className='section-content-card'>
            <h2 className='section-header text-center'>LDOE Programs and Pathways</h2>
            <div className='section-body' style={{ padding: 0, paddingTop: '1rem' }}>
              <div className='subsection-body'>
                <h3 className='card-subheader text-center'>
                  Jump Start Pathways that include our courses and IBCs
                </h3>

                <GridList
                  items={[
                    'Arts, AV, Technology and Communication',
                    'Business Management',
                    'Information Technology',
                    'STEM Renaissance Computing and Cybersecurity',
                    'STEM Renaissance Digital Design & Emergent Media',
                  ]}
                />
              </div>

              <div className='subsection-body'>
                <h3 className='card-subheader text-center'>
                  Computer Science as a Foreign Language
                </h3>
                <p>{`Our IBCs may be offered in conjunction with Computer Coding as a Foreign Language I or II. Teachers offering Computer Coding as a Foreign Language must be separately certified by the state in Computer Science.`}</p>
              </div>

              <div className='subsection-body'>
                <h3 className='card-subheader text-center'>Fast Forward Apprenticeship Pathway</h3>
                <p>
                  {`Students enrolled in this pathway take all five of Operation Spark's high school courses, culminating in our state-approved registered apprenticeship with a paid work-based learning component their senior year.`}
                </p>

                <GridList
                  items={[
                    'Fundamentals of HTML, CSS, and Javascript',
                    'Advanced Javascript, Functional Programming, and Web Development',
                    'Fundamentals of Video Game Programming',
                    'Internet of Things',

                    <div key='opspark' className='flex-column flex-center w-100 gap-2'>
                      <span className='value-badge fit-content'>Apprenticeship</span>
                      <span
                        className='flex-row flex-wrap flex-center gap-2'
                        style={{ rowGap: '0' }}
                      >
                        <span>Operation Spark</span>
                      </span>
                    </div>,
                    <div key='OJT' className='flex-column flex-center w-100 gap-2'>
                      <span className='value-badge fit-content'>Apprenticeship</span>
                      <span
                        className='flex-row flex-wrap flex-center gap-2'
                        style={{ rowGap: '0' }}
                      >
                        <span>{'Operation Spark OJT'}</span>
                        <span className='fs-75 text-subtle-2'>(On-the-job Training)</span>
                      </span>
                    </div>,
                  ]}
                />
              </div>
            </div>
          </div>
        </Content>

        <Content>
          <h2 className='section-header text-center'>Inquire for more information</h2>
          <div className='section-content-card'>
            <h3 className='section-subheader text-center' style={{ marginBottom: '1rem' }}>
              Contact
            </h3>
            <GridList
              interactive
              items={[
                <a
                  key='email'
                  className='grid-list-item'
                  href='mailto:highschool@operationspark.org'
                >
                  highschool@operationspark.org
                </a>,
                <a key='phone' className='grid-list-item' href='tel:9858038895'>
                  985-803-8895
                </a>,
              ]}
            />
          </div>
        </Content>
      </HighschoolStyles>
    </Main>
  );
};

export default HighSchool;

export const getStaticProps: GetStaticProps<TeacherTraining> = async () => {
  const props: TeacherTraining = await getStaticAsset('teacherTraining');

  return {
    props,
  };
};

const HighschoolStyles = styled.div`
  .__content-container {
    padding-bottom: 0;
  }

  .schedule-meeting-section {
    ${({ theme }) =>
      theme.isLightMode
        ? ''
        : `
      filter: invert(1) saturate(5) hue-rotate(180deg);
    `}
  }

  .fixed-subview-buttons {
    position: fixed;
    top: ${({ theme }) => theme.navHeight - 32}px;
    left: 0.5rem;
    z-index: 100;
    display: flex;
    flex-flow: row nowrap;
    gap: 1rem;

    .subview-button-group {
      display: flex;
      flex-flow: row nowrap;
      gap: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('fg', 0.25)};
      background: ${({ theme }) => theme.rgb('bg', 1, theme.isLightMode ? -2 : 2)};

      &.level-1 {
        box-shadow: 0 0 4px 1px inset ${({ theme }) => theme.rgb('green.700', 0.5)};
      }
      &.level-2 {
        box-shadow: 0 0 4px 1px inset ${({ theme }) => theme.rgb('secondary.800', 0.75)};
      }

      @supports (backdrop-filter: blur(0.75rem)) {
        background: ${({ theme }) => theme.rgb('bg', 0.75, theme.isLightMode ? -2 : 2)};
        backdrop-filter: blur(0.75rem);
        -webkit-backdrop-filter: blur(0.75rem);
      }
    }
    .subview-button-group-label {
      font-size: 1rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      padding-left: 0.5rem;
    }

    .subview-button-group-links {
      display: flex;
      flex-flow: column;
    }

    .subview-button {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.rgb('fg', 0.25)};
      color: ${({ theme }) => theme.rgb('fg', 1)};
      background: ${({ theme }) => theme.rgb('bg', 0.25)};
      width: 100%;
      text-align: center;
      transition: all 125ms;
      &:hover {
        color: ${({ theme }) => theme.rgb('white', 0.8)};
        background: ${({ theme }) =>
          theme.isLightMode ? theme.rgb('primary.700', 0.5) : theme.rgb('primary.700', 1, 4)};
      }

      &:active {
        color: ${({ theme }) => theme.rgb('white', 0.8)};
        background: ${({ theme }) => theme.rgb('primary.700', 1, -1)};
      }
      &:first-child {
        transform-origin: bottom left;
        border-top-right-radius: 0.5rem;

        &:hover {
          color: ${({ theme }) => theme.rgb('black', 0.8)};
          background: ${({ theme }) =>
            theme.isLightMode
              ? theme.rgb('secondary.700', 1, 4)
              : theme.rgb('secondary.700', 1, 4)};
        }

        &:active {
          color: ${({ theme }) => theme.rgb('black', 0.8)};
          background: ${({ theme }) =>
            theme.isLightMode
              ? theme.rgb('secondary.700', 1, -1)
              : theme.rgb('secondary.700', 1, -1)};
        }
      }
      &:last-child {
        border-bottom-right-radius: 0.5rem;
        transform-origin: top left;
      }
    }
  }

  .page-header-container .page-header-and {
    font-size: calc(0.4vw + 1.25rem);
    font-weight: 600;
    padding: 0.5rem;
    font-style: italic;
  }

  .curriculum-coaching-program {
    max-width: 1600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .intro-section-1,
  .intro-section-2 {
    max-width: 80%;
    box-shadow: ${({ theme }) => {
      const lm = theme.isLightMode;
      return `
        0 0 0px 2px ${theme.rgb('bg', 1)},
        0 0 4px 1px ${theme.rgb(lm ? 'primary' : 'secondary', 0.5)},
        0 0 4px 2px inset ${theme.rgb(lm ? 'primary' : 'secondary', 0.25)}
    `;
    }};
    background: ${({ theme }) =>
      theme.isLightMode ? theme.rgb('primary.700', 0.1) : theme.rgb('secondary.900', 0.1)};
    box-shadow: 0 0 3px 1px inset
      ${({ theme }) => theme.rgb(theme.isLightMode ? 'primary' : 'secondary.100', 0.5, 1)};
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;

    p {
      color: ${({ theme }) =>
        theme.isLightMode ? theme.rgb('primary.900', 0.75) : theme.rgb('secondary.100', 0.75)};
    }
  }
  .intro-section-1 {
    align-self: flex-start;
    text-align: left;
  }
  .intro-section-2 {
    align-self: flex-end;
    text-align: right;
  }

  .coaching-section {
    position: relative;
  }
  .connecting-arrow {
    position: absolute;
    font-size: 5rem;
    display: flex;
    /* pointer-events: none; */
  }

  #arrow1.connecting-arrow {
    top: calc(50% - 3rem);
    right: 0;
    transform: rotate(180deg);
  }
  #arrow2.connecting-arrow {
    bottom: -3rem;
    left: 0;
    right: 0;
    transform: rotate(-90deg);
    justify-content: center;
  }
  #arrow3.connecting-arrow {
    top: calc(50% - 3rem);
  }

  #card-group-deliver {
    // Switch deliver and certify cards when 2x2
    grid-column: 2;
    grid-row: 2;
  }
  #card-group-certify {
    // Switch deliver and certify cards when 2x2
    grid-column: 1;
    grid-row: 2;
  }

  .accountability-description {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.rgb('fg', 0.75)};
    margin-bottom: 1rem;
  }

  .accountability-table {
    display: flex;
    flex-flow: column;
    background: ${({ theme }) => theme.rgb('bg', 0.5, theme.isLightMode ? -4 : 4)};

    border-radius: 0.5rem;
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('fg', 0.25)};
    padding: 0.5rem;

    .accountability-row {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      border-bottom: 1px solid ${({ theme }) => theme.rgb('fg', 0.25)};
      &:last-child {
        border-bottom: none;
      }
    }

    .accountability-label {
      font-weight: 700;
      font-size: 1rem;
      min-width: 125px;
      width: 20%;
      color: ${({ theme }) => theme.rgb('fg', 1)};
    }
    .accountability-value {
      font-size: 1rem;
      width: 80%;
      color: ${({ theme }) => theme.rgb('fg', 0.7)};
    }
  }

  .schedule-meeting-btn {
    font-size: 1.25rem;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.rgb('primary.500', 1)};
    color: ${({ theme }) => theme.rgb('white', 1)};
    box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.rgb('fg', 0.5)};
    transition: all 125ms;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:hover {
      background: ${({ theme }) => theme.rgb('primary.700', 1, -1)};
    }
    &:active {
      background: ${({ theme }) => theme.rgb('primary.700', 1, -2)};
    }
  }
  .close-schedule-meeting-btn {
    font-size: 1.25rem;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.rgb('bg', 1, theme.isLightMode ? -2 : 2)};
    color: ${({ theme }) => theme.rgb('fg', 1)};
    box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.rgb('fg', 0.5)};
    transition: all 125ms;
    &:hover {
      background: ${({ theme }) => theme.rgb('bg', 1, theme.isLightMode ? -4 : 4)};
    }
    &:active {
      background: ${({ theme }) => theme.rgb('bg', 1, theme.isLightMode ? -6 : 6)};
    }
  }

  @media screen and (max-width: 768px) {
    .intro-section-1,
    .intro-section-2 {
      max-width: 100%;
      text-align: center;
    }
    .curriculum-coaching-program {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    #arrow1.connecting-arrow,
    #arrow2.connecting-arrow,
    #arrow3.connecting-arrow {
      transform: rotate(-90deg);
      top: auto;
      bottom: -3.5rem;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
    }
    #card-group-certify,
    #card-group-deliver {
      grid-column: auto;
      grid-row: auto;
    }

    .accountability-table {
      .accountability-row {
        display: flex;
        flex-flow: column;
        gap: 0.5rem;
        box-shadow: 0 0 1px 0px inset ${({ theme }) => theme.rgb('fg', 0.5)};
        background: ${({ theme }) => theme.rgb('bg', 0.5)};
        padding: 0.5rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
      .accountability-label {
        font-size: 1.1rem;
        width: 100%;
        text-align: center;
      }
      .accountability-value {
        font-size: 1rem;
        width: 100%;
        text-align: center;
      }
    }
  }

  @media screen and (min-width: 1400px) {
    .curriculum-coaching-program {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    #arrow1.connecting-arrow,
    #arrow2.connecting-arrow,
    #arrow3.connecting-arrow {
      bottom: auto;
      left: auto;
      top: 1rem;
      right: 0;
      transform: rotate(180deg);
    }
    #card-group-certify,
    #card-group-deliver {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;
