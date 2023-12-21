import { NextPage } from 'next';
import Image from "next/legacy/image";
import { useState } from 'react';
import { BsArrowRightSquareFill } from 'react-icons/bs';
import { IoMdCloseCircle } from 'react-icons/io';
import styled from 'styled-components';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { BgImg } from '@this/src/components/Elements';
import Button from '@this/src/components/Elements/Button';
import { TwoColumns } from '@this/src/components/Elements/Columns';
import SocialNetworks from '@this/src/components/Elements/SocialNetworks';
import Spinner from '@this/src/components/Elements/Spinner';
import { Center } from '@this/src/components/layout/Center';
import rgbDataURL from '@this/src/helpers/rgbDataURL';
import { cardShadow } from '@this/src/theme/styled/mixins/shadows';
import Link from 'next/link';

const GetInvolved: NextPage = () => {
  const [showDonate, setShowDonate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowDonate = () => {
    setLoading(true);
    setShowDonate(true);
    setTimeout(() => setLoading(false), 2000);
  };

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
                  <Link className='primary-secondary' href='/contact'>
                    {'please get in touch here'}
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
                  <Link className='primary-secondary' href='/contact'>
                    {'please get in touch here'}
                  </Link>
                  .
                </h3>
              </div>
            }
          />
        </Content>
        <Content>
          <h2 className='dynamic-h1 primary-secondary text-center'>Give</h2>
          <div className='donation-methods'>
            <div className='donate-box'>
              <div className='donate-wrapper' title='Donate to Operation Spark'>
                <p className='dynamic-txt desc'>
                  We depend on dedicated individuals and organizations to run our programs.
                </p>
                <p className='dynamic-txt desc'>
                  <b>Your donation can make the following possible:</b>
                </p>
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
                <Button color='yellow' onClick={handleShowDonate}>
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
          </div>
          {showDonate && (
            <div className='donate-modal' onClick={() => setShowDonate(false)}>
              <div className='iframe-wrapper' onClick={(e) => e.stopPropagation()}>
                <div className='overlay-btn'>
                  <Button onClick={() => setShowDonate(false)}>
                    <IoMdCloseCircle size={30} />
                  </Button>
                </div>
                <div className='donation-loading-spinner' hidden={!loading}>
                  <Center style={{ width: '400px', height: '500px' }}>
                    <Spinner />
                  </Center>
                </div>
                <iframe
                  src='https://commitchange.com/nonprofits/3745/donate?offsite=t&amp;origin=http://operationspark.org/#!/donate'
                  width='400px'
                  height='500px'
                  hidden={loading}
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
  a.primary-secondary:hover {
    text-decoration: underline;
  }
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

    .donation-loading-spinner {
      background: ${({ theme }) =>
        theme.isLightMode ? 'rgba(251,251,251,1)' : 'rgba(29, 29, 29, 1)'};
      color: ${({ theme }) => theme.fg};
      border-radius: 0.5rem;
      box-shadow: 0 0 0.5rem
        ${({ theme }) => (theme.isLightMode ? 'rgba(0,0,0,0.5)' : 'rgba(0, 0, 0, 1)')};
    }
    .iframe-wrapper {
      margin: 1rem;
      position: relative;
      border-radius: 0.5rem;
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
          theme.isLightMode
            ? 'invert(0) hue-rotate(-240deg) drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.5))'
            : 'invert(0.9) grayscale(100%) drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.8))'};
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
    background: ${({ theme }) => theme.bg};
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
        width: 100%;
      }
      .tax-deduct {
        color: ${({ theme }) => (theme.isLightMode ? theme.grey[700] : theme.grey[500])};
        font-size: 0.8rem;
        padding-top: 0.5rem;
      }
      a.anchor {
        display: flex;
        align-items: center;
        .icon {
          margin-left: 0.25rem;
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
