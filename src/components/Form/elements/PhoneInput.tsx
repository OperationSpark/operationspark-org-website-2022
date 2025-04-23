import { getNums, parsePhoneNumber } from '../helpers';
import Input, { TextInputProps } from './Input';

// TODO: Rename to `PhoneInput`
const PhoneInput = ({ onChange, ...props }: TextInputProps) => {
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

export default PhoneInput;
