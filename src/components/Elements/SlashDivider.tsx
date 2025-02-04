import { CSSProperties, ReactNode } from 'react';
import styled, { DefaultTheme, keyframes } from 'styled-components';

const getImageUrl = (theme: DefaultTheme) => {
  return `/images/svg/diagonal-lines-${theme.colorMode}.svg`;
};

export const SlashDivider = ({
  children,
  style,
  animate = false,
}: {
  children?: ReactNode;
  style?: CSSProperties;
  animate?: boolean;
}) => {
  return (
    <SlashDividerStyles style={style} className={animate ? 'animate' : ''}>
      {children}
    </SlashDividerStyles>
  );
};

const move = keyframes`
  0% {

    background-position: 0 0;
    filter: hue-rotate(0deg) saturate(2);
  }

  100% {
    background-position: 120% 0;
    filter: hue-rotate(360deg) saturate(2);
  }


`;

const SlashDividerStyles = styled.div`
  width: 100%;
  height: 24px;
  position: relative;
  border-bottom: 1px solid
    ${({ theme }) => (theme.isLightMode ? theme.primary[900] : theme.primary[700])};
  border-top: 1px solid
    ${({ theme }) => (theme.isLightMode ? theme.primary[900] : theme.primary[700])};
  background-image: url(${({ theme }) => getImageUrl(theme)});

  &.animate {
    animation: 45s ${move} forwards linear infinite;
    border-bottom: none;
    border-top: none;
    &::before {
      position: absolute;
      inset: 0;
      content: '';
      background: ${({ theme }) => `
      linear-gradient(
        0deg,
        transparent -50%,
        ${theme.purple.alpha[700][200]} 50%,
        transparent 150%
      )
    `};
    }
  }

  @media print {
    display: none;
  }
`;
