import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';

import Main from '@this/components/layout/Main';
import Content from '@this/components/layout/Content';
import { IHighschoolPrograms } from '@this/data/types/programs';
import { BgImg } from '@this/src/components/Elements';

const HighschoolApplicationForm = dynamic(
  () => import('@this/src/Forms/Form.HighschoolApplication'),
);

const HighschoolSignup: NextPage<IHighschoolPrograms> = () => {
  return (
    <Main style={{ paddingTop: 0 }}>
      <BgImg src='/images/display/code-matrix.webp' height='22rem'>
        <Content style={{ display: 'flex', height: '100%' }}>
          <h1 className='dynamic-xl secondary' style={{ alignSelf: 'flex-end' }}>
            High School
          </h1>
        </Content>
      </BgImg>
      <HighschoolSignupStyles>
        <Content>
          <Link href='/programs/highschool' passHref>
            <a style={{ display: 'flex', alignItems: 'center' }} className='anchor'>
              <FiChevronLeft style={{ marginRight: '0.25rem' }} />
              High School Programs
            </a>
          </Link>
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
  .hs-form {
    max-width: 500px;
    margin: 0 auto;
  }
`;
