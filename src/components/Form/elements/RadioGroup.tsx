import styled from 'styled-components';
import Radio from './Radio';
import RequiredStatus from './RequiredStatus';

interface RadioProps {
  label: string;
  onChange: (value: string, isValid: boolean) => void;
  value: string;
  isValid: boolean;
  required?: boolean;
  isErr: boolean;
  options: {
    name: string;
    label: string;
  }[];
}

const RadioGroup = ({
  label,
  options,
  isValid,
  value,
  required,
  isErr = false,
  onChange,
}: RadioProps) => {
  return (
    <RadioGroupStyles className={isErr ? '_input_err' : ''}>
      <div className='radio-group-label'>{label}</div>
      {required && <RequiredStatus isValid={isValid} />}

      {options.map(({ name, label }) => (
        <Radio
          key={name}
          name={name}
          label={label}
          checked={value === name}
          onChange={(value) => onChange(value, true)}
          value={name}
        />
      ))}
    </RadioGroupStyles>
  );
};

export default RadioGroup;

const RadioGroupStyles = styled.div`
  box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg};
  padding: 0.5rem;
  border-radius: 0.25rem;
  position: relative;
  width: 100%;
  .radio-group-label {
    width: fit-content;
    position: relative;
    padding-bottom: 0.5rem;
    color: ${({ theme: { isLightMode, primary, secondary } }) =>
      isLightMode ? primary[900] : secondary[500]};
  }

  &._input_err {
    box-shadow: 0 0 2px 1px ${({ theme }) => (theme.isLightMode ? theme.red[600] : theme.red[400])},
      0 0 0px 1000px ${({ theme }) => theme.bg} inset;
    ._err_label {
      display: block;
    }
    ._required {
      color: ${({ theme }) => (theme.isLightMode ? theme.red[600] : theme.red[400])};
      font-size: 0.8rem;
    }
  }
  ._err_label {
    display: none;
    font-weight: 300;
    padding: 0.5rem;
    color: ${({ theme }) => (theme.isLightMode ? theme.red[600] : theme.red[400])};
  }
`;