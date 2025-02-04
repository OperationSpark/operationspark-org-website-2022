import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { BgImg } from '@this/src/components/Elements';

const Level1Register: NextPage<{ level: number }> = ({ level }) => {
  return (
    <Main style={{ paddingTop: 0 }}>
      <Level1RegisterStyles>
        <BgImg src='/images/display/abstract-space.webp' height='24rem'>
          <Content className='page-header-container'>
            <div className='page-header-content'>
              <h1 className='dynamic-xl'>Teacher Training</h1>
              <h1 className='fw-900 dynamic-xl'>Summer 2025</h1>
              <h1 className='fw-900 dynamic-h2 primary-secondary'>Level {level}</h1>
            </div>
          </Content>
        </BgImg>

        <Content className='flex-column gap-4'></Content>
      </Level1RegisterStyles>
    </Main>
  );
};

export default Level1Register;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const level = params?.level as string;
  const levelNum = level ? parseInt(level.replaceAll(/\D/g, '')) : 1;
  return {
    props: {
      level: levelNum,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { level: 'level-1' } }, { params: { level: 'level-2' } }],
    fallback: false,
  };
};

const Level1RegisterStyles = styled.div``;
