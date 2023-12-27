import { NextPage } from 'next';
import Link from 'next/link';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';

const Testimonials: NextPage = () => {
  return (
    <Main>
      <Content>
        <h1 className='dynamic-h1'>Testimonials</h1>

        <Link href='/testimonials/company' className='anchor right-arr-left'>
          {'Company Testimonials'}
        </Link>

        <br />

        <Link href='/testimonials/graduates' className='anchor right-arr-left'>
          {'Grad Testimonials'}
        </Link>
      </Content>
    </Main>
  );
};

export default Testimonials;
