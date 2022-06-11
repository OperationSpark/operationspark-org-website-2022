import { NextPage } from 'next';
import styled, { useTheme } from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { BsArrowRightSquareFill } from 'react-icons/bs';
import { MdOpenInNew } from 'react-icons/md';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import rgbDataURL from '@this/src/helpers/rgbDataURL';
import Button from '@this/src/components/Elements/Button';
import { cardShadow } from '@this/src/theme/styled/mixins/shadows';
import { BgImg } from '@this/src/components/Elements';
import Link from 'next/link';
import SocialNetworks from '@this/src/components/Elements/SocialNetworks';
import { TwoColumns } from '@this/src/components/Elements/Columns';

const GetInvolved: NextPage = () => {
  const theme = useTheme();
  const [showDonate, setShowDonate] = useState(false);

  return (
    <Main style={{ paddingTop: 0 }}>
      <GetInvolvedStyles>
        <BgImg src='/images/display/donate.webp' height='24rem' overlay={{ blur: 3 }}>
          <Content className='image-header'>
            <h1 className='dynamic-xl secondary text-center'>HELP OPEN THE DOOR TO PROSPERITY</h1>
          </Content>
        </BgImg>
        <Content>
          <TwoColumns
            leftColStyle={{ width: '48%' }}
            rightColStyle={{ width: '48%' }}
            leftCol={
              <div style={{ padding: '1rem 0' }}>
                <h2 className='dynamic-h2 primary-secondary text-center'>Volunteer</h2>
                <h3 className='dynamic-h3' style={{ maxWidth: '600px', textAlign: 'center' }}>
                  At Operation Spark, we love when software engineers come and present on a topic or
                  technology being used in the industry. If you are interested,{' '}
                  <Link href='/contact'>
                    <a className='primary-secondary'>please get in touch here</a>
                  </Link>
                  .
                </h3>
              </div>
            }
            rightCol={
              <div style={{ padding: '1rem 0', maxWidth: '600px', textAlign: 'center' }}>
                <h2 className='dynamic-h2 primary-secondary text-center'>Hire Our Grads</h2>
                <h3 className='dynamic-h3'>
                  If you are interested in hiring our grads,{' '}
                  <Link href='/contact'>
                    <a className='primary-secondary'>please get in touch here</a>
                  </Link>
                  .
                </h3>
              </div>
            }
          />
        </Content>
        <Content>
          <h2 className='dynamic-h2 primary-secondary text-center'>Give</h2>
          <div className='donation-methods'>
            <div className='donate-box'>
              <div className='donate-wrapper' title='Donate to Operation Spark'>
                <p className='dynamic-txt desc'>
                  We depend on dedicated individuals and organizations to run our programs.
                </p>
                <p className='dynamic-txt desc'>Your donation can make the following possible:</p>
                <div className='donation-list'>
                  {[
                    [25, 'Our hosting bill for a month'],
                    [250, 'Chromebook for a student'],
                    [825, 'Bootcamp for one student'],
                  ].map(([amt, desc], i) => (
                    <p className='dynamic-txt primary-secondary li' key={`${amt}-${desc}-${i}`}>
                      <span className='amount'>${amt}</span>
                      <BsArrowRightSquareFill className='icon' size={18} /> {desc}
                    </p>
                  ))}
                </div>

                <div className='img'>
                  <Image
                    src={`/images/hallebot3d.png`}
                    layout='fill'
                    objectFit='contain'
                    alt='Amazon Smile | Operation Spark'
                    quality={100}
                    blurDataURL={rgbDataURL(134, 0, 241)}
                    loading='eager'
                    priority
                  />
                </div>
                <Button color='yellow' onClick={() => setShowDonate(!showDonate)}>
                  Donate to Operation Spark!
                </Button>
                <p className='tax-deduct'>
                  <span style={{ userSelect: 'none' }}>
                    Your donations are tax deductible. Our EIN is{' '}
                  </span>
                  <span title='EIN# 47-1514606'>47-1514606</span>
                </p>
              </div>
            </div>
            <div className='donate-box'>
              <a
                href='https://smile.amazon.com/ch/47-1514606'
                target='_blank'
                rel='noreferrer'
                title='Amazon Smile'
                className='donate-wrapper'
              >
                <p className='dynamic-txt'>
                  Shop at Amazon Smile and 0.5% of eligible purchases will be donated to Operation
                  Spark!
                </p>

                <div className='img'>
                  <Image
                    src={`/images/logos/etc/amazon-smile-halle-${theme.colorMode}.png`}
                    layout='fill'
                    objectFit='contain'
                    alt='Amazon Smile | Operation Spark'
                    quality={100}
                    blurDataURL={rgbDataURL(134, 0, 241)}
                    loading='eager'
                    priority
                  />
                </div>

                <button className='anchor'>
                  Shop Now!{' '}
                  <span className='icon'>
                    <MdOpenInNew />
                  </span>
                </button>
              </a>
            </div>
          </div>
          {showDonate && (
            <div className='donate-modal' onClick={() => setShowDonate(false)}>
              <div className='iframe-wrapper' onClick={(e) => e.stopPropagation()}>
                <div className='overlay-btn'>
                  <Button onClick={() => setShowDonate(false)}>
                    <IoMdCloseCircle size={30} />
                  </Button>
                </div>
                <iframe
                  src='https://commitchange.com/nonprofits/3745/donate?offsite=t&amp;origin=http://operationspark.org/#!/donate'
                  width='400px'
                  height='500px'
                ></iframe>
              </div>
            </div>
          )}
        </Content>
        <div style={{ paddingBottom: '2rem' }}>
          <h2 className='dynamic-h2 primary-secondary text-center'>Spread the word</h2>
          <SocialNetworks />
        </div>
      </GetInvolvedStyles>
    </Main>
  );
};

export default GetInvolved;

const GetInvolvedStyles = styled.div`
  .image-header {
    display: flex;
    align-items: flex-end;
    height: 100%;
  }
  .donate-modal {
    position: fixed;
    z-index: 1000;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    backdrop-filter: blur(3px);
    .iframe-wrapper {
      margin: 1rem;
      position: relative;
      .overlay-btn {
        position: absolute;
        z-index: 1;
        top: 1rem;
        right: 0.25rem;
        button {
          background: ${({ theme }) =>
            theme.isLightMode ? 'rgba(251,251,251,1)' : 'rgba(29, 29, 29, 1)'};
          color: ${({ theme }) => theme.fg};
          :hover {
            box-shadow: none;
            color: ${({ theme }) => theme.red[300]};
          }
        }
      }
      iframe {
        user-select: none;
        max-width: 100%;
        filter: ${({ theme }) =>
          theme.isLightMode ? 'invert(0) hue-rotate(-240deg)' : 'invert(0.9) grayscale(100%)'};
      }
    }
  }
  .donation-methods {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: stretch;
  }
  .donate-box {
    width: 500px;
    max-width: 100%;

    border-radius: 0.25rem;
    ${cardShadow};

    margin: 1rem;
    .donate-wrapper {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 1rem 2rem;

      p.desc {
        padding: 0.25rem 0;
      }
      .tax-deduct {
        color: ${({ theme }) => (theme.isLightMode ? theme.grey[700] : theme.grey[500])};
        font-size: 0.8rem;
        padding-top: 0.5rem;
      }
      button.anchor {
        display: flex;
        align-items: center;
        .icon {
          margin-left: 0.5rem;
        }
      }
    }
    .img {
      * {
        -webkit-user-drag: none;
        user-select: none;
      }
      overflow: hidden;
      position: relative;
      aspect-ratio: 3 / 1;
      width: 500px;
      max-width: 100%;
      height: 100%;
      border-radius: 0.5rem;
      transition: box-shadow 125ms;
    }
  }
  .donation-list {
    width: 100%;
    padding: 0.5rem 0;
    p.li {
      width: 100%;
      padding: 0.25rem 0;
      display: flex;
      align-items: center;
      .amount {
        width: 50px;
      }
      .icon {
        margin-right: 0.5rem;
      }
    }
  }
`;
