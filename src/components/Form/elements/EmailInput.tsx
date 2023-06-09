import isEmail from 'validator/lib/isEmail';
import Input, { TextInputProps } from './Input';

const EmailInput = ({ onChange, ...props }: TextInputProps) => {
  return <Input {...props} type='email' onChange={(value) => onChange(value, isEmail(value))} />;
};

export default EmailInput;
