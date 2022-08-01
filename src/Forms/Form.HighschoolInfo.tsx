import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';

import { Input } from '@this/components/Form';
import Form from '@this/components/Form/Form';
import useForm from '@this/components/Form/useForm';
import Button from '@this/components/Elements/Button';

import formConfig from '@this/config/form';

const HighschoolFormInfoStyles = styled.div`
  .form-section {
    width: 100%;
  }
`;

interface HighschoolFormInfoProps {
  onSubmitComplete?: () => void;
  selectedCourse?: string;
}

const HighschoolFormInfo = ({ onSubmitComplete, selectedCourse }: HighschoolFormInfoProps) => {
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
      const { tabName } = formConfig.hsInfoRequest;
      await axios.post('/api/signup/highschool', {
        ...form.values(),
        tabName,
        date: new Date(),
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
    <HighschoolFormInfoStyles>
      <Form onSubmit={handleSubmit}>
        <div className='form-section'>
          {highschoolFormInfoInputs.studentInfo.map((field) => (
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
        </div>

        <div className='form-section'>
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
            label='How did you hear about us?'
            name='referencedBy'
            options={referencedByOptions}
            option={form.getSelect('referencedBy')}
            isErr={form.isErr('referencedBy')}
            isValid={form.isValid('referencedBy')}
            onChange={form.onSelectChange('referencedBy')}
            required
          />
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
        <div className='form-section'>
          <Button
            className={form.hasErrors() ? 'info disabled' : 'info'}
            color='yellow'
            style={{ marginTop: '1rem', width: '100%' }}
            disabled={isSubmitting}
          >
            Sign up!
          </Button>
        </div>
      </Form>
    </HighschoolFormInfoStyles>
  );
};

export default HighschoolFormInfo;

const highschoolFormInfoInputs = {
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
      placeholder: '504-123-9876',
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
