export type TeacherTrainingInfo = {
  level: string;
  levelName: string;
  title: string;
  subtitle: string;
  season: string;
  summary: string;
  format: {
    type: 'Online' | 'In-Person' | 'Hybrid';
    description: string;
  };
  times: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    examDay: string;
    days: string;
  };
  cost: {
    amount: string;
    /** per: "Person" | per: "Group"  */
    per: string;
    includeTesting: boolean;
  };

  prerequisites: string;
  outcomes: {
    title?: string;
    availabilityScore?: string;
    description: string[];
  }[];

  nda: {
    title: string;
    subtitle: string;
    description: string;
  };

  registration: {
    priorityDate: string;
    deadline: string;
    refundDeadline: string;
  };
};

export type TeacherTrainingFormField = {
  label: string;
  type: 'text' | 'email';
  options?: string[];
  required: boolean;
};

export type TeacherTraining = {
  partners: string[];
  info: {
    [level: string]: TeacherTrainingInfo;
  };
  registrationFields: {
    participant: TeacherTrainingFormField[];
    completer: TeacherTrainingFormField[];
    billing: TeacherTrainingFormField[];
  };
};
