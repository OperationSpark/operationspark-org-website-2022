import Image from 'next/legacy/image';
import { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { IoMdCloseCircle as CloseIcon } from 'react-icons/io';
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';
import { MdOpenInNew as NewTabIcon } from 'react-icons/md';

import { Content } from '@this/components/layout';
import { cardShadow } from '@this/src/theme/styled/mixins/shadows';

const COEBox = () => {
  const [showCoeInfo, setShowCoeInfo] = useState(false);

  return (
    <COEBoxStyles>
      <Content className='overflow-box'>
        <div className='overflow-content'>
          <div className='overflow-info-box'>
            <button
              className={`info-button ${showCoeInfo ? 'close' : ''}`}
              onClick={() => setShowCoeInfo(!showCoeInfo)}
            >
              {!showCoeInfo ? <InfoIcon size={20} /> : <CloseIcon size={20} />}
            </button>
            <p className='dynamic-txt'>
              Operation Spark is applying for initial accreditation with the Commission of the
              Council on Occupational Education.
            </p>

            <motion.button
              className='anchor'
              onClick={() => setShowCoeInfo(!showCoeInfo)}
              animate={{ opacity: !showCoeInfo ? 1 : 0 }}
              style={{ pointerEvents: !showCoeInfo ? 'auto' : 'none' }}
              tabIndex={!showCoeInfo ? undefined : -1}
            >
              Learn more
            </motion.button>

            <AnimatePresence>
              {showCoeInfo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'fit-content', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className='coe-images'>
                    <Image
                      src='/images/os/logo-halle-no-banner.webp'
                      width={100}
                      height={100}
                      objectFit='contain'
                      alt='Operation Spark Banner | operationspark.org'
                    />
                    <a
                      href='https://council.org/'
                      target='_blank'
                      rel='noreferrer'
                      className='img-link'
                    >
                      <Image
                        src='/images/logos/etc/council-org-logo.svg'
                        width={100}
                        height={100}
                        alt='COE | council.org'
                      />
                    </a>
                  </div>
                  <p className='dynamic-txt primary-secondary'>
                    <b>Persons wishing to make comments should either</b>
                  </p>
                  <ul style={{ paddingLeft: '1rem' }}>
                    <li>
                      Write to the Executive Director of the Commission
                      <div className='coe-address'>
                        <p>Council on Occupational Education</p>
                        <p>7840 Roswell Road</p>
                        <p>Building 300, Suite 325</p>
                        <p>Atlanta, Georgia 30350</p>
                      </div>
                    </li>

                    <li>
                      Submit comments through the Council’s website{' '}
                      <a
                        className='anchor'
                        href='https://council.org/'
                        target='_blank'
                        rel='noreferrer'
                      >
                        <span
                          className='roboto'
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gridGap: '0.25rem',
                          }}
                        >
                          council.org <NewTabIcon />
                        </span>
                      </a>
                    </li>
                  </ul>
                  <p>
                    Persons making comments must provide their
                    <em>
                      <b> name </b>
                    </em>
                    and
                    <em>
                      <b> mailing address</b>
                    </em>
                    .
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Content>
    </COEBoxStyles>
  );
};

export default COEBox;

export const COEBoxStyles = styled(motion.div)`
  .coe-address {
    font-size: 1rem;
    margin-top: 0.5rem;
    padding-left: 0.5rem;
    margin-left: 0.5rem;
    border-left: 1.5px solid
      ${({ theme }) => (theme.isLightMode ? theme.primary[0] : theme.secondary[0])};
    p {
      font-weight: 300;
      line-height: 1.25em;
    }
  }
  .coe-images {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1rem;
    a {
      transition: 200ms;
      filter: drop-shadow(0 0 0rem ${({ theme }) => theme.alpha.fg});
    }
    a:hover {
      filter: drop-shadow(0 0.2rem 0.2rem ${({ theme }) => theme.alpha.fg});
      transform: translateY(-0.2rem);
    }
    * {
      user-select: none;
      -webkit-user-drag: none;
    }
  }
  .overflow-box {
    position: relative;
    padding: 1rem;

    .info-button {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.25rem;
      border-radius: 0.25rem;
      color: ${({ theme }) => theme.magenta[200]};
      outline: none;
      :hover {
        color: ${({ theme }) => theme.magenta[400]};
      }
      :focus-visible {
        box-shadow: 0 0 2px 2px ${({ theme }) => theme.secondary[700]} inset;
      }
    }
    .info-button.close {
      color: ${({ theme }) => theme.red[300]};
      :hover {
        color: ${({ theme }) => theme.red[400]};
      }
    }
  }
  .overflow-content {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    .coe-header {
      background: ${({ theme }) => theme.alpha.bg};
      width: calc(400px + 15vw);
      max-width: 100%;
      margin: 0 auto;
      padding: 0.5rem 1.5rem;
    }
    .overflow-info-box {
      ${cardShadow};
      border-radius: 0.5rem;
      position: relative;
      overflow: hidden;
      ul {
        list-style: none;
        padding-left: 0 !important;
      }
      li {
        padding: 0.5rem;
        margin: 0.5rem 0;
        box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg50};
        border-radius: 0.25rem;
        align-self: start;
        font-weight: 500;
        .anchor {
          font-size: 1em;
        }
      }
      max-width: 100%;
      width: calc(400px + 15vw);
      background: ${({ theme }) => theme.alpha.bg};
      padding: 0.5rem 1.5rem;
    }
  }
`;
