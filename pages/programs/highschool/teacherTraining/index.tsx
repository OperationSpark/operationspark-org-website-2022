import { GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { TeacherTraining } from '@this/data/types/teacherTraining';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import TeacherTrainingCard from '@this/src/components/Cards/TeacherTrainingCard';
import { BgImg } from '@this/src/components/Elements';
import { motion } from 'framer-motion';

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
        <Content className='TODO'>
          Insert School Accountability Blurb + Workforce Readiness Blurb
        </Content>
        <Content className='flex-column gap-4'>
          <h3 className='section-header'>Current Partners</h3>
          <ul className='current-partners'>
            {partners.map((partner) => (
              <li key={partner}>{partner}</li>
            ))}
          </ul>
        </Content>
        <Content className='TODO'>Insert some brief outcomes data</Content>
        <Content className='TODO'>Insert Testimonials from Partners</Content>

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

        <Content className='TODO'>
          <h4>Schedule a Meeting with our High School Staff</h4>
          <motion.img
            src='/images/curriculum-and-coaching-program.png'
            width='100%'
            height='auto'
            alt='Curriculum and coaching program'
          />
        </Content>

        <Content>
          <h2>Flexible Training Options for Experienced Teachers</h2>
          <div>
            <p>
              {`Teachers with prior experience in software development, completion of two or more college-level Computer Science courses, or substantial experience teaching high school Computer Science in any coding language may qualify for our self-guided training program.`}
            </p>
            <p>
              {`This flexible option allows participants to schedule training at any time throughout the year. Over a 4-12 week period (based on the teacher's capacity), participants will complete required deliverables with guidance from Operation Spark staff through 3-4 check-ins. The program culminates in the IBC exam.`}
            </p>
          </div>
        </Content>
        <Content>
          <h2>LDOE Programs and Pathways</h2>
          <h3>Jump Start Pathways that include our courses and IBCs:</h3>
          <ul>
            <li>Arts, AV, Technology and Communication</li>
            <li>Business Management</li>
            <li>Information Technology</li>
            <li>STEM Renaissance Computing and Cybersecurity</li>
            <li>STEM Renaissance Digital Design & Emergent Media</li>
          </ul>

          <h3>Computer Science as a Foreign Language:</h3>
          <p>{`Our IBCs may be offered in conjunction with Computer Coding as a Foreign Language I or II. Teachers offering Computer Coding as a Foreign Language must be separately certified by the state in Computer Science.`}</p>

          <h3>Fast Forward Apprenticeship Pathway</h3>
          <p>
            {`Students enrolled in this pathway take all five of Operation Spark's high school courses, culminating in our state-approved registered apprenticeship with a paid work-based learning component their senior year.`}
          </p>
          <ul>
            <li>Fundamentals of HTML, CSS, and Javascript</li>
            <li>Advanced Javascript, Functional Programming, and Web Development </li>
            <li>Fundamentals of Video Game Programming</li>
            <li>Internet of Things</li>
            <li>Apprenticeship: Operation Spark</li>
            <li>Apprenticeship: Operation Spark OJT (On-the-Job Training)</li>
          </ul>
        </Content>

        <Content>
          Inquire for more information.
          <h3>Contact:</h3>
          <a className='anchor' href='mailto:highschool@operationspark.org'>
            highschool@operationspark.org
          </a>
          <a className='anchor' href='tel:9858038895'>
            985-803-8895
          </a>
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
    color: ${({ theme }) => theme.red[0]};
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }

  .section-header {
    font-size: 1.5rem;
    font-weight: 900;
    text-align: center;
  }
  .plain-card-body {
    height: 100%;
    display: flex;
    flex-flow: column;
    gap: 1rem;

    ul {
      padding-left: 1rem;
    }
  }

  #card-level-1,
  #card-level-2 {
    .plain-card-body {
      padding: 0.75rem 1.25rem;
      background: ${({ theme }) => theme.bgHover};
    }
  }

  .card-subheader {
    font-size: 1.2rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
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

  .registration-cards {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    gap: 1rem;

    .registration-card {
      flex: 1 1 325px;

      .plain-card-body {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        height: 100%;
        gap: 0.25rem;
      }
    }

    .registration-card-description {
      font-size: 0.9rem;
      line-height: 1.25;
    }
    .registration-card-btn {
    }
  }

  .current-partners {
    list-style: none;
    padding: 0;
    display: flex;
    flex-flow: row wrap;
    gap: 0.5rem;
    justify-content: center;
    max-width: 999px;
    margin: 0 auto;
    li {
      flex: 1 1 300px;
      max-width: 333px;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 0 1.5px 0px inset ${({ theme }) => theme.alpha.fg50};
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background: ${({ theme }) => theme.bgHover};
      text-align: center;
    }
  }
`;
