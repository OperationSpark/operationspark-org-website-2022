import { css } from 'styled-components';

export const circuitBoardBg = css`
  background: ${({ theme }) => (theme.isLightMode ? theme.primary[700] : theme.primary[700])};

  background-image: url('/images/svg/circuitBoard.svg');
`;
