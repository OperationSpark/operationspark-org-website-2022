import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type GridListProps = {
  items: ReactNode[];
  interactive?: boolean;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
};
const GridList: FC<GridListProps> = ({ items, interactive, style, itemStyle }) => {
  return (
    <GridListStyles className={interactive ? '_interactive-item' : ''} style={style}>
      {items.map((item, i) => (
        <li key={i} className='_grid-list-item' style={itemStyle}>
          {item}
        </li>
      ))}
    </GridListStyles>
  );
};

export default GridList;

const GridListStyles = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  gap: 0.25rem;
  justify-content: center;
  max-width: 999px;
  margin: 0 auto;
  ._grid-list-item {
    flex: 1 1 250px;
    box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.rgb('fg', 0.1)};
    background: ${({ theme }) => theme.rgb('fg', 0.05)};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.125rem;
    padding: 0.5rem;
    text-align: center;

    > * {
      font-size: 0.9rem;
      font-weight: 500;
      padding: 0.25rem 0.5rem;
      text-align: center;
    }
  }

  &._interactive-item {
    ._grid-list-item {
      padding: 0;

      > * {
        width: 100%;
        color: ${({ theme }) => theme.rgb('fg', 0.9)};
        padding: 0.5rem;
        transition: 225ms;
        background: ${({ theme }) =>
          theme.isLightMode ? theme.rgb('primary.700', 0.05) : theme.rgb('secondary', 0.05)};
        &:hover {
          color: ${({ theme }) =>
            theme.isLightMode ? theme.rgb('primary.700', 1) : theme.rgb('secondary', 1, 5)};
          background: ${({ theme }) =>
            theme.isLightMode ? theme.rgb('primary.700', 0.1) : theme.rgb('secondary', 0.1)};
          box-shadow: 0 0 0.75rem 0px inset
            ${({ theme }) =>
              theme.isLightMode ? theme.rgb('primary.700', 0.35) : theme.rgb('secondary', 0.5)};
        }
      }
    }
  }
`;
