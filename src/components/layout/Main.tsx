import { ReactNode } from 'react';
import styled, { CSSProperties, useTheme } from 'styled-components';

interface MainProps {
  children?: ReactNode;
  style?: CSSProperties;
}

export const Main = ({ children, style }: MainProps) => {
  const theme = useTheme();

  return (
    <MainStyles style={style} navHeight={theme.navHeight}>
      {children}
    </MainStyles>
  );
};

export default Main;

export const MainStyles = styled.main.attrs(({ navHeight }: { navHeight: number }) => ({
  navHeight,
}))`
  padding-top: ${({ theme }) => theme.navHeight}px;
  min-height: 100vh;
  height: 100%;
  transition: padding-top 250ms;

  @media screen and (max-width: 900px) {
    padding-top: ${({ theme }) => theme.navHeight - 24}px;
  }
`;
