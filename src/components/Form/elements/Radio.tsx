import styled from 'styled-components';

interface RadioProps {
  onChange: (value: string) => void;
  name: string;
  label: string;
  value: string;
  checked: boolean;
}

const Radio = ({ name, label, value, checked, onChange }: RadioProps) => {
  return (
    <RadioStyles aria-label={name}>
      <label>
        <input
          type='radio'
          role='radio'
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.value)}
          aria-labelledby={label}
        />
        <div className='radio'></div>
        <div className='label' aria-label={label}>
          {label}
        </div>
      </label>
    </RadioStyles>
  );
};

export default Radio;

const RadioStyles = styled.div`
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
    .radio {
      position: absolute;
      width: 1.4rem;
      height: 1.4rem;

      left: 0;
      border-radius: 50%;
      box-shadow: 0 0 1px 1px
        ${({ theme: { isLightMode, primary, secondary } }) =>
          isLightMode ? primary[500] : secondary[500]}
        inset;
      ::after {
        display: none;
        position: absolute;
        content: '●';
        font-size: 1.25em;
        font-weight: 900;
        line-height: 1em;
        background: ${({ theme }) => (theme.isLightMode ? 'secondary' : 'primary')};

        width: 100%;
        height: 100%;

        justify-content: center;
        align-items: center;
        text-align: center;
      }
    }

    input:focus-visible ~ .radio {
      outline: 2px solid ${({ theme }) => theme.secondary[800]};
    }
    input:checked ~ .radio {
      background-color: ${({ theme: { isLightMode, primary, secondary } }) =>
        isLightMode ? primary[500] : secondary[500]};
      color: ${({ theme: { bg } }) => bg};

      ::after {
        display: flex;
      }
    }
  }
`;
