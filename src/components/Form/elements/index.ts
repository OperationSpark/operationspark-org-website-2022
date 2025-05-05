import dynamic from 'next/dynamic';

const aText = dynamic(() => import('./PlainTextInput'));
const aPhone = dynamic(() => import('./PhoneInput'));
const aDateInput = dynamic(() => import('./DateInput'));
const aEmail = dynamic(() => import('./EmailInput'));
const aSelect = dynamic(() => import('./Select'));
const aTextArea = dynamic(() => import('./TextArea'));
const aCheckbox = dynamic(() => import('./Checkbox'));
const aCheckboxGroup = dynamic(() => import('./CheckboxGroup'));
const aRadio = dynamic(() => import('./Radio'));
const aRadioGroup = dynamic(() => import('./RadioGroup'));
const aZipCode = dynamic(() => import('./ZipCode'));

export const Text = aText;
export const Phone = aPhone;
export const DateInput = aDateInput;
export const Email = aEmail;
export const Select = aSelect;
export const TextArea = aTextArea;
export const Checkbox = aCheckbox;
export const CheckboxGroup = aCheckboxGroup;
export const Radio = aRadio;
export const RadioGroup = aRadioGroup;
export const ZipCode = aZipCode;

const Input = {
  Text: aText,
  Phone: aPhone,
  DateInput: aDateInput,
  Email: aEmail,
  Select: aSelect,
  TextArea: aTextArea,
  Checkbox: aCheckbox,
  CheckboxGroup: aCheckboxGroup,
  Radio: aRadio,
  RadioGroup: aRadioGroup,
  ZipCode: aZipCode,
};

export default Input;
