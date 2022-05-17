import styled from 'styled-components';

import { IHome } from '@this/data/types/home';
import { BgImg } from '@this/components/Elements';
import YellowCard from '@this/components/Cards/LinkCard';
import Content from '@this/components/layout/Content';

const TeamEffort = ({ title, description, cards }: IHome['teamEffort']) => {
  return (
    <BgImg src='/images/students-working.webp' height='auto'>
      <TeamEffortStyles className='_progress' id='partners'>
        <Content>
          {title.map((text) => (
            <h1 key={text} className='dynamic-xl'>
              {text}
            </h1>
          ))}
          {description.map((text) => (
            <h2 key={text} className='dynamic-h3'>
              {text}
            </h2>
          ))}
          <div className='cards-row'>
            {cards.map((card) => (
              <YellowCard key={card.title} {...card} />
            ))}
          </div>
        </Content>
      </TeamEffortStyles>
    </BgImg>
  );
};

export default TeamEffort;

const TeamEffortStyles = styled.div`
  display: flex;
  flex-flow: row wrap;
  h1 {
    color: ${({ theme }) => theme.secondary[400]};
  }
  h2 {
    color: white;
  }
  .cards-row {
    padding: 1rem 0;
    display: flex;
    flex-flow: row wrap;
  }
`;
