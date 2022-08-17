import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';

import Main from '@this/components/layout/Main';
import Content from '@this/components/layout/Content';
import { BgImg } from '@this/src/components/Elements';

const HighschoolApplicationForm = dynamic(
  () => import('@this/src/Forms/Form.HighschoolApplication'),
);

const HighschoolSignup: NextPage = () => {
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
                <h1 className='dynamic-xl secondary'>Fall 2022 High School</h1>
                <h2 className='dynamic-h2 secondary'>After-School Application</h2>
                <p className='dynamic-txt'>
                  Are you currently enrolled in a high school in the Greater New Orleans area and
                  interested in our after-school classes? Apply here!
                </p>
                <p className='dynamic-txt'>
                  <b className='secondary'>
                    Fall after-school classes start the week of August 29.
                  </b>
                </p>
              </div>
              <Link href='/programs/highschool' passHref>
                <a style={{ display: 'flex', alignItems: 'center' }} className='anchor'>
                  <FiChevronLeft style={{ marginRight: '0.25rem' }} />
                  High School Programs
                </a>
              </Link>
            </div>
          </Content>
        </BgImg>
        <Content>
          <div className='hs-application-description dynamic-txt'>
            <p>
              This semester, we are offering both in-person and virtual classes. You can enroll in
              one or the other (No hybrid option).
            </p>
            <div className='reqs-list'>
              For virtual classes, you will need:
              <ul>
                <li>laptop/desktop computer (Mac, Windows, or Chromebook)</li>
                <li>webcam and mic </li>
                <li>reliable internet connection </li>
                <li>quiet place to work</li>
              </ul>
            </div>
            Once you complete this form, you will receive more detailed information about the course
            and next steps to finalize enrollment. Our courses are open to students in grades 10-12.
            We partner with many public schools in the Greater New Orleans area- tuition is
            generally covered for students attending our partner schools. For students who attend
            non-partner schools, discounted tuition rates are available.
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
  .hs-application-description {
    .reqs-list {
      margin: 1rem 0;
      ul {
        padding-left: 2rem;
      }
    }
  }
`;
