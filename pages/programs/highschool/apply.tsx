import { NextPage } from 'next';

import Link from 'next/link';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';

import Main from '@this/components/layout/Main';
import Content from '@this/components/layout/Content';
import { BgImg } from '@this/src/components/Elements';

import HighschoolApplicationForm from '@this/src/Forms/Form.HighschoolApplication';
import PlainCard from '@this/src/components/Cards/PlainCard';

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
                <h1 className='dynamic-xl secondary'>Spring 2023 High School</h1>
                <h2 className='dynamic-h2 secondary'>After-School Application</h2>
                <p className='dynamic-txt'>
                  Are you currently enrolled in a high school in the Greater New Orleans area and
                  interested in our after-school classes? Apply here!
                </p>
                <p className='dynamic-txt'>
                  <b className='secondary'>
                    Spring classes start the week of January 16 and end the week of May 22.
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
          <PlainCard className='hs-application-description dynamic-txt'>
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
            <p>
              Within 3 business days of completing this form, you will receive more detailed
              information about the course and next steps to finalize enrollment.
            </p>
            &nbsp;
            <p>
              Our courses are open to students in grades 10-12. The course is free for students
              attending public, parochial, or home school in New Orleans. If you don not fit that
              description, we may be able to partner with your school district to cover the cost,
              and if not, we offer discounted tuition to families paying privately.
            </p>
          </PlainCard>
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
