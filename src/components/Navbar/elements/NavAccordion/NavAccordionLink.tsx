import { useRouter } from 'next/router';
import { MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';

import { checkActiveSubLink } from '@this/src/helpers/navigation';

const NavAccordionLinkStyles = styled.a`
  all: unset;
  /* Styles below here */

  font-family: 'Red Hat Display', sans-serif;
  font-weight: 500;
  cursor: pointer;
  display: flex;

  padding: 0.6rem 1rem;
  border-top: 1px solid ${(p) => p.theme.border[700]};
  &:hover,
  &:focus-visible,
  &.active {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary[800]} 0%,
      ${({ theme }) => theme.primary[600]} 4%,
      ${({ theme }) => theme.primary[600]} 96%,
      ${({ theme }) => theme.primary[800]} 100%
    );
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25) inset;
  }
  &.sub-link {
    padding-left: 2.5rem;
  }

  &.active {
    cursor: default;
  }
`;

export const NavAccordionLink = ({
  children,
  href,
  className,
  closeMenu,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  closeMenu: () => void;
}) => {
  const linkTitle = typeof children === 'string' ? children : '';
  const { pathname, push } = useRouter();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    push(href);
    closeMenu();
  };
  return (
    <NavAccordionLinkStyles
      className={`${checkActiveSubLink(href, pathname) ? 'active' : ''} ${className || ''}`}
      href={href}
      title={linkTitle}
      aria-label={linkTitle}
      onClick={handleClick}
    >
      {children}
    </NavAccordionLinkStyles>
  );
};
