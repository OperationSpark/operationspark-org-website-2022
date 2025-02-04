export type TeacherTrainingInfo = {
  level: string;
  title: string;
  summary: string;
  format: string;
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
    description: string;
  };

  registration: {
    priorityDate: string;
    deadline: string;
    refundDeadline: string;
  };
};

export type TeacherTraining = {
  partners: string[];
  info: {
    [level: string]: TeacherTrainingInfo;
  };
};
