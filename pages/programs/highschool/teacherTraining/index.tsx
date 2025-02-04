import { GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';

import { GiCoffeeCup as PrepIcon, GiWeightLiftingUp as TrainingIcon } from 'react-icons/gi';

import { MdOutlineRocketLaunch as DeliverIcon } from 'react-icons/md';
import { PiCertificate as CertifyIcon } from 'react-icons/pi';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { TeacherTraining } from '@this/data/types/teacherTraining';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import TeacherTrainingCard from '@this/src/components/Cards/TeacherTrainingCard';
import { BgImg } from '@this/src/components/Elements';

const HighSchool: NextPage<TeacherTraining> = ({ partners }) => {
  return (
    <Main style={{ paddingTop: 0 }}>
      <HighschoolStyles>
        <BgImg src='/images/display/abstract-space.webp' height='20rem'>
          <Content className='teacher-training-header'>
            <div className='teacher-training-header-content'>
              <h1 className='dynamic-xl'>Teacher Training</h1>
              <div className='hs-apply-and'>and</div>
              <h1 className='fw-900 dynamic-h1'>Curriculum Partnership</h1>
            </div>
          </Content>
        </BgImg>

        <Content className='flex-column gap-4'>
          <p className='dynamic-txt'>
            {`Operation Spark, an SCA training provider and certifying agency for both Basic and Advanced statewide Industry-Based Certifications (IBCs), partners with school districts and charter schools across Louisiana through our innovative Curriculum and Coaching
          Program.`}
          </p>
          <p className='dynamic-txt'>
            {`We equip high school teachers to deliver our curriculum and prepare students for success in earning our statewide IBCs. During our intensive two-week summer training, teachers participate in live content instruction, complete hands-on projects, and undergo assessments for each course. On the final day of training, participants take the IBC exam, and those who meet specific benchmarks are certified by Operation Spark to deliver our courses to students.`}
          </p>
        </Content>
        <Content>
          <div className='TODO'>Insert School Accountability Blurb + Workforce Readiness Blurb</div>
        </Content>
        <Content className='flex-column gap-4'>
          <h3 className='section-header'>Current Partners</h3>
          <ul className='grid-list'>
            {partners.map((partner) => (
              <li key={partner}>
                <div className='grid-list-inner'>{partner}</div>
              </li>
            ))}
          </ul>
        </Content>
        <Content>
          <div className='TODO'>Insert some brief outcomes data</div>
        </Content>
        <Content>
          <div className='TODO'>Insert Testimonials from Partners</div>
        </Content>

        <Content className='flex-column gap-4'>
          <h2 className='section-header'>Courses and IBCs</h2>
          <div className='flex-row flex-wrap gap-4'>
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
          <div className='TODO'>Schedule a Meeting with our High School Staff</div>
        </Content>
        <Content>
          <div className='curriculum-coaching-program'>
            <div className='coaching-program-card'>
              <div className='coaching-program-icon'>
                <TrainingIcon fontSize='1em' />
              </div>
              <h2 className='coaching-program-title'>Train</h2>
              <ul className='coaching-program-list'>
                <li>Two week, intensive training in July</li>
                <li>Live instruction, virtual or hybrid</li>
                <li>
                  Participants meeting exam score and deliverable requirements are certified to
                  deliver curriculum
                </li>
              </ul>
            </div>
            <div className='coaching-program-card'>
              <div className='coaching-program-icon'>
                <PrepIcon fontSize='1em' />
              </div>
              <h2 className='coaching-program-title'>Prep</h2>
              <ul className='coaching-program-list'>
                <li>Teacher attends training and coaching sessions with Op Spark staff</li>
                <li>Teacher works with Op Spark to develop scope and sequence, grading norms</li>
                <li>
                  School IT dept. works with teacher and Op Spark to prepare tech and student
                  permissions
                </li>
              </ul>
            </div>
            <div className='coaching-program-card'>
              <div className='coaching-program-icon'>
                <DeliverIcon fontSize='1em' />
              </div>
              <h2 className='coaching-program-title'>Deliver</h2>
              <ul className='coaching-program-list'>
                <li>Teacher meets with Op Spark coach for 30 minutes weekly</li>
                <li>{`Coaching tailored to each teacher's needs`}</li>
                <li>{`Op Spark monitors student progress and provides updates to teacher and administration, upon request`}</li>
              </ul>
            </div>
            <div className='coaching-program-card'>
              <div className='coaching-program-icon'>
                <CertifyIcon fontSize='1em' />
              </div>
              <h2 className='coaching-program-title'>Certify</h2>
              <ul className='coaching-program-list'>
                <li>{`Students with complete portfolios are eligible to test`}</li>
                <li>
                  {`Teacher proctors exam in line with Op Spark Test Security Policies and procedures.`}
                </li>
                <li>{`Students earn certs!`}</li>
              </ul>
            </div>
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
            <div className='section-body'>
              <div className='subsection-body'>
                <h3 className='card-subheader text-center'>
                  Jump Start Pathways that include our courses and IBCs
                </h3>
                <ul className='grid-list'>
                  <li>
                    <div className='grid-list-inner'>Arts, AV, Technology and Communication</div>
                  </li>
                  <li>
                    <div className='grid-list-inner'>Business Management</div>
                  </li>
                  <li>
                    <div className='grid-list-inner'>Information Technology</div>
                  </li>
                  <li>
                    <div className='grid-list-inner'>
                      STEM Renaissance Computing and Cybersecurity
                    </div>
                  </li>
                  <li>
                    <div className='grid-list-inner'>
                      STEM Renaissance Digital Design & Emergent Media
                    </div>
                  </li>
                </ul>
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
                <ul className='grid-list'>
                  <li>
                    <div className='grid-list-inner'>Fundamentals of HTML, CSS, and Javascript</div>
                  </li>
                  <li>
                    <div className='grid-list-inner'>
                      Advanced Javascript, Functional Programming, and Web Development
                    </div>
                  </li>
                  <li>
                    <div className='grid-list-inner'> Fundamentals of Video Game Programming</div>
                  </li>
                  <li>
                    <div className='grid-list-inner'> Internet of Things</div>
                  </li>
                  <li>
                    <div className='grid-list-inner'> Apprenticeship: Operation Spark</div>
                  </li>
                  <li>
                    <div className='grid-list-inner'>
                      Apprenticeship: Operation Spark OJT (On-the-Job Training)
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Content>

        <Content>
          <h2 className='section-header text-center'>Inquire for more information</h2>
          <div className='section-content-card'>
            <h3 className='section-subheader text-center'>Contact</h3>
            <ul className='grid-list'>
              <li className='flex-row'>
                <a className='grid-list-inner anchor' href='mailto:highschool@operationspark.org'>
                  highschool@operationspark.org
                </a>
              </li>
              <li>
                <a className='grid-list-inner anchor' href='tel:9858038895'>
                  <div className='grid-list-inner'>985-803-8895</div>
                </a>
              </li>
            </ul>
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
  .TODO {
    color: ${({ theme }) => theme.rgb('red', 1)};
    background: ${({ theme }) => theme.rgb('red', 0.1)};
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    position: relative;
    font-family: 'Kalam', sans-serif;
    width: fit-content;
    margin: 0 auto;
    padding: 1rem;
    padding-top: 3rem;
    border-radius: 1rem;
    &::before {
      content: 'TODO';
      font-size: 2rem;
      font-family: 'Permanent Marker', serif;
      position: absolute;
      top: 0.5rem;
      line-height: 1;
      text-align: center;
      left: 0;
      right: 0;
    }
  }

  .__content-container {
    padding-bottom: 0;
  }

  .section-header {
    font-size: 1.5rem;
    font-weight: 900;
    text-align: center;
  }

  .section-body {
    padding: 1rem;
    gap: 1rem;
    display: flex;
    flex-flow: column;
  }
  .section-content-card {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('fg', 0.25)};
    border-radius: 1rem;
    background: ${({ theme }) => theme.rgb('fg', 0.05)};
  }

  .card-subheader {
    font-size: 1.2rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
  }
  .subsection-body {
    padding: 1rem;
    background: ${({ theme }) => theme.rgb('bg', 0.5)};
    border-radius: 1rem;
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('fg', 0.25)};
  }

  .teacher-training-header {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: center;
    height: 100%;

    .teacher-training-header-content {
      width: fit-content;
      background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg25 : theme.alpha.bg25)};
      box-shadow: 0 0 3px 1px inset
        ${({ theme }) => (theme.isLightMode ? theme.alpha.bg50 : theme.alpha.fg50)};

      width: fit-content;
      padding: 1rem;
      margin-bottom: 0.5rem;
      border-radius: 1rem;
      backdrop-filter: blur(2rem);
      -webkit-backdrop-filter: blur(2rem);
      line-height: 1;
      color: ${({ theme }) => (theme.isLightMode ? theme.alpha.bg50 : theme.alpha.fg50)};
      text-align: center;
      .dynamic-xl {
        font-family: 'Red Hat Display', sans-serif;
      }
    }

    .hs-apply-and {
      font-size: calc(0.4vw + 1.25rem);
      font-weight: 600;

      padding: 0.5rem;
      font-style: italic;
    }
  }

  .grid-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-flow: row wrap;
    gap: 0.25rem;
    justify-content: center;
    max-width: 999px;
    margin: 0 auto;
    li {
      flex: 1 1 250px;
      box-shadow: 0 0 6px 0px inset ${({ theme }) => theme.rgb('fg', 0.2)};
      background: ${({ theme }) => theme.rgb('fg', 0.05)};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.1rem;
      padding: 0.25rem;

      .grid-list-inner {
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.25rem 0.5rem;
        text-align: center;
      }
    }
  }
  .curriculum-coaching-program {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    justify-content: center;
    .coaching-program-card {
      flex: 1 1 46%;
      min-width: 300px;
      padding: 1rem;
      box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('fg', 0.25)};
      border-radius: 1rem;
      background: ${({ theme }) => theme.rgb('fg', 0.05)};
      display: flex;
      flex-flow: column;
      align-items: center;

      &:nth-child(1) {
        box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('blue', 0.5, 1)};
        background: ${({ theme }) => theme.rgb('blue', 0.1)};
        --color: ${({ theme }) => theme.asRgb('blue')};
      }

      &:nth-child(2) {
        box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('primary', 0.5)};
        background: ${({ theme }) => theme.rgb('primary', 0.1)};
        --color: ${({ theme }) => theme.asRgb('primary', 4)};
      }
      &:nth-child(3) {
        box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('magenta', 0.5)};
        background: ${({ theme }) => theme.rgb('magenta', 0.1)};
        --color: ${({ theme }) => theme.asRgb('magenta')};
      }
      &:nth-child(4) {
        box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('green', 0.5, -8)};
        background: ${({ theme }) => theme.rgb('green', 0.1, 10)};
        --color: ${({ theme }) => theme.asRgb('green', -6)};
      }
    }
    .coaching-program-title {
      font-size: 2rem;
      font-weight: 900;
      color: rgba(var(--color), 1);
    }
    .coaching-program-icon {
      display: flex;
      font-size: 4rem;
      color: ${({ theme }) => theme.rgb('bg')};
      filter: drop-shadow(0 0 4px rgba(var(--color), 1));
    }
    .coaching-program-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-flow: column;
      gap: 0.5rem;
      margin: 0;
      margin-top: 1rem;
      flex: 1;
      justify-content: space-between;

      padding: 1rem;
      box-shadow: -0.125rem 0.125rem 0.75rem 0px inset rgba(var(--color), 0.35),
        0px 0px 0px 2px ${({ theme }) => theme.rgb('bg', 1)},
        -0.125rem 0.125rem 0.5rem 1px rgba(var(--color), 0.5);
      border-radius: 1rem;
      background: ${({ theme }) => theme.rgb('bg', 0.5)};
      li {
        font-size: 1rem;
        font-weight: 400;
        padding: 0.5rem;
        border-radius: 0.5rem;
        width: fit-content;
        max-width: calc(100% - 3rem);
        background: ${({ theme }) => theme.rgb('bg', 0.75)};
        box-shadow: 0 0 3px 1px inset rgba(var(--color), 0.5);
        color: ${({ theme }) => theme.rgb('fg', 0.9)};
        &:nth-child(even) {
          margin-left: auto;
        }
        &:nth-child(odd) {
          margin-right: auto;
        }
      }
    }
  }
`;
