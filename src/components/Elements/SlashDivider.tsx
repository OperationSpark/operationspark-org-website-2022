import { ReactNode, CSSProperties } from 'react';
import styled, { DefaultTheme } from 'styled-components';

const getImageUrl = (theme: DefaultTheme) => {
  return `/images/svg/diagonal-lines-${theme.colorMode}.svg`;
};

const SlashDividerStyles = styled.div`
  width: 100%;
  height: 24px;
  position: relative;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.isLightMode ? theme.primary[900] : theme.primary[700]};
  border-top: 1px solid
    ${({ theme }) =>
      theme.isLightMode ? theme.primary[900] : theme.primary[700]};
  background-image: url(${({ theme }) => getImageUrl(theme)});

  @media print {
    display: none;
  }
`;

export const SlashDivider = ({
  children,
  style,
}: {
  children?: ReactNode;
  style?: CSSProperties;
}) => {
  return <SlashDividerStyles style={style}>{children}</SlashDividerStyles>;
};
