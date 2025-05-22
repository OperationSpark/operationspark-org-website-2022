import { css } from 'styled-components';

export const layoutCss = css`
  .text-center {
    text-align: center;
  }

  .dynamic-txt {
    font-size: calc(0.4vw + 0.9rem);
  }

  .flex-row {
    display: flex;
    flex-flow: row nowrap;
  }
  .flex-column {
    display: flex;
    flex-flow: column nowrap;
  }

  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-align-center {
    display: flex;
    align-items: center;
  }
  .flex-justify-center {
    display: flex;
    justify-content: center;
  }

  .text-subtle-1 {
    color: ${({ theme }) => theme.rgb('fg', 0.75)};
  }
  .text-subtle-2 {
    color: ${({ theme }) => theme.rgb('fg', 0.625)};
  }

  .text-subtle-3 {
    color: ${({ theme }) => theme.rgb('fg', 0.5)};
  }

  .text-subtle-4 {
    color: ${({ theme }) => theme.rgb('fg', 0.375)};
  }

  .text-subtle-5 {
    color: ${({ theme }) => theme.rgb('fg', 0.25)};
  }

  .gap-1 {
    gap: 0.25rem;
  }
  .gap-2 {
    gap: 0.5rem;
  }
  .gap-3 {
    gap: 0.75rem;
  }
  .gap-4 {
    gap: 1rem;
  }
  .w-0 {
    width: 0;
  }

  .w-10 {
    width: 10%;
  }
  .w-20 {
    width: 20%;
  }
  .w-30 {
    width: 30%;
  }

  .w-40 {
    width: 40%;
  }

  .w-50 {
    width: 50%;
  }
  .w-60 {
    width: 60%;
  }
  .w-70 {
    width: 70%;
  }
  .w-80 {
    width: 80%;
  }
  .w-90 {
    width: 90%;
  }

  .w-100 {
    width: 100%;
  }

  .fw-100 {
    font-weight: 100 !important;
  }

  .fw-200 {
    font-weight: 200 !important;
  }

  .fw-300 {
    font-weight: 300 !important;
  }

  .fw-400 {
    font-weight: 400 !important;
  }

  .fw-500 {
    font-weight: 500 !important;
  }

  .fw-600 {
    font-weight: 600 !important;
  }

  .fw-700 {
    font-weight: 700 !important;
  }

  .fw-800 {
    font-weight: 800 !important;
  }

  .fw-900 {
    font-weight: 900 !important;
  }

  .fs-50 {
    font-size: 0.5rem !important;
  }
  .fs-60 {
    font-size: 0.6rem !important;
  }
  .fs-75 {
    font-size: 0.75rem !important;
  }
  .fs-100 {
    font-size: 1rem !important;
  }
  .fs-125 {
    font-size: 1.25rem !important;
  }
  .fs-150 {
    font-size: 1.5rem !important;
  }
  .fs-175 {
    font-size: 1.75rem !important;
  }
  .fs-200 {
    font-size: 2rem !important;
  }

  .flex-100 {
    flex: 1 1 100px;
  }
  .flex-150 {
    flex: 1 1 150px;
  }
  .flex-200 {
    flex: 1 1 200px;
  }
  .flex-250 {
    flex: 1 1 250px;
  }
  .flex-300 {
    flex: 1 1 300px;
  }
  .flex-350 {
    flex: 1 1 350px;
  }
  .flex-400 {
    flex: 1 1 400px;
  }
  .flex-450 {
    flex: 1 1 450px;
  }
  .flex-500 {
    flex: 1 1 500px;
  }
  .flex-550 {
    flex: 1 1 550px;
  }
  .flex-600 {
    flex: 1 1 600px;
  }

  .mb-0 {
    margin-bottom: 0;
  }
  .lh-1 {
    line-height: 1;
  }
  .lh-2 {
    line-height: 2;
  }

  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .text-nowrap {
    white-space: nowrap;
  }
  .fit-content {
    width: fit-content;
    height: fit-content;
  }
  .fit-height {
    height: fit-content;
  }
  .fit-width {
    width: fit-content;
  }

  .btn {
    padding: 0.35rem 1rem;
    border-radius: 0.25rem;
    font-weight: 700;
    transition: all 225ms;
  }

  .btn.btn-default {
    background: ${({ theme }) => theme.rgb('bg', 1, 2)};
    color: ${({ theme }) => theme.rgb('fg', 1)};

    box-shadow: ${({ theme }) => {
      const lm = theme.isLightMode;
      const c1 = theme.rgb('fg', 0.5, lm ? 0 : -10);
      const c2 = theme.rgb('fg', 0.25, lm ? -5 : -20);
      return `
      0 0 0.1rem 2px ${c1},
      0 0 0.5rem 1px inset ${c2}
      `;
    }};

    &:hover,
    &:focus-visible {
      background: ${({ theme }) => theme.rgb('bg', 1, theme.isLightMode ? 4 : 8)};
      transform: translateY(-2px) scale(1.05, 1.02);

      box-shadow: ${({ theme }) => {
        const c1 = theme.rgb('fg', 0.5, -10);
        const c2 = theme.rgb('bg', 1, 0);
        return `
        0 0 0.25rem 2px ${c1},
        0 0 0rem 2px inset ${c2}
        `;
      }};
    }

    &:active {
      transform: translateY(0px) scale(1, 1);
      box-shadow: ${({ theme }) => {
        const c1 = theme.rgb('fg', 0.5, -10);
        const c2 = theme.rgb('bg', 1, 0);
        return `
        0 0 0.1rem 2px ${c1},
        0 0 0.5rem 1px inset ${c2}
        `;
      }};
    }
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.rgb('magenta', 1, -2)};
      box-shadow: 0 0 0.1rem 2px ${({ theme }) => theme.rgb('magenta', 0.5, -10)},
        0 0 0.5rem 1px ${({ theme }) => theme.rgb('magenta', 0.25, -20)};
    }

    &:disabled {
      background: ${({ theme }) => theme.rgb('bg', 0.2, 2)};
      color: ${({ theme }) => theme.rgb('fg', 0.5)};
      box-shadow: none;
      pointer-events: none;
    }
  }

  .btn.btn-secondary {
    background: ${({ theme }) => theme.rgb('secondary', 1)};
    color: ${({ theme }) => theme.rgb('black', 1)};

    box-shadow: ${({ theme }) => {
      const c1 = theme.rgb('secondary', 0.5, -10);
      const c2 = theme.rgb('secondary', 0.25, -20);
      return `
      0 0 0.1rem 2px ${c1},
      0 0 0.5rem 1px ${c2}
      `;
    }};

    &:hover,
    &:focus-visible {
      background: ${({ theme }) => theme.rgb('secondary', 1, theme.isLightMode ? 4 : 8)};
      transform: translateY(-2px) scale(1.05, 1.02);

      box-shadow: ${({ theme }) => {
        const c1 = theme.rgb('secondary', 0.5, -10);
        const c2 = theme.rgb('secondary', 0.25, -20);
        return `
        0 0 0.25rem 2px ${c1},
        0 0 0.75rem 2px ${c2}
        `;
      }};
    }

    &:active {
      transform: translateY(0px) scale(1, 1);
      box-shadow: ${({ theme }) => {
        const c1 = theme.rgb('secondary', 0.5, -10);
        const c2 = theme.rgb('secondary', 0.25, -20);
        return `
        0 0 0.1rem 2px ${c1},
        0 0 0.5rem 1px ${c2}
        `;
      }};
    }
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.rgb('secondary', 1, -2)};
      box-shadow: 0 0 0.1rem 2px ${({ theme }) => theme.rgb('secondary', 0.5, -10)},
        0 0 0.5rem 1px ${({ theme }) => theme.rgb('secondary', 0.25, -20)};
    }

    &:disabled {
      background: ${({ theme }) => theme.rgb('secondary', 0.2, 2)};
      color: ${({ theme }) => theme.rgb('fg', 0.5)};
      box-shadow: none;
      pointer-events: none;
    }
  }

  .btn.btn-primary {
    background: ${({ theme }) => theme.rgb('primary', 1)};
    color: ${({ theme }) => theme.rgb('white', 1)};

    box-shadow: ${({ theme }) => {
      const c1 = theme.rgb('primary', 0.5, -10);
      const c2 = theme.rgb('primary', 0.25, -20);
      return `
      0 0 0.1rem 2px ${c1},
      0 0 0.5rem 1px ${c2}
      `;
    }};

    &:hover,
    &:focus-visible {
      background: ${({ theme }) => theme.rgb('primary', 1, theme.isLightMode ? 4 : 8)};
      transform: translateY(-2px) scale(1.05, 1.02);
      box-shadow: ${({ theme }) => {
        const c1 = theme.rgb('primary', 0.5, -10);
        const c2 = theme.rgb('primary', 0.25, -20);
        return `
        0 0 0.25rem 2px ${c1},
        0 0 0.75rem 2px ${c2}
        `;
      }};
    }

    &:active {
      transform: translateY(0px) scale(1, 1);
      box-shadow: ${({ theme }) => {
        const c1 = theme.rgb('primary', 0.5, -10);
        const c2 = theme.rgb('primary', 0.25, -20);
        return `
        0 0 0.1rem 2px ${c1},
        0 0 0.5rem 1px ${c2}
        `;
      }};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.rgb('primary', 1, -2)};
      box-shadow: 0 0 0.1rem 2px ${({ theme }) => theme.rgb('primary', 0.5, -10)},
        0 0 0.5rem 1px ${({ theme }) => theme.rgb('primary', 0.25, -20)};
    }

    &:disabled {
      background: ${({ theme }) => theme.rgb('primary', 0.2, 2)};
      color: ${({ theme }) => theme.rgb('fg', 0.5)};
      box-shadow: none;
      pointer-events: none;
    }
  }

  /*
    Non-matching button requested by Max
    https://vercel.live/link/opspark-website-2022-git-214-update-home-e7890b-operation-spark.vercel.app?page=%2F%3FvercelThreadId%3D9_WGF
  */
  .button-9 {
    appearance: button;
    backface-visibility: hidden;
    background-color: #405cf5;
    border-radius: 6px;
    border-width: 0;
    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset, rgba(50, 50, 93, 0.1) 0 2px 5px 0,
      rgba(0, 0, 0, 0.07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;
    font-size: 100%;
    height: 44px;
    line-height: 1.15;
    margin: 12px 0 0;
    outline: none;
    overflow: hidden;
    padding: 0 25px;
    position: relative;
    text-align: center;
    text-transform: none;
    transform: translateZ(0);
    transition: all 0.2s, box-shadow 0.08s ease-in;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
  }

  .button-9:disabled {
    cursor: default;
  }

  .button-9:focus {
    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset, rgba(50, 50, 93, 0.2) 0 6px 15px 0,
      rgba(0, 0, 0, 0.1) 0 2px 2px 0, rgba(50, 151, 211, 0.3) 0 0 0 4px;
  }
`;
