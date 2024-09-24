import { getNumsOnly, parseDate } from '../helpers';
import Input, { TextInputProps } from './Input';

const DateInput = ({ onChange, ...props }: TextInputProps) => {
  return (
    <Input
      {...props}
      type='tel' // use 'tel' to force number pad
      onChange={(value, isValid) => onChange(parseDate(value), isValid)}
      validator={(value) => getNumsOnly(value).length >= 8}
      restoreCursor
    />
  );
};

export default DateInput;
