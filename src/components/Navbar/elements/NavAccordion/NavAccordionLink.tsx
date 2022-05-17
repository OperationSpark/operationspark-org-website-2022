import { useRouter } from 'next/router';
import { MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';

const NavAccordionLinkStyles = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 0.6rem 1rem;
  border-top: 1px solid ${(p) => p.theme.border[700]};
  :hover,
  &.active {
    background: ${({ theme }) => theme.primary[700]};
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
        className={`${pathname.includes(href) ? 'active' : ''} ${
          className || ''
        }`}
      >
        {children}
      </NavAccordionLinkStyles>
    </a>
  );
};
