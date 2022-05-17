import { capFirstLetter } from '../helpers';
import Input, { TextInputProps } from './Input';

export interface PlainTextInputProps extends TextInputProps {
  autoCapitalize?: boolean;
}

const PlainTextInput = ({
  onChange,
  autoCapitalize = false,
  ...props
}: PlainTextInputProps) => {
  return (
    <Input
      {...props}
      type='text'
      onChange={(value, isValid) =>
        onChange(autoCapitalize ? capFirstLetter(value) : value, isValid)
      }
      validator={(value) => (props.required ? !!value : true)}
      restoreCursor
    />
  );
};

export default PlainTextInput;
