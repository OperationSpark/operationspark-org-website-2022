import { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import { SlashDivider } from '@this/components/Elements/SlashDivider';

interface MacCardProps {
  onNextClick?: () => void;
  onPrevClick?: () => void;
  children: ReactNode | ReactNode[] | undefined;
}

export const MacCard = ({
  children,
  onNextClick,
  onPrevClick,
}: MacCardProps) => {
  return (
    <MacCardStyles>
      <SlashDivider
        style={{ borderRadius: '0.25rem 0.25rem 0 0', borderTop: 'none' }}
      >
        <div className='mac-buttons'>
          <MacBtn fill='yellow' />
          <MacBtn char={onPrevClick && '<'} />
          <MacBtn char={onNextClick && '>'} />
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
}: {
  fill?: 'yellow';
  char?: '<' | '>' | undefined;
}) => {
  const theme = useTheme();

  return (
    <MacBtnStyles>
      {char ? (
        <button
          className='mac-button'
          style={fill === 'yellow' ? { background: theme.yellow[400] } : {}}
          disabled={!char}
          aria-label={char === '<' ? 'Previous' : ' Next'}
        >
          {char === '<' ? (
            <FaArrowLeft size={10} />
          ) : (
            <FaArrowRight size={10} />
          )}
        </button>
      ) : (
        <div
          tabIndex={-1}
          className='mac-no-button'
          style={fill === 'yellow' ? { background: theme.yellow[400] } : {}}
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
      ${({ theme }) =>
        theme.isLightMode ? theme.primary[900] : theme.primary[300]};
  }
  button {
    border-radius: 50%;
    box-shadow: 0 0 0px 3px
      ${({ theme }) =>
        theme.isLightMode ? theme.primary[900] : theme.primary[300]};
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
