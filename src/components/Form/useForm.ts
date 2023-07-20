import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { TOption } from '@this/data/types/bits';

type IValues<Values, T extends keyof Values> = Record<T, string>;
type ISelectValues = Record<string, TOption>;
type TCheckboxes = Record<string, boolean>;
type TCheckboxGroup = Record<string, TCheckboxes>;
type IValidation = Record<string, boolean>;

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

const useForm = <T extends Record<keyof T, T[keyof T]> = {}>() => {
  const toast = useToast();
  const [values, setValues] = useState<IValues<T, keyof T>>({} as T);
  const [selectValues, setSelectValues] = useState<ISelectValues>({});
  const [checkboxGroupValues, setCheckboxGroupValues] = useState<TCheckboxGroup>({} as T);
  const [checkboxValues, setCheckboxValues] = useState<TCheckboxes>({} as T);
  const [validation, setValidation] = useState<IValidation>({});
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
