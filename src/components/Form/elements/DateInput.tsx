import { toDayJs } from '@this/src/helpers/time';
import TextInput, { TextInputProps } from './Input';

const DateInput = ({ onChange, ...props }: TextInputProps) => {
  return (
    <TextInput
      {...props}
      type='date' // use 'tel' to force number pad
      onChange={(value, isValid) => onChange(toDayJs(value).format('YYYY-MM-DD'), isValid)}
      validator={(value) => toDayJs(value).isValid()}
      restoreCursor
    />
  );
};

export default DateInput;
