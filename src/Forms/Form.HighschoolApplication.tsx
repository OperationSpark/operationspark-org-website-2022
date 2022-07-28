import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Input } from '@this/components/Form';
import Form from '@this/components/Form/Form';
import useForm from '@this/components/Form/useForm';
import Button from '@this/components/Elements/Button';

import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';

const HighschoolFormSignupStyles = styled.div`
  .form-section {
    padding-bottom: 1rem;
    .form-section-title {
      font-weight: 700;
      color: ${({ theme }) => (theme.isLightMode ? theme.magenta[700] : theme.magenta[100])};
    }
  }
`;

interface HighschoolFormSignupProps {
  onSubmitComplete?: () => void;
  selectedCourse?: string;
}

const HighschoolFormSignup = ({ onSubmitComplete, selectedCourse }: HighschoolFormSignupProps) => {
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasErrors = form.hasErrors();
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
      await axios.post('/api/signup/highschool', form.values());
      form.clear();
      form.notifySuccess();
      onSubmitComplete?.();
    } catch {
      form.notifyError();
    } finally {
      setIsSubmitting(false);
    }
  };

  const equipmentData = form.getCheckboxes('equipment');
  const showEquipment =
    (Object.keys(equipmentData).length < 5 && !equipmentData.none) ?? equipmentData.none;
  useEffect(() => {
    if (selectedCourse) {
      const newSelectedOpt = courses.find(({ value }) => value === selectedCourse);
      form.onSelectChange('course')({
        option: newSelectedOpt,
        isValid: true,
        additionalInfoLabel: '',
        additionalInfo: '',
      });
    }
    // Ignore because I do not want to watch for changes on useForm
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCourse]);

  return (
    <HighschoolFormSignupStyles>
      <Form onSubmit={handleSubmit}>
        <div className='form-section'>
          <h3 className='dynamic-h3 form-section-title'>Student info</h3>
          {highschoolFormSignupInputs.studentInfo.map((field) => (
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
            label='What year will you graduate'
            name='gradYear'
            options={graduationYears}
            option={form.getSelect('gradYear')}
            isErr={form.isErr('gradYear')}
            isValid={form.isValid('gradYear')}
            onChange={form.onSelectChange('gradYear')}
            required
          />

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

        <div className='form-section'>
          <h3 className='dynamic-h3 form-section-title'>Parent/Guardian Information</h3>
          {highschoolFormSignupInputs.guardianInfo.map((field) => (
            <field.Element
              key={field.name}
              {...field}
              value={form.get(field.name)}
              onChange={form.onChange(field.name)}
              isValid={form.isValid(field.name)}
              isErr={form.isErr(field.name)}
            />
          ))}
        </div>

        <div className='form-section'>
          <h3 className='dynamic-h3 form-section-title'>Course Information</h3>
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
            label='Your availability'
            name='availability'
            options={availability}
            option={form.getSelect('availability')}
            isErr={form.isErr('availability')}
            isValid={form.isValid('availability')}
            onChange={form.onSelectChange('availability')}
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

          <Input.CheckboxGroup
            label='What equipment do you have (VIRTUAL ONLY)'
            checkboxes={equipment}
            values={form.getCheckboxes('equipment')}
            isValid={form.isValid('equipment')}
            isErr={form.isErr('equipment')}
            onChange={form.onCheckboxGroupChange('equipment')}
            clearCheckboxes={form.clearCheckboxGroup('equipment')}
            required
          />

          <div style={{ marginTop: '0.5rem' }}>
            {showEquipment && (
              <Input.TextArea
                label='What equipment do you need?'
                name='equipment-explanation'
                placeholder='...'
                value={form.get('equipmentExplanation')}
                onChange={form.onChange('equipmentExplanation')}
              />
            )}
          </div>
        </div>
        <div className='form-section'>
          <div style={{ width: '100%', height: '100%' }}>
            <Input.TextArea
              label='Other questions/comments'
              name='questionsComments'
              placeholder='Other questions/comments'
              value={form.get('message')}
              onChange={form.onChange('message')}
            />
          </div>
        </div>
        {hasErrors && form.showErrors() && (
          <div className='form-error'>
            <InfoIcon /> <p>Please complete required fields</p>
          </div>
        )}
        <Button
          className={form.hasErrors() ? 'info disabled' : 'info'}
          color='yellow'
          style={{ marginTop: '1rem' }}
          disabled={isSubmitting}
        >
          Sign up!
        </Button>
      </Form>
    </HighschoolFormSignupStyles>
  );
};

export default HighschoolFormSignup;

const highschoolFormSignupInputs = {
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
  {
    value: 'web-mobile',
    name: 'Professional Web and Mobile Development [Prerequisite: Level 1 and 2 IBC]',
  },
  {
    value: 'fundamentals-game',
    name: 'Fundamentals of Video Game Programming [Prerequisite: Level 1 and 2 IBC]',
  },
  {
    value: 'iot',
    name: 'Internet of Things [Prerequisite: Level 1 and 2 IBC]',
  },
];

const interestLevel = [
  {
    value: 'positive',
    name: "I'm sure I want to take the class in June.",
  },
  {
    value: 'exploring',
    name: 'Just exploring my summer options for now.',
  },
  {
    value: 'future',
    name: "I want to take the class at some point but can't take it this next session",
  },
];
const availability = [
  {
    value: 'm-f_9-12',
    name: 'Monday to Friday, 9:00 AM to 12:00 PM',
  },
  {
    value: 'm-f_1-4',
    name: 'Monday to Friday, 1:00 PM to 4:00 PM',
  },
  {
    value: 'flexible',
    name: "I'm flexible; either time works for me",
  },
  {
    value: 'waitList',
    name: 'Not available at those times, add me to the wait list for the next course',
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
    name: 'black-african-american',
    label: 'Black/African American',
    value: false,
  },
  { name: 'hispanic-latino', label: 'Hispanic/Latino', value: false },
  { name: 'white', label: 'White', value: false },
];
const equipment = [
  {
    name: 'desktop-laptop',
    label: 'Desktop/Laptop',
    value: false,
  },
  { name: 'chromebook', label: 'Chromebook', value: false },
  {
    name: 'internet-access',
    label: 'Reliable Internet Access',
    value: false,
  },
  {
    name: 'mic-headphones',
    label: 'Mic (Internal or in headset/earbuds)',
    value: false,
  },
  { name: 'webcam', label: 'Webcam (Recommended)', value: false },
  { name: 'none', label: 'None of the above', value: false },
];
