import axios from 'axios';
import { KeyboardEvent, MouseEvent, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { FaCheck as CheckIcon } from 'react-icons/fa';
import {
  HiMiniChevronRight as ChevronRightIcon,
  HiMiniPencilSquare as EditIcon,
} from 'react-icons/hi2';
import { MdOpenInNew as NewTabIcon } from 'react-icons/md';

import { Input } from '@this/components/Form';
import Form from '@this/components/Form/Form';
import useForm from '@this/components/Form/useForm';
import { motion } from 'framer-motion';

import { TeacherTraining, TeacherTrainingInfo } from '@this/data/types/teacherTraining';

import { formatName } from '../helpers/utils';

import Spinner from '../components/Elements/Spinner';
import { capFirstLetter } from '../components/Form/helpers';
import { toDayJs } from '../helpers/time';
import FormStep from './FormComponents/FormStep';
import {
  buildInputFields,
  ReviewSection,
  StepSectionQuestion,
  stepSections,
} from './formData/teacherTrainingData';

const stepFields = Object.values(stepSections);

const maxSteps = stepFields.length;

type TeacherTrainingApplicationProps = {
  onSubmitComplete?: () => void;
  registrationFields: TeacherTraining['registrationFields'];
  level: string;
  formName: string;
  infoUrl: string;
  times: TeacherTrainingInfo['times'];
};

const TeacherTrainingApplication = ({
  onSubmitComplete,
  registrationFields,
  level,
  formName,
  infoUrl,
  times,
}: TeacherTrainingApplicationProps) => {
  const theme = useTheme();
  const formRef = useRef<HTMLDivElement>(null);

  const [formQuestions, setFormQuestions] = useState<{
    isSelf: boolean | null;
    isPayee: boolean | null;
  }>({
    isSelf: null,
    isPayee: null,
  });

  const [step, setStep] = useState(1);
  const [previousStep, setPreviousStep] = useState(1);
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showStepErrors, setShowStepErrors] = useState<boolean>(false);
  const [stepErrors, setStepErrors] = useState<Record<number, string[]>>(
    stepFields.reduce((acc, section) => {
      acc[section.step] = section.type === 'form' ? section.fields : [];
      return acc;
    }, {} as Record<number, string[]>),
  );

  const participantFields = buildInputFields(registrationFields.participant);
  const completerFields = buildInputFields(registrationFields.completer);
  const billingFields = buildInputFields(registrationFields.billing);

  const formValues = form.values();

  const reviewList = (stepSections.review as ReviewSection).fields.map((field) => {
    const value = formValues[field.name as keyof typeof formValues];
    const altValue = !field.altNames
      ? null
      : field.altNames
          .map((n) => formValues[n as keyof typeof formValues])
          .filter(Boolean)
          .join(' ')
          .trim();

    return {
      ...field,
      value,
      altValue,
    };
  });

  const getStepErrors = (n: number) => {
    const currentStep = stepFields.find((step) => step.step === n);

    const fields = currentStep?.type === 'form' ? currentStep.fields : undefined;

    if (!fields) return [];
    return fields.filter((field) => !form.isValid(field));
  };

  const stepNavButtons = stepFields
    .map((section) => {
      if (section.type !== 'form') {
        return null;
      }

      const showStep = Object.keys(section.dependsOn ?? {}).every((key) => {
        const formQuestion = formQuestions[key as 'isSelf' | 'isPayee'];
        return formQuestion === section.dependsOn?.[key] || formQuestion === null;
      });

      if (!showStep) {
        return null;
      }

      return {
        step: section.step,
        label: section.navTitle,
      };
    })
    .filter((v) => v !== null);

  const validateSteps = () => {
    const stepErrs = stepFields.reduce((errs, stepNum) => {
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
    setPreviousStep(step);
    setStep(stepNumber);

    scrollFormTop();
  };
  const handleChangeStep = (e: MouseEvent<HTMLButtonElement>, stepNumber: number) => {
    e.stopPropagation();
    e.preventDefault();
    changeStep(stepNumber);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const completeFormValues = [
      {
        name: 'timestamp',
        value: toDayJs().format('MM/DD/YYYY hh:mm A'),
        label: 'Timestamp',
      },
      {
        name: 'level',
        value: level,
        label: 'Course Level',
      },
      ...reviewList.map((field) => ({
        name: field.name,
        value: field.value || field.altValue,
        label: field.label,
      })),
    ];

    try {
      await axios.post('/api/signups/training', {
        values: completeFormValues,
        formName,
      });

      form.clear();
      form.notifySuccess();
      setStep(1);
      setPreviousStep(1);
      setShowStepErrors(false);
      setFormQuestions({
        isSelf: null,
        isPayee: null,
      });

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

  const goBack = (stepNumber: number) => {
    const stepDetails = stepFields.find((step) => step.step === stepNumber);

    if (!stepDetails) {
      return setStep(1);
    }

    if (previousStep < stepNumber) {
      return setStep(previousStep);
    }

    if (stepNumber <= 1) {
      return setStep(1);
    }

    setStep(stepNumber - 1);
  };

  return (
    <TeacherTrainingApplicationStyles ref={formRef}>
      {isSubmitting && (
        <div className='submitting-container'>
          <Spinner text='Submitting Form' size={7.5} />
        </div>
      )}
      <Form onSubmit={handleSubmit} onEnter={selectNextElement}>
        <div className='form-body'>
          <motion.div
            className='progress-bar'
            transition={{ type: 'tween', duration: 0.2 }}
            animate={{
              background: `linear-gradient(90deg,
                ${theme.rgb('primary')} 0%,
                ${theme.rgb('primary', 1)} ${step * (1 / maxSteps) * 100}%,
                ${theme.rgb('bg', 0)} ${step * (1 / maxSteps) * 105}%,
                ${theme.rgb('bg', 0)} 120%
              )`,
            }}
          >
            {stepNavButtons.map((stepButton, i) =>
              !stepButton ? null : (
                <div
                  key={stepButton.step}
                  // onClick={() => goToStep(stepButton.step)}
                  className={getProgressSectionClassName(stepButton.step)}
                >
                  <span className='step-num'>{i + 1}. </span>
                  <span
                    className='step-text'
                    style={{
                      maxWidth: `calc(100% - ${1.5}rem)`,
                    }}
                  >
                    {stepButton.label}
                  </span>
                  <CheckIcon className='check-icon' />
                </div>
              ),
            )}
          </motion.div>

          <FormStep
            currentStep={step}
            step={1}
            title='Teacher Information'
            direction={1 - previousStep}
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
                onChange={(value, isValid) =>
                  handleChange(
                    field.name,
                    field.autoCapitalize ? capFirstLetter(value) : value,
                    !!value && isValid,
                  )
                }
                isValid={form.isValid(field.name)}
                isErr={checkErr(1, field.name)}
              />
            ))}
          </FormStep>

          <FormStep
            step={2}
            currentStep={step}
            direction={2 - previousStep}
            onBack={() => goBack(2)}
            onNext={() => {
              if (formQuestions.isSelf === null) {
                setShowStepErrors(true);
                return;
              }
              setShowStepErrors(false);

              if (formQuestions.isSelf) {
                return setStep(formQuestions.isPayee ? 4 : 3);
              }

              return setStep(3);
            }}
            nextDisabled={formQuestions.isSelf === null}
          >
            <div className='form-col-span form-question-content'>
              <p className='form-question'>
                Are you completing this form for yourself or someone else?
              </p>

              <div className='flex-row gap-4 form-question-buttons'>
                {(stepSections.isSelf as StepSectionQuestion).options.map((option) => (
                  <button
                    key={option.label}
                    type='button'
                    className={`form-btn ${
                      formQuestions.isSelf === option.value
                        ? 'form-btn-selected'
                        : 'form-btn-default'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setFormQuestions({ ...formQuestions, isSelf: option.value });
                      setStep(option.nextStep);

                      setShowStepErrors(false);
                      if (option.value === formQuestions.isSelf || !option.nextStep) {
                        return;
                      }

                      const newVals = (
                        stepSections.isSelf as StepSectionQuestion
                      ).fieldMapList.reduce((newVals, map) => {
                        newVals[map.toField] = '';

                        return newVals;
                      }, {} as Record<string, string>);

                      form.setFields(newVals);
                    }}
                  >
                    {option.label} <ChevronRightIcon strokeWidth={2} />
                  </button>
                ))}
              </div>
            </div>
          </FormStep>

          <FormStep
            title='Person Completing Form'
            step={3}
            currentStep={step}
            direction={3 - previousStep}
            nextDisabled={isSubmitting}
            onBack={() => setStep(formQuestions.isSelf ? 1 : 2)}
            onNext={handleChangeStep}
            stepErrors={getStepErrors(3).map((err) => ({
              name: err,
              message: formatName(err),
            }))}
            showErrors={!!getStepErrors(3).length && showStepErrors}
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
                isErr={checkErr(3, field.name)}
              />
            ))}
          </FormStep>

          <FormStep
            step={4}
            currentStep={step}
            direction={4 - previousStep}
            onBack={() => {
              return setStep(formQuestions.isSelf ? 2 : 3);
            }}
            nextDisabled={formQuestions.isPayee === null}
            onNext={() => {
              if (formQuestions.isPayee === null) {
                setShowStepErrors(true);
                return;
              }
              setShowStepErrors(false);

              return setStep(formQuestions.isPayee ? 6 : 5);
            }}
          >
            <div
              className={`form-col-span form-question-content${
                showStepErrors && formQuestions.isPayee === null ? ' question-error' : ''
              }`}
            >
              <p className='form-question'>Are you paying for the course or is someone else?</p>
              {stepSections.isPayee.type === 'question' && (
                <div className='flex-row gap-2 form-question-buttons'>
                  {stepSections.isPayee.options.map((option) => (
                    <button
                      key={option.label}
                      type='button'
                      className={`form-btn ${
                        formQuestions.isPayee === option.value
                          ? 'form-btn-selected'
                          : 'form-btn-default'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setFormQuestions({ ...formQuestions, isPayee: option.value });
                        setStep(option.nextStep);
                        setShowStepErrors(false);
                        if (!option.nextStep) return;
                        const newVals = (
                          stepSections.isPayee as StepSectionQuestion
                        ).fieldMapList.reduce((newVals, map) => {
                          const toField = map.toField;

                          newVals[toField] = '';

                          return newVals;
                        }, {} as Record<string, string>);

                        form.setFields(newVals);
                      }}
                    >
                      {option.label} <ChevronRightIcon />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FormStep>

          <FormStep
            step={5}
            currentStep={step}
            title='Billing Contact Information'
            direction={5 - previousStep}
            nextDisabled={isSubmitting}
            onNext={handleChangeStep}
            onBack={() => setStep(formQuestions.isPayee ? 3 : 4)}
            stepErrors={getStepErrors(5).map((err) => ({
              name: err,
              message: formatName(err),
            }))}
            showErrors={!!getStepErrors(5).length && showStepErrors}
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
                isErr={checkErr(5, field.name)}
              />
            ))}
          </FormStep>

          <FormStep
            step={6}
            currentStep={step}
            title='Acknowledgements'
            direction={6 - previousStep}
            nextDisabled={isSubmitting}
            submitDisabled={isSubmitting}
            onBack={() => {
              return setStep(formQuestions.isPayee ? 4 : 5);
            }}
            onNext={handleChangeStep}
            stepErrors={getStepErrors(6).map((err) => ({
              name: err,
              message: formatName(err),
            }))}
            showErrors={!!getStepErrors(6).length && showStepErrors}
            onClearErrors={() => setShowStepErrors(false)}
            onErrorClick={focusElement}
          >
            <div className='form-col-span'>
              {registrationFields.acknowledgements.map((ack) => {
                const label = formQuestions.isSelf ? ack.altLabel ?? ack.label : ack.label;

                return (
                  <Input.Checkbox
                    key={ack.name}
                    // id={ack.name}
                    name={ack.name}
                    label={
                      ack.infoLink ? (
                        <span>
                          {label}{' '}
                          <a
                            className='anchor right-arrow-left'
                            href={infoUrl}
                            target='_blank'
                            style={{
                              boxShadow: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                            }}
                          >
                            {level} Information <NewTabIcon />
                          </a>
                        </span>
                      ) : ack.dateTime ? (
                        <span>
                          {label} <span className='value-badge'>{times.startDate}</span>
                          {' - '}
                          <span className='value-badge'>{times.endDate}</span>
                          {' | '}
                          <span className='value-badge'>{times.startTime}</span>
                          {' - '}
                          <span className='value-badge'>{times.endTime}</span>
                          <small style={{ marginLeft: '0.5rem' }}>{times.days}</small>
                        </span>
                      ) : (
                        label
                      )
                    }
                    checked={form.get(ack.name) === 'true'}
                    onChange={(value) => form.onChange(ack.name)(String(value), value)}
                    isErr={showStepErrors && form.get(ack.name) !== 'true'}
                  />
                );
              })}
            </div>
          </FormStep>

          <FormStep
            step={7}
            currentStep={step}
            title='Review & Submit'
            direction={7 - previousStep}
            nextDisabled={isSubmitting}
            submitDisabled={isSubmitting}
            backDisabled={isSubmitting}
            onBack={() => setStep(6)}
            onSubmit={handleSubmit}
          >
            <div className='form-col-span review-container'>
              {reviewList.map((field) =>
                !field.value && !field.altValue ? null : (
                  <div className='review-row' key={field.name}>
                    <div className='review-field-name'>{field.label}</div>
                    <div className='review-field-value'>{field.value || field.altValue}</div>
                    {field.value ? (
                      <div className='review-field-btn'>
                        <button
                          type='button'
                          className='review-edit-btn'
                          onClick={(e) => {
                            e.preventDefault();
                            goToStep(field.step);
                            setTimeout(() => {
                              focusElement(field.name);
                            }, 100);
                          }}
                        >
                          <EditIcon /> Edit
                        </button>
                      </div>
                    ) : (
                      <div className='review-field-btn'>
                        <span className='review-clone'>Same as above</span>
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          </FormStep>
        </div>
      </Form>
    </TeacherTrainingApplicationStyles>
  );
};

export default TeacherTrainingApplication;

const TeacherTrainingApplicationStyles = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  max-width: 100%;

  .submitting-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    z-index: 100;

    border-radius: 0 0 1rem 1rem;

    background: ${({ theme }) => theme.rgb('bg', 0.5)};
    backdrop-filter: blur(0.5rem);
    -webkit-backdrop-filter: blur(0.5rem);
  }

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
    padding-top: 2rem;
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
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    top: 0;
    left: 0;
    border-bottom: 1px solid ${({ theme }) => theme.rgb('fg', 0.1)};
    border-top: 1px solid ${({ theme }) => theme.rgb('fg', 0.1)};
  }

  .progress-section {
    flex: 1 1 100px;
    font-size: 0.8rem;
    font-weight: 600;
    /* padding: 0.5rem; */
    color: ${({ theme }) => theme.fg};

    gap: 0.5rem;
    margin: 0.1rem;
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
    .step-text {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* background: rgba(0, 0, 0, 0); */
    transition: all 200ms;

    &.complete {
      /* box-shadow: 0 0 3px ${({ theme }) => theme.green[500]}; */
      /* background: ${({ theme }) => theme.primary[700]}; */
      color: ${({ theme }) => theme.green[500]};
    }

    &.active {
      /* background: ${({ theme }) => theme.primary[900]} !important; */
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
    /*
    &.clickable {
      cursor: pointer;

      transition: all 200ms;
      &:hover {
        color: ${({ theme }) => theme.white};
        background: ${({ theme }) => theme.primary[0]};
      }
    } */
  }
  .form-question-content {
    max-width: 100%;
    padding: 1rem;
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.rgb('fg', 0.25)};
    margin: 1rem 0;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.rgb('bg', 0.5)};
  }
  .question-error {
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.rgb('red', 0.5)};
    background: ${({ theme }) => theme.rgb('red', 0.1)};
  }
  .form-question {
    font-weight: 700;
    text-align: center;
    grid-column: 1 / -1;
    font-size: 1.25rem;
    padding: 1rem 0;
    width: 100%;
  }
  .form-question-buttons {
    display: flex;
    flex-flow: row wrap;
    max-width: 400px;
    margin: 0 auto;
    margin-bottom: 1rem;
    .form-btn {
      flex: 1 1 150px;
    }
  }

  .form-btn {
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

    &.form-btn-default {
      background: ${({ theme }) =>
        theme.isLightMode ? theme.rgb('grey', 0.25) : theme.rgb('grey', 0.2)};

      box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('grey', 0)};
      margin-left: auto;
      &:hover {
        background: ${({ theme }) => theme.rgb('grey', 0.35, 2)};
        box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('grey', 0.5, 5)};
      }

      &:active {
        background: ${({ theme }) => theme.rgb('grey', 0.1, 5)};
        box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('grey', 0.1, 10)};
      }

      &:disabled,
      &.disabled {
        background: ${({ theme }) => theme.rgb('grey', 0.25)};
        box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('grey', 0.25, -5)};
        color: ${({ theme }) => theme.rgb('fg', 0.4)};
        cursor: default;
      }
    }
    &.form-btn-selected {
      background: ${({ theme }) =>
        theme.isLightMode ? theme.rgb('primary.500', 1) : theme.rgb('primary.500', 1, 5)};

      box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('primary.900', 0.25)};
      margin-left: auto;
      &:hover {
        background: ${({ theme }) => theme.rgb('primary.700', 1, 2)};
        box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('primary.300', 0.5, 5)};
      }

      &:active {
        background: ${({ theme }) => theme.rgb('primary.900', 1, 5)};
        color: ${({ theme }) => theme.rgb('primary.100', 1)};
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
  }

  .review-container {
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
  }
  .review-row {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    max-width: 100%;

    gap: 0.5rem;
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.rgb('fg', 0.2)};
    background: ${({ theme }) => theme.rgb('bg', 1)};
    border-radius: 0.5rem;
  }

  .review-field-name,
  .review-field-value {
    padding: 0.5rem;
  }
  .review-field-name {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.rgb('fg', 0.75)};
    background: ${({ theme }) => theme.rgb('bg', 0.5, theme.isLightMode ? -2 : 4)};
    border-radius: 0.5rem 0 0 0.5rem;
    overflow: hidden;
    min-width: 125px;
    max-width: 125px;
    width: 125px;
  }
  .review-field-value {
    flex: 1;
    max-width: 100%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .review-field-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;

    .review-clone {
      padding: 0 0.5rem;
      font-size: 0.8rem;
      font-weight: 500;
      color: ${({ theme }) => theme.rgb('fg', 0.5)};
      white-space: nowrap;
    }
  }
  .review-edit-btn {
    border: none;
    outline: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    color: ${({ theme }) => theme.rgb('fg', 0.5)};

    &:hover {
      color: ${({ theme }) => theme.rgb(theme.isLightMode ? 'primary' : 'secondary', 1)};
    }
  }
  .review-field-value {
    border-radius: 0 0.5rem 0.5rem 0;
  }
  @media screen and (max-width: 768px) {
    .progress-section {
      /* min-width: fit-content;  */
    }

    .review-container {
      padding: 0;
      gap: 1rem;
      .review-row {
        display: flex;
        flex-flow: column nowrap;
        gap: 0;
        position: relative;
      }
      .review-field-name {
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        border-radius: 0.5rem 0.5rem 0 0;
        padding: 0.25rem;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 500;
      }
      .review-field-value {
        display: flex;
        width: 100%;
        justify-content: center;
      }

      .review-field-btn {
        position: absolute;
        top: 0.125rem;
        right: 0;
      }

      .review-edit-btn {
        font-size: 0.75rem;
      }

      .review-clone {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.5;
      }
    }
  }
`;
