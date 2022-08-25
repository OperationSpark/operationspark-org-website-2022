import Link from 'next/link';
import styled from 'styled-components';
import { cardShadow } from '@this/src/theme/styled/mixins/shadows';
import { IoMdCloseCircle as CloseIcon } from 'react-icons/io';
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';

import BgImg from '@this/components/Elements/BgImg';
import Button from '@this/components/Elements/Button';
import Content from '@this/components/layout/Content';
import { useClickAway } from '@this/src/hooks/useClickAway';

const TopCard = () => {
  const [coeInfoRef, showCoeInfo, setShowCoeInfo] = useClickAway();
  /** Remove once page is created */
  const FEAT_COLLEGE_CREDIT = false;
  return (
    <div style={{ marginBottom: '4rem' }}>
      <BgImg src='/images/display/classroom-2.webp' height='32rem'>
        <ImgCardStyles>
          <Content className='top-card-content'>
            <div className='row-between'>
              <div className='secondary'>
                <h2 className='dynamic-h2'>WE ARE CHANGING LIVES WITH</h2>
                <h1 className='dynamic-xl'>
                  COMPUTER <br /> PROGRAMMING <br /> SKILLS
                </h1>
              </div>
              {FEAT_COLLEGE_CREDIT && (
                <div className='college-credit'>
                  <div className='college-credit-box  blurry-box'>
                    <p className='dynamic-txt college-credit-desc'>
                      Our certifications are eligible for college credit!
                    </p>
                    <Link href='/collegeCredit' passHref>
                      <Button color='yellow'>Learn more</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className='overflow-box'>
              <div className='overflow-content'>
                <p className='dynamic-txt blurry-box coe-header'>
                  Operation Spark is applying to become a candidate for accreditation with the
                  Commission of the Council on Occupational Education.{' '}
                  <button className='anchor' onClick={() => setShowCoeInfo(!showCoeInfo)}>
                    Learn more
                  </button>
                  <button className='info-button' onClick={() => setShowCoeInfo(!showCoeInfo)}>
                    <InfoIcon size={18} />
                  </button>
                </p>
                {showCoeInfo && (
                  <div className='overflow-info-box'>
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
                  </div>
                )}
              </div>
            </div>
          </Content>
        </ImgCardStyles>
      </BgImg>
    </div>
  );
};

export default TopCard;

export const ImgCardStyles = styled.div`
  width: 100%;
  height: 100%;
  img {
    user-select: none;
  }
  display: flex;
  position: relative;

  .top-card-content {
    font-family: 'Ubuntu', sans-serif;
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;

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
    .college-credit {
      height: 100%;
      display: flex;
      align-items: flex-end;
      padding-left: 1rem;
      .college-credit-box {
        text-align: center;
        height: fit-content;
        width: 240px;
        max-width: 100%;
        margin-top: 1rem;

        .college-credit-desc {
          padding-bottom: 1rem;
          color: ${({ theme }) => theme.white};
        }
      }
    }
  }
  .overflow-box {
    position: relative;
    padding: 1rem 0;
    margin: 1rem 0;
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
  margin-bottom: 3rem;
  @media screen and (max-width: 768px) {
    .top-card-content {
      .college-credit {
        width: 100%;
        display: flex;
        justify-content: center;
        .college-credit-box {
          background: rgba(0, 0, 0, 0);
          width: 100%;
        }
      }
    }
  }
`;
