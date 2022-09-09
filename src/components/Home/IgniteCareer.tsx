import styled from 'styled-components';
import { IHome } from '@this/data/types/home';
import Content from '@this/components/layout/Content';
import Asterisk from '../Elements/Asterisk';

const IgniteCareer = ({ title, description }: IHome['igniteCareer']) => {
  return (
    <IgniteCareerStyles>
      <Content>
        {title.map((text) => (
          <h1 key={text} className='dynamic-h1 primary-secondary'>
            {text}
          </h1>
        ))}

        <h2 className='dynamic-h3'>
          <Asterisk
            matcher='6 months!'
            infoMessage='6 months of course time. Actual program length may very depending on length between phases'
          >
            {description.join(' ')}
          </Asterisk>
        </h2>
      </Content>
    </IgniteCareerStyles>
  );
};

export default IgniteCareer;

const IgniteCareerStyles = styled.div`
  padding: 2rem 0;
  h1 {
    margin-bottom: 2rem;
  }
  h2 {
    color: ${({ theme }) => theme.fg};
    font-weight: 700;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    h2 {
      width: 100%;
    }
  }
`;
