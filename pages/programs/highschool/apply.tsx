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
      <BgImg src='/images/display/hs-class-working.webp' height='30rem'>
        <Content
          style={{ display: 'flex', height: '100%', alignItems: 'flex-end', flexFlow: 'row wrap' }}
        >
          <div className='secondary'>
            <h1 className='dynamic-xl'>Fall 2022 High School</h1>
            <h2 className='dynamic-h2'>After-School Application</h2>
            <Link href='/programs/highschool' passHref>
              <a style={{ display: 'flex', alignItems: 'center' }} className='anchor'>
                <FiChevronLeft style={{ marginRight: '0.25rem' }} />
                High School Programs
              </a>
            </Link>
          </div>
        </Content>
      </BgImg>
      <HighschoolSignupStyles>
        <Content>
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

  }
`;
