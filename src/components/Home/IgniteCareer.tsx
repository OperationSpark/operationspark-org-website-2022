import Content from '@this/components/layout/Content';
import { IHome } from '@this/data/types/home';
import styled from 'styled-components';

const IgniteCareer = ({ title, description }: IHome['igniteCareer']) => {
  return (
    <IgniteCareerStyles>
      <Content>
        <div className='flex-column ignite-title'>
          {title.map((text) => (
            <h1 key={text} className='dynamic-h1 primary-secondary text-nowrap'>
              {text}
            </h1>
          ))}
        </div>

        <div className='flex-column ignite-description gap-4'>
          {description.map((text) => (
            <h2 key={text} className='dynamic-h3'>
              {text}
            </h2>
          ))}
        </div>
      </Content>
    </IgniteCareerStyles>
  );
};

export default IgniteCareer;

const IgniteCareerStyles = styled.div`
  padding: 2rem 0;

  .ignite-title {
    margin-bottom: 1rem;
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
