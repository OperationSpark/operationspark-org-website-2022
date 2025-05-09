import { useState } from 'react';

import { TOption } from '@this/data/types/bits';
import { toast } from 'react-toastify';

type IValues<Values, T extends keyof Values> = Record<T, string>;
type ISelectValues = Record<string, TOption>;
type TCheckboxes = Record<string, boolean>;
type TCheckboxGroup = Record<string, TCheckboxes>;
type TForm<T> = Record<keyof T, T[keyof T]>;
type TValidation<T> = Partial<Record<keyof T, boolean>>;

type INotify = {
  title?: string;
  msg?: string;
};

type OnSelectChangeProps = {
  option?: TOption;
  additionalInfo?: string;
  additionalInfoLabel?: string;
  isValid: boolean;
};

type UseFormOptions<T> = {
  fieldOrder?: (keyof T)[];
};

const useForm = <T extends TForm<T> = {}>(options: UseFormOptions<T> = {}) => {
  const [values, setValues] = useState<IValues<T, keyof T>>({} as T);
  const [selectValues, setSelectValues] = useState<ISelectValues>({});
  const [checkboxGroupValues, setCheckboxGroupValues] = useState<TCheckboxGroup>({} as T);
  const [checkboxValues, setCheckboxValues] = useState<TCheckboxes>({} as T);
  const [validation, setValidation] = useState<TValidation<T>>({});
  const [showErrors, setShowErrors] = useState<boolean>(false);

  return {
    /** Fetches value for provided property (key) */
    get: (name: string): string => values[name as keyof T] || '',

    /** Fetches values for provided `select` property (key) */
    getSelect: (name: string): TOption => selectValues[name] ?? { value: '', name: '' },

    /** Fetches values for provided `checkboxes` property (key) */
    getCheckboxes: (name: string): TCheckboxes => checkboxGroupValues[name] || {},

    /** Fetches values for provided `checkbox` property (key) */
    getCheckbox: (name: string): boolean => checkboxValues[name] || false,

    /** Set value for provided input property */
    set: (name: string, value: string) => setValues({ ...values, [name]: value }),
    setFields: (updateValues: Partial<T>) => {
      setValues({ ...values, ...updateValues });

      // Remove fields from validation
      const updatedValidation = { ...validation };
      Object.keys(updateValues).forEach((key) => {
        delete updatedValidation[key as keyof T];
      });
      setValidation(updatedValidation);
    },

    /** Check if given property is valid */
    isValid: (name: string) => {
      if (!validation.hasOwnProperty(name)) {
        setValidation({ ...validation, [name]: false });
      }
      return validation[name as keyof T] || false;
    },
    /** Check if error exists in form
     * - Only works if `toggleShowErrors()` has been invoked)
     */
    isErr: (name: string) => {
      return showErrors && !validation[name as keyof T];
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
        option &&
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

    /** Get all keys from form as object */
    keys: (): (keyof T)[] => {
      return [
        ...Object.keys(values),
        ...Object.keys(selectValues),
        ...Object.keys(checkboxGroupValues),
        ...Object.keys(checkboxValues),
      ] as (keyof T)[];
    },

    /** Get all values from form as object */
    values: (): T =>
      ({
        ...values,
        ...selectValues,
        ...checkboxGroupValues,
        ...checkboxValues,
      }) as T,

    nextInvalidKey: (): keyof T | null => {
      const order = options.fieldOrder ?? (Object.keys(validation) as (keyof T)[]);
      const invalidKey = order.find((key) => !validation[key]);
      return (invalidKey as keyof T) ?? null;
    },

    /** Trigger success toast notification */
    notifySuccess: ({ title, msg }: INotify = {}) => {
      const message = `
        ${title ?? 'Success!'}
        ${msg ?? 'Form successfully submitted'}
      `;
      toast.success(message);
    },

    /** Trigger error toast notification */
    notifyError: ({ title, msg }: INotify = {}) => {
      const message = `
        ${title ?? 'Error!'}
        ${msg ?? 'An error occurred while submitting this form'}
      `;
      return toast.error(message);
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
      setCheckboxValues({} as T);
      setCheckboxGroupValues({} as T);
      setValidation({});
      setShowErrors(false);

      const clearedSelectValues = Object.keys(selectValues).reduce((acc, key) => {
        acc[key] = { value: '', name: '' };
        return acc;
      }, {} as ISelectValues);
      setSelectValues(clearedSelectValues);
    },
  };
};

export default useForm;
