import { NextPage } from 'next';
import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';

const DevShop: NextPage = () => {
  return (
    <Main>
      <Content>
        <h1 className='dynamic-h1'>Dev Shop</h1>
      </Content>
    </Main>
  );
};

export default DevShop;
