import type { NavigationMenuLink } from './navLinks';
import { FcCalendar as CalendarIcon } from 'react-icons/fc';

import NavDropMenu from './elements/NavDropMenu';
import ThemeButton from './elements/ThemeButton';
import NavLink from './elements/NavLink';

interface DesktopNavProps {
  navMenus: NavigationMenuLink[];
}

const DesktopNav = ({ navMenus = [] }: DesktopNavProps) => {
  return (
    <div className='nav-links'>
      {navMenus.map((navMenu) => (
        <NavDropMenu
          key={navMenu.title}
          title={navMenu.title}
          href={navMenu.href}
          subLinks={navMenu.subLinks}
        />
      ))}
      <NavLink href='/calendar' title='Event Calendar'>
        <CalendarIcon size={32} />
      </NavLink>
      <ThemeButton />
    </div>
  );
};

export default DesktopNav;
