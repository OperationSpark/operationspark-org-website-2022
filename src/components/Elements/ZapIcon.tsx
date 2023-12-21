import styled from 'styled-components';
import Image from "next/legacy/image";

const ZapStyles = styled.div`
  pointer-events: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  filter: drop-shadow(0 0 2px rgba(25, 25, 25, 0.75));

  img {
    user-select: none;
    -webkit-user-drag: none;
  }
`;

export const Zap = ({ size = 1 }) => {
  const width = size * 24;

  return (
    <ZapStyles
      style={{
        width: `${width * 1.5}px`,
        minWidth: `${width * 1.5}px`,
        height: `${width}px`,
      }}
    >
      <Image layout='fill' objectFit='contain' src='/images/zap.webp' alt='zap' />
    </ZapStyles>
  );
};

export default Zap;
