import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import NavLink from '../NavLink';
import ThemeButton from '../ThemeButton';

const NavAccordionStyles = styled(motion.div)`
  position: absolute;
  color: white;
  font-weight: bold;
  z-index: 100;
  background: ${(p) => p.theme.purple[500]};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.primary[700]} 0%,
    ${({ theme }) => theme.primary[500]} 4%,
    ${({ theme }) => theme.primary[500]} 96%,
    ${({ theme }) => theme.primary[700]} 100%
  );
  top: calc(100% - 0.75rem);
  right: 0;
  width: 300px;
  max-width: calc(100vw - 0.5rem);

  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.75);
  border-radius: 0.5rem;
  border-top-right-radius: 0;
  overflow: hidden;
  .nav-link-container {
    max-height: calc(100vh - ${({ theme }) => theme.navHeight}px - 4rem);
    overflow: auto;
  }
`;

interface NavAccordionProps {
  closeMenu: () => void;
  children: ReactNode[];
}

const NavAccordion = ({ closeMenu, children }: NavAccordionProps) => {
  return (
    <NavAccordionStyles
      initial={{ scaleX: 0, scaleY: 0.1 }}
      animate={{
        scaleX: 1,
        scaleY: 1,
      }}
      exit={{ scaleX: 0, scaleY: 0.1 }}
      style={{ transformOrigin: 'top right' }}
      transition={{ type: 'tween', duration: 0.1 }}
      drag='x'
      dragConstraints={{ right: 0, left: 0 }}
      dragElastic={{ left: 0.1, right: 0.1 }}
      onDrag={(e, { offset, velocity }) => {
        e.preventDefault();
        Math.abs(offset.x) > 120 && Math.abs(velocity.x) > 150 && closeMenu();
      }}
    >
      <div className='mobile-nav-header'>
        <NavLink href='/programs/workforce/infoSession' className='info' callback={closeMenu}>
          Free Info Session
        </NavLink>

        <ThemeButton />
      </div>
      <div className='nav-link-container'>{children}</div>
    </NavAccordionStyles>
  );
};

export default NavAccordion;
