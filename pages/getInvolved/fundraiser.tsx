import { NextPage } from 'next';
import styled from 'styled-components';

import SocialNetworks from '@this/elements/SocialNetworks';
import { BgImg } from '@this/elements/index';
import Content from '@this/layout/Content';
import Main from '@this/layout/Main';
import { Center } from '@this/src/components/layout/Center';

const GetInvolved: NextPage = () => {
  return (
    <Main style={{ paddingTop: 0 }}>
      <GetInvolvedStyles>
        <BgImg
          src='/images/display/halle-fundraiser.webp'
          height='30rem'
          overlay={{ position: 'center center' }}
        >
          <Content className='image-header'>
            <h1 className='dynamic-xl secondary'>[Page Title]</h1>
          </Content>
        </BgImg>

        <Content>
          <h2 className='dynamic-h1 primary-secondary text-center'>About this fundraiser</h2>
          <div className='about-fundraiser'>
            <p className='dynamic-txt'>
              [REPLACE ME] is teaming up with Operation Spark to host a fundraiser that supports our
              current and future students with tuition and living stipends. Operation Spark provides
              intensive training in software development to individuals from diverse backgrounds,
              equipping them with the skills needed to pursue successful careers in the tech
              industry.
            </p>

            <p className='dynamic-txt'>
              This fundraiser aims to alleviate financial barriers that students may face while
              attending our immersive program. By providing tuition assistance and living stipends,
              Operation Spark ensures that talented individuals who may not have the means to afford
              the program can still participate and benefit from the transformative learning
              experience
            </p>
          </div>
          <div style={{ paddingBottom: '2rem' }}>
            <h2 className='dynamic-h2 primary-secondary text-center'>Spread the word</h2>
            <SocialNetworks />
          </div>
          <Center>
            <div className='iframe-wrapper' onClick={(e) => e.stopPropagation()}>
              <div className='overlay-cover'></div>

              <iframe
                src='https://commitchange.com/nonprofits/3745/donate?offsite=t&amp;origin=http://operationspark.org/#!/donate'
                width='400px'
                height='500px'
              ></iframe>
            </div>
          </Center>
        </Content>
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

  .about-fundraiser {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;
    p {
      max-width: 600px;
    }
  }

  .iframe-wrapper {
    margin: 1rem;
    position: relative;
    border-radius: 0.5rem;
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
          ? 'invert(0) hue-rotate(-240deg) drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.5))'
          : 'invert(0.9) grayscale(100%) drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.8))'};
    }
  }
`;