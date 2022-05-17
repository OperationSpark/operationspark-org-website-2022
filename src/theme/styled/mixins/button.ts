import { css } from 'styled-components';

export const buttonCss = css`
  padding: 0.3rem 0.6rem;
  background: ${({ theme }) => theme.primary[theme.isLightMode ? 700 : 500]};
  margin-right: 3px;
  border-radius: 0.25rem;
  transition: background-color 125ms, border-color 125ms;
  color: white;
  font-weight: 600;
  outline: 2px solid transparent;
  user-select: none;
  -webkit-user-drag: none;

  cursor: pointer;

  :hover,
  :focus {
    background: ${({ theme }) => theme.primary[theme.isLightMode ? 300 : 800]};
    backdrop-filter: blur(8px);
    box-shadow: 0 0 3px 0px ${(p) => p.theme.purple[900]} inset;
    &.info,
    .info {
      background: ${(p) => p.theme.yellow[400]};
    }
    z-index: 1;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.secondary[800]};
    box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.primary[900]};
    border-radius: 3px;
    outline: 2px solid ${({ theme }) => theme.secondary[800]};
  }
  &.info {
    background: ${(p) => p.theme.secondary[400]} !important;
    color: ${(p) => p.theme.purple[900]};
    box-shadow: 0 0 3px 0px ${(p) => p.theme.purple[900]} inset;
    :hover,
    :active,
    :focus-visible {
      background: ${(p) => p.theme.yellow[400]} !important;
    }
  }
  &.active.info {
    box-shadow: 0 0 3px 1px inset rgba(25, 25, 25, 0.75) !important;
    background: ${(p) => p.theme.yellow[400]} !important;
  }
`;

export const yellowBtn = css`
  ${buttonCss}

  background: ${(p) => p.theme.secondary[400]};
  color: ${(p) => p.theme.purple[900]};
  box-shadow: 0 0 3px 0px ${(p) => p.theme.purple[900]} inset;

  :hover,
  :active,
  :focus,
  :focus-visible {
    background: ${(p) => p.theme.yellow[400]} !important;
  }

  &.active {
    background: ${(p) => p.theme.yellow[400]} !important;
  }
  :disabled,
  :disabled:hover,
  &.disabled,
  &.disabled:hover {
    background: ${({ theme: { grey, isLightMode } }) =>
      isLightMode ? grey[200] : grey[800]} !important;
    color: ${({ theme: { grey, isLightMode } }) =>
      isLightMode ? grey[300] : grey[700]} !important;
    cursor: default;
    box-shadow: none;
  }
`;
