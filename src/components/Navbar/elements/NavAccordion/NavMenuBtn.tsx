import styled from 'styled-components';
import { motion, SVGMotionProps } from 'framer-motion';

type NavMenuBtnProps = {
  isOpen?: boolean;
};

export const NavMenuBtn = styled.button<NavMenuBtnProps>`
  box-shadow: 0 0 1px ${(p) => p.theme.purple[900]};
  padding: 0.5rem;
  background: ${({ theme }) => theme.primary[theme.isLightMode ? 700 : 500]};
  border-radius: ${(p) => (p.isOpen ? '0.5rem 0.5rem 0 0' : '0.25rem')};
  color: white;
  position: relative;
  margin-left: 0.5rem;
  z-index: 1000;
  background: linear-gradient(
    90deg,
    ${({ theme, isOpen }) => `
    ${theme.primary[500]} 0%,
    ${theme.primary[500]} 4%,
    ${theme.primary[500]} 75%,
    ${theme.primary[isOpen ? 700 : 500]} 100%
    `}
  );
  transition: border-radius 100ms;

  :hover {
    box-shadow: 0 0px 2px ${(p) => p.theme.purple[900]};
  }
  :active {
    box-shadow: 0 0px 4px ${(p) => p.theme.purple[900]} inset;
  }

  ${(p) => p.isOpen && 'box-shadow: none;'}
`;

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='rgba(255,255,255,1)'
    strokeLinecap='round'
    {...props}
  />
);

type NavMenuIconProps = {
  isOpen?: boolean;
};

export const NavMenuIcon = ({ isOpen }: NavMenuIconProps) => (
  <motion.svg width='22' height='20' viewBox='0 0 22 20' animate={isOpen ? 'open' : 'closed'}>
    <Path
      variants={{
        closed: { d: 'M 2 2.5 L 20 2.5' },
        open: { d: 'M 3 16.5 L 17 2.5' },
      }}
      transition={{ duration: 0.1, type: 'tween' }}
    />
    <Path
      d='M 2 9.423 L 20 9.423'
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 },
      }}
      transition={{ duration: 0.1, type: 'tween' }}
    />
    <Path
      variants={{
        closed: { d: 'M 2 16.346 L 20 16.346' },
        open: { d: 'M 3 2.5 L 17 16.346' },
      }}
      transition={{ duration: 0.1, type: 'tween' }}
    />
  </motion.svg>
);
