import { toDayJs } from '@this/src/helpers/time';
import TextInput, { TextInputProps } from './Input';

const DateInput = ({ onChange, ...props }: TextInputProps) => {
  return (
    <TextInput
      {...props}
      inputStyle={{ ...props.inputStyle, paddingRight: 0 }}
      type='date'
      onChange={(value, isValid) => onChange(toDayJs(value).format('YYYY-MM-DD'), isValid)}
      validator={(value) => toDayJs(value).isValid()}
    />
  );
};

export default DateInput;
