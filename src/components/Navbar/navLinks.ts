export type NavigationSubLink = {
  title: string;
  subtitle?: string;
  href: string;
};

export type NavigationMenuLink = {
  title: string;
  href: string;
  subLinks: NavigationSubLink[];
};

export const navMenus: NavigationMenuLink[] = [
  {
    title: 'Adult Workforce',
    href: '/programs/workforce',
    subLinks: [
      { title: 'Immersion Program', href: '' },
      { title: 'Session Schedule', href: '/schedule' },
      { title: 'Free Info Session', href: '/infoSession' },
    ],
  },
  {
    title: 'High School',
    href: '/programs/highschool',
    subLinks: [
      { title: 'High School Programs', href: '' },
      { title: 'Teacher Training', subtitle: '+ Curriculum Partnership', href: '/teacherTraining' },
      //! Uncomment to show high school application
      // { title: 'Programs', href: '' },
      // { title: 'High School Application', href: '/apply' },
    ],
  },

  { title: 'Get Involved', href: '/getInvolved', subLinks: [] },

  { title: 'Dev Shop', href: '/devShop', subLinks: [] },
  {
    title: 'About',
    href: '/about',
    subLinks: [],
  },
  { title: 'Contact', href: '/contact', subLinks: [] },
  { title: 'Events', href: '/events', subLinks: [] },
];
