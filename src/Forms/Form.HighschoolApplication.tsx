import { useEffect, useState } from 'react';
import styled from 'styled-components';
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

const sheetsTabName = process.env.HIGHSCHOOL_FORM_RESPONSES_NAME;

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

const HighSchoolApplication = ({ onSubmitComplete }: HighSchoolApplicationProps) => {
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasErrors = form.hasErrors();

  const courseTimeOptions = getSelectedCourseTimes(form.getSelect('course').value);

  const graduationYears = [
    ...gradYears.map((year) => ({ name: String(year), value: String(year) })),
    { name: 'Other', value: 'other', additionalInfo: 'Please explain' },
  ];

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

  // const equipmentData = form.getCheckboxes('equipment');
  // const showEquipment =
  //   (Object.keys(equipmentData).length < 5 && !equipmentData.none) ?? equipmentData.none;

  useEffect(() => {
    form.onSelectChange('courseTime')({ option: { name: '', value: '' }, isValid: true });
    //! Do not want to watch form
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseTimeOptions?.options]);

  return (
    <HighSchoolApplicationStyles>
      <Form onSubmit={handleSubmit}>
        <div className='form-grid'>
          <h3 className='dynamic-h3 form-section-title'>Student info</h3>

          {highSchoolApplication.studentInfo.map((field) => (
            <field.Element
              key={field.name}
              {...field}
              value={form.get(field.name)}
              onChange={form.onChange(field.name)}
              isValid={form.isValid(field.name)}
              isErr={form.isErr(field.name)}
            />
          ))}
          <Input.Select
            label='Gender'
            name='gender'
            options={genderOptions}
            option={form.getSelect('gender')}
            isErr={form.isErr('gender')}
            isValid={form.isValid('gender')}
            onChange={form.onSelectChange('gender')}
            required
          />
          <Input.Select
            label='What year will you graduate'
            name='gradYear'
            options={graduationYears}
            option={form.getSelect('gradYear')}
            isErr={form.isErr('gradYear')}
            isValid={form.isValid('gradYear')}
            onChange={form.onSelectChange('gradYear')}
            required
          />

          <div className='form-col-span'>
            <Input.CheckboxGroup
              label='Race/Ethnicity (select one or more)'
              checkboxes={ethnicities}
              values={form.getCheckboxes('ethnicities')}
              isValid={form.isValid('ethnicities')}
              isErr={form.isErr('ethnicities')}
              onChange={form.onCheckboxGroupChange('ethnicities')}
              clearCheckboxes={form.clearCheckboxGroup('ethnicities')}
              required
            />
          </div>

          <h3 className='dynamic-h3 form-section-title'>Parent/Guardian Information</h3>

          {highSchoolApplication.guardianInfo.map((field) => (
            <field.Element
              key={field.name}
              {...field}
              value={form.get(field.name)}
              onChange={form.onChange(field.name)}
              isValid={form.isValid(field.name)}
              isErr={form.isErr(field.name)}
            />
          ))}

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
                  Days of the week vary by course and format, and will appear after selecting the
                  appropriate course in the application.
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

          <h3 className='dynamic-h3 form-section-title'>Other</h3>
          <div className='form-col-span'>
            <Input.TextArea
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
          <div className='form-col-span'>
            <Button
              className={form.hasErrors() ? 'info disabled' : 'info'}
              color='yellow'
              style={{ width: '100%' }}
              disabled={isSubmitting}
            >
              Sign up!
            </Button>
          </div>
        </div>
      </Form>
    </HighSchoolApplicationStyles>
  );
};

export default HighSchoolApplication;

const HighSchoolApplicationStyles = styled.div`
  width: 100%;

  .form-info {
    color: ${({ theme }) => (theme.isLightMode ? theme.red[700] : theme.red[200])};
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

  .form-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    grid-template-rows: auto;
    grid-gap: 0.25rem 1rem;
    align-items: flex-start;
  }
  ul {
    padding-left: 2rem;
    margin-bottom: 0.5rem;
  }
  li {
    padding-bottom: 0.5rem;
    line-height: 1.25em;
  }

  @media screen and (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      grid-gap: 0.25rem 1rem;
      max-width: 500px;
      margin: 0 auto;
    }
  }
`;
