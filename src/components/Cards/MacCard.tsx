import { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';
import { FaArrowRight as RightIcon, FaArrowLeft as LeftIcon } from 'react-icons/fa';
import { IoMdPause as PauseIcon, IoMdPlay as PlayIcon } from 'react-icons/io';

import { SlashDivider } from '@this/components/Elements/SlashDivider';

interface MacCardProps {
  onNextClick?: () => void;
  onPrevClick?: () => void;
  onPauseClick?: () => void;
  isPaused: boolean;
  children: ReactNode | ReactNode[] | undefined;
}

export const MacCard = ({
  children,
  onNextClick,
  onPrevClick,
  onPauseClick,
  isPaused,
}: MacCardProps) => {
  const pauseOrPlay = isPaused ? 'play' : 'pause';
  return (
    <MacCardStyles>
      <SlashDivider
        style={{
          borderRadius: '0.25rem 0.25rem 0 0',
          borderTop: 'none',
          borderBottom: 'none',
          boxShadow: `0 0 0.1rem rgba(125, 125, 125, 0.5) inset`,
        }}
      >
        <div className='mac-buttons'>
          <MacBtn fill='yellow' char={onPauseClick && pauseOrPlay} onClick={onPauseClick} />
          <MacBtn char={onPrevClick && '<'} onClick={onPrevClick} />
          <MacBtn char={onNextClick && '>'} onClick={onNextClick} />
        </div>
      </SlashDivider>
      <div className='card-content'>{children}</div>
    </MacCardStyles>
  );
};

export default MacCard;

const MacBtn = ({
  fill,
  char,
  onClick,
}: {
  fill?: 'yellow';
  char?: '<' | '>' | 'pause' | 'play' | undefined;
  onClick?: () => void;
}) => {
  const icons = {
    '<': LeftIcon,
    '>': RightIcon,
    pause: PauseIcon,
    play: PlayIcon,
  };
  const BtnIcon = char ? icons[char] : null;
  const theme = useTheme();

  return (
    <MacBtnStyles>
      {BtnIcon ? (
        <button
          className={`mac-button${fill === 'yellow' ? ' invert' : ''}`}
          style={fill === 'yellow' ? { background: theme.yellow[400], color: theme.black } : {}}
          aria-label={char === '<' ? 'Previous' : ' Next'}
          onClick={() => onClick?.()}
        >
          <BtnIcon size={10} />
        </button>
      ) : (
        <div
          tabIndex={-1}
          className='mac-no-button'
          style={fill === 'yellow' ? { background: theme.yellow[400] } : undefined}
        ></div>
      )}
    </MacBtnStyles>
  );
};

const MacCardStyles = styled.div`
  width: 600px;
  max-width: 100%;
  margin: 3rem 0;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.fg};
  box-shadow: 0 0.5rem 1rem rgba(25, 25, 25, 0.5);
  border-radius: 0.25rem;

  .mac-buttons {
    border-top-left-radius: 0.25rem;
    border-right: none;
    width: 100px;
    height: 24px;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.fg};
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0.1rem 0 0.1rem rgba(125, 125, 125, 0.5) inset;
  }

  .card-content {
    font-family: 'Ubuntu', sans-serif;
    padding: 1rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const MacBtnStyles = styled.div`
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .mac-button,
  .mac-no-button {
    width: 100%;
    height: 100%;
    border-radius: 50%;

    box-shadow: 0 0 1px 2px
      ${({ theme }) => (theme.isLightMode ? theme.primary[900] : theme.primary[300])};
  }
  button {
    border-radius: 50%;
    box-shadow: 0 0 0px 3px
      ${({ theme }) => (theme.isLightMode ? theme.primary[900] : theme.primary[300])};
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    :focus-visible,
    :hover {
      color: rgba(25, 25, 25, 1);
      background: ${({ theme }) => theme.secondary[200]};
    }

    :active {
      background: ${({ theme }) => theme.secondary[500]};
    }
  }
`;
