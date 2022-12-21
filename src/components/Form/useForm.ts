import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { TOption } from '@this/data/types/bits';

type IValues<T> = {
  [Property in keyof T]: string;
};

type ISelectValues<T> = Record<keyof T, T[keyof T]>;

type TCheckboxes = {
  [key: string]: boolean;
};

type TCheckboxGroup = {
  [key: string]: TCheckboxes;
};

interface IValidation {
  [key: string]: boolean;
}

interface INotify {
  title?: string;
  msg?: string;
}

interface OnSelectChangeProps {
  option?: TOption;
  additionalInfo?: string;
  additionalInfoLabel?: string;
  isValid: boolean;
}

const useForm = <T extends Record<keyof T, T[keyof T]>>() => {
  const toast = useToast();
  const [values, setValues] = useState<IValues<T>>({} as T);
  // TODO: Fix this type error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectValues, setSelectValues] = useState<ISelectValues<any>>({} as T);
  const [checkboxGroupValues, setCheckboxGroupValues] = useState<TCheckboxGroup>({} as T);
  const [checkboxValues, setCheckboxValues] = useState<TCheckboxes>({} as T);
  const [validation, setValidation] = useState<IValidation>({});
  const [showErrors, setShowErrors] = useState<boolean>(false);

  return {
    /** Fetches value for provided property (key) */
    get: (name: string): string => values[name as keyof T] || '',

    /** Fetches values for provided `select` property (key) */
    getSelect: (name: string): TOption =>
      selectValues[name] || {
        value: '',
        name: '',
      },

    /** Fetches values for provided `checkboxes` property (key) */
    getCheckboxes: (name: string): TCheckboxes => checkboxGroupValues[name] || {},

    /** Fetches values for provided `checkbox` property (key) */
    getCheckbox: (name: string): boolean => checkboxValues[name] || false,

    /** Set value for provided input property */
    set: (name: string, value: string) => setValues({ ...values, [name]: value }),

    /** Check if given property is valid */
    isValid: (name: string) => {
      if (!validation.hasOwnProperty(name)) {
        setValidation({ ...validation, [name]: false });
      }
      return validation[name] || false;
    },
    /** Check if error exists in form
     * - Only works if `toggleShowErrors()` has been invoked)
     */
    isErr: (name: string) => {
      return showErrors && !validation[name];
    },

    /** Input field change handler */
    onChange: (name: string) => (value: string, isValid: boolean) => {
      setValues({ ...values, [name]: value });
      setValidation({ ...validation, [name]: isValid });
    },

    /** Select field change handler */
    onSelectChange:
      (name: string) =>
      ({ option, additionalInfo, additionalInfoLabel, isValid }: OnSelectChangeProps) => {
        setSelectValues({
          ...selectValues,
          [name]: { ...option, additionalInfo, additionalInfoLabel },
        });
        setValidation({ ...validation, [name]: isValid });
      },

    /** Checkbox change handler */
    onCheckboxChange: (field: string) => (value: boolean) => {
      setCheckboxValues({ ...checkboxValues, [field]: value });
    },
    /** Checkbox group change handler */
    onCheckboxGroupChange: (field: string) => (name: string, value: boolean) => {
      const checkboxesField = checkboxGroupValues[field] || {};
      const checkboxField: TCheckboxes = {
        ...checkboxesField,
        [name]: value,
      };
      if (!value) {
        delete checkboxField[name];
      }
      const isValid = Object.values(checkboxField).some((val) => !!val);
      setCheckboxGroupValues({
        ...checkboxGroupValues,
        [field]: { ...checkboxField },
      });
      setValidation({ ...validation, [field]: isValid });
    },

    /** Check if errors exist in form */
    hasErrors: () => {
      return Object.values(validation).some((value) => !value);
    },

    /** Enable errors on form */
    toggleShowErrors: (show = true) => setShowErrors(show),

    /** Get status of errors (Errors are shown or not) */
    showErrors: () => showErrors,

    /** Get all values from form as object */
    values: (): T =>
      ({
        ...values,
        ...selectValues,
        ...checkboxGroupValues,
        ...checkboxValues,
      } as T),

    /** Trigger success toast notification */
    notifySuccess: ({ title, msg }: INotify = {}) => {
      return toast({
        title: title ?? 'Success!',
        description: msg ?? 'Form successfully submitted',
        status: 'success',
      });
    },

    /** Trigger error toast notification */
    notifyError: ({ title, msg }: INotify = {}) => {
      return toast({
        title: title ?? 'Error!',
        description: msg ?? 'An error ocurred while submitting this form',
        status: 'error',
      });
    },

    /** Clear checkbox fields */
    clearCheckboxGroup: (field: string) => () => {
      const values = { ...checkboxGroupValues, [field]: {} };
      const validValues = { ...validation, [field]: false };

      setCheckboxGroupValues(values);
      setValidation(validValues);
    },

    /** Clear/reset form values */
    clear: () => {
      setValues({} as T);
      setSelectValues({} as T);
      setCheckboxValues({} as T);
      setCheckboxGroupValues({} as T);
      setValidation({});
      setShowErrors(false);
    },
  };
};

export default useForm;
