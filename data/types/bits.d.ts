export interface ICompanyLogo {
  name: string;
  url: string;
  logoLight: string;
  logoDark: string;
  width: number;
}

export interface ITitleDescription {
  title: string[];
  description: string[];
}

export type TTextField = {
  name: string;
  label: string;
  type: string;
  value: string;
  isErr: boolean;
};
export type TOption = {
  name: string;
  value: string;
  additionalInfo?: string;
  additionalInfoLabel?: string;
};
export type TSelectField = {
  label: string;
  options: TOption[];
};

export type SelectItem = {
  additionalInfo: string;
  value: string;
};

export interface IAlert {
  message?: string;
  url?: string;
  start?: string;
  end?: string;
}

export interface IMeta {
  title?: string;
  description?: string;
  imageUrl?: string;
  favicon?: string;
}

export interface IQuote {
  body: string;
  name: string;
  role: string;
  imageUrl?: string;
  logoHref?: string;
  logoSrcLight?: string;
  logoSrcDark?: string;
}

export interface IQuotes {
  company: IQuote;
  alumni: IQuote;
}
