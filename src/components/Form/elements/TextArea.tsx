import { ChangeEvent, CSSProperties, KeyboardEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, MotionProps } from 'framer-motion';
import RequiredStatus from './RequiredStatus';
import ClearButton from './ClearButton';

export interface TextAreaProps {
  name: string;
  value: string;
  label: string;
  onChange: (value: string, isValid: boolean) => void;
  validator?: (value: string) => boolean;
  placeholder?: string;
  isErr?: boolean;
  required?: boolean;
  isValid?: boolean;
  animation?: MotionProps;
  style?: CSSProperties;
  onEnter?: (e: KeyboardEvent) => void;
  onTab?: (e: KeyboardEvent) => void;
  restoreCursor?: boolean;
  testId?: string;
}

const TextArea = ({
  name,
  value,
  label,
  onChange = () => {},
  isValid,
  placeholder = '',
  isErr = false,
  required = false,
  validator = () => true,
  onEnter = () => {},
  onTab = () => {},
  animation = {},
  style = {},

  testId,
}: TextAreaProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocus] = useState<boolean>(false);

  const handleKeypress = (e: KeyboardEvent) => {
    const { key } = e;
    key === 'Enter' && onEnter && onEnter(e);
    key === 'Tab' && onTab && onTab(e);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value, validator(e.target.value));
  };

  return (
    <TextInputStyles className={isErr ? '_input_err' : ''} style={style} {...animation}>
      {required && <RequiredStatus isValid={!!isValid} />}
      <ClearButton show={!!isValid} onClick={() => onChange('', false)} />
      <Label
        htmlFor={name}
        initial={{ transform: 'scale(1)' }}
        animate={{ transform: isFocused || value ? 'scale(0.7)' : 'scale(1)' }}
        transition={{ type: 'tween', duration: 0.15 }}
        className={isErr ? `_input_err` : ''}
      >
        {label}
      </Label>
      <Input
        autoComplete='off'
        spellCheck={false}
        ref={inputRef}
        id={name}
        className={isErr ? '_input_err' : ''}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onKeyPress={handleKeypress}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        data-test-id={testId}
      />
    </TextInputStyles>
  );
};

export default TextArea;

const TextInputStyles = styled(motion.div)`
  position: relative;
  font-size: 18px;
  width: 100%;
  height: 100%;
  z-index: 5;
  padding-bottom: 0.5rem;
  ._required {
    font-size: 0.6rem;
    position: absolute;
    right: 0.25rem;
    top: 0.5rem;
    line-height: 1rem;
    user-select: none;
    pointer-events: none;
    color: ${({ theme }) => (theme.isLightMode ? theme.grey[600] : theme.grey[400])};
  }
`;
const Input = styled(motion.textarea)`
  resize: none;
  border-radius: 0.25rem;
  border: none;
  outline: none;
  padding: 1.25rem 1.25rem 0.5rem 0.5rem;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 150px;

  color: ${({ theme }) => theme.fg};
  background: ${({ theme }) => theme.bg};
  border-radius: 0.25rem;
  box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg};
  outline: 2px solid rgba(0, 0, 0, 0);

  &._input_err {
    box-shadow: 0 0 2px 1px ${({ theme }) => (theme.isLightMode ? theme.red[600] : theme.red[400])};
  }
  :hover {
    outline: 1px solid ${({ theme }) => theme.secondary[800]};
  }
  :focus {
    ::placeholder {
      color: rgba(0, 0, 0, 0);
    }
    padding-left: 0.5rem;
  }
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.secondary[800]};
  }

  ::placeholder {
    font-weight: 300;
    color: ${({ theme }) => (theme.isLightMode ? theme.grey[300] : theme.grey[600])};
    transition: color 200ms;
    user-select: none;
    font-size: 0.9rem;
  }
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: ${({ theme }) => theme.fg};
    box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg},
      0 0 0px 1000px ${({ theme }) => theme.bg} inset;
    -webkit-box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg},
      0 0 0px 1000px ${({ theme }) => theme.bg} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
const Label = styled(motion.label)`
  position: absolute;
  transform-origin: top left;
  line-height: 1em;
  font-size: 16px;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
  pointer-events: none;
  user-select: none;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme: { isLightMode, primary, secondary } }) =>
    isLightMode ? primary[700] : secondary[500]};
`;
