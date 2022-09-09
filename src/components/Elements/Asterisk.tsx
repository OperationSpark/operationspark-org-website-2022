import { Fragment, MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { zip } from 'underscore';
// import { BsInfoCircle as InfoIcon } from 'react-icons/bs';
import { FcAbout as InfoIcon } from 'react-icons/fc';
import { BsAsterisk as AsteriskIcon } from 'react-icons/bs';

type AsteriskProps = {
  children: string;
  infoMessage?: string;
  matcher: string;
};
const Asterisk = ({ children, matcher, infoMessage }: AsteriskProps) => {
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [coords, setCoords] = useState<{ x: 0; y: 0 } | undefined>();

  if (!children || !matcher || !children.includes(matcher)) {
    return <Fragment>{children || null}</Fragment>;
  }

  const matches = children.split(matcher);

  const joinedMatches = matches.flatMap((str, i) => {
    if (i === matches.length - 1) {
      return str;
    }
    const handleBoxToggle = (e: MouseEvent, isOpen = false) => {
      setShowInfoBox(isOpen);
      // setCoords({ x: 25, y: 25 });
    };
    return (
      <div>
        <span>{str}</span>
        <span className='primary-secondary'>
          <AsteriskStyles>
            {matcher.trimEnd()}
            <span
              className='info-icon primary-secondary'
              onClick={(e) => handleBoxToggle(e, !showInfoBox)}
              onMouseEnter={(e) => handleBoxToggle(e, true)}
              onMouseLeave={(e) => handleBoxToggle(e, false)}
            >
              <InfoIcon size='1em' />
            </span>
          </AsteriskStyles>
        </span>
      </div>
    );
  });

  return (
    <AsteriskMainStyles initial={{ x: 20 }} animate={{ x: 0 }}>
      {joinedMatches.map((match, i) => (
        <Fragment key={`${i}`}>{match}</Fragment>
      ))}

      {showInfoBox && <AsteriskContainerStyles>{infoMessage}</AsteriskContainerStyles>}
    </AsteriskMainStyles>
  );
};

export default Asterisk;

export const AsteriskMainStyles = styled(motion.span)`
  position: relative;
`;
export const AsteriskStyles = styled(motion.span)`
  display: inline-flex;

  height: 100%;

  .info-icon {
    height: fit-content;
    cursor: pointer;
    filter: hue-rotate(60deg);
    transform-origin: bottom left;
    transition: transform 200ms;
    :hover {
      filter: hue-rotate(70deg);
      color: ${({ theme }) => (theme.isLightMode ? theme.primary[700] : theme.secondary[700])};
    }
    :active {
      transform: rotate(15deg);
    }
  }
`;
export const AsteriskContainerStyles = styled(motion.div)`
  position: absolute;
  font-size: 1rem;
  font-weight: 300;
  max-width: 100%;
  width: 400px;
  background: ${({ theme }) => theme.bgHover};
  padding: 1rem;
`;
