import { NextPage } from 'next';
import styled, { useTheme } from 'styled-components';

import logos from '@this/data/logos.json';

import { Content, Main, Section } from '@this/components/layout';
import PlainCard from '@this/src/components/Cards/PlainCard';
import { BgImg } from '@this/src/components/Elements';
import Carousel from '@this/src/components/Elements/Carousel';
import { SlashDivider } from '@this/src/components/Elements/SlashDivider';
import { Center } from '@this/src/components/layout/Center';
import NavLink from '@this/src/components/Navbar/elements/NavLink';
import { Img } from '@this/src/Typography/elements/Html';
import { motion } from 'framer-motion';

const partners = logos.partners;

const CohortSchedule: NextPage = () => {
  const theme = useTheme();
  const urbanLeagueLogo = partners.find((partner) => partner.name === 'Urban League of Louisiana');

  return (
    <Main style={{ paddingTop: 0 }}>
      <CohortScheduleStyles>
        <BgImg src='/images/display/future.webp' height='40rem'>
          <Section className='programs-header'>
            <Content className='programs-header-content'>
              <h1 className='dynamic-xl secondary text-center'>Future Students</h1>
              <h3 className='dynamic-h3 text-center'>Enroll at Operation Spark!</h3>
              <p
                className='dynamic-txt text-center'
                style={{ marginTop: '2rem', maxWidth: '600px' }}
              >
                {`Learn to code in less than a year! With escalated intensity and learning geared toward the current industry, our grads are prepared to take on the world of software engineering.`}
              </p>
            </Content>

            <Center className='video-wrapper'>
              <motion.div
                className='video-container'
                initial={{ opacity: 0, x: 0, y: 150, scale: 0.6 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ type: 'tween', duration: 0.8 }}
              >
                <video width='100%' height='auto' controls>
                  <source
                    src='https://player.vimeo.com/progressive_redirect/playback/721476393/rendition/1080p/file.mp4?loc=external&signature=a21ad59e5f01881f352c50593562321d778b43fbda9f6577e4270e699706f46b'
                    type='video/mp4'
                  />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </Center>
          </Section>
        </BgImg>
        <div className='top-spacer'></div>
        <Content className='main-future-students-content'>
          <p className='dynamic-txt'>
            {`The Operation Spark workforce program is less than a year of escalated intensity learning geared toward getting each student a full time job in software engineering. Through each step of the program our students will learn more about software, how it is created and how it works.`}
          </p>

          <p className='dynamic-txt'>
            {`Our students come from a diverse set of backgrounds in term of age, gender, race and education. Most were born in SE Louisiana, over half have college degrees and the majority have some form of professional experience in the workplace. All of our students are  highly driven, passionate software engineers who enjoy creative problem solving and the endless pursuit of writing clean concise code.`}
          </p>

          <p className='dynamic-txt'>
            {`At Operation Spark, our graduates are not just trained, they're battle-tested in Full Stack Javascript. Ready to hit the ground running on Day One. We have Alumni employed at many companies, including:`}
          </p>
          <Carousel logos={partners} />

          <SlashDivider style={{ margin: '3rem 0', height: '0.5rem' }} />

          <h2 className='dynamic-h2' style={{ marginBottom: '1rem' }}>
            Cost and Financial Aid Options for You at OS
          </h2>

          <p className='dynamic-txt' style={{ padding: '0.5rem 1rem' }}>
            {`We understand that financial barriers can stand in the way of your goals. That's why we offer various tuition assistance options to help cover the cost of your training. Our funder partners want to assist those that will benefit the most so allow your financial barriers to propel you into career success! Operation Spark will explore and work with you to help secure funding, grants, and scholarship opportunities such as:`}
          </p>
          <ul className='dynamic-txt'>
            <li>{`WIOA Grants`}</li>
            <li>{`SNAP Grants`}</li>
            <li>{`Operation Spark Scholarship`}</li>
            <li>{`Other Federal and State Grants`}</li>
            <li>{`Loans that you don't have to repay until you leave Operation Spark`}</li>
          </ul>

          <SlashDivider style={{ margin: '3rem 0', height: '0.5rem' }} />

          <h2 className='dynamic-h2'>Getting Ready for Operation Spark</h2>
          <Content style={{ paddingLeft: '0.25rem' }}>
            <p className='dynamic-txt' style={{ marginBottom: '2rem' }}>
              {`The importance of being ready for Operation Spark and need for support before you fully enroll in the Program or bootcamp`}
            </p>

            <PlainCard>
              <Center direction='column' style={{ gap: '1rem' }}>
                <a href='https://urbanleaguela.org/strive-core-training' target='_blank'>
                  <Img
                    src={theme.isLightMode ? urbanLeagueLogo?.logoLight : urbanLeagueLogo?.logoDark}
                    alt={urbanLeagueLogo?.name}
                    style={{ maxWidth: '300px' }}
                  ></Img>
                </a>
                <p
                  className='dynamic-h3 text-center'
                  style={{ maxWidth: '600px', fontWeight: 400 }}
                >
                  {`Operation Spark and Urban League of Louisiana have collaborated as the service providers for YDP participants who are interested in careers in technology.`}
                </p>
                <p className='dynamic-txt text-center'>
                  <a
                    className='anchor dynamic-txt right-arr-left'
                    href='https://urbanleaguela.org/strive-core-training'
                    target='_blank'
                  >
                    urbanleaguela.org
                  </a>
                </p>

                <NavLink
                  className='info-session-signup-btn'
                  href={'/programs/workforce/infoSession'}
                  title='Info Session Sign Up'
                  target='_blank'
                  color='yellow'
                >
                  Sign up for an info session!
                </NavLink>
              </Center>
            </PlainCard>
          </Content>
        </Content>
      </CohortScheduleStyles>
    </Main>
  );
};

export default CohortSchedule;

export const CohortScheduleStyles = styled.div`
  cursor: default;

  .programs-header {
    height: 100%;
    padding: 1rem;
    padding-top: ${({ theme }) => theme.navHeight + 32}px;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .programs-header-content {
    width: fit-content;
    padding: 1rem 2rem;
    margin-bottom: 0.5rem;
    border-radius: 1rem;
    color: ${({ theme }) => theme.white};
    transition: all 225ms;

    background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg : theme.alpha.bg)};
    box-shadow: ${({ theme }) => {
      const lm = theme.isLightMode;
      return `
      -1rem 1rem 2rem 0rem ${lm ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.5)'},
      -4px 4px 8px 1px inset ${lm ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.5)'}
      `;
    }};

    border: 0.25rem solid ${({ theme }) => theme.primary[theme.isLightMode ? 400 : 800]};
    @supports (backdrop-filter: blur(0.5rem)) {
      backdrop-filter: blur(0.5rem);
      -webkit-backdrop-filter: blur(0.5rem);
      background: ${({ theme }) => (theme.isLightMode ? theme.alpha.fg25 : theme.alpha.bg25)};
    }
  }

  .video-wrapper {
    margin: 0 auto;
    width: 600px;
    max-width: 100%;
    position: relative;
    aspect-ratio: 32 / 9;
  }
  .video-container {
    position: absolute;
    top: 0;
    display: flex;
    width: 600px;
    max-width: 100%;
    align-items: flex-end;
    margin: 0 auto;
    margin-top: 3rem;
    border-radius: 0.5rem;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    border: 3px solid ${({ theme }) => theme.primary[theme.isLightMode ? 600 : 900]};
    filter: drop-shadow(
      -0.25rem 0.25rem 1rem ${({ theme }) => (theme.isLightMode ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 1)')}
    );
    video {
      border-radius: 0.25rem;
    }
  }

  .top-spacer {
    width: 100%;
    max-width: calc(300px + 40vw);
    aspect-ratio: 36 / 9;
    /* pointer-events: none; */
    user-select: none;
    -webkit-user-select: none;
  }

  .main-future-students-content {
    max-width: 900px;
    margin: 0 auto;
    p {
      margin-bottom: 1rem;
    }
    min-height: 100vh;
    margin-bottom: 2rem;
  }

  .info-session-signup-btn {
    font-size: 1.5rem;
    font-weight: 700;
    padding: 1rem;
    width: 100%;
    border-radius: 1.5em;

    a {
      justify-content: center;
    }
  }
`;
