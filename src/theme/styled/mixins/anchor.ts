import { css } from 'styled-components';

export const anchor = css`
  color: ${({ theme }) =>
    theme.isLightMode ? theme.primary[600] : theme.secondary[400]};
  font-size: 0.9rem;
  font-weight: 600;
  padding: 3px;
  font-family: 'Source Code Pro', monospace;
  border: none;
  border-radius: 0.25rem;
  width: fit-content;

  &.right-arr-left {
    padding: 0 0.25rem;
    height: fit-content;
    position: relative;

    white-space: pre;
    display: flex;
    left: -0.25rem;
    ::before {
      transition: padding 125ms;

      content: '>';
      vertical-align: middle;
      padding-right: 0.25rem;
      height: 100%;

      display: flex;
      align-items: center;
      outline: none;
    }
    :hover,
    :focus-visible {
      ::before {
        padding-right: 0.5rem;
        outline: none;
      }
    }
  }

  :focus {
    border: none;
    outline: none;

    box-shadow: 0 0 2px 0px ${({ theme }) => theme.primary[50]};
  }
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.secondary[800]};
  }
  :hover {
    box-shadow: 0 0 2px 0px ${({ theme }) => theme.alpha.fg};
    color: ${({ theme }) =>
      theme.isLightMode ? theme.primary[900] : theme.secondary[700]};
  }
`;
