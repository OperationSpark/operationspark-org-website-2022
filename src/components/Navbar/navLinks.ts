export type NavigationSubLink = {
  title: string;
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
      { title: 'Future Students', href: '/futureStudents' },
    ],
  },
  {
    title: 'High School',
    href: '/programs/highschool',
    subLinks: [
      //! Uncomment to show high school application
      // { title: 'Programs', href: '' },
      // { title: 'High School Application', href: '/apply' },
    ],
  },

  /*
    Unsure if these links will be needed.
      - Can be deleted if we determine that this page will no longer exist
  */
  // {
  //   title: 'Partners',
  //   href: '/partners',
  //   subLinks: [
  //     /* Unsure if this link will be needed.
  //         - Can be deleted if college credit lives on partners page
  //     */
  //     // { title: 'College Credit', href: '/collegeCredit' }
  //   ],
  // },

  { title: 'Get Involved', href: '/getInvolved', subLinks: [] },

  /*
    Unsure if these links will be needed.
      - Will be implemented once copy is ready
  */
  // { title: 'Dev Shop', href: '/devShop', subLinks: [] },
  {
    title: 'About',
    href: '/about',
    subLinks: [],
  },
  { title: 'Contact', href: '/contact', subLinks: [] },
  { title: 'Events', href: '/events', subLinks: [] },
];
