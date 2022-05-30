export interface ICourses {
  title: string;
  length: string;
  nextStartDate: string;
  description: string[];
}

export interface IHighschoolPrograms {
  interestOnly: boolean;
  description: string[];
  courses: {
    id: string;
    title: string[];
    description: string[];
    preReq: string;
    ibc: string;
  }[];

  schools: {
    orleans: {
      name: string;
      imageUrl: string;
    }[];
    other: {
      name: string;
      imageUrl: string;
    }[];
  };
}
export interface IPrograms {
  adult: IAdultPrograms;
  highschool: IHighschoolPrograms;
}
