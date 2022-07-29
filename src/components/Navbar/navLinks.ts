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
    title: 'Our Programs',
    href: '/programs',
    subLinks: [
      /* Unsure if these links will be needed.
        - Can be deleted if we determine that all program info will live on the same page
      */
      { title: 'Adult Workforce', href: '/workforce' },
      { title: 'High School', href: '/highschool' },
      // { title: 'Student Success', href: '/studentSuccess' },
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
  { title: 'HS Application', href: '/programs/highschool/apply', subLinks: [] },
];
