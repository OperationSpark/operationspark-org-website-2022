import styled from 'styled-components';

import { Img } from '@this/src/Typography/elements/Html';

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

const LogoLink = ({ src, href, alt, newTab, width, height, className }: LogoLinkProps) => {
  return (
    <LogoLinkStyles
      href={href}
      target={newTab ? '_blank' : undefined}
      title={alt}
      className={className}
    >
      <Img src={src} alt={alt} width={width ?? 140} height={height ?? 50} />
    </LogoLinkStyles>
  );
};

export default LogoLink;
