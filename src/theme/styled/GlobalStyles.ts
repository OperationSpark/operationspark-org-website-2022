import { createGlobalStyle } from 'styled-components';
import { anchor } from './mixins/anchor';
import { circuitBoardBg } from './mixins/circuitBoardBg';

const GlobalStyles = createGlobalStyle`
  * {
    transition: background-color 125ms, font-size 40ms;
  }
  :root {
    font-family: 'Roboto', sans-serif;
  }
  html, body {
    background: ${({ theme }) => theme.bg} !important;
    color: ${({ theme }) => theme.fg} !important;
  }
  #atlanta-promo-root {
    position: relative;
    z-index: 1;
  }
  p {
     font-family: 'Roboto', sans-serif;
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
  .red-hat, h1, h2, h3, h4, h5, h6 {
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
   body {
    overflow-x: hidden;
  }
  a {
    -webkit-user-drag: none !important;
    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.secondary[800]};
    }
  }
  .anchor {
    ${anchor}
  }
  .content {
    max-width: calc(4vw + 1200px);
    margin: 0 auto;
    padding: calc(0.8vw + 1.6rem);
  }
  .text-center {
    text-align: center;
  }

  .dynamic-txt {
    font-size: calc(0.4vw + 0.9rem);
  }
  .dynamic-xl {
    font-size: calc(0.8vw + 3.2rem);
    font-weight: 900;
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
    font-size: calc(0.6vw + 1.00rem);
    font-weight: 700;
  }
  .dynamic-h4 {
    font-size: calc(0.4vw + 0.8rem);
    font-weight: 600;
  }

  .xl-txt {
    font-weight: 900;
    font-size: 3.5rem;
  }

  .lg-txt {
    font-weight: 700;
    font-size: 2rem;
  }

  .row-between {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }


  ::-webkit-scrollbar {
    width: 0.8rem;
    transition: width 125ms;
    background: ${({ theme }) => theme.bg};
    box-shadow: 0 0 1px 0px ${({ theme }) => theme.alpha.fg} inset;
  }
  ::-webkit-scrollbar-thumb {
    /* border: 3px solid transparent;
    border-top-width: 2px;
    border-bottom-width: 2px; */
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
    background: ${({ theme }) => theme.purple.alpha[700][500]};
    color: white;
  }

  @media screen and (max-width: 768px) {
    .dynamic-txt { font-size: 1rem; }
    .xl-txt { font-size: 2rem; }
    .lg-txt { font-size: 1.25rem; }
    .dynamic-xl { font-size: calc(0.8vw + 2.25rem); }
    .dynamic-h1 { font-size: calc(0.8vw + 2rem); }
    .dynamic-h2 { font-size: calc(0.8vw + 1.1rem); }
    .dynamic-h3 { font-size: calc(0.8vw + 1rem); }
    .row-between {
      flex-flow: column;
    }
    .content {
      padding: calc(0.8vw + 0.8rem);
    }
  }
  @media screen and (min-width: 1200px) {
    .dynamic-txt { font-size: 1.2rem; }
    .xl-txt { font-size: 2rem; }
    .lg-txt { font-size: 2rem; }
    .dynamic-xl { font-size: 4rem; }
    .dynamic-h1 { font-size: 3.2rem; }
    .dynamic-h2 { font-size: 1.9rem; }
    .dynamic-h3 { font-size: 1.4rem; }
  }

  @media print {
    img, .img, .opspark-value-img, button, a {
      display: none !important;
    }
    * {
      box-shadow: none !important;
      color: rgba(50,50,50,1) !important;
      width: 100% !important;
      flex-flow: column;
      overflow: visible !important;
    }
    overflow: visible !important;

  }
`;

export default GlobalStyles;
