import { AnimatePresence } from 'framer-motion';

import { useClickAway } from '@this/hooks/useClickAway';
import { NavAccordionLink } from './elements/NavAccordion/NavAccordionLink';
import { NavMenuBtn, NavMenuIcon } from './elements/NavAccordion/NavMenuBtn';
import type { NavigationMenuLink } from './navLinks';

import NavAccordion from './elements/NavAccordion/NavAccordion';
import NavAccordionItem from './elements/NavAccordion/NavAccordionItem';

const MobileNav = ({ navMenus = [] }: { navMenus: NavigationMenuLink[] }) => {
  const [menuRef, showMenu, setShowMenu] = useClickAway();

  return (
    <nav ref={menuRef} className='mobile-nav'>
      <NavMenuBtn
        onClick={() => setShowMenu(!showMenu)}
        title={`${showMenu ? 'Open' : 'Close'} Navigation Sidebar`}
        aria-label={`${showMenu ? 'Open' : 'Close'} Navigation Sidebar`}
        isOpen={showMenu}
      >
        <NavMenuIcon isOpen={showMenu} />
      </NavMenuBtn>
      <AnimatePresence>
        {showMenu && (
          <NavAccordion closeMenu={() => setShowMenu(false)}>
            {navMenus.map((navMenu) =>
              navMenu.subLinks.length ? (
                <NavAccordionItem key={navMenu.href} title={navMenu.title} href={navMenu.href}>
                  {navMenu.subLinks.map((subLink) => (
                    <NavAccordionLink
                      key={navMenu.href + subLink.href}
                      closeMenu={() => setShowMenu(false)}
                      href={navMenu.href + subLink.href}
                      className='sub-link'
                      subtitle={subLink.subtitle}
                    >
                      {subLink.title}
                    </NavAccordionLink>
                  ))}
                </NavAccordionItem>
              ) : (
                <NavAccordionItem
                  key={navMenu.href}
                  href={navMenu.href}
                  title={navMenu.title}
                  link={true}
                >
                  <NavAccordionLink
                    closeMenu={() => setShowMenu(false)}
                    href={navMenu.href}
                    className='link'
                  >
                    {navMenu.title}
                  </NavAccordionLink>
                </NavAccordionItem>
              ),
            )}
          </NavAccordion>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileNav;
