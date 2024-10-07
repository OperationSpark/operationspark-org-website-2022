import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';

interface CheckboxProps {
  onChange: (value: boolean) => void;
  name: string;
  label: string;
  checked: boolean;
  testId?: string;
}

const Checkbox = ({ name, label, checked, onChange, testId }: CheckboxProps) => {
  return (
    <CheckboxStyles aria-checked={checked} aria-label={name}>
      <label>
        <input
          type='checkbox'
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-label={label}
          aria-checked={checked}
          data-test-id={testId ?? `checkbox-${kebabCase(name)}`}
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

  label {
    padding: 0.25rem;
    padding-left: 2rem;
    position: relative;
    user-select: none;
    input {
      position: absolute;
      width: 1.4rem;
      height: 1.4rem;
      z-index: 1;
      left: 0;
      opacity: 0;
    }
    .checkbox {
      position: absolute;
      width: 1.4rem;
      height: 1.4rem;

      left: 0;
      border-radius: 2px;
      box-shadow: 0 0 1px 1px
        ${({ theme: { isLightMode, primary, secondary } }) =>
          isLightMode ? primary[500] : secondary[500]}
        inset;
      ::after {
        display: none;
        position: absolute;
        content: '✓';
        font-weight: 900;
        line-height: 1.25rem;

        width: 100%;
        height: 100%;

        justify-content: center;
        align-items: center;
        text-align: center;
      }
    }

    input:focus-visible ~ .checkbox {
      outline: 2px solid ${({ theme }) => theme.secondary[800]};
    }
    input:checked ~ .checkbox {
      background-color: ${({ theme: { isLightMode, primary, secondary } }) =>
        isLightMode ? primary[500] : secondary[500]};
      color: ${({ theme: { bg } }) => bg};

      ::after {
        display: flex;
      }
    }
  }
`;
