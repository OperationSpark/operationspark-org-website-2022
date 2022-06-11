import styled from 'styled-components';
import { Fragment } from 'react';
import { motion } from 'framer-motion';

import { TOption } from '@this/data/types/bits';
import Input from './PlainTextInput';
import RequiredStatus from './RequiredStatus';
import ClearButton from './ClearButton';

const defaultOptions = [{ name: 'Option 1', value: 'opt1' }];

interface OnChangeProps {
  option?: TOption;
  additionalInfo?: string;
  additionalInfoLabel?: string;
  isValid: boolean;
}

interface SelectProps {
  options: TOption[];
  name: string;
  label: string;
  required?: boolean;
  option: TOption;
  onChange: (args: OnChangeProps) => void;
  isErr: boolean;
  delay?: number;
  isValid?: boolean;
}

export const Select = ({
  options = defaultOptions,
  label = '',
  option,
  isErr,
  isValid,
  delay,
  required,
  onChange,
}: SelectProps) => {
  const checkIsValid = (opt: string, info: string | undefined, hasAdditionalInfo: boolean) => {
    if (!required) {
      return true;
    }
    if (!hasAdditionalInfo) {
      return !!opt;
    }
    return !!opt && !!info;
  };

  const handleOptionSelect = (optionValue: string, additionalInfo = '') => {
    const newSelectedOpt = options.find((opt) => opt.value === optionValue) || {
      name: 'Please select an option',
      value: '',
    };

    const isValid = checkIsValid(
      newSelectedOpt?.value || '',
      additionalInfo,
      !!newSelectedOpt?.additionalInfo,
    );

    onChange({
      option: newSelectedOpt,
      isValid,
      additionalInfoLabel: newSelectedOpt?.additionalInfo,
      additionalInfo,
    });
  };

  return (
    <Fragment>
      <SelectContainer
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: delay ?? undefined }}
      >
        <SelectStyles title={label} className={isErr && !option.value ? '_input_err' : ''}>
          <label style={{ fontSize: !option.value ? '1rem' : '0.75rem' }}>{label}</label>
          <select onChange={(e) => handleOptionSelect(e.target.value)} value={option?.value}>
            {[{ name: 'Please select an option', value: '' }, ...options].map(({ name, value }) => (
              <Option value={value} name={name} key={value} />
            ))}
          </select>
          <div style={{ maxWidth: 'calc(100% - 2rem)' }}>
            {option?.name || 'Please select an option'}
          </div>

          {required && <RequiredStatus isValid={!!option.value} />}
          <ClearButton show={!!option.value} onClick={() => handleOptionSelect('', '')} />
        </SelectStyles>
      </SelectContainer>
      {option.additionalInfoLabel ? (
        <Input
          type='text'
          name='additionalInfo'
          value={option.additionalInfo || ''}
          label={option.additionalInfoLabel || ''}
          isValid={isValid}
          isErr={isErr}
          style={{ zIndex: 1 }}
          onChange={(value: string) => handleOptionSelect(option.value, value)}
          required
        />
      ) : null}
    </Fragment>
  );
};

interface OptionProps {
  value: string;
  name: string;
}
export const Option = ({ value, name }: OptionProps) => {
  return (
    <OptionStyles title={name} value={value} disabled={!value}>
      {name}
    </OptionStyles>
  );
};

export default Select;

const SelectContainer = styled(motion.div)`
  background: ${({ theme }) => theme.bg};
  position: relative;
  margin-bottom: 0.75rem;
  width: 100%;

  user-select: none;
  z-index: 1;
`;

const OptionStyles = styled(motion.option)`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme: { isLightMode, primary, secondary } }) =>
    isLightMode ? primary[700] : secondary[500]};
  :disabled {
    display: none;
  }
`;

const SelectStyles = styled(motion.div)`
  box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg};
  &._input_err {
    box-shadow: 0 0 2px 1px ${({ theme }) => (theme.isLightMode ? theme.red[600] : theme.red[400])};
  }

  width: 100%;
  min-height: 3.5rem;
  padding: 0rem 0.5rem 0.5rem 0.5rem;
  border-radius: 0.25rem;
  border: none;
  position: relative;

  label {
    color: ${({ theme: { isLightMode, primary, secondary } }) =>
      isLightMode ? primary[900] : secondary[500]};
    cursor: pointer;
    width: calc(100% - 2.5rem);
    display: flex;
    padding: 0.25rem 0;
    line-height: 1em;
    font-size: 0.75rem;
    font-weight: 400;
    transition: font-size 125ms;
  }

  :hover {
    outline: 1px solid ${({ theme }) => theme.secondary[800]};
  }
  :focus,
  :focus-within,
  :active {
    outline: 2px solid ${({ theme }) => theme.secondary[800]};
  }

  select {
    all: unset;
    position: absolute;
    opacity: 0;
    inset: 0;
    padding-left: 0.5rem;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.fg};
    height: 100%;
  }
`;
