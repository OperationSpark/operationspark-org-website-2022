import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { cardShadow } from '@this/src/theme/styled/mixins/shadows';
import { IoMdCloseCircle as CloseIcon } from 'react-icons/io';
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';

import Content from '@this/components/layout/Content';
import { useClickAway } from '@this/src/hooks/useClickAway';

const COEBox = () => {
  const [coeInfoRef, showCoeInfo, setShowCoeInfo] = useClickAway();

  return (
    <COEBoxStyles
      animate={{ paddingBottom: showCoeInfo ? '18rem' : '1rem' }}
      transition={{ type: 'tween', duration: 0.1 }}
    >
      <Content className='coe-box-content'>
        <div className='overflow-box'>
          <div className='overflow-content'>
            <p className='dynamic-txt coe-header blurry-box'>
              Operation Spark is applying to become a candidate for accreditation with the
              Commission of the Council on Occupational Education.{' '}
              <button className='anchor' onClick={() => setShowCoeInfo(!showCoeInfo)}>
                Learn more
              </button>
              <button className='info-button' onClick={() => setShowCoeInfo(!showCoeInfo)}>
                <InfoIcon size={18} />
              </button>
            </p>
            <AnimatePresence>
              {showCoeInfo && (
                <motion.div
                  className='overflow-info-box'
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'tween', duration: 0.1 }}
                >
                  <div className='overflow-info-box-content blurry-box' ref={coeInfoRef}>
                    <button className='info-button close' onClick={() => setShowCoeInfo(false)}>
                      <CloseIcon size={20} />
                    </button>
                    <p className='dynamic-txt primary-secondary'>
                      Operation Spark is applying to become a candidate for accreditation with the
                      Commission of the Council on Occupational Education.{' '}
                    </p>
                    <p className='dynamic-txt' style={{ marginTop: '1rem' }}>
                      <b>Anyone wishing to make comments should either:</b>
                    </p>
                    <ul className='dynamic-txt' style={{ paddingLeft: '1rem' }}>
                      <li>
                        Write to the Executive Director of the Commission:
                        <div
                          style={{
                            userSelect: 'all',
                            fontSize: '1rem',
                            paddingLeft: '1rem',
                          }}
                        >
                          <b>
                            Council on Occupational Education <br />
                            7840 Roswell Road
                            <br />
                            Building 300, Suite 325
                            <br />
                            Atlanta, Georgia 30350
                            <br />
                          </b>
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
                          council.org
                        </a>
                      </li>
                    </ul>
                    <p className='dynamic-txt'>
                      <b>Anyone making comments must provide their name and mailing address.</b>
                    </p>
                  </div>
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
  .coe-box-content {
    font-family: 'Ubuntu', sans-serif;
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    padding: 1rem;
    padding-bottom: 4rem;

    h1 {
      line-height: 1.25em;
    }

    h2 {
      padding-bottom: 1rem;
    }
    .blurry-box {
      ${cardShadow};
      padding: 0.75rem 0.5rem;
      backdrop-filter: blur(8px);
      border-radius: 0.25rem;
    }
  }
  .overflow-box {
    position: relative;
    padding: 1rem 0;
    margin-bottom: 3rem;
    .info-button {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.25rem;
      color: ${({ theme }) => theme.magenta[200]};
      :hover {
        color: ${({ theme }) => theme.magenta[400]};
      }
    }
    .info-button.close {
      color: ${({ theme }) => theme.red[300]};
      :hover {
        color: ${({ theme }) => theme.red[400]};
      }
    }
    .overflow-content {
      position: absolute;
      width: 100%;
      .coe-header {
        background: ${({ theme }) => theme.alpha.bg};
        width: calc(400px + 15vw);
        max-width: 100%;
        margin: 0 auto;
        padding: 0.5rem 0.5rem;
        padding-right: 1.5rem;
      }
      .overflow-info-box {
        position: absolute;
        width: 100%;
        top: 0;
        display: flex;
        justify-content: center;
        .overflow-info-box-content {
          overflow: hidden;
          li {
            padding-bottom: 0.5rem;
          }
          max-width: 100%;
          width: calc(400px + 15vw);
          background: ${({ theme }) => theme.alpha.bg};
          padding: 0.5rem;
          padding-right: 1.5rem;
        }
      }
    }
  }
`;
