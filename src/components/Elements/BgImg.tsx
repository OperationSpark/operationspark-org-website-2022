import Image from 'next/legacy/image';
import { ReactNode, useEffect, useRef, useState } from 'react';
import styled, { DefaultTheme } from 'styled-components';

import rgbDataURL from '@this/src/helpers/rgbDataURL';
import { backdropFilter } from '@this/src/theme/styled/mixins/filters';

type TImgOverlay = {
  bg?: string;
  opacity?: number;
  blur?: number;
  position?: 'center center' | 'top center' | 'bottom center';
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
          objectPosition={overlay?.position ?? 'top center'}
          placeholder='blur'
          style={{
            opacity: 0.5,
          }}
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

  ${backdropFilter({ blur: 2, opacity: 0.25 })}

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

const getImageOverlayStyles = ({ theme, bg, opacity }: { theme: DefaultTheme } & TImgOverlay) => {
  opacity = !isNaN(Number(opacity)) ? opacity : 0.45;
  const { isLightMode, primary } = theme;
  const background = bg ?? (isLightMode ? primary[500] : primary[900]);
  return `
    background: ${background};
    opacity: ${opacity};
  `;
};

const ImgOverlay = styled.div<TImgOverlay>`
  ${getImageOverlayStyles}
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;

  z-index: 0;
  -webkit-user-drag: none;
  @media print {
    display: none;
  }
`;
