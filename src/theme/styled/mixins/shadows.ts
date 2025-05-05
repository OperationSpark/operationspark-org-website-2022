import { css } from 'styled-components';

export const cardShadow = css`
  box-shadow: ${({ theme }) => `
    -0.25rem 0.25rem 0.5rem 1px ${
      theme.isLightMode ? theme.rgb('primary.700', 0.25) : theme.rgb('secondary', 0.125)
    },
    1px -1px 3px ${
      theme.isLightMode ? theme.rgb('primary.700', 0.5, -4) : theme.rgb('secondary', 0.25)
    }
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
export const cardShadowSub1 = css`
  box-shadow: ${({ theme }) => `
    1px 1px 3px ${theme.primary[200]},
    -1px -1px 3px ${theme.secondary[300]}
  `};
`;
