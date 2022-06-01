import { NextPage } from 'next';
import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import Link from 'next/link';

const Docs: NextPage = () => {
  return (
    <Main>
      <Content>
        <h1 className='dynamic-h1'>Docs</h1>
        <Link href='/docs/typography'>Typography</Link>
      </Content>
    </Main>
  );
};

export default Docs;
