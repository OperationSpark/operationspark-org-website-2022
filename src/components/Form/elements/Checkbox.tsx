import kebabCase from 'lodash/kebabCase';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  onChange: (value: boolean) => void;
  name: string;
  label: string | ReactNode;
  checked: boolean;
  testId?: string;
  required?: boolean;
  isErr?: boolean;
}

const Checkbox = ({ name, label, checked, onChange, testId, required, isErr }: CheckboxProps) => {
  return (
    <CheckboxStyles
      className={isErr ? 'checkbox-error' : ''}
      aria-checked={checked}
      aria-label={name}
    >
      <label>
        <input
          type='checkbox'
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-label={typeof label === 'string' ? label : 'checkbox'}
          aria-checked={checked}
          data-test-id={testId ?? `checkbox-${kebabCase(name)}`}
          required={required}
        />
        <div className='checkbox'></div>
        <div className='label' aria-checked={checked}>
          {label}
        </div>
      </label>
    </CheckboxStyles>
  );
};

export default Checkbox;

const CheckboxStyles = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;

  label {
    display: flex;
    /* align-items: center; */
    padding: 0.5em;
    padding-left: 2.5em;
    position: relative;
    user-select: none;
    line-height: 1.25em;
    min-height: 2em;
    width: 100%;
    border-radius: 0.5rem;

    box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.rgb('fg', 0.1)};
    background: ${({ theme }) => theme.rgb('bg', 0)};
    transition: all 200ms;

    input {
      position: absolute;
      width: 1.25em;
      height: 1.25em;
      z-index: 1;

      opacity: 0;
      top: 0.25em;
      left: 0.25em;
      margin: 0;
    }
    .checkbox {
      position: absolute;
      width: 1.25em;
      height: 1.25em;
      top: 0.5em;
      left: 0.5em;
      transition: all 200ms;

      border-radius: 0.25em;
      box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.rgb('fg', 0.5)};

      ::after {
        display: flex;
        opacity: 0;
        position: absolute;
        content: '✓';
        font-weight: 900;
        line-height: 1.25em;

        transition: all 50ms;
        width: 100%;
        height: 100%;

        justify-content: center;
        align-items: center;
        text-align: center;
      }
    }

    input:focus-visible ~ .checkbox {
      outline: 2px solid
        ${({ theme }) => (theme.isLightMode ? theme.rgb('magenta') : theme.rgb('green'))};
    }

    &:hover {
      background: ${({ theme }) => theme.rgb('fg', 0.05)};
      box-shadow: 0 0 1px 1px inset
        ${({ theme }) => (theme.isLightMode ? theme.rgb('fg', 0.5) : theme.rgb('fg', 0.25))};
      .checkbox {
        background: ${({ theme }) => theme.rgb('green', 0.25)};
        ::after {
          opacity: 0;
        }
      }
    }

    &:has(input:checked) {
      background: ${({ theme }) =>
        theme.isLightMode ? theme.rgb('green', 0.1, -2) : theme.rgb('green', 0.1, 2)};
      box-shadow: 0 0 1px 1px inset
        ${({ theme }) =>
          theme.isLightMode ? theme.rgb('green', 0.5, -2) : theme.rgb('green', 0.25)};
      .checkbox {
        background: ${({ theme }) =>
          theme.isLightMode ? theme.rgb('green', 1, -10) : theme.rgb('green', 1, 2)};
        color: ${({ theme }) => theme.rgb('bg')};

        ::after {
          opacity: 1;
        }
      }

      &:hover {
        box-shadow: 0 0 1px 1px inset
          ${({ theme }) =>
            theme.isLightMode ? theme.rgb('green', 0.5, -10) : theme.rgb('green', 0.25)};
        background: ${({ theme }) =>
          theme.isLightMode ? theme.rgb('green', 0.25, -2) : theme.rgb('green', 0.2, 2)};

        .checkbox {
          background: ${({ theme }) => theme.rgb('green', 0.25)};
          color: ${({ theme }) => theme.rgb('fg')};
          ::after {
            opacity: 0.75;
          }
        }
      }
    }
  }

  &.checkbox-error {
    label {
      color: ${({ theme }) => theme.rgb('red')};
      font-weight: 500;
      box-shadow: 0 0 1px 1px ${({ theme }) => theme.rgb('red', 0.5)} inset;
      background: ${({ theme }) => theme.rgb('red', 0.1)};
      margin: 0.25rem 0;
      width: 100%;

      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 2.75em;
      border-radius: 0.5rem;
      .checkbox {
        left: 0.5em;
        box-shadow: 0 0 1px 1px ${({ theme }) => theme.rgb('red')} inset;
      }
    }
  }
`;
