import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { Form, Input, useForm } from '@this/components/Form';
import Button from '@this/components/Elements/Button';

const ShowcaseForm = () => {
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasErrors = form.hasErrors();
  const handleSubmit = () => {
    if (hasErrors) {
      return form.toggleShowErrors();
    }

    const values = {
      newsletter: false,
      ...form.values(),
    };

    console.log(values);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      form.notifySuccess();
      form.clear();
    }, 1000);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showcaseFormInputs.map((field, i) => (
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
        label='What brings you here?'
        name='referencedBy'
        options={referencedByOptions}
        option={form.getSelect('referencedBy')}
        isErr={form.isErr('referencedBy')}
        isValid={form.isValid('referencedBy')}
        onChange={form.onSelectChange('referencedBy')}
        delay={showcaseFormInputs.length * 0.15}
        required
      />
      <Input.Checkbox
        name='newsletter'
        label='Sign up for newsletter'
        checked={form.getCheckbox('newsletter')}
        onChange={form.onCheckboxChange('newsletter')}
      />
      {form.showErrors() && form.hasErrors() && (
        <div className='form-error'>
          <AiOutlineInfoCircle /> <p>Please complete required fields</p>
        </div>
      )}
      <Button
        className={form.hasErrors() ? 'info disabled' : 'info'}
        color='yellow'
        style={{ marginTop: '2rem' }}
        disabled={isSubmitting}
      >
        Register!
      </Button>
    </Form>
  );
};

export default ShowcaseForm;

const showcaseFormInputs = [
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
];

const referencedByOptions = [
  {
    value: 'relation',
    name: 'Friend/Relative',
    additionalInfo: 'Who are you here to see?',
  },
  {
    value: 'company',
    name: 'Company',
    additionalInfo: 'Which company?',
  },
  {
    value: 'other',
    name: 'Other',
    additionalInfo: 'What brings you here?',
  },
];
