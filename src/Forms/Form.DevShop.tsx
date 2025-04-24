import { FC, useState } from 'react';

import { Form } from '@this/components/Form';
import styled from 'styled-components';
import { TextArea } from '../components/Form/elements';
import EmailInput from '../components/Form/elements/EmailInput';
import TextInput from '../components/Form/elements/Input';

type DevShopFormKeys = 'name' | 'company' | 'email' | 'description';

type DevShopFormInputs = {
  name: string;
  company: string;
  email: string;
  description: string;
};

const defaultFormInputs: DevShopFormInputs = {
  name: '',
  company: '',
  email: '',
  description: '',
};

type DevShopFormField = {
  name: string;
  label: string;
  errMessage: string;
  required?: boolean;
};

const formFields: Record<keyof DevShopFormInputs, DevShopFormField> = {
  name: {
    name: 'name',
    label: 'Name',
    errMessage: 'Please enter your name',
    required: true,
  },
  company: {
    name: 'company',
    label: 'Company',
    errMessage: 'Please enter your company name',
    required: true,
  },
  email: {
    name: 'email',
    label: 'Email',
    errMessage: 'Please enter a valid email address',
    required: true,
  },
  description: {
    name: 'description',
    label: 'Project Description',
    errMessage: 'Please enter a description of your project',
    required: true,
  },
};

type DevShopFormProps = {
  onCancel?: () => void;
  onSuccess?: (form: DevShopFormInputs) => void;
};
const DevShopForm: FC<DevShopFormProps> = ({ onCancel, onSuccess }) => {
  const [form, setForm] = useState<DevShopFormInputs>(defaultFormInputs);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<DevShopFormKeys, string>>>({});

  // TODO: Implement form validation
  // const validateForm = (formValues: DevShopFormInputs = form) => {};

  const handleSubmit = async () => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    onSuccess?.(form);
    setForm(defaultFormInputs);
    setFormErrors({});
  };

  return (
    <DevShopFormStyles onSubmit={handleSubmit}>
      <h3 className='dynamic-h3 fw-900 orm-title text-center w-100'>Contact Our Dev Shop</h3>
      <hr className='w-100' />
      <TextInput
        {...formFields.name}
        value={form.name}
        onChange={(name) => setForm({ ...form, name })}
      />
      <TextInput
        {...formFields.company}
        value={form.company}
        onChange={(company) => setForm({ ...form, company })}
      />

      <EmailInput
        {...formFields.email}
        value={form.email}
        onChange={(email) => setForm({ ...form, email })}
      />

      <TextArea
        {...formFields.description}
        value={form.description}
        onChange={(description) => setForm({ ...form, description })}
        minHeight='100px'
        autosize
      />

      <div className='form-footer'>
        {onCancel && (
          <button className='btn btn-default' disabled={isSubmitting} onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className='btn btn-secondary' disabled={isSubmitting} onClick={handleSubmit}>
          Get in touch!
        </button>
      </div>
    </DevShopFormStyles>
  );
};

export default DevShopForm;

const DevShopFormStyles = styled(Form)`
  margin-bottom: 3.5rem;

  .form-footer {
    height: 3.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: ${({ theme }) => theme.bg};
  }
`;
