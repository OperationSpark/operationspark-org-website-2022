import { NextPage } from 'next';
import styled from 'styled-components';
import Image from "next/legacy/image";

import { Main } from '@this/components/layout';

const The404: NextPage = () => {
  return (
    <Main>
      <The404Styles>
        <Image src='/images/hallebot3d.png' width={600} height={600} alt='Hallebot' />
        <h1>404</h1>
        <h2>Not Found</h2>
      </The404Styles>
    </Main>
  );
};

export default The404;

const The404Styles = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  * {
    user-select: none;
    -webkit-user-drag: none;
  }
  h1,
  h2 {
    color: ${({ theme: { isLightMode, primary, secondary } }) =>
      isLightMode ? secondary[500] : primary[500]};
    line-height: 1em;
    position: relative;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.75);
  }
  h1 {
    font-size: calc(6rem + 6vw);
    font-weight: 900;
  }
  h2 {
    font-size: calc(2rem + 4vw);
  }
`;
