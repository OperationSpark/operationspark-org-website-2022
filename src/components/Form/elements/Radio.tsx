import { motion } from 'framer-motion';
import kebabCase from 'lodash/kebabCase';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface RadioProps {
  onChange: (value: string) => void;
  name: string;
  label: string | ReactNode;
  value: string;
  checked: boolean;
  transition?: boolean;
  delay?: number;
  testId?: string;
}

const Radio = ({
  name,
  label,
  value,
  checked,
  delay,
  transition,
  onChange,
  testId,
}: RadioProps) => {
  return (
    <RadioStyles
      aria-label={name}
      initial={transition ? { opacity: 0, x: 100 } : {}}
      animate={transition ? { opacity: 1, x: 0 } : {}}
      transition={transition ? { duration: 0.25, delay: delay ?? undefined } : {}}
    >
      <input
        type='radio'
        role='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        aria-labelledby={name}
        data-test-id={testId ?? `radio-${kebabCase(name)}`}
      />
      <div className='radio'></div>
      <div className='label' aria-label={name}>
        {label}
      </div>
    </RadioStyles>
  );
};

export default Radio;

const RadioStyles = styled(motion.label)`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem 0.25rem 2.5rem;
  position: relative;
  user-select: none;
  border-radius: 0.25rem;
  :hover,
  :has(:focus-visible) {
    outline: 1px solid ${({ theme }) => theme.secondary[800]};
  }

  input {
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    z-index: 1;
    left: 0;
    opacity: 0;
  }
  .radio {
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    margin-left: 0.5rem;
    left: 0;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px
      ${({ theme: { isLightMode, primary, secondary } }) =>
        isLightMode ? primary[500] : secondary[500]}
      inset;
    ::after {
      display: none;
      position: absolute;

      content: '➜';

      color: ${({ theme }) => (theme.isLightMode ? theme.secondary[0] : theme.primary[0])};
      font-weight: 900;

      border-radius: 50%;
      width: 1.4rem;
      height: 1.5rem;
      top: 0;
      left: 0;

      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }

  input:checked ~ .radio {
    background-color: ${({ theme: { isLightMode, primary, secondary } }) =>
      isLightMode ? primary[500] : secondary[500]};
    color: ${({ theme: { bg } }) => bg};

    ::after {
      display: flex;
    }
  }
`;
