import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import Icon from '@this/components/Elements/Icon';

const CareersForAll = () => {
  return (
    <CareerForAllStyles>
      <div className='left-content'>
        <div className='icon-row'>
          <div className='icon-item'>
            <Icon icon='bank' />
            <p>Software jobs provide significant lifetime earnings.</p>
          </div>
          <div className='icon-item'>
            <Icon icon='laptop' />
            <p>You don&apos;t need a college degree to enter the field.</p>
          </div>
          <div className='icon-item'>
            <Icon icon='globe' />
            <p>Careers available in every industry across the world.</p>
          </div>
        </div>
        <div className='bottom-text'>
          <p>
            WE HELP STUDENTS WITH THEIR FIRST STEP INTO SOFTWARE DEVELOPMENT.
          </p>

          <Link href='#'>
            <a
              className='anchor right-arr-left'
              aria-label='Learn about job placement'
              title='Job Placement'
            >
              Learn more about job placement
            </a>
          </Link>
        </div>
      </div>
      <div className='halle-img'>
        <Image
          src='/images/hallebot-filled.webp'
          alt='hallebot'
          width={240}
          height={295}
        />
      </div>
    </CareerForAllStyles>
  );
};

export default CareersForAll;

const CareerForAllStyles = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  .left-content {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    width: 60%;
    .bottom-text {
      margin: 4rem 0;
      font-weight: bold;
      font-size: 0.9rem;
      a {
        color: ${({ theme }) =>
          theme.isLightMode ? theme.primary[700] : theme.primary[200]};
      }
    }
  }
  .icon-row {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
  .icon-item {
    display: flex;
    flex-flow: column;
    width: 150px;
    min-width: 150px;
    text-align: center;
    img {
      user-select: none;
      -webkit-user-drag: none;
    }
    p {
      font-weight: bold;
    }
  }
  .halle-img {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    user-select: none;
    * {
      -webkit-user-drag: none;
    }
    filter: drop-shadow(${({ theme }) => `0px 0px 1px ${theme.primary[200]}`});
  }
  @media screen and (max-width: 768px) {
    flex-flow: column;
    .halle-img {
      width: 100%;
      justify-content: center;
    }
    .icon-row {
      flex-flow: column;
    }
    .icon-item {
      flex-flow: row;
      width: 100%;
      max-width: 100%;
      align-items: center;
      padding-bottom: 1rem;
      p {
        padding-left: 2rem;
        text-align: left;
      }
    }
    .left-content {
      width: 100%;
    }
  }
`;
