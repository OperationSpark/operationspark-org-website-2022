import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import styled from 'styled-components';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { IHighschoolPrograms } from '@this/data/types/programs';

const HighschoolInfoForm = dynamic(() => import('@this/src/Forms/Form.HighschoolInfo'));

const HighschoolSignup: NextPage<IHighschoolPrograms> = () => {
  return (
    <Main>
      <HighschoolSignupStyles>
        <Content>
          <Link
            href='/programs/highschool'
            style={{ display: 'flex', alignItems: 'center' }}
            className='anchor'
          >
            <span>
              <FiChevronLeft style={{ marginRight: '0.25rem' }} />
              High School Programs
            </span>
          </Link>
          <div className='hs-form'>
            <HighschoolInfoForm />
          </div>
        </Content>
      </HighschoolSignupStyles>
    </Main>
  );
};

export default HighschoolSignup;

const HighschoolSignupStyles = styled.div`
  .hs-form {
    max-width: 500px;
    margin: 0 auto;
  }
`;
