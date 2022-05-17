import { TTextField, TSelectField, SelectItem } from './bits';

export type CommonQuestions = {
  question: string[];
  answer: string[];
};

export interface IInfoSession {
  commonQuestions: CommonQuestions[];
  infoSessionForm: {
    textFields: {
      [key: string]: TTextField;
    } & Record<
      keyof Pick<
        IInfoSessionForm<'firstName' | 'lastName' | 'email' | 'phone'>
      >,
      TTextField
    >;
    selectFields: {
      [key: string]: TSelectField;
    } & Record<
      keyof Pick<IInfoSessionForm<'referencedBy' | 'sessionDate'>, TSelectField>
    >;
  };
}

export interface IInfoSessionFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  referencedBy: SelectItem;
  sessionDate: SelectItem;
}
