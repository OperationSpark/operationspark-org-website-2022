import { NextPage } from 'next';
import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';

const CompanyTestimonials: NextPage = () => {
  return (
    <Main>
      <Content>
        <h1 className='dynamic-h1'>Company Testimonials</h1>
      </Content>
    </Main>
  );
};

export default CompanyTestimonials;
