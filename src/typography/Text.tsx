import styled, { css } from 'styled-components';

const H = css`
  font-family: 'Red Hat Display', sans-serif;
  word-spacing: 0.25rem;
  font-weight: 900;
  line-height: 1em;
  padding-bottom: 1.5rem;
`;

export const HXL = styled.h1`
  ${H};
  font-size: calc(1vw + 3.5rem);
  font-weight: 900;
`;
export const H1 = styled.h1`
  ${H};
  font-size: calc(1vw + 3rem);
`;
export const H2 = styled.h2`
  ${H};

  font-size: calc(1vw + 2.5rem);
`;
export const H3 = styled.h3`
  ${H};
  font-size: calc(1vw + 2rem);
`;
export const H4 = styled.h4`
  ${H};
  font-size: calc(1vw + 1.5rem);
`;
export const H5 = styled.h5`
  ${H};
  font-size: calc(1vw + 1.25rem);
`;
export const H6 = styled.h6`
  ${H};
  font-size: calc(1vw + 1rem);
`;
export const P = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: calc(0.75vw + 1rem);
`;
