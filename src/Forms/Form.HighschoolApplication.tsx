import axios from 'axios';
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';
import styled, { useTheme } from 'styled-components';

import { FaCheck as CheckIcon } from 'react-icons/fa';

import Button from '@this/components/Elements/Button';
import { Input } from '@this/components/Form';
import Form from '@this/components/Form/Form';
import useForm from '@this/components/Form/useForm';
import { TOption } from '@this/data/types/bits';
import PlainCard from '@this/src/components/Cards/PlainCard';
import { AnimatePresence, MotionProps, motion } from 'framer-motion';
import { XIcon } from '../components/icons/XIcon';

import env from '@this/src/clientConfig';

import { formatName } from '../helpers/utils';
import {
  courseTimes,
  courses,
  ethnicities,
  genderOptions,
  highSchoolApplication,
  interestLevel,
  policyAgreementOptions,
  referencedByOptions,
} from './formData/highSchoolApplicationData';

const sheetsTabName = env.HIGHSCHOOL_FORM_RESPONSES_NAME;

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
  1: [
    'studentFirstName',
    'studentLastName',
    'studentEmail',
    'studentPhone',
    'studentDOB',
    'schoolAttended',
    'gender',
    'gradYear',
    'ethnicities',
  ],
  2: ['guardianFirstName', 'guardianLastName', 'guardianEmail', 'guardianPhone'],
  3: ['course', 'courseTime', 'interestLevel', 'referencedBy'],
  4: ['policyAgreement'],
};

const maxSteps = Object.keys(stepFields).length;

const getSelectedCourseTimes = (selected: string): { options: TOption[]; note: string } | null => {
  if (selected === 'fundamentals') {
    return { options: courseTimes.fundamentals, note: courseTimes.notes.fundamentals };
  }
  if (selected === 'advanced') {
    return { options: courseTimes.advanced, note: courseTimes.notes.advanced };
  }
  return null;
};

interface HighSchoolApplicationProps {
  onSubmitComplete?: () => void;
}
const gradYears = [2025, 2026, 2027];

type GetInitSteps = <T>(length: number, cb: (index: number) => T) => Record<number, T>;
const getInitSteps: GetInitSteps = (length, cb) => {
  const steps: Record<number, ReturnType<typeof cb>> = {};
  for (let i = 1; i <= length; i++) {
    steps[i] = cb(i);
  }
  return steps;
};

const HighSchoolApplication = ({ onSubmitComplete }: HighSchoolApplicationProps) => {
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

  const courseTimeOptions = getSelectedCourseTimes(form.getSelect('course').value);

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

  const getNextValidStep = () => {
    let step = 1;
    for (let i = step; i <= maxSteps; i++) {
      if (getStepErrors(i).length) {
        return i;
      }
    }
    return maxSteps;
  };

  const graduationYears = [
    ...gradYears.map((year) => ({ name: String(year), value: String(year) })),
    { name: 'Other', value: 'other', additionalInfo: 'Please explain' },
  ];

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
    return showStepErrors && !validateField(field, step) && !form.isValid(field);
  };

  const getStepBtnClassName = (stepNumber: number) => {
    return !!getStepErrors(stepNumber).length ? 'disabled' : 'info';
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
      if (nextStep > 4) {
        return handleSubmit();
      }
      changeStep(nextStep);
    }
  };
  useEffect(() => {
    form.onSelectChange('courseTime')({ option: { name: '', value: '' }, isValid: true });
    //! Do not want to watch form
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseTimeOptions?.options]);

  return (
    <HighSchoolApplicationStyles ref={formRef}>
      <Form onSubmit={handleSubmit} onEnter={selectNextElement}>
        <div className='form-body'>
          <motion.div
            className='progress-bar'
            animate={{
              background: `linear-gradient(to right, ${
                theme.isLightMode ? theme.magenta[0] : theme.magenta[0]
              } ${step * 25}%, ${'rgba(0, 0, 0, 0)'} ${step * (100 / maxSteps)}%)`,
            }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <div onClick={() => goToStep(1)} className={getProgressSectionClassName(1)}>
              <span className='step-num'>1. </span> Student <CheckIcon className='check-icon' />
            </div>
            <div onClick={() => goToStep(2)} className={getProgressSectionClassName(2)}>
              <span className='step-num'>2. </span> Guardian <CheckIcon className='check-icon' />
            </div>
            <div onClick={() => goToStep(3)} className={getProgressSectionClassName(3)}>
              <span className='step-num'>3. </span> Course <CheckIcon className='check-icon' />
            </div>
            <div onClick={() => goToStep(4)} className={getProgressSectionClassName(4)}>
              <span className='step-num'>4. </span> Policy <CheckIcon className='check-icon' />
            </div>
          </motion.div>
          <AnimatePresence mode='wait'>
            {step === 1 && (
              <FormStep key='step-1' {...stepTransition} id='step-1'>
                <h3 className='dynamic-h3 form-section-title'>Student Info</h3>
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
                  {highSchoolApplication.studentInfo.map((field, i) => (
                    <field.Element
                      {...field}
                      key={field.name + i}
                      value={form.get(field.name)}
                      onChange={(value, isValid) => handleChange(field.name, value, isValid)}
                      isValid={form.isValid(field.name)}
                      isErr={checkErr(1, field.name)}
                    />
                  ))}

                  <Input.Select
                    animate={false}
                    id='gender'
                    label='Gender'
                    name='gender'
                    options={genderOptions}
                    option={form.getSelect('gender')}
                    isErr={checkErr(1, 'gender')}
                    isValid={form.isValid('gender')}
                    onChange={form.onSelectChange('gender')}
                    required
                  />
                  <Input.Select
                    animate={false}
                    id='gradYear'
                    label='What year will you graduate'
                    name='gradYear'
                    options={graduationYears}
                    option={form.getSelect('gradYear')}
                    isErr={checkErr(1, 'gradYear')}
                    isValid={form.isValid('gradYear')}
                    onChange={form.onSelectChange('gradYear')}
                    required
                  />

                  <div className='form-col-span'>
                    <Input.CheckboxGroup
                      id='ethnicities'
                      label='Race/Ethnicity (select one or more)'
                      checkboxes={ethnicities}
                      values={form.getCheckboxes('ethnicities')}
                      isValid={form.isValid('ethnicities')}
                      isErr={checkErr(1, 'ethnicities')}
                      onChange={form.onCheckboxGroupChange('ethnicities')}
                      clearCheckboxes={form.clearCheckboxGroup('ethnicities')}
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
              <FormStep {...stepTransition} id='step-2' key='step-2'>
                <h3 className='dynamic-h3 form-section-title'>Parent/Guardian Information</h3>
                <div className='step-buttons'>
                  <Button
                    className='back-btn'
                    onClick={(e) => handleChangeStep(e, 1)}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={(e) => handleChangeStep(e, 3)}
                    className={getStepBtnClassName(2)}
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                </div>

                <div className='form-section-content'>
                  {highSchoolApplication.guardianInfo.map((field, i) => (
                    <field.Element
                      {...field}
                      key={field.name + i}
                      value={form.get(field.name)}
                      onChange={form.onChange(field.name)}
                      isValid={form.isValid(field.name)}
                      isErr={checkErr(2, field.name)}
                    />
                  ))}
                </div>
                {!getStepErrors(2).length && (
                  <div className='step-button-end'>
                    <Button
                      onClick={(e) => handleChangeStep(e, 3)}
                      disabled={isSubmitting}
                      className={getStepBtnClassName(2)}
                      style={{ width: '200px' }}
                    >
                      Next
                    </Button>
                  </div>
                )}
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
              </FormStep>
            )}
            {step === 3 && (
              <FormStep {...stepTransition} id='step-3' key='step-3'>
                <h3 className='dynamic-h3 form-section-title'>Course Information</h3>

                <div className='step-buttons'>
                  <Button
                    className='back-btn'
                    onClick={(e) => handleChangeStep(e, 2)}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={(e) => handleChangeStep(e, 4)}
                    className={getStepBtnClassName(3)}
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                </div>
                <div className='form-section-content'>
                  <div className='form-col-span dynamic-txt' style={{ marginBottom: '1rem' }}>
                    <PlainCard noDivider={true}>
                      <p>
                        This semester, we are offering both in-person and virtual classes.{' '}
                        <b>
                          <i>You can enroll in one or the other (No hybrid option).</i>
                        </b>
                      </p>

                      <p>
                        <b>
                          Days of the week vary by course and format, and will appear after
                          selecting the appropriate course in the application.
                        </b>
                      </p>
                      <br />
                      <div>
                        {courseTimeOptions && (
                          <p className='form-info'>
                            <small>{courseTimeOptions.note}</small>
                          </p>
                        )}
                        <Input.Select
                          id='course'
                          animate={false}
                          label='Which class are you interested in?'
                          name='course'
                          options={courses}
                          option={form.getSelect('course')}
                          isErr={form.isErr('course')}
                          isValid={form.isValid('course')}
                          onChange={form.onSelectChange('course')}
                          required
                        />
                      </div>
                      {courseTimeOptions && (
                        <div>
                          <p className='form-info'>
                            <small>{`You must choose in person or virtual (No hybrid option)`}</small>
                          </p>
                          <Input.Select
                            id='courseTime'
                            animate={false}
                            label=' What is your course preference?'
                            name='course'
                            options={courseTimeOptions.options}
                            option={form.getSelect('courseTime')}
                            isErr={form.isErr('courseTime')}
                            isValid={form.isValid('courseTime')}
                            onChange={form.onSelectChange('courseTime')}
                            required
                          />
                        </div>
                      )}
                      <Input.Select
                        id='interestLevel'
                        animate={false}
                        label='What is your current level of interest in the program?'
                        name='interestLevel'
                        options={interestLevel}
                        option={form.getSelect('interestLevel')}
                        isErr={form.isErr('interestLevel')}
                        isValid={form.isValid('interestLevel')}
                        onChange={form.onSelectChange('interestLevel')}
                        required
                      />
                      <Input.Select
                        id='referencedBy'
                        animate={false}
                        label='How did you hear about us?'
                        name='referencedBy'
                        options={referencedByOptions}
                        option={form.getSelect('referencedBy')}
                        isErr={form.isErr('referencedBy')}
                        isValid={form.isValid('referencedBy')}
                        onChange={form.onSelectChange('referencedBy')}
                        required
                      />
                    </PlainCard>
                  </div>
                </div>
                {!getStepErrors(3).length && (
                  <div className='step-button-end'>
                    <Button
                      onClick={(e) => handleChangeStep(e, 4)}
                      disabled={isSubmitting}
                      className={getStepBtnClassName(3)}
                      style={{ width: '200px' }}
                    >
                      Next
                    </Button>
                  </div>
                )}
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
              </FormStep>
            )}

            {step === 4 && (
              <FormStep {...stepTransition} id='step-4' key='step-4'>
                <h3 className='dynamic-h3 form-section-title'>Policy Agreement</h3>
                <div className='step-buttons'>
                  <Button
                    className='back-btn'
                    onClick={(e) => handleChangeStep(e, 3)}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button
                    className={getStepBtnClassName(4)}
                    color='yellow'
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                  >
                    Sign up!
                  </Button>
                </div>
                <div className='form-section-content'>
                  <PlainCard noDivider={true} className='form-col-span'>
                    <h3 className='form-info dynamic-h3'>{`I understand that:`}</h3>
                    <ul className='form-info dynamic-txt'>
                      <li>{`Attendance is mandatory for both in-person and virtual classes.`}</li>
                      <li>
                        {`If I miss more than two classes total, or fail to complete assignments in a timely manner, Operation Spark may drop me from the class and ask me to re-enroll at a later date.`}
                      </li>
                      <li>
                        <b>{`The first two class meetings are mandatory, with NO EXCEPTIONS.`}</b>
                      </li>
                    </ul>

                    <Input.Select
                      id='policyAgreement'
                      animate={false}
                      label='Policy Agreement'
                      name='policyAgreement'
                      options={policyAgreementOptions}
                      option={form.getSelect('policyAgreement')}
                      isErr={form.isErr('policyAgreement')}
                      isValid={form.isValid('policyAgreement')}
                      onChange={form.onSelectChange('policyAgreement')}
                      required
                    />
                  </PlainCard>

                  <div className='form-col-span'>
                    <Input.TextArea
                      style={{ marginTop: '1rem' }}
                      label='Other questions/comments'
                      name='questionsComments'
                      placeholder='Other questions/comments'
                      value={form.get('message')}
                      onChange={form.onChange('message')}
                    />
                  </div>
                </div>

                {!getStepErrors(4).length && (
                  <div className='step-button-end'>
                    <Button
                      className={getStepBtnClassName(4)}
                      color='yellow'
                      style={{ width: '100%' }}
                      disabled={isSubmitting}
                    >
                      Sign up!
                    </Button>
                  </div>
                )}

                {!!getStepErrors(4).length && showStepErrors && (
                  <div className='form-errors form-error'>
                    <Button className='close-btn' onClick={() => setShowStepErrors(false)}>
                      <XIcon />
                    </Button>

                    <p className='form-error form-error-header'>
                      <InfoIcon /> Missing required fields:
                    </p>
                    <div className='form-error-container'>
                      {getStepErrors(4).map((err, i) => (
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
              </FormStep>
            )}
          </AnimatePresence>
        </div>
      </Form>
    </HighSchoolApplicationStyles>
  );
};

export default HighSchoolApplication;

const HighSchoolApplicationStyles = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh;
  .form-info {
    color: ${({ theme }) => (theme.isLightMode ? theme.red[700] : theme.red[200])};
  }
  .form-body {
    position: relative;
    overflow-x: hidden;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 1rem;
    box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg};
    margin-top: 2rem;
    border-radius: 0.25rem;
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
