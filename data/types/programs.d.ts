export interface ICourses {
  title: string;
  length: string;
  description: string[];
  cost?: string;
  days?: string[];
  hours?: string[];
  preReqs?: string;
  nextStartDate?: string;
  infoMessage?: string;
}

export interface IHighschoolPrograms {
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
