import Image from 'next/image';
import styled from 'styled-components';
import { Zap } from '@this/components/Elements/ZapIcon';

type MacContentProps = {
  body: string;
  name: string;
  role: string;
  imageUrl?: string;
  logoUrl?: string;
  logoImageUrl?: string;
};

export const MacContent = ({
  body,
  name,
  role,
  imageUrl,
  logoUrl,
  logoImageUrl,
}: MacContentProps) => {
  return (
    <MacContentStyles>
      <div className='mac-card-main'>
        <div className='mac-card-body'>{body}</div>
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
        {logoUrl && logoImageUrl && (
          <a
            className='anchor mac-card-logo'
            href={logoUrl}
            target='_blank'
            rel='noreferrer'
            aria-label={name}
          >
            <Image
              objectFit='contain'
              layout='fill'
              src={logoImageUrl}
              alt={name}
            />
          </a>
        )}
      </div>
    </MacContentStyles>
  );
};

export default MacContent;

const MacContentStyles = styled.div`
  img,
  a {
    user-select: none;
    -webkit-user-drag: none;
  }
  .mac-card-main {
    display: flex;
    .mac-card-body {
      padding: 1rem 0;
      font-weight: 600;
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
    .mac-card-about-body {
      display: flex;
      .mac-card-name {
        font-weight: 500;
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
      a {
        margin: 0 auto;
      }
    }
  }
`;
