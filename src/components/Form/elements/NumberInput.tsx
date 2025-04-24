import { kebabCase } from 'lodash';
import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import ClearButton from './ClearButton';
import {
  TextInputContainerStyles,
  TextInputLabelStyles,
  TextInputProps,
  TextInputStyles,
} from './Input';
import RequiredStatus from './RequiredStatus';

type NumberInputProps = {
  min?: number;
  max?: number;
  step?: number;
} & TextInputProps;

const NumberInput: FC<NumberInputProps> = ({
  onChange,
  min,
  max,
  step,
  type = 'text',
  name,
  value,
  label,
  isErr,
  required,
  placeholder,
  isValid,
  animation,
  style,
  testId,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocus] = useState<boolean>(false);

  const isValidMinMax = () => {
    if (min !== undefined && max !== undefined) {
      return parseFloat(value) >= min && parseFloat(value) <= max;
    }
    if (min !== undefined) {
      return parseFloat(value) >= min;
    }
    if (max !== undefined) {
      return parseFloat(value) <= max;
    }
    return true;
  };
  const handleChange = (value: string, isValid: boolean) => {
    const parsedValue = parseFloat(value);

    if (isValid && !isNaN(parsedValue)) {
      const clampedValue = Math.min(Math.max(parsedValue, min || -Infinity), max || Infinity);
      onChange(clampedValue.toString(), true);
    } else {
      onChange(value, false);
    }
  };
  return (
    <NumberInputStyles>
      <TextInputContainerStyles className={isErr ? '_input_err' : ''} style={style} {...animation}>
        {required && <RequiredStatus isValid={!!isValid} />}

        <TextInputLabelStyles
          htmlFor={name}
          initial={{ transform: 'scale(1)' }}
          animate={{ transform: isFocused || value ? 'scale(0.7)' : 'scale(1)' }}
          transition={{ type: 'tween', duration: 0.15 }}
          className={isErr ? `_input_err` : ''}
        >
          {label}
        </TextInputLabelStyles>

        <TextInputStyles
          autoComplete='off'
          spellCheck={false}
          ref={inputRef}
          id={name}
          name={name}
          className={isErr ? '_input_err' : ''}
          type='number'
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value, isValidMinMax())}
          data-test-id={testId ?? `${type ?? 'text'}-input-${kebabCase(name)}`}
          min={min}
          max={max}
          step={step}
        />
        <ClearButton
          show={!!value}
          onClick={() => {
            inputRef.current?.focus();
            onChange('', false);
          }}
        />
      </TextInputContainerStyles>
    </NumberInputStyles>
  );
};

export default NumberInput;

const NumberInputStyles = styled(TextInputContainerStyles)`
  /* Remove increment buttons */
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
