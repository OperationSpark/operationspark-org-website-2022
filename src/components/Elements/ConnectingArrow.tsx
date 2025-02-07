import { ColorKey } from '@this/src/theme/styled/styled';
import { FC } from 'react';
import styled, { DefaultTheme, keyframes } from 'styled-components';

type ConnectingArrowProps = {
  startColor?: ColorKey;
  endColor?: ColorKey;
};
const ConnectingArrow: FC<ConnectingArrowProps> = ({
  startColor = 'primary.900',
  endColor = 'secondary.200',
}) => {
  return (
    <ConnectingArrowStyles startColor={startColor} endColor={endColor}>
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

type ArrowAnimation = (props: {
  theme: DefaultTheme;
  color: ColorKey;
}) => ReturnType<typeof keyframes>;

const arrowColor: ArrowAnimation = ({ theme, color }) => {
  const c = theme.rgb(color);

  return keyframes`
    100% {
      border-color: ${`${c} transparent transparent ${c}`};
    }
  `;
};

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

const ConnectingArrowStyles = styled.div<{ startColor: ColorKey; endColor: ColorKey }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  position: relative;
  z-index: 100;

  .arrow {
    width: 3rem;
    height: 3rem;
    border: 0.75rem solid;
    border-color: ${({ theme, startColor }) =>
      `${theme.rgb(startColor)} transparent transparent ${theme.rgb(startColor)}`};
    transform: rotate(-45deg);
    filter: drop-shadow(
      0 0 3px ${({ theme }) => (theme.isLightMode ? theme.rgb('fg', 0.5) : theme.rgb('black', 1))}
    );
  }

  .arrowSliding {
    position: absolute;
    -webkit-animation: ${slide} 3s linear infinite;
    animation: ${slide} 3s linear infinite;
  }

  .delay1 {
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
    .arrow {
      /* animation-delay: 1s; */
      animation: ${({ theme, startColor }) => arrowColor({ theme, color: startColor })} 4s linear
        infinite;
    }
  }
  .delay2 {
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    .arrow {
      animation-delay: 1s;
    }
  }
  .delay3 {
    -webkit-animation-delay: 3s;
    animation-delay: 3s;
    .arrow {
      animation-delay: 1s;
    }
  }
`;
