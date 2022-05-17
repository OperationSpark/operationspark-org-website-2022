import styled from 'styled-components';
import { IHome } from '@this/data/types/home';
import Content from '@this/components/layout/Content';

const IgniteCareer = ({ title, description }: IHome['igniteCareer']) => {
  return (
    <IgniteCareerStyles>
      <Content>
        {title.map((text) => (
          <h1 key={text} className='dynamic-h1'>
            {text}
          </h1>
        ))}
        {description.map((text) => (
          <h2 key={text} className='dynamic-h3'>
            {description}
          </h2>
        ))}
      </Content>
    </IgniteCareerStyles>
  );
};

export default IgniteCareer;

const IgniteCareerStyles = styled.div`
  padding: 2rem 0;
  h1 {
    color: ${({ theme }) =>
      theme.isLightMode ? theme.primary[0] : theme.secondary[0]};
    margin-bottom: 2rem;
  }
  h2 {
    color: ${({ theme }) => theme.fg};
    font-weight: 700;
    width: 80%;
  }

  @media screen and (max-width: 768px) {
    h2 {
      width: 100%;
    }
  }
`;
