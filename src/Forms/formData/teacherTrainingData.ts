import { TeacherTrainingFormField } from '@this/data/types/teacherTraining';
import EmailInput from '@this/src/components/Form/elements/EmailInput';
import TextInput from '@this/src/components/Form/elements/Input';

const inputTypes = {
  text: TextInput,
  email: EmailInput,
};

export type TeacherTrainingFormTextField = {
  type: 'text';
  InputElement: typeof TextInput;
};
export type TeacherTrainingFormEmailField = {
  type: 'email';
  InputElement: typeof EmailInput;
};

export type TeacherTrainingFormInputField = TeacherTrainingFormField &
  (TeacherTrainingFormTextField | TeacherTrainingFormEmailField);

export const buildInputFields = (
  fields: TeacherTrainingFormField[],
): TeacherTrainingFormInputField[] => {
  return fields.map((field) => {
    const InputElement = inputTypes[field.type];
    return {
      ...field,
      InputElement,
    };
  });
};

export type StepSectionForm = {
  type: 'form';
  nextStep: number;
  previousStep: number | null;
  step: number;
  key: string;
  name: string;
  navTitle: string;
  fields: string[];
  dependsOn?: { [key: string]: boolean };
};

export type StepSectionQuestion = {
  type: 'question';
  step: number;
  previousStep: number;
  forStep: number;
  name: string;
  key: string;
  /** `{ [fieldFromThiSection]: fieldFromTargetSection }` */
  fieldMapList: {
    /** Concat values from these fields */
    fromFields: string[];
    /** Update form at this field with the "fromFields" above */
    toField: string;
  }[];

  options: {
    label: string;
    value: boolean;
    nextStep: number;
  }[];
};

export type ReviewSection = {
  type: 'review';
  step: number;
  name: string;
  key: string;
  fields: {
    step: number;
    label: string;
    name: string;
    altNames?: string[];
  }[];
};

export type SectionKey =
  | 'teacherInfo'
  | 'isSelf'
  | 'completerInfo'
  | 'isPayee'
  | 'billingInfo'
  | 'acknowledgements'
  | 'review';

export type StepSection = StepSectionForm | StepSectionQuestion | ReviewSection;

export const stepSections: Record<SectionKey, StepSection> = {
  teacherInfo: {
    step: 1,
    nextStep: 2,
    previousStep: null,
    type: 'form',
    key: 'teacherInfo',
    name: 'Teacher Information',
    navTitle: 'Teacher Info',
    fields: ['email', 'firstName', 'lastName', 'position', 'district', 'schools'],
  },
  isSelf: {
    step: 2,
    previousStep: 1,
    forStep: 3,
    type: 'question',
    key: 'isSelf',
    name: 'Is this for yourself or someone else?',
    fieldMapList: [
      {
        fromFields: ['firstName'],
        toField: 'proxyFirstName',
      },
      {
        fromFields: ['lastName'],
        toField: 'proxyLastName',
      },
      {
        fromFields: ['position'],
        toField: 'proxyPosition',
      },
      {
        fromFields: ['email'],
        toField: 'proxyEmail',
      },
    ],
    options: [
      {
        label: 'Someone else',
        value: false,
        nextStep: 3,
      },
      {
        label: 'Myself',
        value: true,
        nextStep: 4,
      },
    ],
  },
  completerInfo: {
    step: 3,
    previousStep: 2,
    nextStep: 4,
    dependsOn: { isSelf: false },
    type: 'form',
    key: 'completerInfo',
    name: 'Completer Information',
    navTitle: 'Completer Info',
    fields: ['proxyFirstName', 'proxyLastName', 'proxyPosition', 'proxyEmail'],
  },
  isPayee: {
    step: 4,
    previousStep: 3,
    forStep: 5,
    type: 'question',
    key: 'isPayee',
    name: 'Are you paying for the course or is someone else?',
    fieldMapList: [
      {
        fromFields: ['firstName', 'lastName'],
        toField: 'billingName',
      },
      {
        fromFields: ['email'],
        toField: 'billingEmail',
      },
    ],
    options: [
      {
        label: 'Someone Else',
        value: false,
        nextStep: 5,
      },
      {
        label: 'I am paying',
        value: true,
        nextStep: 6,
      },
    ],
  },

  billingInfo: {
    step: 5,
    previousStep: 4,
    nextStep: 6,
    dependsOn: { isPayee: false },
    type: 'form',
    key: 'billingInfo',
    name: 'Billing Contact Information',
    navTitle: 'Billing Info',
    fields: ['billingName', 'billingEmail'],
  },
  acknowledgements: {
    step: 6,
    previousStep: 5,
    nextStep: 7,
    type: 'form',
    key: 'acknowledgements',
    name: 'Acknowledgements',
    navTitle: 'Acknowledgements',
    fields: ['confirmRead', 'confirmAvailable', 'confirmResources'],
  },

  review: {
    step: 7,
    type: 'review',
    key: 'review',
    name: 'Review your information',
    fields: [
      {
        step: 1,
        name: 'firstName',
        label: 'First Name',
      },
      {
        step: 1,
        name: 'lastName',
        label: 'Last Name',
      },
      {
        step: 1,
        label: 'Teacher Email',
        name: 'email',
      },
      {
        step: 1,
        label: 'Position',
        name: 'position',
      },
      {
        step: 1,
        label: 'District',
        name: 'district',
      },
      {
        step: 1,
        label: 'Schools',
        name: 'schools',
      },
      {
        step: 2,
        label: 'Proxy First Name',
        name: 'proxyFirstName',
      },
      {
        step: 2,
        label: 'Proxy Last Name',
        name: 'proxyLastName',
      },
      {
        step: 2,
        label: 'Proxy Position',
        name: 'proxyPosition',
      },
      {
        step: 2,
        label: 'Proxy Email',
        name: 'proxyEmail',
      },
      {
        step: 3,
        label: 'Billing Name',
        name: 'billingName',
        altNames: ['firstName', 'lastName'],
      },
      {
        step: 3,
        label: 'Billing Email',
        name: 'billingEmail',
        altNames: ['email'],
      },
    ],
  },
} as const;
