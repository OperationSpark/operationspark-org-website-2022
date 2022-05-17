export interface IAbout {
  mission: {
    description: string[];
    sections: {
      title: string[];
      description: string[];
    }[];
  };
  history: string[];
  team: {
    staff: {
      name: string;
      role: string;
      image: string;
      contact?: {
        email: string;
        phone: string;
      };
      about: string[];
    }[];
    directors: {
      name: string;
      role: string;
    }[];
  };
  awards: {
    title: string;
    url: string;
  }[];
}
