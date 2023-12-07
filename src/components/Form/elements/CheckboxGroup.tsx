import styled from 'styled-components';
import Checkbox from './Checkbox';
import ClearButton from './ClearButton';
import RequiredStatus from './RequiredStatus';

interface CheckboxProps {
  id?: string;
  label: string;
  values: { [key: string]: boolean };
  onChange: (name: string, value: boolean) => void;
  clearCheckboxes: () => void;
  isValid: boolean;
  required?: boolean;
  isErr: boolean;
  checkboxes: {
    name: string;
    label: string;
  }[];
}

const CheckboxGroup = ({
  id,
  label,
  checkboxes,
  values,
  isValid,
  required,
  isErr = false,
  onChange,
  clearCheckboxes,
}: CheckboxProps) => {
  const valuesKeys = Object.keys(values);
  console.log({ label });
  return (
    <CheckboxGroupStyles className={isErr ? '_input_err' : ''} id={id}>
      <div className='checkbox-group-label'>{label}</div>
      {required && <RequiredStatus isValid={isValid} />}
      <ClearButton show={!!valuesKeys.length} onClick={clearCheckboxes} />
      {checkboxes.map(({ name, label }) => (
        <Checkbox
          key={name}
          name={name}
          label={label}
          checked={!!values[name]}
          onChange={(value) => onChange(name, value)}
        />
      ))}
    </CheckboxGroupStyles>
  );
};

export default CheckboxGroup;

const CheckboxGroupStyles = styled.div`
  box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg};
  padding: 0.5rem;
  border-radius: 0.25rem;
  position: relative;
  .checkbox-group-label {
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
