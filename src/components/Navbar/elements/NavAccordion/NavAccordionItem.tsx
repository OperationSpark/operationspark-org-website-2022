import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';

const NavAccordionItemStyles = styled(motion.div)`
  box-shadow: 0 -3px 3px rgba(25, 25, 25, 0) inset;
  transition: box-shadow 200ms;
  &.open {
    box-shadow: 0 -2px 2px ${(p) => p.theme.primary[700]} inset;
  }
  &.open .accordion-item,
  &.active {
    transition: box-shadow 200ms;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary[800]} 0%,
      ${({ theme }) => theme.primary[600]} 4%,
      ${({ theme }) => theme.primary[600]} 96%,
      ${({ theme }) => theme.primary[800]} 100%
    );
    box-shadow: 0 2px 4px ${(p) => p.theme.primary[700]};
  }

  .accordion-item {
    box-shadow: 0 3px 3px rgba(25, 25, 25, 0);
    font-weight: 600;
    padding: 0.6rem 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    :hover {
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.primary[800]} 0%,
        ${({ theme }) => theme.primary[600]} 4%,
        ${({ theme }) => theme.primary[600]} 96%,
        ${({ theme }) => theme.primary[800]} 100%
      );
    }
  }
  .sub-links {
    display: flex;
    flex-flow: column;
    width: 100%;
    font-size: 0.9rem;
    font-weight: 400;
    overflow: hidden;
  }
`;

interface NavAccordionItemProps {
  title: string;
  href: string;
  children?: ReactNode | ReactNode[];
  link?: boolean;
}

export const NavAccordionItem = ({ title, children, href, link }: NavAccordionItemProps) => {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(pathname.includes(href));

  return link ? (
    <NavAccordionItemStyles
      onClick={() => setIsOpen(!isOpen)}
      className={isOpen ? 'open' : ''}
      title={title}
      aria-label={title}
    >
      {children}
    </NavAccordionItemStyles>
  ) : (
    <NavAccordionItemStyles
      onClick={() => setIsOpen(!isOpen)}
      className={isOpen ? 'open' : !isOpen && pathname.includes(href) ? 'active' : ''}
      title={title}
      aria-label={title}
    >
      <button className='accordion-item'>
        <div>{title}</div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: 'tween', duration: 0.1 }}
        >
          <FiChevronRight />{' '}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: '0' }}
            animate={{ height: 'auto' }}
            exit={{ height: '0' }}
            transition={{ type: 'tween', duration: 0.2 }}
            className='sub-links'
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </NavAccordionItemStyles>
  );
};

export default NavAccordionItem;
