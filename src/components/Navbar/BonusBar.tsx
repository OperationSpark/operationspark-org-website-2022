import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled from 'styled-components';

import env from '@this/src/clientConfig';

import NavLink from './elements/NavLink';

const activeUntil = env.HIGHSCHOOL_FORM_ACTIVE_UNTIL;

const isHsFormActive = () => {
  if (!activeUntil) return false;
  const activeUntilDate = new Date(activeUntil);
  if (isNaN(activeUntilDate.getTime())) return false;

  const today = new Date();
  return today < activeUntilDate;
};

const BonusBar = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  /**
   * High School Application - `/programs/highschool/apply`
   * - When high school form is available, set env variable 'HIGHSCHOOL_FORM_ACTIVE' to 'true' otherwise 'false'
   */

  const checkIsPath = (...paths: string[]) => {
    return paths.reduce((isPath, path) => {
      return isPath || router.pathname.includes(path);
    }, false);
  };
  const isHsApplyView = checkIsPath('/programs/highschool/apply');
  const isHsOrInfoView = checkIsPath('highschool', '/programs/workforce/infoSession');
  const isHsActive = !isHsApplyView && isHsFormActive();

  return (
    <BonusBarStyles className='bonus-bar'>
      {children}
      {isHsActive && (
        <NavLink href='/programs/highschool/apply' className='info'>
          {'High School Application'}
        </NavLink>
      )}
      {!isHsOrInfoView && (
        <NavLink
          href='/programs/workforce/infoSession'
          className='info'
          testId='nav-info-session-link'
        >
          {'Free Info Session'}
        </NavLink>
      )}
    </BonusBarStyles>
  );
};

export default BonusBar;

const BonusBarStyles = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: fit-content;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  grid-gap: 0.25rem;
  padding: 0 0.25rem;
  @media screen and (max-width: 768px) {
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
