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
    flex-wrap: wrap;
  }
  .flex-center {
    align-items: center;
    justify-content: center;
  }
  .flex-align-center {
    align-items: center;
  }
  .flex-justify-center {
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
`;
