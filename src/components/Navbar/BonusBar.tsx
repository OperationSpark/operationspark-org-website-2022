import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled from 'styled-components';
import NavLink from './elements/NavLink';

const BonusBar = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const isHs = router.pathname.includes('highschool');

  return (
    <BonusBarStyles className='bonus-bar'>
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
  justify-content: flex-end;
  grid-gap: 0.25rem;
  @media screen and (max-width: 700px) {
    justify-content: space-around;
    flex-flow: row wrap;
    padding-bottom: 0.75rem;
    .info {
      flex: 1;
      margin: 0;
      line-height: 1em;
      width: fit-content;

      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
        height: 100%;
        padding: 0.25rem 0.3rem;
      }
    }
  }
  @media screen and (max-width: 300px) {
    grid-gap: 0.25rem;

    .info {
      flex: none;
      width: 100%;
      a {
        padding: 0.2rem 0.2rem;
      }
    }
  }
`;
