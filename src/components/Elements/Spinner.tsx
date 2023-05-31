import { useEffect, useState } from 'react';
import styled, { CSSProperties, useTheme } from 'styled-components';
import { motion } from 'framer-motion';

const Spinner = ({
  size = 4,
  text,
  style,
}: {
  size?: number;
  text?: string;
  style?: CSSProperties;
}) => {
  const [loadingDots, setLoadingDots] = useState('.');

  const theme = useTheme();

  const primary = theme.primary[300];
  const secondary = theme.secondary[600];

  useEffect(() => {
    const updateDot = setInterval(() => {
      const len = loadingDots.length;
      const dots = new Array(len < 3 ? len + 1 : 0).fill('.').join('');
      setLoadingDots(dots);
    }, 500);
    return () => {
      clearInterval(updateDot);
    };
  }, [loadingDots]);

  return (
    <SpinnerStyles style={style}>
      <div style={{ width: `${size}rem`, height: `${size}rem` }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          style={{ margin: 'auto', background: 'transparent', display: 'block' }}
          width='100%'
          height='100%'
          viewBox='0 0 100 100'
          preserveAspectRatio='xMidYMid'
        >
          <rect x='7' y='7' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='0s'
              calcMode='discrete'
            ></animate>
          </rect>
          <rect x='29' y='7' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='0.16666666666666666s'
              calcMode='discrete'
            ></animate>
          </rect>
          <rect x='51' y='7' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='0.3333333333333333s'
              calcMode='discrete'
            ></animate>
          </rect>
          <rect x='73' y='7' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='0.5s'
              calcMode='discrete'
            ></animate>
          </rect>
          <rect x='7' y='29' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='1.8333333333333333s'
              calcMode='discrete'
            ></animate>
          </rect>
          <rect x='73' y='29' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='0.6666666666666666s'
              calcMode='discrete'
            ></animate>
          </rect>
          <rect x='7' y='51' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='1.6666666666666667s'
              calcMode='discrete'
            ></animate>
          </rect>
          <rect x='73' y='51' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='0.8333333333333334s'
              calcMode='discrete'
            ></animate>
          </rect>
          <rect x='7' y='73' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='1.5s'
              calcMode='discrete'
            ></animate>
          </rect>
          <rect x='29' y='73' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='1.3333333333333333s'
              calcMode='discrete'
            ></animate>
          </rect>
          <rect x='51' y='73' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='1.1666666666666667s'
              calcMode='discrete'
            ></animate>
          </rect>
          <rect x='73' y='73' width='20' height='20' fill={primary}>
            <animate
              attributeName='fill'
              values={`${secondary};${primary};${primary}`}
              keyTimes='0;0.08333333333333333;1'
              dur='2s'
              repeatCount='indefinite'
              begin='1s'
              calcMode='discrete'
            ></animate>
          </rect>
        </svg>
      </div>
      <div
        className='primary-secondary loading-text'
        style={{ fontSize: `${size / 4}rem`, fontWeight: 700 }}
      >
        {text || 'Loading'}
        <span className='loading-dots'>{loadingDots}</span>
      </div>
    </SpinnerStyles>
  );
};

const SpinnerStyles = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  user-select: none;
  .loading-text {
    position: relative;
    .loading-dots {
      position: absolute;
      left: 100%;
    }
  }
  img {
    -webkit-user-drag: none;
    display: block;
    width: 100%;
    height: auto;
  }
`;

export default Spinner;
