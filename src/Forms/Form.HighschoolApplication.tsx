import { MouseEvent, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import axios from 'axios';
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';

import { Input } from '@this/components/Form';
import Form from '@this/components/Form/Form';
import useForm from '@this/components/Form/useForm';
import Button from '@this/components/Elements/Button';
import { TOption } from '@this/data/types/bits';
import PlainCard from '@this/src/components/Cards/PlainCard';
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
import { AnimatePresence, MotionProps, motion } from 'framer-motion';
import { formatName } from '../helpers/utils';
import { XIcon } from '../components/icons/XIcon';

const sheetsTabName = process.env.HIGHSCHOOL_FORM_RESPONSES_NAME;

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
  const removingWords = ['student', 'guardian'];

  const [isRemoveMatch] = [...name.matchAll(new RegExp(removingWords.join('|'), 'gi'))];

  console.log(isRemoveMatch);

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
const gradYears = [2024, 2025, 2026];

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

  const handleChangeStep = (e: MouseEvent<HTMLButtonElement>, stepNumber: number) => {
    e.stopPropagation();
    e.preventDefault();
    const stepErrs = getStepErrors(step);

    if (stepErrs.length && stepNumber > step) {
      setShowStepErrors(true);
      validateSteps();
      return;
    }

    setShowStepErrors(false);

    setStep(stepNumber);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async () => {
    if (hasErrors) {
      return form.toggleShowErrors();
    }

    setIsSubmitting(true);

    try {
      await axios.post('/api/signup/highschool', {
        ...form.values(),
        tabName: sheetsTabName,
        date: Date.now(),
      });
      form.clear();
      form.notifySuccess();
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

  const focusElement = (name: string) => {
    let el = formRef.current?.querySelector(`#${name}`) as HTMLInputElement;
    // if (!el) {
    //   el = formRef.current?.querySelector(`[name=${name}]`) as HTMLInputElement;
    // }
    el?.focus();

    const top = el?.getBoundingClientRect().top;
    const scrollOffset = window.scrollY;
    const navHeight = theme.navHeight;
    const offset = top ? top + scrollOffset - navHeight : 0;

    if (!offset) return;
    window.scrollTo({ top: offset, behavior: 'smooth' });

    if (!el) return;

    el.classList.add('flash-input0');
    setTimeout(() => {
      el.classList.add('flash-input1');
      setTimeout(() => {
        el.classList.remove('flash-input0');
        el.classList.remove('flash-input1');
      }, 250);
    }, 250);
  };

  useEffect(() => {
    form.onSelectChange('courseTime')({ option: { name: '', value: '' }, isValid: true });
    //! Do not want to watch form
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseTimeOptions?.options]);

  return (
    <HighSchoolApplicationStyles ref={formRef}>
      <Form onSubmit={handleSubmit}>
        <div className='form-body'>
          <AnimatePresence exitBeforeEnter>
            {step === 1 && (
              <FormStep key='step-1' {...stepTransition} id='step-1'>
                <h3 className='dynamic-h3 form-section-title'>Student Info</h3>

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
                <div className='step-buttons'>
                  <Button
                    onClick={(e) => handleChangeStep(e, 2)}
                    disabled={isSubmitting}
                    className={getStepBtnClassName(1)}
                  >
                    Next
                  </Button>
                </div>
              </FormStep>
            )}
            {step === 2 && (
              <FormStep {...stepTransition} id='step-2' key='step-2'>
                <h3 className='dynamic-h3 form-section-title'>Parent/Guardian Information</h3>

                {highSchoolApplication.guardianInfo.map((field, i) => (
                  <field.Element
                    {...field}
                    key={field.name + i}
                    value={form.get(field.name)}
                    onChange={form.onChange(field.name)}
                    isValid={form.isValid(field.name)}
                    isErr={form.isErr(field.name)}
                  />
                ))}
                <div className='step-buttons'>
                  <Button onClick={(e) => handleChangeStep(e, 1)} disabled={isSubmitting}>
                    Back
                  </Button>
                  <Button onClick={(e) => handleChangeStep(e, 3)} disabled={isSubmitting}>
                    Next
                  </Button>
                </div>
              </FormStep>
            )}
            {step === 3 && (
              <FormStep {...stepTransition} id='step-3' key='step-3'>
                <h3 className='dynamic-h3 form-section-title'>Course Information</h3>

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
                        Days of the week vary by course and format, and will appear after selecting
                        the appropriate course in the application.
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
                <div className='step-buttons'>
                  <Button onClick={(e) => handleChangeStep(e, 2)} disabled={isSubmitting}>
                    Back
                  </Button>
                  <Button onClick={(e) => handleChangeStep(e, 4)} disabled={isSubmitting}>
                    Next
                  </Button>
                </div>
              </FormStep>
            )}

            {step === 4 && (
              <FormStep {...stepTransition} id='step-4' key='step-4'>
                <h3 className='dynamic-h3 form-section-title'>Policy Agreement</h3>

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

                {hasErrors && form.showErrors() && (
                  <div className='form-error'>
                    <InfoIcon /> <p>Please complete required fields</p>
                  </div>
                )}
                <div className='step-buttons'>
                  <Button onClick={(e) => handleChangeStep(e, 3)} disabled={isSubmitting}>
                    Back
                  </Button>
                  <Button
                    className={form.hasErrors() ? 'info disabled' : 'info'}
                    color='yellow'
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                  >
                    Sign up!
                  </Button>
                </div>
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
  .form-info {
    color: ${({ theme }) => (theme.isLightMode ? theme.red[700] : theme.red[200])};
  }
  .form-body {
    position: relative;
    overflow-x: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    min-height: 100vh;
  }
  .form-section-title {
    font-weight: 700;
    color: ${({ theme }) => (theme.isLightMode ? theme.magenta[700] : theme.magenta[100])};
    text-align: center;
    grid-column: 1 / -1;
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
`;

const FormStep = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  grid-template-rows: auto;
  grid-gap: 0.25rem 1rem;
  align-items: flex-start;
  box-shadow: 0 0 3px 0px ${({ theme }) => theme.alpha.fg25};
  padding: 1rem;
  margin-top: ${({ theme }) => theme.navHeight}px;
  border-radius: 0.5rem;

  .step-buttons {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;
    button {
      font-size: 1.1rem;
      padding: 0.5rem 1rem;
      transition: all 200ms;
      &.disabled {
        border-radius: 1.5rem;
      }
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
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 0.25rem 1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;
