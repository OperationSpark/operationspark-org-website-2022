import { CSSProperties, FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMounted } from '@this/src/hooks/useMounted';
import { IoMdClose as CloseIcon } from 'react-icons/io';

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
              <motion.button
                whileTap={{ translateY: 0 }}
                transition={{ type: 'tween', duration: 0.1 }}
                onClick={handleClose}
                name='Close alert bar'
                aria-label='Close alert bar'
              >
                <CloseIcon size={25} />
              </motion.button>
            </div>
          )}
          <Image
            src='/images/display/peach.png'
            width='400px'
            height='400px'
            alt='Peach'
            style={{ maxWidth: '100%' }}
          />
          {!hidePromo && (
            <div className='promo-content'>
              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLSeXLAXmPtJlm8lyM6jAMCppOR-XA93YoRdbiBXxeq339OXVkw/viewform'
                target='_blank'
                rel='noreferrer'
              >
                Now offering classes in Atlanta
                <div className='learn-more-text'>Click to learn more</div>
              </a>
            </div>
          )}
        </AtlantaPromoStyles>,
        document.getElementById('atlanta-promo-root')!,
      );
};

const AtlantaPromoStyles = styled(motion.div)`
  position: fixed;
  width: 200px;
  top: calc(${({ theme }) => theme.navHeight}px);
  right: 1rem;

  &.hide-promo {
    width: 32px;
    cursor: pointer;
    right: 0.5rem;
  }

  .close-btn {
    position: absolute;
    right: 0;
    top: 1rem;
    z-index: 1;
    button {
      :hover {
        color: ${({ theme }) => theme.red[0]};
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

    a {
      transition: all 200ms;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.secondary[0]};
      text-shadow: 0 0 0.25rem ${({ theme }) => theme.black};
      background: ${({ theme }) => (theme.isLightMode ? theme.alpha.bg25 : theme.alpha.fg25)};
      border-radius: 2rem;
      padding: 0.5rem;
      backdrop-filter: blur(3px);
      box-shadow: 0 0 0.25rem ${({ theme }) => theme.black};
      line-height: 1.25em;
      margin-top: 2.5rem;
      font-weight: 700;
      .learn-more-text {
        font-size: 0.8rem;
        width: 100%;
      }
      :hover {
        backdrop-filter: blur(3px);
        background: ${({ theme }) => (theme.isLightMode ? theme.alpha.bg : theme.alpha.fg)};
        box-shadow: 0 0 1rem ${({ theme }) => theme.black};
        color: ${({ theme }) => theme.secondary[900]};
        text-shadow: 0 0 0rem ${({ theme }) => theme.primary[0]};
      }
      :active {
        backdrop-filter: blur(1px);
        transition: all 75ms;
        background: ${({ theme }) => (theme.isLightMode ? theme.alpha.bg : theme.alpha.fg)};
        box-shadow: 0 0 0.1rem ${({ theme }) => theme.black};
        color: ${({ theme }) => theme.secondary[900]};
        text-shadow: 0 0 0rem ${({ theme }) => theme.primary[0]};
      }
    }
  }

  @media screen and (max-width: 768px) {
    top: calc(${({ theme }) => theme.navHeight}px - 2.5rem);
  }
`;

export default AtlantaPromo;
