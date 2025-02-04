import { css } from 'styled-components';

const pageCommonCss = css`
  .TODO {
    color: ${({ theme }) => theme.rgb('red', 1)};
    background: ${({ theme }) => theme.rgb('red', 0)};
    box-shadow: 0 0 0px 2px inset ${({ theme }) => theme.rgb('red', 1)},
      0 0 1rem 0px inset ${({ theme }) => theme.rgb('red', 1)},
      0 0 1.25rem 1px ${({ theme }) => theme.rgb('red', 0.5)};
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    position: relative;
    font-family: 'Kalam', sans-serif;
    width: fit-content;
    margin: 0 auto;
    padding: 1rem;
    padding-top: 3rem;
    border-radius: 1rem;

    &::before {
      content: 'TODO';
      font-size: 2rem;
      font-family: 'Permanent Marker', serif;
      position: absolute;
      top: 0.5rem;
      line-height: 1;
      text-align: center;
      left: 0;
      right: 0;
    }
  }

  .page-header-container {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    font-family: 'Red Hat Display', sans-serif;

    .page-header-content {
      font-family: 'Red Hat Display', sans-serif;
      width: fit-content;
      background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg25 : theme.alpha.bg25)};
      box-shadow: 0 0 3px 1px inset
        ${({ theme }) => (theme.isLightMode ? theme.alpha.bg50 : theme.alpha.fg50)};

      width: fit-content;
      padding: 1rem;
      margin-bottom: 0.5rem;
      border-radius: 1rem;
      backdrop-filter: blur(2rem);
      -webkit-backdrop-filter: blur(2rem);
      line-height: 1;
      color: ${({ theme }) => theme.rgb('fg', 0.8)};
      text-align: center;
    }
  }

  .grid-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-flow: row wrap;
    gap: 0.25rem;
    justify-content: center;
    max-width: 999px;
    margin: 0 auto;
    li {
      flex: 1 1 250px;
      box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.rgb('fg', 0.1)};
      background: ${({ theme }) => theme.rgb('fg', 0.05)};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.125rem;
      padding: 0.25rem;

      .grid-list-item {
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.25rem 0.5rem;
        text-align: center;
      }

      &:has(a.grid-list-item) {
        padding: 0;

        a.grid-list-item {
          width: 100%;
          color: ${({ theme }) => theme.rgb('fg', 0.9)};
          color: ${({ theme }) =>
            theme.isLightMode ? theme.rgb('blue', 1, -5) : theme.rgb('blue', 1, 5)};
          padding: 0.5rem;
        }
        &:hover {
          background: ${({ theme }) => theme.rgb('blue', 0.2)};
          box-shadow: 0 0 0.75rem 0px inset ${({ theme }) => theme.rgb('blue', 0.5)};
        }
      }
    }
  }

  .section-header {
    font-size: 1.5rem;
    font-weight: 900;
    text-align: center;
  }

  .section-body {
    padding: 1rem;
    gap: 1rem;
    display: flex;
    flex-flow: column;
  }
  .section-content-card {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('fg', 0.25)};
    border-radius: 1rem;
    background: ${({ theme }) => theme.rgb('fg', 0.05)};
  }

  .card-subheader {
    font-size: 1.2rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
  }
  .subsection-body {
    padding: 1rem;
    background: ${({ theme }) => theme.rgb('bg', 0.5)};
    border-radius: 1rem;
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('fg', 0.25)};
  }
`;

export default pageCommonCss;
