import { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';

import rgbDataURL from '@this/src/helpers/rgbDataURL';

const LogoLinkStyles = styled.a`
  user-select: none;
  -webkit-user-drag: none;
  width: 140px;
  height: 50px;
  position: relative;
  padding: 0.5rem;
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
}

const LogoLink = ({
  src,
  href,
  alt,
  newTab,
  priority = false,
}: LogoLinkProps) => {
  const { push } = useRouter();
  const handleRoute = (e: MouseEvent) => {
    e.preventDefault();
    newTab ? window.open(href) : push(href);
  };
  return (
    <LogoLinkStyles href={href} onClick={handleRoute} title={alt}>
      <Image
        src={src}
        alt={alt}
        layout='fill'
        objectFit='contain'
        placeholder='blur'
        blurDataURL={rgbDataURL()}
        priority={priority}
      />
    </LogoLinkStyles>
  );
};

export default LogoLink;
