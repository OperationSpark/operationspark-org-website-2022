import { backdropFilter } from '@this/src/theme/styled/mixins/filters';
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
      <div className='_slash-divider'>{children}</div>
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
  position: relative;
  width: 100%;
  height: 24px;
  border-bottom: 1px solid
    ${({ theme }) => (theme.isLightMode ? theme.primary[900] : theme.primary[700])};
  border-top: 1px solid
    ${({ theme }) => (theme.isLightMode ? theme.primary[900] : theme.primary[700])};

  ${backdropFilter({ blur: 2, opacity: 0.1 })};

  ._slash-divider {
    width: 100%;
    height: 100%;
    background-image: url(${({ theme }) => getImageUrl(theme)});
  }

  &.animate {
    ._slash-divider {
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
  }

  @media print {
    display: none;
  }
`;
