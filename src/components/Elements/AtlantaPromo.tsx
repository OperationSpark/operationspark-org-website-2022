import { CSSProperties, FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { useMounted } from '@this/src/hooks/useMounted';
import { XIcon } from '../icons/XIcon';
import { ExpandIcon } from '../icons/Expand';
import Link from 'next/link';

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
          {hidePromo ? (
            <div className='open-btn'>
              <ExpandIcon size={24} weight={2} className='expand-icon' />
            </div>
          ) : (
            <div className='close-btn' title='Close Promo'>
              <button onClick={handleClose} name='Close alert bar' aria-label='Close alert bar'>
                <XIcon size={32} weight={2} className='close-icon' />
              </button>
            </div>
          )}

          <Image
            src='/images/display/peach.png'
            width='400px'
            height='400px'
            alt='Peach'
            style={{ maxWidth: '100%', opacity: 0.75 }}
          />

          <div className='promo-content'>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <Link href='/programs/workforce/infoSession'>
              <a>
                Live in Georgia? Sign up here!
                <div className='learn-more-text'>Click to learn more</div>
              </a>
            </Link>
          </div>
        </AtlantaPromoStyles>,
        document.getElementById('atlanta-promo-root')!,
      );
};

const AtlantaPromoStyles = styled(motion.div)`
  position: fixed;
  width: 256px;
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
    width: 48px;
    cursor: pointer;
    right: 0.5rem;
    .promo-content {
      transition: opacity 100ms;
      opacity: 0;
      pointer-events: none;
    }

    .open-btn {
      transition: all 250ms;
      color: ${({ theme }) => theme.secondary[700]};
    }
    :hover {
      .open-btn {
        transition: all 250ms;
        color: ${({ theme }) => theme.green[0]};
        transform: rotate(-90deg);
      }
    }
  }

  .close-btn {
    position: absolute;
    right: 1rem;
    top: 1.25rem;
    z-index: 1;
    button > .close-icon {
      transition: all 250ms;
      :hover {
        color: ${({ theme }) => theme.red[0]};
        transform: rotate(90deg);
      }
    }
  }

  .open-btn {
    position: absolute;
    inset: 0;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .promo-content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem 1.5rem;
    opacity: 1;
    pointer-events: initial;
    transition: opacity 500ms;
    a {
      padding: 1rem 0;
      transition: all 400ms;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.secondary[400]};
      text-shadow: 0 0 0.25rem ${({ theme }) => theme.black};
      filter: drop-shadow(0 0 0.25rem ${({ theme }) => theme.secondary[900]});
      box-shadow: 0rem 0rem 0.1rem ${({ theme }) => theme.secondary[900]},
        0rem 0rem 0.1rem ${({ theme }) => theme.secondary[800]};
      line-height: 1.25em;
      margin-top: 1.5rem;
      font-weight: 900;
      letter-spacing: 1.25px;
      border-radius: 2rem 2rem 3rem 3rem;
      backdrop-filter: blur(5px);
      .learn-more-text {
        font-size: 0.8rem;
        font-weight: 500;
        width: 100%;
      }

      :hover {
        filter: drop-shadow(0 0 1rem ${({ theme }) => theme.secondary[200]});
        box-shadow: 0.2rem 0.2rem 0.2rem ${({ theme }) => theme.secondary[900]},
          -0.2rem -0.2rem 0.2rem ${({ theme }) => theme.secondary[800]};
      }
      :active {
        transition: all 125ms;
        filter: drop-shadow(0 0 1rem ${({ theme }) => theme.secondary[900]});
        box-shadow: 0rem 0rem 0.1rem ${({ theme }) => theme.secondary[900]},
          0rem 0rem 0.1rem ${({ theme }) => theme.secondary[800]};
      }
    }
  }

  @media screen and (max-width: 768px) {
    top: calc(${({ theme }) => theme.navHeight}px - 2.5rem);
  }
`;

export default AtlantaPromo;