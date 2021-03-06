import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

import { buttonCss, yellowBtn } from '@this/src/theme/styled/mixins/button';

export const NavLinkStyles = styled.div.attrs(
  ({ color }: { color?: '' | 'yellow' }) => ({ color }),
)`
  ${({ color }) => (color === 'yellow' ? yellowBtn : buttonCss)};
  z-index: 0;
  position: relative;
  font-size: 0.9rem;
  z-index: 1;
  padding: 0;
  a {
    all: unset;
    display: flex;
    padding: 0.3rem 0.6rem;
  }
  &.sub-nav {
    white-space: pre;
    margin-bottom: 0.25rem;
    box-shadow: 0 0 3px 0px ${(p) => p.theme.purple[900]} inset;
    margin-right: 0;
    :last-child {
      margin-bottom: 0;
    }
    :hover,
    :focus {
      box-shadow: 0 0 3px 0px ${(p) => p.theme.purple[900]} inset;
      background: ${({ theme }) =>
        theme.primary[theme.isLightMode ? 300 : 800]};
      outline: none !important;
      box-shadow: 0 0 3px 0px ${(p) => p.theme.purple[900]} inset;
      z-index: 1;
    }
    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.secondary[800]};
    }
  }

  &.active {
    box-shadow: 0 0 3px 0px ${(p) => p.theme.purple[900]} inset;
    background: ${({ theme }) => theme.primary[theme.isLightMode ? 300 : 800]};
    backdrop-filter: blur(8px);
    z-index: 0;
    box-shadow: 0 0 3px 1px ${(p) => p.theme.fg} inset;

    :hover {
      box-shadow: 0 0 3px 1px ${(p) => p.theme.fg} inset;
    }
  }
`;

const NavLink = ({
  children,
  href,
  className,
  callback,
  color = '',
}: {
  children: ReactNode | ReactNode[];
  href?: string;
  className?: string;
  callback?: () => void;
  color?: '' | 'yellow';
}) => {
  const linkTitle = typeof children === 'string' ? children : '';
  const { pathname } = useRouter();

  return (
    <NavLinkStyles
      className={`${href && pathname.includes(href) ? 'active' : ''} ${
        className || ''
      }`}
      color={color}
      onClick={callback}
    >
      {href ? (
        <Link href={href} aria-label={linkTitle}>
          {children}
        </Link>
      ) : (
        children
      )}
    </NavLinkStyles>
  );
};

export default NavLink;
