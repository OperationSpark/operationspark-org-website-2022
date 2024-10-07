import { motion } from 'framer-motion';
import kebabCase from 'lodash/kebabCase';
import { KeyboardEvent, ReactNode } from 'react';
import styled from 'styled-components';

import Radio from './Radio';
import RequiredStatus from './RequiredStatus';

interface RadioProps {
  id?: string;
  name: string;
  label: string | ReactNode;
  onChange: (value: string, isValid: boolean) => void;
  onEnter?: (e: KeyboardEvent<HTMLDivElement>) => void;
  value: string;
  isValid: boolean;
  delay?: number;
  transition?: boolean;
  required?: boolean;
  isErr: boolean;
  options: {
    name: string;
    label: string | ReactNode;
  }[];
  testId?: string;
}

const RadioGroup = ({
  id,
  name,
  label,
  options,
  isValid,
  value,
  delay,
  transition,
  required,
  isErr = false,
  onChange,
  onEnter,
  testId,
}: RadioProps) => {
  const groupName = kebabCase(name);
  return (
    <RadioGroupStyles
      id={id ?? name}
      className={isErr ? '_input_err' : ''}
      initial={transition ? { opacity: 0, y: 100 } : {}}
      animate={transition ? { opacity: 1, y: 0 } : {}}
      transition={transition ? { duration: 0.2, delay: delay ?? undefined } : {}}
      data-test-id={testId ?? `radio-group-${groupName}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (isValid && onEnter) {
            e.preventDefault();
            return onEnter(e);
          }

          if (e.target instanceof HTMLInputElement) {
            e.preventDefault();
            return e.target.click();
          }
        }
      }}
    >
      <div className='radio-group-label'>{label}</div>
      {required && <RequiredStatus isValid={isValid} />}

      {options.map(({ name, label }, index) => (
        <Radio
          key={name}
          name={name}
          label={label}
          checked={value === name}
          onChange={(value) => onChange(value, true)}
          value={name}
          delay={delay ? delay + index * 0.25 : 0}
          testId={`radio-input-${groupName}-${kebabCase(name)}`}
        />
      ))}
    </RadioGroupStyles>
  );
};

export default RadioGroup;

const RadioGroupStyles = styled(motion.div)`
  box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg};
  padding: 0.5rem;
  border-radius: 0.25rem;
  position: relative;
  width: 100%;
  .radio-group-label {
    width: fit-content;
    position: relative;
    padding-bottom: 0.5rem;
    color: ${({ theme: { isLightMode, primary, secondary } }) =>
      isLightMode ? primary[900] : secondary[500]};
  }

  &._input_err {
    box-shadow: 0 0 2px 1px ${({ theme }) => (theme.isLightMode ? theme.red[600] : theme.red[400])},
      0 0 0px 1000px ${({ theme }) => theme.bg} inset;
    ._err_label {
      display: block;
    }
    ._required {
      color: ${({ theme }) => (theme.isLightMode ? theme.red[600] : theme.red[400])};
      font-size: 0.8rem;
    }
  }
  ._err_label {
    display: none;
    font-weight: 300;
    padding: 0.5rem;
    color: ${({ theme }) => (theme.isLightMode ? theme.red[600] : theme.red[400])};
  }
`;
