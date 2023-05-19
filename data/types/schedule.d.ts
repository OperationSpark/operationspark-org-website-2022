export type ISessionRow = {
  _id?: string;

  /** Session/Cohort in format `'PHASE-YYYY-MM-DD-HHmm'` ex. `'pr-2022-09-26-1300'` */
  cohortId: string;

  /** Junior, Prep, etc */
  phase: string;

  /** imj, pr, etc */
  abbr: string;

  /** Alfa, Bravo, ...Zulu */
  cohort: string;

  /** A, B, ...Z */
  cohortLetter: string;

  /** A, B, or C */
  iteration?: string;

  /** America/Chicago */
  timezone: string;

  /** Session start date/time */
  startDate: Date;

  /** Session end date/time */
  endDate: Date;

  /** Session orientation date/time */
  orientationDate: Date;

  /** Session enrollment deadline date/time */
  enrollmentDeadlineDate: Date;

  /** Designated color for cohort badge */
  color: string;

  /** Is the session archived */
  isArchived: boolean;

  /** Is the session hidden on website */
  isHidden: boolean;

  /** Next upcoming session */
  isNext: boolean;

  /** Current (next active) session */
  isCurrent: boolean;

  /** Is the session archived */
  isArchived: boolean;

  /** Is the session hidden on website */
  isHidden: boolean;

  /** Is there an orientation */
  isOrientation: boolean;

  /** Is there an enrollment deadline */
  isEnrollmentDeadline: boolean;

  /** Does a holiday occur during the session */
  isBreak: boolean;
};

export type ICourseInfo = {
  id: string;
  title: string;
  isImmersion: boolean;
  length: string;
  days: string[];
  hours: string[];
  cost: string;
  preReqs: string;
};

export type CourseSessions = {
  sessions: ISessionRow[];
} & ICourseInfo;

export type CourseSession = {
  session: ISessionRow | null;
} & ICourseInfo;
