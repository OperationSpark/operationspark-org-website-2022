import { useRouter } from 'next/router';
import { MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';

import { checkActiveSubLink } from '@this/src/helpers/navigation';

const NavAccordionLinkStyles = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 0.6rem 1rem;
  border-top: 1px solid ${(p) => p.theme.border[700]};
  :hover,
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
    <a
      style={{ all: 'unset' }}
      href={href}
      title={linkTitle}
      aria-label={linkTitle}
      onClick={handleClick}
    >
      <NavAccordionLinkStyles
        className={`${checkActiveSubLink(href, pathname) ? 'active' : ''} ${className || ''}`}
      >
        {children}
      </NavAccordionLinkStyles>
    </a>
  );
};
