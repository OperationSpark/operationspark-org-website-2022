import { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import styled from 'styled-components';

import rgbDataURL from '@this/src/helpers/rgbDataURL';

const LogoLinkStyles = styled.a`
  user-select: none;
  -webkit-user-drag: none;
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  img {
    -webkit-user-drag: none;
  }
`;

interface LogoLinkProps {
  src: string;
  href: string;
  alt: string;
  newTab?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

const LogoLink = ({
  src,
  href,
  alt,
  newTab,
  priority = false,
  width,
  height,
  className,
}: LogoLinkProps) => {
  const { push } = useRouter();
  const handleRoute = (e: MouseEvent) => {
    e.preventDefault();
    newTab ? window.open(href) : push(href);
  };
  return (
    <LogoLinkStyles href={href} onClick={handleRoute} title={alt} className={className}>
      <Image
        src={src}
        alt={alt}
        width={width ?? 140}
        height={height ?? 50}
        objectFit='contain'
        placeholder='blur'
        blurDataURL={rgbDataURL()}
        priority={priority}
      />
    </LogoLinkStyles>
  );
};

export default LogoLink;
