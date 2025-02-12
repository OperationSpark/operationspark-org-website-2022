import { useRouter } from 'next/router';
import { useState } from 'react';
import { TiArrowSortedDown as DownArrow } from 'react-icons/ti';
import styled from 'styled-components';

import { useClickAway } from '@this/hooks/useClickAway';
import { checkActiveSubLink } from '@this/src/helpers/navigation';
import { kebabCase } from 'lodash';
import type { NavigationSubLink } from '../navLinks';
import NavLink from './NavLink';

export const NavMenuStyles = styled.div`
  filter: drop-shadow(
    0 0.2rem 0.32rem
      ${({ theme }) => (theme.isLightMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 1)')}
  );
  position: relative;
  z-index: 100;
  .menu-arrow {
    position: absolute;
    top: calc(100% + 0.25rem);
    width: 100%;
    height: 1.25rem;
    user-select: none;

    z-index: 100;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme: { secondary } }) => secondary[500]};

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem 0.25rem 0 0;

    ::before {
      content: '';
      width: 100%;
      height: 0.25rem;
      position: absolute;
      top: -0.25rem;
    }
  }
  .sub-nav-links {
    position: absolute;

    top: calc(100% + 1.5rem);
    user-select: none;
    width: 12rem;
    z-index: 100;
    padding: 0.5rem;

    background: ${({ theme }) => theme.bg};
    border-radius: 0 0.25rem 0.25rem 0.25rem;
  }
`;

interface NavDropMenuProps {
  title: string;
  href: string;
  subLinks: NavigationSubLink[];
}

const NavDropMenu = ({ title, href, subLinks }: NavDropMenuProps) => {
  const { pathname } = useRouter();
  const isActive = pathname.includes(href) ? 'active' : '';

  const [isClicked, setIsClicked] = useState(false);
  const [menuRef, showMenu, setShowMenu] = useClickAway(() => setIsClicked(false));

  const handleClick = () => {
    if (showMenu && !isClicked) {
      setIsClicked(true);
    } else {
      setShowMenu(!showMenu);
      setIsClicked(!showMenu);
    }
  };

  return !subLinks || !subLinks?.length ? (
    <NavLink href={href}>{title}</NavLink>
  ) : (
    <div
      style={{ position: 'relative' }}
      onClick={handleClick}
      onMouseEnter={() => {
        document.body.click();
        setShowMenu(true);
      }}
      onMouseLeave={() => !isClicked && setShowMenu(false)}
      onKeyDown={({ key }) => key === 'Enter' && handleClick()}
      className={`${isActive}`}
      ref={menuRef}
    >
      <NavLink href={href} callback={() => setShowMenu(false)}>
        {title}
      </NavLink>
      {showMenu && (
        <NavMenuStyles className={checkActiveSubLink(href, pathname) ? 'active' : ''}>
          <div className='menu-arrow'>
            <DownArrow size={30} />
          </div>

          <div className='sub-nav-links'>
            {subLinks.map((subLink) => (
              <NavLink
                href={href + subLink.href}
                key={href + subLink.href}
                subtitle={subLink.subtitle}
                className={
                  checkActiveSubLink(href + subLink.href, pathname)
                    ? 'sub-nav sub-nav-active'
                    : 'sub-nav'
                }
                callback={() => setShowMenu(false)}
                testId={kebabCase(subLink.title)}
              >
                <span>{subLink.title}</span>
              </NavLink>
            ))}
          </div>
        </NavMenuStyles>
      )}
    </div>
  );
};
export default NavDropMenu;
