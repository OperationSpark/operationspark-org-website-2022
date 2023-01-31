import { CSSProperties, FC } from 'react';
import styled from 'styled-components';

type ExpandIconProps = {
  style?: CSSProperties;
  color?: string;
  fg?: string;
  bg?: string;
  size?: number;
  width?: number;
  height?: number;
  weight?: number;
  className?: string;
};

export const ExpandIcon: FC<ExpandIconProps> = ({
  style,
  fg,
  bg,
  size,
  width,
  height,
  color,
  weight,
  className,
}) => {
  const w = width || size || 20;
  const h = height || size || 20;
  const fill = bg || 'none';
  const stroke = fg || color || 'currentColor';

  return (
    <ExpandIconStyles className={className} style={{ width: `${w}px`, height: `${h}px`, ...style }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill={fill}
        viewBox='0 0 24 24'
        strokeWidth={weight ?? 1.5}
        stroke={stroke}
        width='100%'
        height='100%'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
        />
      </svg>
    </ExpandIconStyles>
  );
};

const ExpandIconStyles = styled.div`
  display: flex;
  max-height: fit-content;
  align-items: center;
  margin-bottom: 0;
`;
