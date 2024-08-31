import { capFirstLetter } from '../helpers';
import Input, { TextInputProps } from './Input';

export interface PlainTextInputProps extends TextInputProps {
  autoCapitalize?: boolean;
}

const normalizeText = (value: string) => {
  if (!value) {
    return '';
  }
  const len = value.length;
  const capOnlyLen = value.replace(/[^A-Z]/g, '').length;
  /** Capitalized letters / total letters */
  const capAvg = capOnlyLen / len;

  // If more than one letter and more than 50% of letters are capitalized
  if (len > 1 && capAvg > 0.67) {
    return capFirstLetter(value.toLowerCase());
  }

  return value;
};

const PlainTextInput = ({ onChange, autoCapitalize = false, ...props }: PlainTextInputProps) => {
  return (
    <Input
      {...props}
      type='text'
      onChange={(value, isValid) =>
        onChange(autoCapitalize ? capFirstLetter(value) : value, isValid)
      }
      onBlur={(e) => {
        if (!autoCapitalize) {
          return props.onBlur?.(e);
        }

        const value = normalizeText(e.target.value);

        onChange(value, props.isValid ?? true);
        props.onBlur?.(e);
      }}
      validator={(value) => (props.required ? !!value : true)}
      restoreCursor
    />
  );
};

export default PlainTextInput;
