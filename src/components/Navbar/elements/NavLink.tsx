import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

import { buttonCss, yellowBtn } from '@this/src/theme/styled/mixins/button';

const NavLink = ({
  children,
  href,
  className,
  callback,
  color = '',
  title,
}: {
  children: ReactNode | ReactNode[];
  href?: string;
  className?: string;
  callback?: () => void;
  color?: '' | 'yellow';
  title?: string;
}) => {
  const linkTitle = typeof children === 'string' ? children : '';
  const { pathname } = useRouter();

  return (
    <NavLinkStyles
      className={`${href && pathname.includes(href) ? 'active' : ''} ${className || ''}`}
      color={color}
      onClick={callback}
      title={title ?? linkTitle}
    >
      {href ? (
        <Link href={href} aria-label={title ?? linkTitle}>
          {children}
        </Link>
      ) : (
        children
      )}
    </NavLinkStyles>
  );
};

export default NavLink;

export const NavLinkStyles = styled.div.attrs(({ color }: { color?: '' | 'yellow' }) => ({
  color,
}))`
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
    transition: box-shadow 125ms;
    white-space: pre;
    margin-bottom: 0.25rem;
    box-shadow: 0 0 2px 0px ${({ theme }) => theme.alpha.fg} inset;
    margin-right: 0;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.fg};

    :last-child {
      margin-bottom: 0;
    }
    :hover,
    :focus {
      background: ${({ theme }) => theme.bgHover};
      color: ${({ theme }) => theme.fg};

      box-shadow: 0 0 3px 0px ${({ theme }) => theme.alpha.fg} inset;

      z-index: 1;
    }
    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.secondary[800]};
    }
  }
  &.sub-nav.sub-nav-active {
    cursor: default;
    box-shadow: none;
    background: ${({ theme }) => theme.primary[theme.isLightMode ? 100 : 800]} !important;
  }

  &.active:not(&.sub-nav) {
    box-shadow: 0 0 3px 0px ${({ theme }) => theme.purple[900]} inset;
    background: ${({ theme }) => theme.primary[theme.isLightMode ? 300 : 800]};
    backdrop-filter: blur(8px);
    z-index: 0;
    box-shadow: 0 0 3px 1px ${({ theme }) => theme.fg} inset;
    cursor: default;
    :hover {
      box-shadow: 0 0 3px 1px ${({ theme }) => theme.fg} inset;
    }
  }
`;
