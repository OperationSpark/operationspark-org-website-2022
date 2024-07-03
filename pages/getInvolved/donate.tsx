import { NextPage } from 'next';
import styled from 'styled-components';

import { BgImg } from '@this/elements/index';
import Content from '@this/layout/Content';
import Main from '@this/layout/Main';
import ShareOnFacebookButton from '@this/src/components/Elements/ShareButtons/ShareFacebook';
import ShareOnLinkedinButton from '@this/src/components/Elements/ShareButtons/ShareLinkedin';
import { Center } from '@this/src/components/layout/Center';
import { BsArrowRightSquareFill } from 'react-icons/bs';
import { MdContentCopy as CopyIcon } from 'react-icons/md';
import { toast } from 'react-toastify';

const GetInvolved: NextPage = () => {
  const copyText = (text: string, message?: string) => {
    navigator.clipboard.writeText(text);
    toast.info(message ?? 'Copied to clipboard');
  };
  return (
    <Main style={{ paddingTop: 0 }}>
      <GetInvolvedStyles>
        <BgImg src='/images/display/donate.webp' height='24rem' overlay={{ blur: 3 }}>
          <Content className='image-header'>
            <h1 className='dynamic-xl secondary text-center'>HELP OPEN THE DOOR TO PROSPERITY</h1>
          </Content>
        </BgImg>

        <Content className='donate-box'>
          <div className='share-buttons'>
            <ShareOnLinkedinButton
              url={'https://www.operationspark.org/getInvolved/donate'}
              title={'Operation Spark Donations'}
              summary={`We depend on dedicated individuals and organizations to run our programs. Your donation can change someone's life!`}
              source={'Operation Spark'}
            />
            <ShareOnFacebookButton url={'https://www.operationspark.org/getInvolved/donate'} />
          </div>

          <div className='donate-wrapper' title='Donate to Operation Spark'>
            <p className='dynamic-txt desc text-center'>
              We depend on dedicated individuals and organizations to run our programs.
            </p>
            <p className='dynamic-txt desc text-center'>
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
            <div className='tax-deduct'>
              <p style={{ userSelect: 'none' }}>Your donations are tax deductible. </p>
              <p>
                {`Our EIN is `}
                <span title='EIN# 47-1514606'>47-1514606</span>
                <button
                  className='copy-btn'
                  onClick={() => copyText('47-1514606', 'Copied EIN to clipboard')}
                >
                  <CopyIcon size={12} />
                </button>
              </p>
            </div>
            <Center>
              <div className='iframe-wrapper' onClick={(e) => e.stopPropagation()}>
                <div className='overlay-cover'></div>
                <iframe
                  src='https://commitchange.com/nonprofits/3745/donate?offsite=t&amp;origin=https://operationspark.org/#!/donate'
                  width='400px'
                  height='500px'
                ></iframe>
              </div>
            </Center>
          </div>
        </Content>
      </GetInvolvedStyles>
    </Main>
  );
};

export default GetInvolved;

const GetInvolvedStyles = styled.div`
  .share-buttons {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0;
  }

  a.primary-secondary:hover {
    text-decoration: underline;
  }
  .image-header {
    display: flex;
    align-items: flex-end;
    height: 100%;
  }

  .iframe-wrapper {
    margin: 1rem;
    position: relative;
    width: fit-content;

    .overlay-cover {
      user-select: none;
      position: absolute;
      z-index: 1;
      top: 1rem;
      right: 0.25rem;
      width: 2rem;
      height: 2rem;
      /* Hardcoded colors are determined by the background of the inverted commit change form (iframe) */
      background: ${({ theme }) =>
        theme.isLightMode ? 'rgba(251, 251, 251, 1.00)' : 'rgba(29, 29, 29, 1.00)'};
    }
    iframe {
      user-select: none;
      max-width: 100%;
      filter: ${({ theme }) =>
        theme.isLightMode
          ? 'invert(0) hue-rotate(-240deg) drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.1))'
          : 'invert(0.9) grayscale(100%) drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.8))'};
    }
  }

  .donate-box {
    margin: 0 auto;
    width: 800px;
    max-width: 100%;

    border-radius: 1rem;
    background: ${({ theme }) => theme.bg};

    .donate-wrapper {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      height: 100%;

      p.desc {
        padding: 0.25rem 0;
        width: 100%;
        margin-bottom: 1rem;
      }
      .tax-deduct {
        color: ${({ theme }) => (theme.isLightMode ? theme.grey[700] : theme.grey[500])};
        font-size: 0.8rem;
        padding-top: 0.5rem;
        display: flex;
        flex-flow: row wrap;
        text-align: center;
        justify-content: center;
        align-items: center;
      }
      a.anchor {
        display: flex;
        align-items: center;
        .icon {
          margin-left: 0.25rem;
        }
      }
    }
  }
  .donation-list {
    padding: 0.5rem 0;
    p.li {
      padding: 0.25rem 0;
      display: flex;
      align-items: center;
      .amount {
        width: 60px;
      }
      .icon {
        margin-right: 1rem;
      }
    }
  }
  .copy-btn {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.alpha.fg50};
    font-size: 1rem;
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.fg};
    }
  }
`;
