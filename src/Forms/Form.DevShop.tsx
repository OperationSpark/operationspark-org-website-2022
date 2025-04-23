import { FC, useState } from 'react';

import { Form } from '@this/components/Form';
import styled from 'styled-components';
import { Select, TextArea } from '../components/Form/elements';
import DateInput from '../components/Form/elements/DateInput';
import EmailInput from '../components/Form/elements/EmailInput';
import TextInput from '../components/Form/elements/Input';
import NumberInput from '../components/Form/elements/NumberInput';
import { capFirstLetter } from '../components/Form/helpers';

type DevShopFormKeys =
  | 'name'
  | 'company'
  | 'email'
  | 'description'
  | 'appType'
  | 'newApp'
  | 'budget'
  | 'startBy';

type DevShopFormInputs = {
  name: string;
  company: string;
  email: string;
  description: string;
  appType: '' | 'mobile' | 'web' | 'other';
  appTypeOther: string;
  newApp: string;
  budget: string;
  startBy: string;
};

const defaultFormInputs: DevShopFormInputs = {
  name: '',
  company: '',
  email: '',
  description: '',
  appType: '',
  appTypeOther: '',
  newApp: '',
  budget: '',
  startBy: '',
};

type DevShopFormField = {
  name: string;
  label: string;
  errMessage: string;
  required?: boolean;
  dependsOn?: {
    field: string;
    value: string;
  };
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
  appType: {
    name: 'appType',
    label: 'App Type',
    errMessage: 'Please select an app type',
    required: true,
  },
  appTypeOther: {
    name: 'appTypeOther',
    label: 'What is the app type?',
    errMessage: 'Please enter the app type',
    required: true,
    dependsOn: {
      field: 'appType',
      value: 'other',
    },
  },
  newApp: {
    name: 'newApp',
    label: 'New or Existing App',
    errMessage: 'Is this a new or existing application',
    required: true,
  },
  budget: {
    name: 'budget',
    label: 'Budget',
    errMessage: 'Budget is required',
  },
  startBy: {
    name: 'startBy',
    label: 'Start By',
    errMessage: 'Start date is required',
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

      <hr />

      <Select
        {...formFields.appType}
        animate={false}
        options={[
          { name: 'Mobile', value: 'mobile' },
          { name: 'Web', value: 'web' },
          { name: 'Other', value: 'other' },
        ]}
        option={{ name: capFirstLetter(form.appType), value: form.appType }}
        onChange={(appType) =>
          setForm({ ...form, appType: appType.option?.value as DevShopFormInputs['appType'] })
        }
        isErr={!!formErrors.appType}
        isValid={!!form.appType}
      />

      {form.appType === 'other' && (
        <TextInput
          {...formFields.appTypeOther}
          value={form.appTypeOther}
          onChange={(newApp) => setForm({ ...form, newApp })}
        />
      )}

      <TextArea
        {...formFields.description}
        value={form.description}
        onChange={(description) => setForm({ ...form, description })}
        minHeight='100px'
        autosize
      />

      <Select
        {...formFields.newApp}
        animate={false}
        options={[
          { name: 'New', value: 'new' },
          { name: 'Existing', value: 'existing' },
        ]}
        option={{ name: capFirstLetter(form.newApp), value: form.newApp }}
        onChange={(newApp) =>
          setForm({ ...form, newApp: newApp.option?.value as DevShopFormInputs['newApp'] })
        }
        isErr={!!formErrors.newApp}
        isValid={!!form.newApp}
      />

      <NumberInput
        {...formFields.budget}
        value={form.budget}
        onChange={(budget) => setForm({ ...form, budget })}
        placeholder='Budget'
        min={5000}
        step={100}
      />

      <DateInput
        {...formFields.startBy}
        value={form.startBy}
        onChange={(startBy) => setForm({ ...form, startBy })}
        placeholder='Start By'
      />

      <hr />

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
