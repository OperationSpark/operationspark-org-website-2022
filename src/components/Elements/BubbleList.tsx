import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type BubbleListProps = {
  items: ReactNode[];
  listClassName?: string;
  itemClassName?: string;
};
const BubbleList: FC<BubbleListProps> = ({ items, listClassName, itemClassName }) => {
  return (
    <BubbleListStyles className={listClassName}>
      {items.map((item, i) => (
        <li key={i} className={`bubble-list-item${itemClassName ? ` ${itemClassName}` : ''}`}>
          {item}
        </li>
      ))}
    </BubbleListStyles>
  );
};

export default BubbleList;

const BubbleListStyles = styled.ul`
  cursor: default;
  list-style: none;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
  justify-content: center;
  max-width: 999px;
  margin: 0 auto;
  width: fit-content;
  .bubble-list-item {
    flex: 1 1 250px;
    width: fit-content;
    box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.rgb('fg', 0.1)};
    background: ${({ theme }) => theme.rgb('fg', 0.05)};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    padding: 0.25rem 1rem;
    text-align: center;
    min-height: 3rem;
    line-height: 1.5;
  }
`;
