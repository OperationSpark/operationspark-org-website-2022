import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled from 'styled-components';
import NavLink from './elements/NavLink';

const BonusBar = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const isHs = router.pathname.includes('highschool');

  return (
    <BonusBarStyles>
      {children ?? null}
      <NavLink href='/programs/highschool/apply' className='info'>
        High School Application
      </NavLink>
      {!isHs && (
        <NavLink href='/programs/workforce/infoSession' className='info'>
          Free Info Session
        </NavLink>
      )}
    </BonusBarStyles>
  );
};

export default BonusBar;

const BonusBarStyles = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  padding: 0 0.5rem;
  justify-content: flex-end;
  @media screen and (max-width: 700px) {
    justify-content: stretch;
    .info {
      flex: 1;
      display: flex;
      justify-content: center;
      text-align: center;
    }
  }
`;
