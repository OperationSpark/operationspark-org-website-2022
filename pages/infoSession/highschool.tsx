import { NextPage } from 'next';
import { Main, Section, Content } from '@this/components/layout';

const Highschool: NextPage = ({}) => {
  return (
    <Main>
      <Section>
        <Content>
          <h1 className='dynamic-h1'>Highschool</h1>
        </Content>
      </Section>
    </Main>
  );
};

export default Highschool;
