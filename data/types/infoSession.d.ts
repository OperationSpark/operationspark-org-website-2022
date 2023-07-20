import { TTextField, TSelectField, SelectItem } from './bits';

export type CommonQuestions = {
  question: string[];
  answer: string[];
};

type AttendingLocation = 'IN_PERSON' | 'VIRTUAL';

export interface IInfoSession {
  commonQuestions: CommonQuestions[];
  infoSessionForm: {
    textFields: {
      [key: string]: TTextField;
    } & Record<
      keyof Pick<IInfoSessionForm<'firstName' | 'lastName' | 'email' | 'phone'>>,
      TTextField
    >;
    selectFields: {
      [key: string]: TSelectField;
    } & Record<keyof Pick<IInfoSessionForm<'referencedBy' | 'sessionDate'>, TSelectField>>;
  };
}

export interface IInfoSessionFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  referencedBy: SelectItem;
  sessionDate: SelectItem;
  userLocation: SelectItem;
  zipCode: string;
  attendingLocation: AttendingLocation;
  smsOptIn: 'true' | 'false';
}
