import Input from '@this/src/components/Form/elements';

export const highSchoolApplication = {
  studentInfo: [
    {
      Element: Input.Text,
      label: 'First Name (Student)',
      name: 'studentFirstName',
      placeholder: 'Joe',
      required: true,
      autoCapitalize: true,
    },
    {
      Element: Input.Text,
      label: 'Last Name (Student)',
      name: 'studentLastName',
      placeholder: 'Smith',
      required: true,
      autoCapitalize: true,
    },
    {
      Element: Input.Email,
      label: 'Email (Student)',
      name: 'studentEmail',
      placeholder: 'joesmith@gmail.com',
      required: true,
    },
    {
      Element: Input.Phone,
      label: 'Phone Number (Student)',
      name: 'studentPhone',
      placeholder: '303-123-9876',
      required: true,
    },
    {
      Element: Input.DateInput,
      label: 'Date of Birth (Student)',
      name: 'studentDOB',
      placeholder: 'MM/DD/YYYY',
      required: true,
    },
    {
      Element: Input.Text,
      label: 'What school do you currently attend?',
      name: 'schoolAttended',
      placeholder: 'High School',
      required: true,
      autoCapitalize: true,
    },
  ],
  guardianInfo: [
    {
      Element: Input.Text,
      label: 'First Name (Parent/Guardian)',
      name: 'guardianFirstName',
      placeholder: 'Joe',
      required: true,
      autoCapitalize: true,
    },
    {
      Element: Input.Text,
      label: 'Last Name (Parent/Guardian)',
      name: 'guardianLastName',
      placeholder: 'Smith',
      required: true,
      autoCapitalize: true,
    },
    {
      Element: Input.Email,
      label: 'Email (Parent/Guardian)',
      name: 'guardianEmail',
      placeholder: 'joesmith@gmail.com',
      required: true,
    },
    {
      Element: Input.Phone,
      label: 'Phone Number (Parent/Guardian)',
      name: 'guardianPhone',
      placeholder: '303-123-9876',
      required: true,
    },
  ],
};

export const genderOptions = [
  {
    value: 'male',
    name: 'Male',
  },
  {
    value: 'female',
    name: 'Female',
  },
  {
    value: 'no-response',
    name: 'Prefer not to respond',
  },
];

export const referencedByOptions = [
  {
    value: 'google',
    name: 'Google',
  },
  {
    value: 'facebook',
    name: 'Facebook',
  },
  {
    value: 'instagram',
    name: 'Instagram',
  },
  {
    value: 'flyer',
    name: 'Flyer',
  },
  {
    value: 'faculty',
    name: 'High School Faculty',
    additionalInfo: 'Name of reference',
  },
  {
    value: 'verbal',
    name: 'Word of mouth',
    additionalInfo: 'Who told you about us?',
  },
  {
    value: 'event',
    name: 'Community Event',
    additionalInfo: 'Which event?',
  },
  {
    value: 'organization',
    name: 'Community Organization',
    additionalInfo: 'Which organization?',
  },
];

export const courses = [
  {
    value: 'fundamentals',
    name: 'Fundamentals of HTML, CSS, and Javascript [Prerequisite: none]',
  },
  {
    value: 'advanced',
    name: 'Advanced Javascript, Functional Programming and Web Development [Prerequisite: Fundamentals]',
  },
  // {
  //   value: 'web-mobile',
  //   name: 'Professional Web and Mobile Development [Prerequisite: Level 1 and 2 IBC]',
  // },
  // {
  //   value: 'fundamentals-game',
  //   name: 'Fundamentals of Video Game Programming [Prerequisite: Level 1 and 2 IBC]',
  // },
  // {
  //   value: 'iot',
  //   name: 'Internet of Things [Prerequisite: Level 1 and 2 IBC]',
  // },
];
export const courseTimes = {
  notes: {
    fundamentals: 'This is your first class with Op Spark',
    advanced: 'This is your second class with Op Spark, and you earned the level 1 credential',
  },
  fundamentals: [
    {
      course: 'fundamentals',
      value: 'fundamentals-onsite-m-f-9-12',
      location: 'In Person',
      preReq: 'No Prerequisite',
      time: 'Monday - Friday, 9:00am - 12:00pm',
      name: 'In Person: Monday - Friday, 9:00am - 12:00pm',
    },
    {
      course: 'fundamentals',
      value: 'fundamentals-virtual-m-f-1-4',
      location: 'Virtual',
      preReq: 'No Prerequisite',
      time: 'Monday - Friday, 1:00pm - 4:00pm',
      name: 'Virtual: Monday - Friday, 1:00pm - 4:00pm',
    },
  ],
  advanced: [
    {
      course: 'advanced',
      value: 'advanced-virtual-m-f-9-12',
      location: 'Virtual',
      preReq: 'Fundamentals of HTML, CSS, and Javascript',
      time: 'Monday - Friday, 9:00am - 12:00pm',
      name: 'Virtual: Monday - Friday, 9:00am - 12:00pm',
    },
    {
      course: 'advanced',
      value: 'advanced-onsite-m-f-1-4',
      location: 'In Person',
      preReq: 'Fundamentals of HTML, CSS, and Javascript',
      time: 'Monday - Friday, 1:00pm - 4:00pm',
      name: 'In Person: Monday - Friday, 1:00pm - 4:00pm',
    },
  ],
};

export const interestLevel = [
  {
    value: 'positive',
    name: "I'm sure I want to take the class this spring",
  },
  {
    value: 'future',
    name: 'I want to take the course but am not yet sure about my availability',
  },
  {
    value: 'exploring',
    name: 'Just exploring my options for now',
  },
];

export const ethnicities = [
  {
    name: 'american-indian-alaskan-native',
    label: 'American Indian/Alaskan Native',
    value: false,
  },
  { name: 'asian', label: 'Asian', value: false },
  {
    name: 'native-hawaiian-pacific-islander',
    label: 'Native Hawaiian or Pacific Islander',
    value: false,
  },
  {
    name: 'black-african-american',
    label: 'Black/African American',
    value: false,
  },
  { name: 'hispanic-latino', label: 'Hispanic/Latino', value: false },
  { name: 'white', label: 'White', value: false },
];

export const policyAgreementOptions = [
  {
    value: 'agree',
    name: 'I understand and agree to the policy above',
  },
  {
    value: 'disagree',
    name: 'I cannot make it work this semester, but would like to receive information for future semesters',
  },
  {
    value: 'other',
    name: 'I am not sure yet whether I can make the commitment for this semester',
    additionalInfo: 'Please explain why you are unsure',
  },
];