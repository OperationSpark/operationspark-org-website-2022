import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';

import Main from '@this/components/layout/Main';
import Content from '@this/components/layout/Content';
import { IHighschoolPrograms } from '@this/data/types/programs';
import { getStaticAsset } from '@this/pages-api/static/[asset]';

const HighschoolForm = dynamic(() => import('@this/src/Forms/Form.Highschool'));

const HighschoolSignup: NextPage<IHighschoolPrograms> = ({ interestOnly }) => {
  return (
    <Main>
      <HighschoolSignupStyles>
        <Content>
          <Link href='/programs/highschool' passHref>
            <a
              style={{ display: 'flex', alignItems: 'center' }}
              className='anchor'
            >
              <FiChevronLeft style={{ marginRight: '0.25rem' }} />
              High School Programs
            </a>
          </Link>
          <div className='hs-form'>
            <HighschoolForm interestOnly={interestOnly} />
          </div>
        </Content>
      </HighschoolSignupStyles>
    </Main>
  );
};

export default HighschoolSignup;

export const getStaticProps: GetStaticProps<IHighschoolPrograms> = async () => {
  const props: IHighschoolPrograms = await getStaticAsset(
    'programs',
    'highschool',
  );

  return {
    props,
  };
};

const HighschoolSignupStyles = styled.div`
  .hs-form {
    max-width: 500px;
    margin: 0 auto;
  }
`;
