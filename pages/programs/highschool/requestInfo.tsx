import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';

import Main from '@this/components/layout/Main';
import Content from '@this/components/layout/Content';
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
            <FiChevronLeft style={{ marginRight: '0.25rem' }} />
            High School Programs
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
