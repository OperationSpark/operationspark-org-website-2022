import Link from 'next/link';
import styled from 'styled-components';

import BgImg from '@this/components/Elements/BgImg';
import Button from '@this/components/Elements/Button';
import Content from '@this/components/layout/Content';
import { cardShadow } from '@this/src/theme/styled/mixins/shadows';

const TopCard = () => {
  /** Remove once page is created */
  const FEAT_COLLEGE_CREDIT = false;
  return (
    <BgImg
      src='/images/display/showcase-5-8.png'
      overlay={{ bg: 'rgba(0,0,0,1)', opacity: 0.35 }}
      height='fit-content'
      minHeight='fit-content'
    >
      <ImgCardStyles>
        <Content className='top-card-content'>
          <div className='row-between'>
            <div className='header-content'>
              <h1 className='main-header-text'>
                Your Next Chapter Starts Here with our Coding Bootcamp for Beginners
              </h1>

              <p className='dynamic-txt main-header-subtext'>
                launch your tech career — earn an average starting salary of $67k
              </p>

              <Link
                href='/programs/workforce/infoSession'
                className='button-9 info-session-btn flex-center'
                style={{ maxWidth: '200px', paddingTop: '2rem', paddingBottom: '2rem' }}
              >
                get started
              </Link>
            </div>
            {FEAT_COLLEGE_CREDIT && (
              <div className='college-credit'>
                <div className='college-credit-box blurry-box'>
                  <p className='dynamic-txt college-credit-desc'>
                    Our certifications are eligible for college credit!
                  </p>
                  <Link href='/collegeCredit'>
                    <Button color='yellow'>{'Learn more'}</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Content>
      </ImgCardStyles>
    </BgImg>
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
  .main-header-text {
    font-size: 2rem;
    font-size: calc(1.7rem + 1vw);
    font-weight: 700;
    max-width: 670px; // Width by request of Max
  }
  .main-header-subtext {
    font-size: 1.25rem;
    font-weight: 500;
  }
  .header-content {
    display: flex;
    flex-flow: column;
    color: ${({ theme }) => theme.white};
    gap: 2rem;
  }

  .top-card-content {
    font-family: 'Ubuntu', sans-serif;
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    padding-top: ${({ theme }) => theme.navHeight + 36}px;
    padding-right: 5rem;

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
