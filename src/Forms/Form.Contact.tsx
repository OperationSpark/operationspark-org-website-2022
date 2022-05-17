import { useState } from 'react';
import axios from 'axios';

import { Form, Input, useForm } from '@this/components/Form';
import Button from '@this/components/Elements/Button';
import { TwoColumns } from '@this/components/Elements/Columns';

const ContactForm = () => {
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const hasErrors = form.hasErrors();
    if (hasErrors) {
      return form.toggleShowErrors();
    }

    setIsSubmitting(true);

    try {
      await axios.post('/api/contact', form.values());
      form.notifySuccess({
        title: 'Thank you!',
        msg: 'We have received your message and will get back to you soon!',
      });
      form.clear();
    } catch (err) {
      form.notifyError({
        title: 'An error occurred!',
        msg: "There was an error submitting your request. Shoot us an email at [support@operationspark.org] and we'll get back to you.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TwoColumns
        leftCol={
          <div style={{ width: '100%' }}>
            {contactFormInputs.map((field, i) => (
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
          </div>
        }
        rightCol={
          <div style={{ width: '100%', height: '100%' }}>
            <Input.TextArea
              label='Message'
              name='message'
              placeholder='...'
              required={true}
              validator={(val) => !!val}
              value={form.get('message')}
              onChange={form.onChange('message')}
              isValid={form.isValid('message')}
              isErr={form.isErr('message')}
            />
          </div>
        }
        leftColStyle={{ width: '40%' }}
        rightColStyle={{ width: '60%' }}
      />

      <Button
        className='info'
        color='yellow'
        style={{
          marginTop: '1rem',
          width: '300px',
          margin: '1rem auto',
        }}
        disabled={isSubmitting}
      >
        Send Message
      </Button>
    </Form>
  );
};

export default ContactForm;

const contactFormInputs = [
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
