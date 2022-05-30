import { NextPage } from 'next';
import styled from 'styled-components';

import { Main, Content } from '@this/components/layout';

const CollegeCreditStyles = styled.div``;

const CollegeCredit: NextPage = () => {
  return (
    <Main>
      <Content>
        <CollegeCreditStyles>
          <h1 className='dynamic-xl primary-secondary'>College Credit</h1>
        </CollegeCreditStyles>
      </Content>
    </Main>
  );
};

export default CollegeCredit;
