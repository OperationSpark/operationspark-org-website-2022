import axios from 'axios';
import { KeyboardEvent, MouseEvent, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { FaCheck as CheckIcon } from 'react-icons/fa';

import { Input } from '@this/components/Form';
import Form from '@this/components/Form/Form';
import useForm from '@this/components/Form/useForm';
import { AnimatePresence, motion } from 'framer-motion';

import { TeacherTraining, TeacherTrainingFormField } from '@this/data/types/teacherTraining';
import env from '@this/src/clientConfig';

import EmailInput from '../components/Form/elements/EmailInput';
import TextInput from '../components/Form/elements/Input';
import { formatName } from '../helpers/utils';

import NewFormStep from './FormComponents/FormStep';

const sheetsTabName = env.HIGHSCHOOL_FORM_RESPONSES_NAME;
const inputTypes = {
  text: TextInput,
  email: EmailInput,
};

type TeacherTrainingFormInputField = TeacherTrainingFormField &
  (
    | {
        type: 'text';
        InputElement: typeof TextInput;
      }
    | {
        type: 'email';
        InputElement: typeof EmailInput;
      }
  );

const buildInputFields = (fields: TeacherTrainingFormField[]): TeacherTrainingFormInputField[] => {
  return fields.map((field) => {
    const InputElement = inputTypes[field.type];
    return {
      ...field,
      InputElement,
    };
  });
};

const stepFields: Record<number, string[]> = {
  1: ['email', 'firstName', 'lastName', 'position', 'district', 'schools'],
  // TODO: Check if the user is different from the person completing the form
  2: ['completerFirstName', 'completerLastName', 'completerPosition', 'completerEmail'],
  // TODO: Check if the user is different from the billing contact
  3: ['billingName', 'billingEmail'],
  // TODO: Move acknowledgements to the end
  4: ['acknowledgements'],
};

const maxSteps = Object.keys(stepFields).length;

type GetInitSteps = <T>(length: number, cb: (index: number) => T) => Record<number, T>;
const getInitSteps: GetInitSteps = (length, cb) => {
  const steps: Record<number, ReturnType<typeof cb>> = {};
  for (let i = 1; i <= length; i++) {
    steps[i] = cb(i);
  }
  return steps;
};

type TeacherTrainingApplicationProps = {
  onSubmitComplete?: () => void;
  registrationFields: TeacherTraining['registrationFields'];
};

const TeacherTrainingApplication = ({
  onSubmitComplete,
  registrationFields,
}: TeacherTrainingApplicationProps) => {
  const theme = useTheme();
  const formRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [lastStep, setLastStep] = useState(1);
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasErrors = form.hasErrors();

  const [showStepErrors, setShowStepErrors] = useState<boolean>(false);
  const [stepErrors, setStepErrors] = useState<Record<number, string[]>>(
    getInitSteps<string[]>(4, () => []),
  );

  const participantFields = buildInputFields(registrationFields.participant);
  const completerFields = buildInputFields(registrationFields.completer);
  const billingFields = buildInputFields(registrationFields.billing);

  const selectedAcknowledgements = form.getCheckboxes('acknowledgements');
  const allAcknowledgementsConfirmed = registrationFields.acknowledgements.every(
    (ack) => !!selectedAcknowledgements[ack.name],
  );

  const getStepErrors = (n: number) => {
    const fields = stepFields[n];

    if (!fields) return [];
    return fields.filter((field) => !form.isValid(field));
  };

  const validateSteps = () => {
    const stepErrs = Object.keys(stepFields).reduce((errs, stepNum) => {
      const n = Number(stepNum);
      errs[n] = getStepErrors(Number(n));
      return errs;
    }, {} as Record<number, string[]>);

    setStepErrors(stepErrs);
  };

  const scrollFormTop = () => {
    const top = formRef.current?.getBoundingClientRect()?.top ?? 0;
    const scrollOffset = window.scrollY;
    const navHeight = theme.navHeight;
    const offset = top ? top + scrollOffset - navHeight / 2 - 300 : 0;

    if (!offset) return;

    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  const changeStep = (stepNumber: number) => {
    if (stepNumber > maxSteps || stepNumber < 1) {
      return;
    }
    const stepErrs = getStepErrors(step);

    if (stepErrs.length && stepNumber > step) {
      setShowStepErrors(true);
      validateSteps();
      focusElement(stepErrs[0]);
      return;
    }

    setShowStepErrors(false);
    setLastStep(step);
    setStep(stepNumber);

    scrollFormTop();
  };
  const handleChangeStep = (e: MouseEvent<HTMLButtonElement>, stepNumber: number) => {
    e.stopPropagation();
    e.preventDefault();
    changeStep(stepNumber);
  };

  const handleSubmit = async () => {
    if (hasErrors) {
      return form.toggleShowErrors();
    }

    setIsSubmitting(true);

    try {
      await axios.post('/api/signups/highschool', {
        ...form.values(),
        tabName: sheetsTabName,
        date: Date.now(),
      });
      form.clear();
      form.notifySuccess();
      setStep(1);
      setLastStep(1);

      onSubmitComplete?.();
    } catch {
      form.notifyError();
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateField = (name: string, step: number) => {
    const v = !stepErrors[step]?.includes(name);

    return v;
  };

  const handleChange = (field: string, value: string, isValid: boolean) => {
    form.onChange(field)(value, isValid ?? true);
  };
  const checkErr = (step: number, field: string) => {
    if (!showStepErrors) {
      return false;
    }
    if (field === 'acknowledgements') {
      return !allAcknowledgementsConfirmed;
    }
    return !validateField(field, step) && !form.isValid(field);
  };

  const getNextValidStep = () => {
    let step = 1;
    for (let i = step; i <= maxSteps; i++) {
      if (getStepErrors(i).length) {
        return i;
      }
    }
    return maxSteps;
  };
  const getProgressSectionClassName = (stepNumber: number) => {
    const stepErrs = getStepErrors(stepNumber);
    const nextValidStep = getNextValidStep();

    let status = 'progress-section';
    if (stepNumber <= nextValidStep) status += ' clickable';
    if (!stepErrs.length) status += ' valid';
    if (step > stepNumber) status += ' complete';
    if (step === stepNumber) status += ' active';

    return status;
  };

  const goToStep = (stepNumber: number) => {
    const nextValidStep = getNextValidStep();
    if (stepNumber > nextValidStep) return;
    changeStep(stepNumber);
  };

  const focusElement = (name: string) => {
    let el = formRef.current?.querySelector(`#${name}`) as HTMLInputElement;
    const $input = el?.querySelector(
      `#${name}, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`,
    ) as HTMLInputElement;

    scrollFormTop();
    if (!el) return;

    el.focus();
    $input?.focus();
    el.classList.add('flash-input0');
    setTimeout(() => {
      el.classList.add('flash-input1');
      setTimeout(() => {
        el.focus();
        $input?.focus();
        el.classList.remove('flash-input0');
        el.classList.remove('flash-input1');
      }, 250);
    }, 250);
  };

  const selectNextElement = (e: KeyboardEvent<HTMLFormElement>) => {
    const { key } = e;
    const tag = (e.target as HTMLElement | null)?.tagName ?? '';

    const isEnter = key === 'Enter';

    const isButton = /button/gi.test(tag);

    if (isEnter && !isButton) {
      e.preventDefault();
      const stepErrs = getStepErrors(step);

      if (stepErrs.length) {
        setShowStepErrors(true);
        focusElement(stepErrs[0]);
        return;
      }
      const nextStep = step + 1;
      if (nextStep > maxSteps) {
        return handleSubmit();
      }
      changeStep(nextStep);
    }
  };

  return (
    <TeacherTrainingApplicationStyles ref={formRef}>
      <Form onSubmit={handleSubmit} onEnter={selectNextElement}>
        <div className='form-body'>
          <motion.div
            className='progress-bar'
            animate={{
              background: `linear-gradient(90deg,
                ${theme.rgb('primary')} 0%,
                ${theme.rgb('primary', 1)} ${step * (1 / maxSteps) * 100}%,
                ${theme.rgb('primary', 0)} ${step * (1 / maxSteps) * 120}%,
                ${theme.rgb('primary', 0)} 120%
              )`,
            }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <div onClick={() => goToStep(1)} className={getProgressSectionClassName(1)}>
              <span className='step-num'>1. </span>
              {' Teacher Info '}
              <CheckIcon className='check-icon' />
            </div>
            <div onClick={() => goToStep(2)} className={getProgressSectionClassName(2)}>
              <span className='step-num'>2. </span>
              {' Completer Info '}
              <CheckIcon className='check-icon' />
            </div>
            <div onClick={() => goToStep(3)} className={getProgressSectionClassName(3)}>
              <span className='step-num'>3. </span>
              {' Billing '}
              <CheckIcon className='check-icon' />
            </div>
            <div onClick={() => goToStep(4)} className={getProgressSectionClassName(4)}>
              <span className='step-num'>4. </span>
              {' Acknowledgements '}
              <CheckIcon className='check-icon' />
            </div>
          </motion.div>
          <AnimatePresence mode='popLayout'>
            {step === 1 && (
              <NewFormStep
                step={1}
                direction={step - lastStep}
                nextDisabled={isSubmitting}
                submitDisabled={isSubmitting}
                onNext={handleChangeStep}
                stepErrors={getStepErrors(1).map((err) => ({
                  name: err,
                  message: formatName(err),
                }))}
                showErrors={!!getStepErrors(1).length && showStepErrors}
                onClearErrors={() => setShowStepErrors(false)}
                onErrorClick={focusElement}
              >
                {participantFields.map((field, i) => (
                  <field.InputElement
                    {...field}
                    key={field.name + i}
                    value={form.get(field.name)}
                    onChange={(value, isValid) => handleChange(field.name, value, isValid)}
                    isValid={form.isValid(field.name)}
                    isErr={checkErr(1, field.name)}
                  />
                ))}
              </NewFormStep>
            )}
          </AnimatePresence>
          <AnimatePresence mode='popLayout'>
            {step === 2 && (
              <NewFormStep
                step={2}
                direction={step - lastStep}
                nextDisabled={isSubmitting}
                onBack={handleChangeStep}
                onNext={handleChangeStep}
                stepErrors={getStepErrors(2).map((err) => ({
                  name: err,
                  message: formatName(err),
                }))}
                showErrors={!!getStepErrors(2).length && showStepErrors}
                onClearErrors={() => setShowStepErrors(false)}
                onErrorClick={focusElement}
              >
                {completerFields.map((field, i) => (
                  <field.InputElement
                    {...field}
                    key={field.name + i}
                    value={form.get(field.name)}
                    onChange={(value, isValid) => handleChange(field.name, value, isValid)}
                    isValid={form.isValid(field.name)}
                    isErr={checkErr(2, field.name)}
                  />
                ))}
              </NewFormStep>
            )}
          </AnimatePresence>
          <AnimatePresence mode='popLayout'>
            {step === 3 && (
              <NewFormStep
                step={3}
                direction={step - lastStep}
                nextDisabled={isSubmitting}
                onNext={handleChangeStep}
                onBack={handleChangeStep}
                stepErrors={getStepErrors(3).map((err) => ({
                  name: err,
                  message: formatName(err),
                }))}
                showErrors={!!getStepErrors(3).length && showStepErrors}
                onClearErrors={() => setShowStepErrors(false)}
                onErrorClick={focusElement}
              >
                {billingFields.map((field, i) => (
                  <field.InputElement
                    {...field}
                    key={field.name + i}
                    value={form.get(field.name)}
                    onChange={(value, isValid) => handleChange(field.name, value, isValid)}
                    isValid={form.isValid(field.name)}
                    isErr={checkErr(3, field.name)}
                  />
                ))}
              </NewFormStep>
            )}
          </AnimatePresence>

          <AnimatePresence mode='popLayout'>
            {step === 4 && (
              <NewFormStep
                step={4}
                direction={step - lastStep}
                nextDisabled={isSubmitting}
                submitDisabled={isSubmitting}
                onNext={handleSubmit}
                stepErrors={getStepErrors(4).map((err) => ({
                  name: err,
                  message: formatName(err),
                }))}
                showErrors={!!getStepErrors(4).length && showStepErrors}
                onClearErrors={() => setShowStepErrors(false)}
                onErrorClick={focusElement}
              >
                <div className='form-col-span'>
                  <Input.CheckboxGroup
                    id='acknowledgements'
                    label='Acknowledgements'
                    checkboxes={registrationFields.acknowledgements}
                    values={form.getCheckboxes('acknowledgements')}
                    isValid={allAcknowledgementsConfirmed}
                    isErr={checkErr(1, 'acknowledgements')}
                    onChange={form.onCheckboxGroupChange('acknowledgements')}
                    clearCheckboxes={form.clearCheckboxGroup('acknowledgements')}
                    required
                  />
                </div>
              </NewFormStep>
            )}
          </AnimatePresence>
        </div>
      </Form>
    </TeacherTrainingApplicationStyles>
  );
};

export default TeacherTrainingApplication;

const TeacherTrainingApplicationStyles = styled.div`
  width: 100%;
  display: flex;

  .form-info-danger {
    color: ${({ theme }) => (theme.isLightMode ? theme.red[700] : theme.red[200])};
    font-weight: 700;
    font-style: italic;
  }
  .form-info-warn {
    color: ${({ theme }) => (theme.isLightMode ? theme.primary[500] : theme.secondary[500])};
    font-weight: 500;
    font-style: italic;
  }
  .form-body {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 1rem;
  }
  .form-section-title {
    font-weight: 900;
    color: ${({ theme }) =>
      theme.isLightMode ? theme.rgb('primary.700') : theme.rgb('secondary.500')};
    text-align: center;
    grid-column: 1 / -1;
    font-size: 1.75rem;
    padding: 1rem 0;
  }
  .form-col-span {
    grid-column: 1 / -1;
  }

  ul {
    padding-left: 2rem;
    margin-bottom: 0.5rem;
  }
  li {
    padding-bottom: 0.5rem;
    line-height: 1.25em;
  }
  .flash-input0 {
    transition: all 200ms;
    box-shadow: 0 0 12px 12px inset ${({ theme }) => theme.alpha.red25} !important;
    background: ${({ theme }) => theme.alpha.red25} !important;
  }
  .flash-input1 {
    background: ${({ theme }) => theme.bg} !important;
    box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.alpha.red25} !important;
  }
  .progress-bar {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-radius: 0.25rem;
    top: 0;
    left: 0;
  }

  .progress-section {
    flex: 1;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.fg};

    box-shadow: 0 0 3px ${({ theme }) => theme.alpha.fg};
    gap: 0.5rem;
    margin: 0.1rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: nowrap;
    white-space: nowrap;
    cursor: default;
    user-select: none;
    .check-icon {
      display: none;
      color: ${({ theme }) => theme.green[500]};
    }
    .step-num {
      display: flex;
    }
    background: rgba(0, 0, 0, 0);
    transition: all 200ms;

    &.complete {
      box-shadow: 0 0 3px ${({ theme }) => theme.green[500]};
      background: ${({ theme }) => theme.primary[700]};
      color: ${({ theme }) => theme.green[500]};
    }

    &.active {
      background: ${({ theme }) => theme.primary[900]} !important;
      color: ${({ theme }) => theme.white};
      cursor: default !important;
    }

    &.valid {
      .check-icon {
        display: flex;
      }
      .step-num {
        display: none;
      }
    }

    &.clickable {
      cursor: pointer;

      transition: all 200ms;
      &:hover {
        color: ${({ theme }) => theme.white};
        background: ${({ theme }) => theme.primary[0]};
      }
    }
  }

  @media screen and (max-width: 768px) {
    .progress-section {
      min-width: fit-content;
    }
  }
`;
