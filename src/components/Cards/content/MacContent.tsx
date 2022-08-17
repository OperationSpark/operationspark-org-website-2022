import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Zap } from '@this/components/Elements/ZapIcon';
import { IQuote } from '@this/data/types/bits';

type MacContentProps = Omit<IQuote, 'logoSrcDark' | 'logoSrcLight'> & {
  logoSrc?: string;
};

export const MacContent = ({ body, name, role, imageUrl, logoHref, logoSrc }: MacContentProps) => {
  const showMoreLength = 250;
  const [showMore, setShowMore] = useState<boolean>(body.length < showMoreLength);
  const [currentBody, setCurrentBody] = useState<string>('');
  const bodyRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setShowMore(body.length < showMoreLength);
    setCurrentBody(body);
  }, [body]);

  return (
    <MacContentStyles>
      <div className='mac-card-main'>
        <motion.div
          className='mac-card-body dynamic-txt'
          ref={bodyRef}
          style={{ paddingBottom: 0 }}
        >
          &ldquo;
          {showMore ? currentBody : currentBody.slice(0, currentBody.indexOf(' ', showMoreLength))}
          {!showMore ? '...' : '”'}
          {!showMore && (
            <div className='read-more'>
              <button className='primary-secondary' onClick={() => setShowMore(true)}>
                Read More
              </button>
            </div>
          )}
        </motion.div>

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
            <Image objectFit='contain' width={150} height={75} src={logoSrc} alt={name} />
          </a>
        )}
      </div>
    </MacContentStyles>
  );
};

export default MacContent;

const MacContentStyles = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  grid-gap: 1rem;
  img,
  a {
    user-select: none;
    -webkit-user-drag: none;
  }

  .mac-card-main {
    display: flex;
    height: 100%;
  }
  .mac-card-body {
    display: flex;
    flex-flow: column;
    padding: 1rem;
    min-height: 125px;
    border-radius: 0.25rem;

    font-weight: 400;
    font-style: italic;
    text-justify: inter-word;
    text-align: justify;
    position: relative;
    margin-bottom: 1rem;
    .read-more {
      position: absolute;
      top: 100%;
      button {
        margin: 0 auto;
      }
    }

    ::after {
      border-radius: 0.25rem;
      pointer-events: none;
      position: absolute;

      inset: 0;
      content: ' ';
      width: 100%;
      height: 100%;
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
    grid-gap: 1rem;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    min-height: 100px;
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
      position: relative;
      margin-left: auto;
    }
    font-family: 'Source Code Pro', monospace;
  }

  @media screen and (max-width: 768px) {
    .mac-card-main {
      flex-flow: column;
      .mac-card-body {
        text-align: start;
        min-height: 200px;
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

      .mac-card-about-body {
        align-self: flex-start;
      }
      a {
        margin: 0 auto;
      }
    }
  }
`;
