import { NextPage } from 'next';
import Link from 'next/link';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';

const Testimonials: NextPage = () => {
  return (
    <Main>
      <Content>
        <h1 className='dynamic-h1'>Testimonials</h1>
        <a className='anchor right-arr-left'>
          <Link href='/testimonials/company'>Company Testimonials</Link>
        </a>
        <br />
        <a className='anchor right-arr-left'>
          <Link href='/testimonials/graduates'>Grad Testimonials</Link>
        </a>
      </Content>
    </Main>
  );
};

export default Testimonials;
