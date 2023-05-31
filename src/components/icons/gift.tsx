import { CSSProperties, FC } from 'react';
import styled from 'styled-components';

type GiftIconProps = {
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

export const GiftIcon: FC<GiftIconProps> = ({
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
    <GiftIconStyles className={className} style={{ width: `${w}px`, height: `${h}px`, ...style }}>
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
          d='M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
        />
      </svg>
    </GiftIconStyles>
  );
};

const GiftIconStyles = styled.div`
  display: flex;
  max-height: fit-content;
  align-items: center;
  margin-bottom: 0;
`;
