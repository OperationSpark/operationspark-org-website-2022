import Link from 'next/link';
import styled from 'styled-components';

import MacCard from '@this/components/Cards/MacCard';
import MacContent from '@this/components/Cards/content/MacContent';
import Content from '@this/components/layout/Content';

const AlumSpotlight = () => {
  /** Remove once page is created */
  const FEAT_GRAD_STORIES = false;
  return (
    <AlumSpotlightStyles className='_progress' id='alumni'>
      <Content>
        <h1 className='dynamic-xl' id='alumni'>
          ALUMNI SPOTLIGHT
        </h1>
        <div className='zap'></div>
        <div className='alum-content'>
          <div className='left-col'>
            <MacCard style={{ width: '600px', maxWidth: '100%' }}>
              <MacContent
                body='Organizations like Operation Spark can literally change the entire landscape and economy of places like New Orleans. I thank Operation Spark every day because they really impacted and changed my life.'
                imageUrl='/images/people/grads/alon.png'
                name='Alon Robinson'
                role='Software Engineer at General Electric'
              />
            </MacCard>
          </div>

          <div className='right-col'>
            <h2 className='dynamic-h2'>
              <i>
                &ldquo;I thank Operation Spark every day because they really impacted and changed my
                life.&rdquo;
              </i>
            </h2>

            {FEAT_GRAD_STORIES && (
              <Link href='/testimonials/graduates' className='anchor right-arr-left'>
                Read more graduate stories
              </Link>
            )}
          </div>
        </div>
      </Content>
    </AlumSpotlightStyles>
  );
};

export default AlumSpotlight;

export const AlumSpotlightStyles = styled.div`
  width: 100%;
  position: relative;
  padding: 1rem 0;
  background: ${({ theme }) => (theme.isLightMode ? theme.secondary[500] : theme.secondary[500])};
  background: ${({ theme }) => theme.secondary[500]};
  ${({ theme }) => `
    --secondary: ${theme.secondary[500]};
    --secondary2 ${theme.secondary[700]};

  `}
  background: var(--secondary2);

  background: linear-gradient(
    180deg,
    var(--secondary2) 0%,
    var(--secondary) 5%,
    var(--secondary) 95%,
    var(--secondary2) 100%
  );
  .zap {
    right: 0;
    top: 0;
    align-items: center;
    background-image: url('/images/zap.webp');
    background-repeat: no-repeat;
    background-size: 300px;
    background-position: center right;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
  .alum-content {
    display: flex;
    position: relative;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    height: 100%;
  }
  h1 {
    font-weight: 900;
    color: ${({ theme }) => theme.primary[700]};
    position: relative;

    z-index: 1;
  }
  .right-col {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 1rem;
    h2,
    .anchor {
      color: ${({ theme }) => theme.primary[700]};
    }
    .anchor:hover {
      color: ${({ theme }) => theme.primary[900]};
      box-shadow: 0 0 2px 0px ${({ theme }) => theme.primary[600]};
    }
    h2 {
      padding-bottom: 1em;
    }

    font-weight: bold;
  }
  .left-col {
    padding-right: 3rem;
    width: fit-content;
  }

  @media screen and (max-width: 1000px) {
    .alum-content {
      flex-flow: column;
      align-items: flex-start;
      background-size: 150px;
      background-position: bottom right;
      h1 {
        text-align: center;
        padding-bottom: 1em;
      }
    }
    .left-col {
      margin: 0 auto;
      padding-right: 0;
    }
    .right-col {
      padding-left: 0;
      width: 100%;
      display: flex;

      h2 {
        width: 60%;
        margin: 0 auto;
      }
      .anchor {
        margin-left: auto;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .right-col {
      h2 {
        width: 80%;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .right-col {
      h2 {
        width: 100%;
      }
    }
  }
`;
