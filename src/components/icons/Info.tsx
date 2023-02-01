import { CSSProperties, FC } from 'react';
import styled from 'styled-components';

type InfoIconProps = {
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

export const InfoIcon: FC<InfoIconProps> = ({
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
    <InfoIconStyles className={className} style={{ width: `${w}px`, height: `${h}px`, ...style }}>
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
          d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
        />
      </svg>
    </InfoIconStyles>
  );
};

const InfoIconStyles = styled.div`
  display: flex;
  max-height: fit-content;
  align-items: center;
  margin-bottom: 0;
`;
