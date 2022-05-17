import { css } from 'styled-components';

export const cardShadow = css`
  box-shadow: ${({ theme }) => `
    -1px 1px 4px ${theme.primary[theme.isLightMode ? 300 : 200]},
    1px -1px 3px ${theme.primary[theme.isLightMode ? 300 : 100]}
  `};
`;
export const cardShadowLtr = css`
  box-shadow: ${({ theme }) => `
    -1px 1px 3px ${theme.primary[200]},
    1px -1px 3px ${theme.secondary[300]}
  `};
`;
export const cardShadowRtl = css`
  box-shadow: ${({ theme }) => `
    1px 1px 3px ${theme.primary[200]},
    -1px -1px 3px ${theme.secondary[300]}
  `};
`;
