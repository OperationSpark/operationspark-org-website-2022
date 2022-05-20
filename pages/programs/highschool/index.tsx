import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import { FiChevronRight } from 'react-icons/fi';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { IHighschoolPrograms } from 'data/types/programs';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import PlainCard from '@this/components/Cards/PlainCard';
import { cardShadow } from 'src/theme/styled/mixins/shadows';
import HighschoolForm from 'src/Forms/Form.Highschool';
import AbsoluteBtnWindow from '@this/components/Elements/AbsoluteBtnWindow';

const HighSchool: NextPage<IHighschoolPrograms> = ({
  description,
  courses,
  schools,
  interestOnly,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();
  const openPreFilledForm = (value: string) => {
    setSelectedCourse(value);
    setIsFormOpen(true);
  };

  return (
    <Main>
      <HighschoolStyles>
        <AbsoluteBtnWindow
          text={interestOnly ? 'Get More Info' : 'Sign up!'}
          title='Sign up for upcoming high school program'
          isOpen={isFormOpen}
          style={{ maxWidth: '500px' }}
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          <Link href='/programs/highschool/signup'>
            <a
              className='anchor'
              style={{
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Open form <FiChevronRight />
            </a>
          </Link>
          <HighschoolForm
            onSubmitComplete={() => setIsFormOpen(false)}
            interestOnly={interestOnly}
            selectedCourse={selectedCourse}
          />
        </AbsoluteBtnWindow>

        <Content className='hs-header'>
          <h1 className='dynamic-xl primary-secondary'>High School</h1>
          <div className='hs-desc'>
            {description.map((desc) => (
              <p key={desc} className='dynamic-txt'>
                {desc}
              </p>
            ))}
            <Link href='/cultureOfCode'>
              <a className='anchor'>Our Culture of Code</a>
            </Link>
          </div>
        </Content>
        <Content className='courses'>
          <h1 className='dynamic-h1 primary-secondary courses-header'>
            Courses
          </h1>
          {courses.map((course) => (
            <PlainCard
              key={course.title.join('')}
              className='course-card'
              id={course.id}
            >
              <h2 className='dynamic-h2 course-title'>
                {course.title.join('')}
              </h2>
              {course.description.map((desc) => (
                <p key={desc} className='dynamic-txt'>
                  {desc}
                </p>
              ))}
              <b>Prerequisites: {course.preReq}</b>
              <br />
              <b>IBC: {course.ibc} </b>

              <a
                className='anchor right-arr-left'
                onClick={() => openPreFilledForm(course.id)}
              >
                Get more information about {course.title.join('')}
              </a>
            </PlainCard>
          ))}
        </Content>
        <Content className='schools'>
          <div className='school-districts'>
            <div className='district'>
              <h3 className='dynamic-h3'>Schools</h3>
              <ul>
                {schools.orleans.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
            <div className='district'>
              <h3 className='dynamic-h3'>Districts</h3>
              <ul>
                {schools.other.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </Content>
      </HighschoolStyles>
    </Main>
  );
};

export default HighSchool;

export const getStaticProps: GetStaticProps<IHighschoolPrograms> = async () => {
  const props: IHighschoolPrograms = await getStaticAsset(
    'programs',
    'highschool',
  );

  return {
    props,
  };
};

const HighschoolStyles = styled.div`
  .courses {
    a.anchor {
      margin-top: 1rem;
      white-space: pre-wrap;
      cursor: pointer;
      user-select: none;
    }
    .courses-header {
      padding-bottom: 1rem;
    }
    .course-card {
      margin-bottom: 2rem;
      :last-child {
        margin-bottom: 0;
      }
    }
    .course-title {
      font-weight: 700;
      color: ${({ theme }) =>
        theme.isLightMode ? theme.primary[700] : theme.secondary[500]};
    }
  }
  .hs-desc {
    ${cardShadow}
    padding: 1rem 1.5rem;
    margin-top: 1rem;
    border-radius: 0.25rem;
  }

  .schools {
    padding-top: 0;
    .school-districts {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }

    ul {
      padding-left: 1rem;
      padding-top: 1rem;
    }
    .district {
      padding: 1rem;
      width: 100%;
      max-width: 400px;
      :first-child {
        padding-top: 0;
      }
    }
  }
  p {
    padding: 0.5rem 0;
  }
`;
