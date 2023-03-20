import { CSSProperties, FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import { useMounted } from '@this/src/hooks/useMounted';
import { XIcon } from '../icons/XIcon';
import { ExpandIcon } from '../icons/Expand';
import Link from 'next/link';
import { InfoIcon } from '../icons/Info';
import { useClickAway } from '@this/src/hooks/useClickAway';

type AtlantaPromoProps = { style?: CSSProperties };
const AtlantaPromo: FC<AtlantaPromoProps> = ({ style }) => {
  const isMounted = useMounted();
  const [hidePromo, setHidePromo] = useState(false);
  const [promoInfoRef, showPromoInfo, setShowPromoInfo] = useClickAway();

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
              <button>
                <ExpandIcon size={24} weight={2} className='expand-icon' />
              </button>
            </div>
          ) : (
            <div className='close-btn close-promo' title='Close Promo'>
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
              <a className='promo-anchor'>
                Live in Georgia? Sign up here!
                <div className='learn-more-text'>Click to sign up</div>
              </a>
            </Link>
            <button className='promo-learn-more' onClick={() => setShowPromoInfo(true)}>
              <InfoIcon size={20} weight={2} />
              Learn more
            </button>
            <AnimatePresence>
              {showPromoInfo && (
                <motion.div
                  className='promo-more-info'
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ x: 1000, opacity: 0 }}
                  ref={promoInfoRef}
                >
                  <div className='close-btn' title='Close info'>
                    <button
                      onClick={() => setShowPromoInfo(false)}
                      name='Close info window'
                      aria-label='Close info window'
                    >
                      <XIcon size={24} weight={2} className='close-icon' />
                    </button>
                  </div>

                  <p>
                    Groundbreaking non-profit tech bootcamp, Operation Spark, is now approved by the
                    Georgia Non-Public Education Commission to offer training in the Peach State.
                    With over 300 graduates working in high-wage jobs at over 100 companies
                    worldwide, Operation Spark has effectively changed the trajectory of workforce
                    development for the software industry.
                  </p>
                  <p>
                    <i>
                      “Our success to date proves we have an effective, workable model that provides
                      accessible, industry-level training in software development”, said CEO John
                      Fraboni. “Operation Spark graduates enter high-wage employment with less than
                      a year of immersive training.”
                    </i>
                  </p>
                  <Link href='/programs/workforce/infoSession'>
                    <a className='anchor' style={{ margin: '0 auto' }}>
                      Sign up here!
                    </a>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
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
      button > .expand-icon {
        transition: all 250ms;
        color: ${({ theme }) => theme.secondary[700]};
      }
      :hover {
        button > .expand-icon {
          transition: all 250ms;
          color: ${({ theme }) => theme.green[0]};
          transform: rotate(-90deg);
        }
      }
    }
  }

  .close-btn {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    display: flex;
    height: fit-content;
    width: fit-content;
    &.close-promo {
      right: 1rem;
      top: 1.25rem;
    }
    :hover {
      button > .close-icon {
        color: ${({ theme }) => theme.red[0]};
        transform: rotate(90deg);
      }
    }
    button > .close-icon {
      border-radius: 50%;
      transition: all 250ms;
      padding: 0;
      pointer-events: none;
      :hover {
        color: ${({ theme }) => theme.red[0]};
        transform: rotate(90deg);
      }
    }
  }

  .open-btn {
    position: absolute;
    inset: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .promo-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem 1.5rem;
    gap: 0.5rem;
    opacity: 1;
    pointer-events: initial;
    transition: opacity 500ms;

    .promo-anchor {
      padding: 1rem 0;
      padding-bottom: 0;
      transition: all 250ms;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.secondary[400]};
      text-shadow: 0 0 0.25rem ${({ theme }) => theme.black};
      filter: drop-shadow(0 0 0.4rem ${({ theme }) => theme.secondary[900]});
      box-shadow: 0rem 0rem 0rem ${({ theme }) => theme.secondary[900]},
        0rem 0rem 0rem ${({ theme }) => theme.secondary[800]},
        0rem 0rem 0rem ${({ theme }) => theme.black} inset;
      line-height: 1.25em;
      margin-top: 1.5rem;
      font-weight: 900;
      letter-spacing: 1.25px;
      border-radius: 2rem;
      backdrop-filter: blur(3px);
      .learn-more-text {
        font-size: 0.8rem;
        font-weight: 500;
        width: 100%;
      }

      :hover {
        filter: drop-shadow(0 0 0.5rem ${({ theme }) => theme.secondary[200]});
        box-shadow: 0.1rem 0.1rem 0.2rem ${({ theme }) => theme.secondary[900]},
          -0.1rem -0.1rem 0.2rem ${({ theme }) => theme.secondary[800]},
          0rem 0rem 0rem ${({ theme }) => theme.black} inset;
      }
      :active {
        transition: all 125ms;
        filter: drop-shadow(0 0 1rem ${({ theme }) => theme.secondary[900]});
        box-shadow: 0rem 0rem 0.1rem ${({ theme }) => theme.secondary[900]},
          0rem 0rem 0.1rem ${({ theme }) => theme.secondary[800]},
          0rem 0rem 0.5rem ${({ theme }) => theme.black} inset;
      }
    }

    .promo-learn-more {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      gap: 0.25rem;
      font-weight: 500;
      color: ${({ theme }) => theme.secondary[400]};
    }
    .promo-more-info {
      p {
        user-select: text;
      }
      position: absolute;
      top: 1rem;
      right: 0;
      padding: 1rem;
      background: ${({ theme }) => theme.bgHover};
      display: flex;
      flex-flow: column;
      gap: 1rem;
      width: calc(100vw - 2rem);
      max-width: 500px;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 1;
      border-radius: 0.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    top: calc(${({ theme }) => theme.navHeight}px - 2.5rem);
  }
`;

export default AtlantaPromo;
