import { MouseEvent, ReactNode } from 'react';
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';
import styled from 'styled-components';

import {
  HiMiniChevronLeft as ChevronLeftIcon,
  HiMiniChevronRight as ChevronRightIcon,
} from 'react-icons/hi2';

import Button from '@this/components/Elements/Button';
import { motion } from 'framer-motion';

import { XIcon } from '../../components/icons/XIcon';

type FormStepProps = {
  title?: string;
  step: number;
  children?: ReactNode | ReactNode[];
  backDisabled?: boolean;
  nextDisabled?: boolean;
  submitDisabled?: boolean;
  onNext?: (e: MouseEvent<HTMLButtonElement>, nextStep: number) => void;
  onBack?: (e: MouseEvent<HTMLButtonElement>, prevStep: number) => void;
  onSubmit?: (e: MouseEvent<HTMLButtonElement>, step: number) => void;
  stepErrors?: {
    name: string;
    message: string;
  }[];
  showErrors?: boolean;
  onErrorClick?: (name: string) => void;
  onClearErrors?: () => void;
  direction?: number;
};

const FormStep = ({
  children,
  title,
  step,
  direction,
  nextDisabled,
  backDisabled,
  submitDisabled,
  onNext,
  onBack,
  onSubmit,
  stepErrors,
  showErrors,
  onClearErrors,
  onErrorClick,
}: FormStepProps) => {
  const hasErrors = !!stepErrors?.length;
  const nextBtnClassName = hasErrors ? 'next-btn disabled' : 'next-btn';

  return (
    <FormStepStyles
      key={`step-${step}`}
      id={`step-${step}`}
      initial={{
        opacity: 0,
        x: !direction || direction > 0 ? '100%' : '-100%',
        position: 'absolute',
      }}
      animate={{ opacity: 1, x: 0, position: 'relative' }}
      exit={{
        opacity: 0,
        x: !direction || direction > 0 ? '100%' : '-100%',
        position: 'absolute',
      }}
      transition={{ duration: 0.25 }}
    >
      {title && <h3 className='dynamic-h3 form-section-title'>{title}</h3>}
      {onSubmit && (
        <div>
          <button type='submit' onClick={(e) => onSubmit(e, step)} disabled={submitDisabled}>
            <ChevronLeftIcon strokeWidth={2} />
            Submit
          </button>
        </div>
      )}

      <div className='form-section-content'>{children}</div>
      {hasErrors && showErrors && (
        <div className='form-errors form-error'>
          <Button className='close-btn' onClick={onClearErrors}>
            <XIcon />
          </Button>

          <p className='form-error form-error-header'>
            <InfoIcon /> Missing required fields:
          </p>
          <div className='form-error-container'>
            {stepErrors?.map((err, i) =>
              onErrorClick ? (
                <button
                  key={err.name + i}
                  className='form-error-item button'
                  onClick={() => onErrorClick?.(err.name)}
                >
                  {err.message}
                </button>
              ) : (
                <span key={err.name + i} className='form-error-item'>
                  {err.message}
                </span>
              ),
            )}
          </div>
        </div>
      )}
      <div className='step-buttons step-button-end'>
        {onBack ? (
          <button
            type='button'
            onClick={(e) => onBack(e, step - 1)}
            disabled={backDisabled}
            className='back-btn'
          >
            <ChevronLeftIcon strokeWidth={2} />
            Back
          </button>
        ) : (
          <div>{/* Force next button to the end */}</div>
        )}
        {onNext && (
          <button
            type='button'
            onClick={(e) => onNext(e, step + 1)}
            disabled={nextDisabled}
            className={nextBtnClassName}
          >
            Next
            <ChevronRightIcon strokeWidth={2} />
          </button>
        )}
      </div>
    </FormStepStyles>
  );
};

export default FormStep;

const FormStepStyles = styled(motion.div)`
  width: 100%;
  height: fit-content;
  border-radius: 0.5rem;

  .form-section-content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    grid-template-rows: min-content;
    grid-gap: 0.25rem 1rem;
  }
  .step-buttons {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding-bottom: 1rem;
    gap: 1rem;

    button {
      font-size: 1.1rem;
      padding: 0.5rem 1rem;
      transition: all 200ms;
      border-radius: 1.5rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;

      &.next-btn {
        background: ${({ theme }) =>
          theme.isLightMode ? theme.rgb('primary.500', 1) : theme.rgb('primary.500', 1, 5)};

        box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('primary', 0)};
        margin-left: auto;
        &:hover {
          background: ${({ theme }) => theme.rgb('primary', 1, 2)};
          box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('primary', 1, 5)};
        }

        &:active {
          background: ${({ theme }) => theme.rgb('primary', 1, 5)};
          box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('primary', 1, 10)};
        }

        &:disabled,
        &.disabled {
          background: ${({ theme }) => theme.rgb('primary', 0.25)};
          box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('primary', 0.25, -5)};
          color: ${({ theme }) => theme.rgb('fg', 0.4)};
          cursor: default;
        }
      }
      &.back-btn {
        background: ${({ theme }) =>
          theme.isLightMode ? theme.rgb('bg', 1, -5) : theme.rgb('bg', 1, 5)};
        color: ${({ theme }) => theme.rgb('fg', 0.8)};

        box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('primary', 0)};
        &:hover {
          background: ${({ theme }) =>
            theme.isLightMode ? theme.rgb('bg', 1, -2) : theme.rgb('bg', 1, 2)};
          /* background: ${({ theme }) => theme.rgb('primary', 1, 2)}; */
          box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('fg', 0.25)};
        }

        &:active {
          background: ${({ theme }) =>
            theme.isLightMode ? theme.rgb('bg', 1, -5) : theme.rgb('bg', 1, -1)};
          /* background: ${({ theme }) => theme.rgb('primary', 1, 5)}; */
          box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('fg', 0.5)};
        }

        &:disabled,
        &.disabled {
          background: ${({ theme }) => theme.rgb('primary', 0.25)};
          box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('primary', 0.25, -5)};
          color: ${({ theme }) => theme.rgb('fg', 0.4)};
          cursor: default;
        }
      }
    }
  }
  .step-button-end {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0;
    padding-top: 1rem;
    button {
      width: 100%;
      max-width: 200px;
    }
  }
  .close-btn {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    padding: 0.1rem;
    border-radius: 0.25rem;
    background: ${({ theme }) => theme.alpha.red01};
    &:hover {
      background: ${({ theme }) => theme.alpha.red};
    }
  }
  .form-error-header {
    gap: 0.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    justify-content: center;
    width: 100%;
  }
  .form-errors {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    grid-column: 1 / -1;
    max-width: 600px;

    margin: 0 auto;
    text-align: center;
    box-shadow: 0 0 2px 1px ${({ theme }) => theme.red[400]};
    border-radius: 0.25rem;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.alpha.red01};
  }

  .form-error-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .form-error-item {
    flex: 40%;
    min-width: fit-content;
    display: flex;
    justify-content: center;
    padding: 0 0.5rem;
    box-shadow: 0 0px 1px ${({ theme }) => theme.red[400]};
    border-radius: 0.25rem;
    margin: 0.25rem;
    &.button {
      cursor: pointer;
      &:hover {
        background: ${({ theme }) => theme.alpha.red25};
      }
    }
  }

  @media screen and (max-width: 768px) {
    .form-section-content {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      grid-gap: 0.25rem 1rem;
      max-width: 600px;
      margin: 0 auto;
    }
  }
`;
