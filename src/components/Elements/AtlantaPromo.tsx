import { CSSProperties, FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// import Image from 'next/image';
import { useMounted } from '@this/src/hooks/useMounted';
import { XIcon } from '../icons/XIcon';
import { Georgia } from './Georgia';

type AtlantaPromoProps = { style?: CSSProperties };
const AtlantaPromo: FC<AtlantaPromoProps> = ({ style }) => {
  const isMounted = useMounted();
  const [hidePromo, setHidePromo] = useState(false);

  const handleClose = () => {
    localStorage.setItem('hide-atlanta-promo', 'true');
    setHidePromo(true);
  };
  const handleShowPromo = () => {
    if (hidePromo) {
      localStorage.setItem('hide-atlanta-promo', 'false');
      setHidePromo(false);
    }
  };

  useEffect(() => {
    setHidePromo(localStorage.getItem('hide-atlanta-promo') === 'true');
  }, []);

  return !isMounted
    ? null
    : createPortal(
        <AtlantaPromoStyles
          style={style}
          className={hidePromo ? 'hide-promo' : ''}
          title={hidePromo ? 'Open Atlanta Promo' : ''}
          role={hidePromo ? 'button' : 'banner'}
          onClick={handleShowPromo}
        >
          {!hidePromo && (
            <div className='close-btn'>
              <button onClick={handleClose} name='Close alert bar' aria-label='Close alert bar'>
                <XIcon size={32} weight={2} />
              </button>
            </div>
          )}
          {/* State background*/}
          <Georgia />

          {/* Peach background*/}
          {/* <Image
            src='/images/display/peach.png'
            width='400px'
            height='400px'
            alt='Peach'
            style={{ maxWidth: '100%', opacity: '0.6' }}
          /> */}

          <div className='promo-content'>
            <a
              href='https://docs.google.com/forms/d/e/1FAIpQLSeXLAXmPtJlm8lyM6jAMCppOR-XA93YoRdbiBXxeq339OXVkw/viewform'
              target='_blank'
              rel='noreferrer'
            >
              Now offering classes in Atlanta, GA
              <div className='learn-more-text'>Click to learn more</div>
            </a>
          </div>
        </AtlantaPromoStyles>,
        document.getElementById('atlanta-promo-root')!,
      );
};

const AtlantaPromoStyles = styled(motion.div)`
  position: fixed;
  width: 275px;
  top: calc(${({ theme }) => theme.navHeight}px + 0.5rem);
  right: 1rem;
  user-select: none;
  transition: all 200ms;
  overflow: hidden;

  :hover {
    text-shadow: 0 0 1rem ${({ theme }) => theme.white};
  }

  &.hide-promo {
    background: rgba(232, 236, 240, 0);
    width: 50px;
    cursor: pointer;
    right: 0.5rem;
    .promo-content {
      transition: opacity 100ms;
      opacity: 0;
      pointer-events: none;
    }
  }

  .close-btn {
    position: absolute;
    left: 1rem;
    top: 1.25rem;
    z-index: 1;
    button {
      transition: transform 250ms;
      :hover {
        color: ${({ theme }) => theme.red[0]};
        transform: rotate(90deg);
      }
    }
  }
  .promo-content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    opacity: 1;
    pointer-events: initial;
    transition: opacity 500ms;
    a {
      transition: all 200ms;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.secondary[400]};
      text-shadow: 0 0 0.25rem ${({ theme }) => theme.black};
      backdrop-filter: blur(0px);
      line-height: 1.25em;
      margin-top: 3rem;
      font-weight: 900;
      letter-spacing: 1.25px;
      border-radius: 2rem;

      .learn-more-text {
        font-size: 0.8rem;
        font-weight: 500;
        width: 100%;
      }

      :hover {
        /* color: ${({ theme }) => theme.secondary[200]}; */
        text-decoration: underline;
      }
      :active {
        transition: all 75ms;
        /* color: ${({ theme }) => theme.secondary[900]}; */
      }
    }
  }

  @media screen and (max-width: 768px) {
    top: calc(${({ theme }) => theme.navHeight}px - 2.5rem);
  }
`;

export default AtlantaPromo;
