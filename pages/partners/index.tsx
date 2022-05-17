import { NextPage } from 'next';
import styled from 'styled-components';

import { Section } from '@this/components/layout';
import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';

const Partners: NextPage = () => {
  return (
    <Main>
      <PartnerStyles>
        <Content>
          <h1 className='dynamic-h1'>Partners</h1>
        </Content>
        <Section id='education' className='_progress'>
          <Content>
            <h2 className='dynamic-h2'>Education Partners</h2>
          </Content>
        </Section>
        <Section id='employers' className='_progress'>
          <Content>
            <h2 className='dynamic-h2'>Employer Partners</h2>
          </Content>
        </Section>
        <Section id='community' className='_progress'>
          <Content>
            <h2 className='dynamic-h2'>Community Partners</h2>
          </Content>
        </Section>
        <Section id='funding' className='_progress'>
          <Content>
            <h2 className='dynamic-h2'>Funding Partners</h2>
          </Content>
        </Section>
      </PartnerStyles>
    </Main>
  );
};

export default Partners;

const PartnerStyles = styled.div``;
