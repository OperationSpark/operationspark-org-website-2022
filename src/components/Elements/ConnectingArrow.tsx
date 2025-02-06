import { FC } from 'react';
import styled, { keyframes } from 'styled-components';

type ConnectingArrowProps = {};
const ConnectingArrow: FC<ConnectingArrowProps> = () => {
  return (
    <ConnectingArrowStyles>
      <div className='arrowSliding'>
        <div className='arrow'></div>
      </div>
      <div className='arrowSliding delay1'>
        <div className='arrow'></div>
      </div>
      <div className='arrowSliding delay2'>
        <div className='arrow'></div>
      </div>
      <div className='arrowSliding delay3'>
        <div className='arrow'></div>
      </div>
    </ConnectingArrowStyles>
  );
};

export default ConnectingArrow;

const slide = keyframes`
  0% {
    /* filter: hue-rotate(0deg); */
    opacity:0;
    transform: translateX(2rem);
  }
  20% {
    opacity:1;
    transform: translateX(2rem);
  }
  60% {
    opacity:0.25;
    transform: translateX(-2rem);
  }
  100% {
    opacity:0;
    transform: translateX(-2rem);
    /* filter: hue-rotate(360deg); */
  }
`;

const ConnectingArrowStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;

  .arrow {
    width: 2rem;
    height: 2rem;
    border: 0.5rem solid;
    border-color: ${({ theme }) =>
      `${theme.rgb('primary.300')} transparent transparent ${theme.rgb('primary.500')}`};
    transform: rotate(-45deg);
  }

  .arrowSliding {
    position: absolute;
    -webkit-animation: ${slide} 3s linear infinite;
    animation: ${slide} 3s linear infinite;
  }

  .delay1 {
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }
  .delay2 {
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
  }
  .delay3 {
    -webkit-animation-delay: 3s;
    animation-delay: 3s;
  }
`;
