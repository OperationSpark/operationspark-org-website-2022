import { ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import rgbDataURL from '@this/src/helpers/rgbDataURL';

type TImgOverlay = {
  bg?: string;
  opacity?: number;
  blur?: number;
};

interface BgImageProps {
  src?: string;
  height?: string;
  className?: string;
  children?: ReactNode | ReactNode[];
  overlay?: TImgOverlay;
}

const BgImg = ({ src, height = '40rem', className, children, overlay }: BgImageProps) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const height = window.innerHeight;
    const { y } = ref.current.getBoundingClientRect();

    setInView(y < height && y > 0);
  }, []);

  return (
    <BgImgStyles style={{ height }} className={className} ref={ref} blur={overlay?.blur}>
      {src && (
        <Image
          src={src}
          layout='fill'
          objectFit='cover'
          objectPosition='top center'
          placeholder='blur'
          blurDataURL={rgbDataURL(134, 0, 241)}
          loading={inView ? 'eager' : 'lazy'}
          alt=''
          priority={inView}
        />
      )}

      <ImgOverlay {...overlay} />

      <div className='bg-img-content'>{children && children}</div>
    </BgImgStyles>
  );
};

export default BgImg;

const BgImgStyles = styled.div<TImgOverlay>`
  position: relative;
  display: flex;

  img {
    user-select: none;
  }

  .bg-img-content {
    ${({ blur }) => (blur ? `backdrop-filter: blur(${blur}px)` : '')};
    position: relative;
    z-index: 1;
    width: 100%;
  }
  @media print {
    height: fit-content !important;
  }
`;

const ImgOverlay = styled.div<TImgOverlay>`
  ${({ theme, bg, opacity }) => `
    background: ${bg ? bg : theme.isLightMode ? theme.primary[500] : theme.primary[900]};
    opacity: ${!isNaN(Number(opacity)) ? opacity : 0.5};
  `}

  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  -webkit-user-drag: none;
  @media print {
    display: none;
  }
`;
