export type ISessionRow = {
  course: string;
  cohort: string;
  year: number;
  start: Date;
  end: Date;
  char: string;
  isCurrent: boolean;
  isNext: boolean;
  isPast: boolean;
  order: number;
  bg: string;
  fg: string;
};

export type ICourseInfo = {
  title: string;
  length: string;
  days: string[];
  hours: string[];
  cost: string;
  preReqs: string;
};
