import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { BgImg } from '@this/src/components/Elements';

const Level1Info: NextPage<{ levelNum: number }> = ({ levelNum }) => {
  return (
    <Main style={{ paddingTop: 0 }}>
      <Level1InfoStyles>
        <BgImg src='/images/display/abstract-space.webp' height='24rem'>
          <Content className='teacher-training-header'>
            <div className='teacher-training-header-content'>
              <h1 className='dynamic-xl'>Teacher Training</h1>
              <h1 className='fw-900 dynamic-xl'>Summer 2025</h1>
              <h1 className='fw-900 dynamic-h2 primary-secondary'>Level {levelNum}</h1>
            </div>
          </Content>
        </BgImg>

        <Content className='flex-column gap-4'></Content>
      </Level1InfoStyles>
    </Main>
  );
};

export default Level1Info;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const levelNum = params?.levelNumber as string;
  return {
    props: {
      levelNum: parseInt(levelNum) || 1,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { levelNumber: '1' } }, { params: { levelNumber: '2' } }],
    fallback: false,
  };
};

const Level1InfoStyles = styled.div`
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
  }
`;
