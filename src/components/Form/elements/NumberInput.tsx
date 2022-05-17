import Input, { TextInputProps } from './Input';
import { getNums, parsePhoneNumber } from '../helpers';

const NumberInput = ({ onChange, ...props }: TextInputProps) => {
  return (
    <Input
      {...props}
      type='tel'
      onChange={(value, isValid) => onChange(parsePhoneNumber(value), isValid)}
      validator={(value) => getNums(value).length === 10}
      restoreCursor
    />
  );
};

export default NumberInput;
