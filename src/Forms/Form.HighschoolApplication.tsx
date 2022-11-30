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

const SpringApplicationStyles = styled.div`
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
    }
  }
`;

const getSelectedCourseTimes = (selected: string): { options: TOption[]; note: string } | null => {
  if (selected === 'fundamentals') {
    return { options: courseTimes.fundamentals, note: courseTimes.notes.fundamentals };
  }
  if (selected === 'advanced') {
    return { options: courseTimes.advanced, note: courseTimes.notes.advanced };
  }
  return null;
};

interface SpringApplicationProps {
  onSubmitComplete?: () => void;
}

const SpringApplication = ({ onSubmitComplete }: SpringApplicationProps) => {
  const sheetsTabName = 'Applications - Spring 2023';
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasErrors = form.hasErrors();

  const courseTimeOptions = getSelectedCourseTimes(form.getSelect('course').value);

  const year = new Date().getFullYear();
  const graduationYears = [
    ...new Array(4).fill(0).map((e, i) => ({ name: `${year + i}`, value: `${year + i}` })),
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
    <SpringApplicationStyles>
      <Form onSubmit={handleSubmit}>
        <div className='form-grid'>
          <h3 className='dynamic-h3 form-section-title'>Student info</h3>

          {SpringApplicationInputs.studentInfo.map((field) => (
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
              label='Race/Ethnicity'
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

          {SpringApplicationInputs.guardianInfo.map((field) => (
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
              &nbsp;
              <p>
                <b className='primary-secondary'>Available Courses:</b>
              </p>
              <p>
                <b className='primary-secondary'>Fundamentals of HTML, CSS, and Javascript</b>
              </p>
              <p> [ No Prerequisite ]</p>
              <ul>
                <li>
                  <b className='primary-secondary'>Virtual: </b> Tuesdays + Thursdays, 5:00 - 7:00
                  PM
                </li>
                <li>
                  <b className='primary-secondary'>IN PERSON: </b> Wednesdays, 4:45 - 8:00 PM
                </li>
              </ul>
              <p className='primary-secondary'>
                <b>Advanced Javascript, Functional Programming and Web Development</b>
              </p>
              <p>
                <b>[ Prerequisite: Fundamentals of HTML, CSS, and Javascript ]</b>
              </p>
              <ul>
                <li>
                  <b className='primary-secondary'>Virtual: </b> Tuesdays + Thursdays, 5:00 - 7:00
                  PM
                </li>
                <li>
                  <b className='primary-secondary'>IN PERSON: </b> Wednesdays, 4:45 - 8:00 PM
                </li>
              </ul>
              <p>
                <b>
                  Days of the week vary by course and format, and will appear after selecting the
                  appropriate course in the application.
                </b>
              </p>
              <div>
                {courseTimeOptions && (
                  <p className='form-info'>
                    <b>{courseTimeOptions.note}</b>
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
                    <b>{`You must choose in person or virtual (No hybrid option)`}</b>
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
                {`If I miss more than two classes (in-person) or four classes (virtual), or fail to complete assignments in a timely manner, Operation Spark may drop me from the class and ask me to re-enroll at a later date.`}
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
    </SpringApplicationStyles>
  );
};

export default SpringApplication;

const SpringApplicationInputs = {
  studentInfo: [
    {
      Element: Input.Text,
      label: 'First Name (Student)',
      name: 'studentFirstName',
      placeholder: 'Joe',
      required: true,
      autoCapitalize: true,
    },
    {
      Element: Input.Text,
      label: 'Last Name (Student)',
      name: 'studentLastName',
      placeholder: 'Smith',
      required: true,
      autoCapitalize: true,
    },
    {
      Element: Input.Email,
      label: 'Email (Student)',
      name: 'studentEmail',
      placeholder: 'joesmith@gmail.com',
      required: true,
    },
    {
      Element: Input.Phone,
      label: 'Phone Number (Student)',
      name: 'studentPhone',
      placeholder: '303-123-9876',
      required: true,
    },
    {
      Element: Input.DateInput,
      label: 'Date of Birth (Student)',
      name: 'studentDOB',
      placeholder: 'MM/DD/YYYY',
      required: true,
    },
    {
      Element: Input.Text,
      label: 'What school do you currently attend?',
      name: 'schoolAttended',
      placeholder: 'High School',
      required: true,
      autoCapitalize: true,
    },
  ],
  guardianInfo: [
    {
      Element: Input.Text,
      label: 'First Name (Parent/Guardian)',
      name: 'guardianFirstName',
      placeholder: 'Joe',
      required: true,
      autoCapitalize: true,
    },
    {
      Element: Input.Text,
      label: 'Last Name (Parent/Guardian)',
      name: 'guardianLastName',
      placeholder: 'Smith',
      required: true,
      autoCapitalize: true,
    },
    {
      Element: Input.Email,
      label: 'Email (Parent/Guardian)',
      name: 'guardianEmail',
      placeholder: 'joesmith@gmail.com',
      required: true,
    },
    {
      Element: Input.Phone,
      label: 'Phone Number (Parent/Guardian)',
      name: 'guardianPhone',
      placeholder: '303-123-9876',
      required: true,
    },
  ],
};

const genderOptions = [
  {
    value: 'male',
    name: 'Male',
  },
  {
    value: 'female',
    name: 'Female',
  },
  {
    value: 'no-response',
    name: 'Prefer not to respond',
  },
];
const referencedByOptions = [
  {
    value: 'google',
    name: 'Google',
  },
  {
    value: 'facebook',
    name: 'Facebook',
  },
  {
    value: 'instagram',
    name: 'Instagram',
  },
  {
    value: 'flyer',
    name: 'Flyer',
  },
  {
    value: 'verbal',
    name: 'Word of mouth',
    additionalInfo: 'Who told you about us',
  },
  {
    value: 'event',
    name: 'Community Event',
    additionalInfo: 'Which event',
  },
  {
    value: 'organization',
    name: 'Community Organization',
    additionalInfo: 'Which organization',
  },
];

const courses = [
  {
    value: 'fundamentals',
    name: 'Fundamentals of HTML, CSS, and Javascript [Prerequisite: none]',
  },
  {
    value: 'advanced',
    name: 'Advanced Javascript, Functional Programming and Web Development [Prerequisite: Fundamentals]',
  },
  // {
  //   value: 'web-mobile',
  //   name: 'Professional Web and Mobile Development [Prerequisite: Level 1 and 2 IBC]',
  // },
  // {
  //   value: 'fundamentals-game',
  //   name: 'Fundamentals of Video Game Programming [Prerequisite: Level 1 and 2 IBC]',
  // },
  // {
  //   value: 'iot',
  //   name: 'Internet of Things [Prerequisite: Level 1 and 2 IBC]',
  // },
];
const courseTimes = {
  notes: {
    fundamentals: 'This is your first class with Op Spark',
    advanced: 'This is your second class with Op Spark, and you earned the level 1 credential',
  },
  fundamentals: [
    {
      value: 'onsite-thurs-4-8',
      name: 'In-person, Wednesdays, 4:45 - 8:00 PM',
    },
    {
      value: 'virtual-tue-thurs-5-7',
      name: 'Virtual, Tuesdays + Thursdays, 5:00 - 7:00 PM',
    },
  ],
  advanced: [
    {
      value: 'onsite-thurs-4-8',
      name: 'In-person, Wednesdays, 4:30 - 8:00 PM',
    },
    {
      value: 'virtual-mon-wed-5-7',
      name: 'Virtual, Mondays + Wednesdays, 5:00-7:00 PM',
    },
  ],
};

const interestLevel = [
  {
    value: 'positive',
    name: "I'm sure I want to take the class this spring",
  },
  {
    value: 'future',
    name: 'I want to take the course but am not yet sure about my availability',
  },
  {
    value: 'exploring',
    name: 'Just exploring my options for now',
  },
];

const ethnicities = [
  {
    name: 'american-indian-alaskan-native',
    label: 'American Indian/Alaskan Native',
    value: false,
  },
  { name: 'asian', label: 'Asian', value: false },
  {
    name: 'native-hawaiian-pacific-islander',
    label: 'Native Hawaiian or Pacific Islander',
    value: false,
  },
  {
    name: 'black-african-american',
    label: 'Black/African American',
    value: false,
  },
  { name: 'hispanic-latino', label: 'Hispanic/Latino', value: false },
  { name: 'white', label: 'White', value: false },
];

const policyAgreementOptions = [
  {
    value: 'agree',
    name: 'I understand and agree to the policy above',
  },
  {
    value: 'disagree',
    name: 'I cannot make it work this semester, but would like to receive information for future semesters',
  },
  {
    value: 'other',
    name: 'I am not sure yet whether I can make the commitment for this semester',
    additionalInfo: 'Please explain why you are unsure',
  },
];
