import type { NavigationMenuLink } from './navLinks';

import NavLink from './elements/NavLink';
import NavDropMenu from './elements/NavDropMenu';
import ThemeButton from './elements/ThemeButton';

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

      <NavLink href='/programs/workforce/infoSession' className='info'>
        Free Info Session
      </NavLink>
      <ThemeButton />
    </div>
  );
};

export default DesktopNav;
