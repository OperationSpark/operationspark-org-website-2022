import { createGlobalStyle, css } from 'styled-components';

import { anchor } from './mixins/anchor';
import { circuitBoardBg } from './mixins/circuitBoardBg';
import { layoutCss } from './mixins/layout';

const GlobalStyleCss = css`
  * {
    transition: background-color 125ms, font-size 40ms;
    box-sizing: border-box;
  }
  *::before,
  *::after {
    box-sizing: inherit;
  }
  :root {
    font-family: 'Roboto', sans-serif;
  }
  html,
  body {
    background: ${({ theme }) => theme.bg} !important;
    color: ${({ theme }) => theme.fg} !important;
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    font-weight: 400;
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
  }
  body {
    overflow-x: hidden;
  }

  ${layoutCss}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Red Hat Display', sans-serif;
    word-spacing: 0.25rem;
    margin: 0;
  }

  button {
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
    color: ${({ theme }) => theme.white};
    font-size: 1rem;
    font-family: 'Red Hat Display', sans-serif;
    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.secondary[800]};
    }
  }

  input,
  textarea,
  select {
    outline: none;
    border: none;
    background: none;
    color: ${({ theme }) => theme.fg};
    font-size: 1rem;
    font-family: 'Red Hat Display', sans-serif;
  }

  #atlanta-promo-root {
    position: relative;
    z-index: 100;
  }
  p {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    line-height: 1.5;
    font-weight: 400;
  }

  .bg-subtle-dark {
    background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg : theme.alpha.bg)};
    color: ${({ theme }) => theme.white};
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .rounded-card {
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 0.5rem 0 inset ${({ theme }) => theme.primary[300]};
  }
  .p-1 {
    padding: 0.5rem;
  }
  .br-1 {
    border-radius: 0.5rem;
  }
  .page-marker {
    content: '';
    height: ${({ theme }) => theme.navHeight / 2}px;
  }
  .primary-secondary {
    color: ${({ theme }) => (theme.isLightMode ? theme.primary[700] : theme.secondary[500])};
  }
  .primary {
    color: ${({ theme }) => theme.primary[700]};
  }
  .secondary {
    color: ${({ theme }) => theme.secondary[500]};
  }
  .red-hat,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Red Hat Display', sans-serif;
    word-spacing: 0.25rem;
  }
  .roboto {
    font-family: 'Roboto', sans-serif;
  }
  .cursive {
    font-family: 'Kalam', cursive;
  }
  .source-code {
    font-family: 'Source Code Pro', monospace;
  }

  a {
    width: fit-content;
    text-decoration: none;
    -webkit-user-drag: none !important;
    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.secondary[800]};
    }
  }
  iframe {
    border: none;
    outline: none;
  }
  .anchor {
    ${anchor}
  }
  .content {
    max-width: calc(4vw + 1200px);
    margin: 0 auto;
    padding: calc(0.8vw + 1.6rem);
  }

  .dynamic-xl {
    font-size: calc(0.8vw + 3.2rem);
    font-weight: 900;

    &.secondary {
      text-shadow: 0 0 5px rgba(0, 0, 0, 1);
    }
  }
  .text-shadow {
    text-shadow: 0 0 5px rgba(0, 0, 0, 1);
  }
  .dynamic-h1 {
    font-size: calc(0.8vw + 2.5rem);
    font-weight: 800;
  }
  .dynamic-h2 {
    font-size: calc(0.8vw + 1.25rem);
    font-weight: 700;
  }
  .dynamic-h3 {
    font-size: calc(0.6vw + 1rem);
    font-weight: 600;
  }
  .dynamic-h4 {
    font-size: calc(0.4vw + 0.8rem);
    font-weight: 600;
  }

  .xl-txt {
    font-weight: 600;
    font-size: 3.5rem;
  }

  .lg-txt {
    font-weight: 500;
    font-size: 2rem;
  }

  .row-between {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
  .mb0 {
    margin-bottom: 0;
  }

  .mt0 {
    margin-top: 0;
  }

  ::-webkit-scrollbar {
    width: 0.8rem;
    transition: width 125ms;
    background: ${({ theme }) => theme.bg};
    box-shadow: 0 0 1px 0px ${({ theme }) => theme.alpha.fg} inset;
  }
  ::-webkit-scrollbar-thumb {
    ${circuitBoardBg}
    zoom: 0.35;

    border-radius: 0.5rem;
    box-shadow: 0 0 5px 5px ${({ theme }) => theme.primary[500]} inset;
    :hover {
      box-shadow: 0 0 5px 5px ${({ theme }) => theme.primary[300]} inset;
    }
    :active {
      box-shadow: 0 0 5px 4px ${({ theme }) => theme.primary[700]} inset;
    }
  }

  ::selection {
    background: ${({ theme }) =>
      theme.isLightMode ? 'rgba(245, 220, 124, 0.5)' : 'rgba(245, 220, 124, 1)'};
    color: ${({ theme }) => theme.black};
    font-weight: 500;
  }

  .Toastify {
    --toastify-z-index: 9999999;
  }

  @media screen and (max-width: 768px) {
    .dynamic-txt {
      font-size: 1rem;
    }
    .xl-txt {
      font-size: 2rem;
    }
    .lg-txt {
      font-size: 1.25rem;
    }
    .dynamic-xl {
      font-size: calc(0.8vw + 2rem);
    }
    .dynamic-h1 {
      font-size: calc(0.8vw + 1.4rem);
    }
    .dynamic-h2 {
      font-size: calc(0.8vw + 1.1rem);
    }
    .dynamic-h3 {
      font-size: calc(0.8vw + 1rem);
    }
    .row-between {
      flex-flow: column;
    }
    .content {
      padding: calc(0.8vw + 0.8rem);
    }
  }
  @media screen and (min-width: 1200px) {
    .dynamic-txt {
      font-size: 1.2rem;
    }
    .xl-txt {
      font-size: 2rem;
    }
    .lg-txt {
      font-size: 2rem;
    }
    .dynamic-xl {
      font-size: 4rem;
    }
    .dynamic-h1 {
      font-size: 3.2rem;
    }
    .dynamic-h2 {
      font-size: 1.9rem;
    }
    .dynamic-h3 {
      font-size: 1.4rem;
    }
  }

  @media print {
    img,
    .img,
    .opspark-value-img,
    button,
    a {
      display: none !important;
    }
    * {
      box-shadow: none !important;
      color: rgba(50, 50, 50, 1) !important;
      width: 100% !important;
      flex-flow: column;
      overflow: visible !important;
    }
    overflow: visible !important;
  }
`;

const GlobalStyles = createGlobalStyle`${GlobalStyleCss}`;

export default GlobalStyles;
