import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import isEmail from 'validator/lib/isEmail';

import { Form } from '@this/components/Form';
import { DevShopFormInputs } from '@this/data/types/devShop';
import axios from 'axios';
import Spinner from '../components/Elements/Spinner';
import { TextArea } from '../components/Form/elements';
import EmailInput from '../components/Form/elements/EmailInput';
import TextInput from '../components/Form/elements/Input';

type DevShopFormKeys = 'name' | 'company' | 'email' | 'description';

const defaultFormInputs: DevShopFormInputs = {
  name: '',
  email: '',
  company: '',
  description: '',
};

type DevShopFormField = {
  name: string;
  label: string;
  errMessage?: string;
  required: boolean;
};

const formFields: Record<keyof DevShopFormInputs, DevShopFormField> = {
  name: {
    name: 'fullName',
    label: 'Name',
    errMessage: 'Please enter your name',
    required: true,
  },
  email: {
    name: 'email',
    label: 'Email',
    errMessage: 'Please enter a valid email address',
    required: true,
  },
  company: {
    name: 'company',
    label: 'Company',
    required: false,
  },
  description: {
    name: 'description',
    label: 'Project Description',
    errMessage: 'Please enter a description of your project',
    required: true,
  },
};

type FormErrorState = Partial<Record<DevShopFormKeys, string>>;

type DevShopFormProps = {
  onCancel?: () => void;
  onSuccess?: (form: DevShopFormInputs) => void;
};

const DevShopForm: FC<DevShopFormProps> = ({ onCancel, onSuccess }) => {
  const [form, setForm] = useState<DevShopFormInputs>(defaultFormInputs);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrorState>(
    Object.keys(formFields).reduce((acc, key) => {
      const field = formFields[key as keyof DevShopFormInputs];
      if (!field.required) {
        return acc;
      }
      acc[key as keyof DevShopFormInputs] = field.errMessage;
      return acc;
    }, {} as FormErrorState),
  );
  const [showFormErrors, setShowFormErrors] = useState<boolean>(false);

  /**
   * @returns array of missing field names if true. null if all fields are valid
   */
  const validateForm = (formValues: DevShopFormInputs = form) => {
    const errors: FormErrorState = {};
    Object.keys(formFields).forEach((k) => {
      const key = k as keyof DevShopFormInputs;
      const field = formFields[key];
      if (!field.required) {
        return;
      }

      const val = (formValues[key] || '').trim();
      if (!val) {
        errors[key] = field.errMessage;
      }

      if (field.name === 'email' && !isEmail(val)) {
        errors[key] = field.errMessage;
        return;
      }
    });

    setFormErrors(errors);
    const errs = Object.keys(errors);
    return errs.length ? errs : null;
  };

  const isFieldError = (fieldName: keyof DevShopFormInputs) => {
    if (!showFormErrors) {
      return false;
    }
    return !!formErrors[fieldName];
  };
  const isFieldValid = (fieldName: keyof DevShopFormInputs) => {
    return !formErrors[fieldName];
  };

  const fieldErrMessage = (fieldName: keyof DevShopFormInputs) => {
    if (!showFormErrors || !formErrors[fieldName]) {
      return;
    }
    return formErrors[fieldName];
  };

  const handleChange = (fieldName: keyof DevShopFormInputs) => {
    return (value: string, isValid: boolean) => {
      if (isSubmitting) {
        return;
      }
      const newForm = { ...form, [fieldName]: value };

      setForm(newForm);
      validateForm(newForm);

      if (fieldName === 'email' && !isValid) {
        return;
      }
    };
  };

  const handleSubmit = async () => {
    const missingFields = validateForm();
    if (missingFields) {
      setShowFormErrors(true);

      toast.error(
        <ToastErr>
          Missing required fields:
          <br />
          {missingFields.map((v, i) => (
            <span key={v}>
              <code>{v}</code>
              {i < missingFields.length - 1 ? ', ' : ''}
            </span>
          ))}
        </ToastErr>,
        {
          toastId: 'dev-shop-form-error',
        },
      );
      return;
    }

    setShowFormErrors(false);
    setIsSubmitting(true);
    setFormErrors({});

    try {
      await axios.post('/api/contact/devShop', form);
      onSuccess?.(form);
      setForm(defaultFormInputs);
      toast.success('Thank you for your message! We will get back to you soon.');
    } catch (err) {
      console.error('Error submitting form', err);
      toast.error('There was an error submitting the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DevShopFormStyles
      onSubmit={handleSubmit}
      onEnter={(e) => {
        const target = e.target as HTMLInputElement;
        const isInput = target.tagName === 'INPUT';
        if (isInput) {
          e.preventDefault();
        }
      }}
    >
      {isSubmitting && (
        <div className='spinner-wrapper'>
          <Spinner text='Sending Message' />
        </div>
      )}

      <h3 className='dynamic-h3 fw-900 orm-title text-center w-100'>Contact Our Dev Shop</h3>
      <hr className='w-100' />
      <TextInput
        {...formFields.name}
        isErr={isFieldError('name')}
        isValid={isFieldValid('name')}
        value={form.name}
        onChange={handleChange('name')}
      />

      <FormErrorMessage message={fieldErrMessage('name')} />

      <EmailInput
        {...formFields.email}
        isErr={isFieldError('email')}
        isValid={isFieldValid('email')}
        value={form.email}
        onChange={handleChange('email')}
      />

      <FormErrorMessage message={fieldErrMessage('email')} />

      <TextInput
        {...formFields.company}
        isErr={isFieldError('company')}
        isValid={!!form.company}
        value={form.company}
        onChange={handleChange('company')}
      />

      <FormErrorMessage message={fieldErrMessage('company')} />

      <TextArea
        {...formFields.description}
        isErr={isFieldError('description')}
        isValid={isFieldValid('description')}
        value={form.description}
        onChange={handleChange('description')}
        minHeight='100px'
        autosize
      />

      <FormErrorMessage message={fieldErrMessage('description')} />

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
  height: 100%;
  margin-bottom: 3.5rem;
  user-select: none;
  .spinner-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.rgb('bg', 0.5)};
    z-index: 1000;
    backdrop-filter: blur(0.1rem);
  }

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

const ToastErr = styled.div`
  code {
    color: ${({ theme }) => theme.rgb('red')};
    font-weight: 700;
    box-shadow: 0 0 0 1px inset ${({ theme }) => theme.rgb('red', 0.25)};
    padding: 0 0.25rem;
    background: ${({ theme }) => theme.rgb('red', 0.1)};
    border-radius: 0.25rem;
    line-height: 1;
  }
`;

const FormErrorMessage = ({ message }: { message?: string }) => {
  if (!message) {
    return null;
  }

  return (
    <FormErrorMessageStyles>
      <span className='error-message'>{message}</span>
    </FormErrorMessageStyles>
  );
};
const FormErrorMessageStyles = styled.div`
  margin-bottom: 1rem;
  margin-top: -0.5rem;

  .error-message {
    color: ${({ theme }) => theme.rgb('red')};
    border-left: 2px solid ${({ theme }) => theme.rgb('red', 0.5)};
    padding-left: 0.5rem;
    margin-left: 0.5rem;
    font-size: 0.8rem;
  }
`;
