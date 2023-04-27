import styled from 'styled-components';

import Content from '@this/components/layout/Content';
import { cardShadowLtr } from '@this/src/theme/styled/mixins/shadows';
import PlainCard from '../Cards/PlainCard';
import { toCentTime } from '@this/src/helpers/timeUtils';

const PromoVideo = () => {
  const localTimeCst = toCentTime(new Date());
  const endTimeCst = toCentTime('4/27/2023 18:00');
  // Remove when event is over
  if (localTimeCst > endTimeCst) {
    return null;
  }

  return (
    <PromoVideoStyles>
      <Content>
        <PlainCard>
          <div className='promo-video-header'>
            <h1 className='dynamic-h1 text-center primary-secondary'>Operation Spark Open House</h1>
            <p className='dynamic-txt'>
              {`Students and their families can learn more about Operation Spark's High School to High
            Wage programs, its nationally recognized and accredited industry-level training, and its
            High School Coding Classes and Summer Camps. "If you are a high school student
            interested in learning to build video games, websites, or apps and want to pursue a
            career in tech, you should attend this Open House," said Operation Spark CEO John
            Fraboni. "You can turn that love for technology into a life-long, high-wage career less
            than eight months after high school". Join us on April 27th from 5:30pm - 7:00pm to learn more!`}
            </p>
            <p className='dynamic-txt promo-register-link'>
              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLSfVXe_KPa7UH3W7V19kYKeyOaAPz16YUBDa3Ri6MlB7aQ0_3Q/viewform'
                className='anchor right-arr-left'
                target='_blank'
                rel='noreferrer'
              >
                Register here!
              </a>
            </p>
            <div className='promo-time-location'>
              <p className='dynamic-txt text-center'>
                <a
                  href='https://docs.google.com/forms/d/e/1FAIpQLSfVXe_KPa7UH3W7V19kYKeyOaAPz16YUBDa3Ri6MlB7aQ0_3Q/viewform'
                  className='anchor'
                  target='_blank'
                  rel='noreferrer'
                >
                  514 Franklin Avenue New Orleans, LA 70117
                </a>
              </p>
              <p className='dynamic-txt text-center'>April 27th from 5:30pm - 7:00pm</p>
            </div>
          </div>
          <div className='promo-video'>
            <video width='100%' height='auto' controls>
              <source
                src='https://player.vimeo.com/progressive_redirect/playback/819925012/rendition/source/file.mp4?loc=external&signature=b29637b91bb568525309a8a368a76b03b7d6443e8af33015a379bacb61dde708'
                type='video/mp4'
              />
              Your browser does not support this video.
            </video>
          </div>
        </PlainCard>
      </Content>
    </PromoVideoStyles>
  );
};

export default PromoVideo;

const PromoVideoStyles = styled.div`
  .promo-time-location {
    ${cardShadowLtr}
    width: fit-content;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    a {
      font-size: 1em;
    }
  }
  .promo-video {
    max-width: 800px;
    margin: 0 auto;
    video {
      border-radius: 0.5rem;
      filter: drop-shadow(
        0 0 1rem ${({ theme }) => (theme.isLightMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1)')}
      );
    }
  }
  .promo-video-header {
    margin-bottom: 2rem;
  }
  .promo-register-link {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    a {
      font-size: 1em;
      padding: 0;
      padding-right: 0.25rem;
    }
  }
`;
