import axios from 'axios';
import { KeyboardEvent, MouseEvent, useRef, useState } from 'react';
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';
import styled, { useTheme } from 'styled-components';

import Button from '@this/components/Elements/Button';
import { Input } from '@this/components/Form';
import Form from '@this/components/Form/Form';
import useForm from '@this/components/Form/useForm';
import { AnimatePresence, MotionProps, motion } from 'framer-motion';
import { XIcon } from '../components/icons/XIcon';

import env from '@this/src/clientConfig';

import { TeacherTraining, TeacherTrainingFormField } from '@this/data/types/teacherTraining';
import EmailInput from '../components/Form/elements/EmailInput';
import TextInput from '../components/Form/elements/Input';
import { formatName } from '../helpers/utils';

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

const fieldToLabel = {
  studentDOB: 'Date of Birth',
  ethnicities: 'Race/Ethnicity (Must select one)',
  gradYear: 'Graduation Year',
  policyAgreement: 'You must agree to our policy',
  guardian: 'Parent/Guardian',
};

const formatFieldName = (name: string) => {
  const label = fieldToLabel[name as keyof typeof fieldToLabel];
  if (label) return label;

  return formatName(name);
};

const stepFields: Record<number, string[]> = {
  1: ['email', 'firstName', 'lastName', 'position', 'district', 'schools'],
  // TODO: Check if the user is different from the person completing the form
  2: ['completerFirstName', 'completerLastName', 'completerPosition', 'completerEmail'],
  // TODO: Check if the user is different from the billing contact
  3: ['billingName', 'billingEmail'],
  // TODO: Move acknowledgements to the end
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

  // const getNextValidStep = () => {
  //   let step = 1;
  //   for (let i = step; i <= maxSteps; i++) {
  //     if (getStepErrors(i).length) {
  //       return i;
  //     }
  //   }
  //   return maxSteps;
  // };

  const stepTransition: MotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.1 },
  };

  const scrollFormTop = () => {
    const top = formRef.current?.getBoundingClientRect()?.top ?? 0;
    const scrollOffset = window.scrollY;
    const navHeight = theme.navHeight;
    const offset = top ? top + scrollOffset - navHeight / 2 : 0;

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

  const getStepBtnClassName = (stepNumber: number) => {
    return !!getStepErrors(stepNumber).length ? 'disabled' : 'info';
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
      if (nextStep > 4) {
        return handleSubmit();
      }
      changeStep(nextStep);
    }
  };

  return (
    <TeacherTrainingApplicationStyles ref={formRef}>
      <Form onSubmit={handleSubmit} onEnter={selectNextElement}>
        <div className='form-body'>
          <AnimatePresence mode='wait'>
            {step === 1 && (
              <FormStep key='step-1' {...stepTransition} id='step-1'>
                <h3 className='dynamic-h3 form-section-title'>Teacher Info</h3>
                <div className='step-buttons'>
                  <div>{/* Force "Next" button to right -- the cheap way */}</div>
                  <Button
                    onClick={(e) => handleChangeStep(e, 2)}
                    disabled={isSubmitting}
                    className={getStepBtnClassName(1)}
                  >
                    Next
                  </Button>
                </div>
                <div className='form-section-content'>
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
                </div>
                {!!getStepErrors(1).length && showStepErrors && (
                  <div className='form-errors form-error'>
                    <Button className='close-btn' onClick={() => setShowStepErrors(false)}>
                      <XIcon />
                    </Button>

                    <p className='form-error form-error-header'>
                      <InfoIcon /> Missing required fields:
                    </p>
                    <div className='form-error-container'>
                      {getStepErrors(1).map((err, i) => (
                        <span
                          key={err + i}
                          className='form-error-item button'
                          onClick={() => focusElement(err)}
                        >
                          {formatFieldName(err)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {!getStepErrors(1).length && (
                  <div className='step-button-end'>
                    <Button
                      onClick={(e) => handleChangeStep(e, 2)}
                      disabled={isSubmitting}
                      className={getStepBtnClassName(1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </FormStep>
            )}
            {step === 2 && (
              <FormStep key='step-2' {...stepTransition} id='step-2'>
                <h3 className='dynamic-h3 form-section-title'>Person Completing Form</h3>
                <div className='step-buttons'>
                  <div>{/* Force "Next" button to right -- the cheap way */}</div>
                  <Button
                    onClick={(e) => handleChangeStep(e, 3)}
                    disabled={isSubmitting}
                    className={getStepBtnClassName(2)}
                  >
                    Next
                  </Button>
                </div>
                <div className='form-section-content'>
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
                </div>
                {!!getStepErrors(2).length && showStepErrors && (
                  <div className='form-errors form-error'>
                    <Button className='close-btn' onClick={() => setShowStepErrors(false)}>
                      <XIcon />
                    </Button>

                    <p className='form-error form-error-header'>
                      <InfoIcon /> Missing required fields:
                    </p>
                    <div className='form-error-container'>
                      {getStepErrors(2).map((err, i) => (
                        <span
                          key={err + i}
                          className='form-error-item button'
                          onClick={() => focusElement(err)}
                        >
                          {formatFieldName(err)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {!getStepErrors(2).length && (
                  <div className='step-button-end'>
                    <Button
                      onClick={(e) => handleChangeStep(e, 3)}
                      disabled={isSubmitting}
                      className={getStepBtnClassName(2)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </FormStep>
            )}
            {step === 3 && (
              <FormStep key='step-3' {...stepTransition} id='step-3'>
                <h3 className='dynamic-h3 form-section-title'>Billing Contact</h3>
                <div className='step-buttons'>
                  <div>{/* Force "Next" button to right -- the cheap way */}</div>
                  <Button
                    onClick={(e) => handleChangeStep(e, 4)}
                    disabled={isSubmitting}
                    className={getStepBtnClassName(3)}
                  >
                    Next
                  </Button>
                </div>
                <div className='form-section-content'>
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
                </div>
                {!!getStepErrors(3).length && showStepErrors && (
                  <div className='form-errors form-error'>
                    <Button className='close-btn' onClick={() => setShowStepErrors(false)}>
                      <XIcon />
                    </Button>

                    <p className='form-error form-error-header'>
                      <InfoIcon /> Missing required fields:
                    </p>
                    <div className='form-error-container'>
                      {getStepErrors(3).map((err, i) => (
                        <span
                          key={err + i}
                          className='form-error-item button'
                          onClick={() => focusElement(err)}
                        >
                          {formatFieldName(err)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {!getStepErrors(2).length && (
                  <div className='step-button-end'>
                    <Button
                      onClick={(e) => handleChangeStep(e, 4)}
                      disabled={isSubmitting}
                      className={getStepBtnClassName(3)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </FormStep>
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
    overflow-x: hidden;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 1rem;
  }
  .form-section-title {
    font-weight: 700;
    color: ${({ theme }) => (theme.isLightMode ? theme.magenta[700] : theme.magenta[100])};
    text-align: center;
    grid-column: 1 / -1;
    font-size: 1.75rem;
    padding-top: 1rem;
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

const FormStep = styled(motion.div)`
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
      justify-self: flex-end;
      &.disabled {
        border-radius: 1.5rem;
      }
    }

    .back-btn {
      justify-self: flex-end;
    }
  }
  .step-button-end {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    width: 100%;
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
