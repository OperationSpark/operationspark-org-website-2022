import { NextPage } from 'next';
import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { H1, H2, H3, H4, H5, H6, HXL, P } from '@this/src/typography';

const Typography: NextPage = () => {
  return (
    <Main>
      <Content>
        <h1 className='dynamic-h1'>Typography</h1>
        <HXL>Heading - HXL</HXL>
        <H1>Heading - H1</H1>
        <H2>Heading - H2</H2>
        <H3>Heading - H3</H3>
        <H4>Heading - H4</H4>
        <H5>Heading - H5</H5>
        <H6>Heading - H6</H6>
        <P>
          P - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </P>
      </Content>
    </Main>
  );
};

export default Typography;
