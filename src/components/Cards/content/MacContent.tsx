import Image from 'next/image';
import styled from 'styled-components';
import { Zap } from '@this/components/Elements/ZapIcon';
import { IQuote } from '@this/data/types/bits';
import { motion } from 'framer-motion';

type MacContentProps = Omit<IQuote, 'logoSrcDark' | 'logoSrcLight'> & {
  logoSrc?: string;
};

export const MacContent = ({
  body,
  name,
  role,
  imageUrl,
  logoHref,
  logoSrc,
}: MacContentProps) => {
  return (
    <MacContentStyles>
      <div className='mac-card-main'>
        <div className='mac-card-body dynamic-txt'>&ldquo;{body}&rdquo;</div>
        {imageUrl && (
          <div className='mac-card-image'>
            <Image objectFit='contain' layout='fill' src={imageUrl} alt='' />
          </div>
        )}
      </div>
      <div className='mac-card-about'>
        <div className='mac-card-about-body'>
          <Zap />
          <div className='mac-card-about-content'>
            <div className='mac-card-name'>{name}</div>
            <div className='mac-card-role'>{role}</div>
          </div>
        </div>
        {logoHref && logoSrc && (
          <a
            className='anchor mac-card-logo'
            href={logoHref}
            target='_blank'
            rel='noreferrer'
            aria-label={name}
          >
            <Image objectFit='contain' layout='fill' src={logoSrc} alt={name} />
          </a>
        )}
      </div>
    </MacContentStyles>
  );
};

export default MacContent;

const MacContentStyles = styled(motion.div)`
  img,
  a {
    user-select: none;
    -webkit-user-drag: none;
  }

  height: 100%;
  .mac-card-main {
    display: flex;
    height: 100%;

    .mac-card-body {
      padding: 1rem;
      font-weight: 400;
      font-style: italic;
      height: 100%;
      min-height: 20rem;
      display: flex;
      align-items: center;
    }
    .mac-card-image {
      min-width: 175px;
      min-height: 175px;
      width: fit-content;
      height: fit-content;
      position: relative;
      border-radius: 0.25rem;
      left: 50px;
      top: -75px;
      background: ${({ theme }) => theme.alpha.bg};
      backdrop-filter: blur(8px);
      box-shadow: 0px 0px 0.5rem rgba(25, 25, 25, 1);
      border-radius: 0.5rem;
      overflow: hidden;
    }
  }
  .mac-card-about {
    display: flex;
    padding-bottom: 1rem;
    min-height: 8rem;
    align-items: flex-end;
    .mac-card-about-body {
      display: flex;
      .mac-card-name {
        font-weight: 700;
      }
      .mac-card-role {
        font-weight: 300;
      }
    }
    a {
      width: 150px;
      height: 75px;
      position: relative;
      margin-left: auto;
    }
    font-family: 'Source Code Pro', monospace;
  }

  @media screen and (max-width: 768px) {
    .mac-card-main {
      flex-flow: column;
      .mac-card-body {
        padding-right: 0;
      }
      .mac-card-image {
        top: 0;
        left: 0;
        margin: 1rem auto;
        box-shadow: 0px 0px 8px 0px rgba(25, 25, 25, 1);
      }
    }
    .mac-card-about {
      flex-flow: column;
      justify-content: flex-end;
      .mac-card-about-body {
        align-self: flex-start;
      }
      a {
        margin: 0 auto;
      }
    }
  }
`;
