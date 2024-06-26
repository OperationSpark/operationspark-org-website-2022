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
    <BgImg src='/images/display/classroom-2.webp'>
      <ImgCardStyles>
        <Content className='top-card-content'>
          <div className='row-between'>
            <div className='secondary header-content'>
              <h2 className='dynamic-h2 text-shadow'>WE ARE CHANGING LIVES WITH</h2>
              <h1 className='dynamic-xl text-shadow'>
                COMPUTER <br /> PROGRAMMING <br /> SKILLS
              </h1>
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
