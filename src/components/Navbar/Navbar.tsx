import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import moment from 'moment-timezone';
import { motion } from 'framer-motion';

import { useScrollY } from '@this/hooks/useScrollY';
import { useValidCss } from '@this/hooks/useCssCheck';
import { IAlert } from '@this/data/types/bits';
import { navMenus } from './navLinks';

const LogoLink = dynamic(() => import('@this/components/Elements/LogoLink'));
const ProgressBar = dynamic(() => import('./ProgressBar'));
const AlertBar = dynamic(() => import('./AlertBar'));
const DesktopNav = dynamic(() => import('./DesktopNav'));
const MobileNav = dynamic(() => import('./MobileNav'));

interface NavProps {
  alertInfo: IAlert;
}

const withinDateRange = ({ start, end }: IAlert): boolean => {
  if (!start && !end) {
    return false;
  }

  const toCentTime = (d?: string): number =>
    d ? moment(new Date(d)).tz('America/Chicago', true).toDate().getTime() : 0;

  const now = Date.now();
  const startTime = toCentTime(start);
  const endTime = toCentTime(end);

  return !endTime || (now >= startTime && now <= endTime);
};

export default function Nav({ alertInfo }: NavProps) {
  const scrollY = useScrollY();
  const supportsBackdropFilter = useValidCss('backdrop-filter', 'blur()');
  const isTop = scrollY === null ? true : scrollY <= 5;
  const navRef = useRef<HTMLDivElement>(null);
  const showAlert = alertInfo?.message && withinDateRange(alertInfo);
  const theme = useTheme();

  const resizeObserverRef = useRef(
    typeof window === 'undefined'
      ? null
      : new ResizeObserver(([nav]) =>
          requestAnimationFrame(() => {
            if (nav) {
              const { height } = nav.contentRect;
              const newHeight = Math.ceil(height);
              theme.setNavHeight(newHeight);
            }
          }),
        ),
  );

  const transparentBg = theme.isLightMode
    ? 'rgba(255,255,255,0)'
    : 'rgba(25,25,25,0)';
  const bgColor = supportsBackdropFilter ? theme.alpha.bg : theme.bg;

  const navAnimation = {
    boxShadow: `0 0 8px ${!isTop ? theme.alpha.fg : 'rgba(125,125,125,0)'}`,
    backdropFilter: isTop ? 'blur(0px)' : 'blur(8px)',
    WebkitBackdropFilter: isTop ? 'blur(0px)' : 'blur(8px)',
    background: isTop ? transparentBg : bgColor,
  };

  const navTransition = {
    default: { duration: 0.3 },
    background: { duration: 0.15 },
    boxShadow: { duration: 0.15 },
  };

  // Dynamically update nav height
  useEffect(() => {
    const resizeObserver = resizeObserverRef.current;
    const navElement = navRef.current;

    navElement && resizeObserver && resizeObserver.observe(navRef.current);

    return () => {
      if (resizeObserver && navElement) {
        resizeObserver.unobserve(navElement);
        resizeObserver.disconnect();
      }
    };
  }, [theme, navRef, resizeObserverRef]);

  return (
    <NavbarStyles
      ref={navRef}
      animate={{ ...navAnimation }}
      transition={navTransition}
    >
      {showAlert && <AlertBar info={alertInfo} />}
      <div className='navbar'>
        <LogoLink
          src='/images/Operation Spark Logo_H.webp'
          href='/'
          alt='Operation Spark'
          priority={true}
        />
        <DesktopNav navMenus={navMenus} />
        <MobileNav navMenus={navMenus} />
      </div>
      <ProgressBar isTop={isTop} />
    </NavbarStyles>
  );
}

export const NavbarStyles = styled(motion.nav)`
  z-index: 500;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;

  .navbar {
    display: flex;
    height: fit-content;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    padding: 0.5rem;

    .nav-links {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .mobile-nav {
      display: none;
      position: relative;
      .mobile-nav-header {
        padding: 1rem 0.5rem;

        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .navbar {
      .nav-links {
        display: none;
      }
      .mobile-nav {
        display: block;
      }
    }
  }
  @media print {
    display: none;
  }
`;
