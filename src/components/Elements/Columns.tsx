import { ReactNode } from 'react';
import styled, { CSSProperties } from 'styled-components';

const TwoColumnsStyles = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  @media screen and (max-width: 1000px) {
    flex-flow: column;
    width: 100%;
  }
`;
const Column = styled.div`
  display: flex;
  flex-flow: column;

  align-items: center;
  padding: 0 1rem;
  :first-of-type {
    padding-left: 0;
  }
  :last-of-type {
    padding-right: 0;
  }
  @media screen and (max-width: 1000px) {
    width: 100% !important;
    padding: 0 !important;
  }
`;

interface TwoColumnsProps {
  leftCol: ReactNode;
  rightCol: ReactNode;
  leftColStyle?: CSSProperties;
  rightColStyle?: CSSProperties;
  style?: CSSProperties;
}

export const TwoColumns = ({
  leftCol,
  rightCol,
  leftColStyle,
  rightColStyle,
  style
}: TwoColumnsProps) => {
  return (
    <TwoColumnsStyles style={style}>
      <Column style={leftColStyle}>{leftCol}</Column>
      <Column style={rightColStyle}>{rightCol}</Column>
    </TwoColumnsStyles>
  );
};
