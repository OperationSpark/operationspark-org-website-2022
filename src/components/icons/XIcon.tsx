import { CSSProperties, FC } from 'react';
import styled from 'styled-components';

type XIconProps = {
  style?: CSSProperties;
  color?: string;
  fg?: string;
  bg?: string;
  size?: number;
  width?: number;
  height?: number;
  weight?: number;
};

export const XIcon: FC<XIconProps> = ({ style, fg, bg, size, width, height, color, weight }) => {
  const w = width || size || 20;
  const h = height || size || 20;
  const fill = bg || 'none';
  const stroke = fg || color || 'currentColor';

  return (
    <XIconStyles style={{ width: `${w}px`, height: `${h}px`, ...style }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill={fill}
        viewBox='0 0 24 24'
        strokeWidth={weight ?? 1.5}
        stroke={stroke}
        width='100%'
        height='100%'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
      </svg>
    </XIconStyles>
  );
};

const XIconStyles = styled.div`
  display: flex;
  max-height: fit-content;
  align-items: center;
  margin-bottom: 0;
`;
