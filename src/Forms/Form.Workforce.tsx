import moment from 'moment';
import axios from 'axios';
import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { IInfoSessionFormValues } from '@this/data/types/infoSession';
import { ISessionDates } from '@this/pages-api/infoSession/dates';
import { FormDataSignup } from '@this/pages-api/infoSession/user';
import { Form, Input, useForm } from '@this/components/Form';
import Button from '@this/components/Elements/Button';

interface WorkforceFormProps {
  sessionDates: ISessionDates[];
}

const WorkforceForm = ({ sessionDates }: WorkforceFormProps) => {
  const form = useForm<IInfoSessionFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = () => {
    const hasErrors = form.hasErrors();

    if (hasErrors) {
      return form.toggleShowErrors();
    }
    const { sessionDate, ...values } = form.values();

    const session = sessionDates.find((s) => s._id === sessionDate.value);

    const body: FormDataSignup = {
      ...values,
      ...(session && {
        session: {
          id: session._id,
          cohort: session.cohort,
          programId: session.programId,
          startDateTime: session.times.start.dateTime,
        },
      }),
    };
    setIsSubmitting(true);
    axios
      .post('/api/infoSession/user', body)
      .then(() => {
        form.notifySuccess();
        form.clear();
      })
      .catch(() => {
        form.notifyError({
          title: 'Error',
          msg: 'There was an error signing you up\nPlease reach out to us at "admissions@operationspark.org" or give us a call at 504-534-8277',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const sessionDateOptions = [
    ...sessionDates.map(({ _id, times: { start } }) => ({
      name: moment(start.dateTime).format('dddd, MMMM Do h:mma'),
      value: _id,
    })),
    {
      name: 'None of these fit my schedule',
      value: 'future',
    },
  ];

  return (
    <Form onSubmit={handleSubmit}>
      {workforceFormInputs.map((field, i) => (
        <field.Element
          key={field.name}
          {...field}
          value={form.get(field.name)}
          onChange={form.onChange(field.name)}
          isValid={form.isValid(field.name)}
          isErr={form.isErr(field.name)}
          animation={{
            initial: { x: 100, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            transition: { duration: 0.2, delay: 0.15 * i },
          }}
        />
      ))}

      <Input.Select
        label='How did you hear about us?'
        name='referencedBy'
        options={referencedByOptions}
        option={form.getSelect('referencedBy')}
        isErr={form.isErr('referencedBy')}
        isValid={form.isValid('referencedBy')}
        onChange={form.onSelectChange('referencedBy')}
        required
        delay={workforceFormInputs.length * 0.15}
      />

      <Input.Select
        label='Select an info session date'
        name='sessionDate'
        option={form.getSelect('sessionDate')}
        onChange={form.onSelectChange('sessionDate')}
        isErr={form.isErr('sessionDate')}
        isValid={form.isValid('sessionDate')}
        options={sessionDateOptions}
        delay={(workforceFormInputs.length + 1) * 0.15}
        required
      />
      {form.showErrors() && form.hasErrors() && (
        <div className='form-error'>
          <AiOutlineInfoCircle /> <p>Please complete required fields</p>
        </div>
      )}
      <Button
        className={form.hasErrors() ? 'info disabled' : 'info'}
        color='yellow'
        style={{
          marginTop: '1rem',
          transition: 'background-color 250ms',
        }}
        disabled={isSubmitting}
      >
        Register!
      </Button>
    </Form>
  );
};

export default WorkforceForm;

const workforceFormInputs = [
  {
    Element: Input.Text,
    label: 'First Name',
    name: 'firstName',
    placeholder: 'Joe',
    required: true,
    autoCapitalize: true,
  },
  {
    Element: Input.Text,
    label: 'Last Name',
    name: 'lastName',
    placeholder: 'Smith',
    required: true,
    autoCapitalize: true,
  },
  {
    Element: Input.Email,
    label: 'Email',
    name: 'email',
    placeholder: 'joesmith@gmail.com',
    required: true,
  },
  {
    Element: Input.Phone,
    label: 'Phone Number',
    name: 'phone',
    placeholder: '303-123-9876',
    required: true,
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
