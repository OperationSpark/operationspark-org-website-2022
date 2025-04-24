export type DevShopType = {
  title: string;
  subtitle: string;
  about: string;
  skills: {
    title: string;
    sections: {
      header: string;
      text: string;
      grid?: string[];
    }[];
  };
  contractToHire: {
    title: string;
    subtitle: string;
    sections: {
      header: string;
      text?: string;
      tagline?: string;
      grid?: string[];
      list?: string[];
    }[];
  };
};

export type DevShopFormInputs = {
  name: string;
  company: string;
  email: string;
  description: string;
};
