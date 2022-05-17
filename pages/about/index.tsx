import { Fragment } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { shuffle } from 'underscore';

import { cardShadow } from '@this/src/theme/styled/mixins/shadows';
import { IAbout } from '@this/data/types/about';
import Main from '@this/components/layout/Main';
import Section from '@this/components/layout/Section';
import Content from '@this/components/layout/Content';
import { getStaticAsset } from '../api/static/[asset]';
import PlainCard from '@this/components/Cards/PlainCard';
import BgImg from '@this/components/Elements/BgImg';

const About: NextPage<IAbout> = ({ mission, team, history, awards }) => {
  return (
    <Main style={{ paddingTop: 0 }}>
      <AboutStyles>
        <Section className='about-header' style={{ paddingTop: 0 }}>
          <BgImg height='60rem' src='/images/display/staff-group.jpg'>
            <div
              style={{
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'flex-end',
                height: '100%',
              }}
            >
              <Content>
                <h1 className='dynamic-xl'>Our Mission</h1>
                <h2 className='dynamic-h3'>{mission.description}</h2>
                <Link href='/cultureOfCode'>
                  <a className='anchor'>Our Culture of Code</a>
                </Link>
              </Content>
            </div>
          </BgImg>
        </Section>
        <Section className='about-mission _progress' id='mission'>
          <Content>
            <div className='mission-section'>
              {mission.sections.map((section, i) => (
                <div key={section.title.join('')}>
                  <h2 className='dynamic-h2'>{section.title}</h2>
                  {section.description.map((desc) => (
                    <p key={desc} className='dynamic-txt'>
                      {desc}
                    </p>
                  ))}
                  {i < mission.sections.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </Content>
        </Section>
        <Section className='about-history _progress' id='history'>
          <Content>
            <h1 className='dynamic-h1'>History</h1>
            {history.map((desc) => (
              <p key={desc} className='dynamic-txt'>
                {desc}
              </p>
            ))}
          </Content>
        </Section>
        <Section className='about-team _progress' id='team'>
          <Content>
            <h1 className='dynamic-h1'>Team</h1>
            {shuffle(team.staff)
              .sort((a, b) =>
                !a.about.length
                  ? 1
                  : a.about.length === b.about.length
                  ? 0
                  : -1,
              )
              .map((member) => (
                <PlainCard key={member.name} className='team-member-card'>
                  <div className='team-member'>
                    <div className='team-member-img-container'>
                      <div className='team-member-img'>
                        <Image
                          layout='fill'
                          objectFit='cover'
                          src={member.image}
                          alt={member.name}
                        />
                      </div>
                    </div>
                    <div className='team-member-about'>
                      <div className='team-member-about-header'>
                        <h2 className='dynamic-h2 team-member-name'>
                          {member.name}
                        </h2>
                        <p className='team-member-role'> {member.role}</p>
                        {member.contact && (
                          <Fragment>
                            <p>
                              <a
                                className='anchor'
                                target='_blank'
                                href={`mailto:${member.contact.email}`}
                                rel='noreferrer'
                              >
                                {member.contact.email}
                              </a>
                            </p>
                            <p>
                              <a
                                className='anchor'
                                target='_blank'
                                href={`tel:${member.contact.phone}`}
                                rel='noreferrer'
                              >
                                {member.contact.phone}
                              </a>
                            </p>
                          </Fragment>
                        )}
                      </div>

                      <div style={{ padding: '1rem 0' }}>
                        {member.about.map((about) => (
                          <p
                            key={about}
                            style={{ padding: '0.5rem 0' }}
                            className='dynamic-txt team-member-bio'
                          >
                            {about}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </PlainCard>
              ))}
          </Content>
          <Content className='team-board-members'>
            <div className='members'>
              <h2 className='dynamic-h2'>Board of Directors</h2>
              {team.directors.map(({ name, role }) => (
                <div className='board-member' key={name + role}>
                  <h3 className='dynamic-h3 name'>{name}</h3>
                  <p className='dynamic-txt role'>
                    <i>{role}</i>
                  </p>
                </div>
              ))}
            </div>
          </Content>
          <Content className='about-awards _progress' id='Awards'>
            <h1 className='dynamic-h1'>News</h1>
            <div className='awards-list'>
              {awards.map(({ title, url }) => (
                <a
                  key={title}
                  className='anchor right-arr-left'
                  target='_blank'
                  href={url}
                  rel='noreferrer'
                >
                  {title}
                </a>
              ))}
            </div>
          </Content>
        </Section>
      </AboutStyles>
    </Main>
  );
};

export default About;

export const getStaticProps: GetStaticProps<IAbout> = async () => {
  const { mission, team, history, awards }: IAbout = await getStaticAsset(
    'about',
  );

  return {
    props: { mission, team, history, awards },
  };
};

const AboutStyles = styled.div`
  p {
    padding: 0.5rem 0;
  }
  h1,
  h2,
  h3 {
    color: ${({ theme }) =>
      theme.isLightMode ? theme.primary[700] : theme.secondary[500]};
  }
  .mission-section {
    ${cardShadow}
    border-radius: 0.25rem;
    margin: 1rem 0;
    padding: 2rem;
    hr {
      margin: 2rem 0;
      border-color: ${({ theme }) =>
        theme.isLightMode ? theme.primary[700] : theme.secondary[500]};
    }
  }
  .team-member-card {
    margin-bottom: 2rem;
  }
  .team-member {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    border-radius: 0.5rem;

    .s-divider {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .team-member-about {
    flex: 1;
    padding-left: 2rem;
    h3 {
      font-weight: 700;
    }
    p {
      padding: 0;
    }
  }
  .team-member-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .team-member-img {
      width: 200px;
      height: 200px;
      position: relative;
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 1);
      border-radius: 0.5rem;
      overflow: hidden;
    }
    * {
      user-select: none;
      -webkit-user-drag: none;
      display: block;
    }
  }

  .about-history {
    background: ${({ theme }) => theme.secondary[500]};
    background-image: url('images/textures/egg-shell.png');

    color: rgba(25, 25, 25, 1);
    h1 {
      color: rgba(25, 25, 25, 1);
    }
    p {
      font-weight: 500;
    }
  }
  .about-header {
    h1 {
      color: ${({ theme }) => theme.secondary[400]};
    }
    h2 {
      color: rgba(255, 255, 255, 1);
    }
  }

  .awards-list {
    display: flex;
    flex-flow: column;
    a {
      margin: 0.25rem 0;
      white-space: break-spaces;
    }
  }

  .team-board-members {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    .members {
      display: flex;
      flex-flow: column;
      align-items: center;
    }
    .board-member {
      padding-bottom: 1rem;
      .name {
        color: ${({ theme }) => theme.fg};
      }
      .role {
        padding: 0;
        font-weight: 300;
        padding-left: 1rem;
      }
    }
  }
  .team-member-role {
    font-weight: 300;
    font-style: italic;
    color: ${({ theme }) => theme.alpha.fg};
  }
  @media screen and (max-width: 768px) {
    .team-member {
      flex-flow: column;
    }
    .team-board-members {
      flex-flow: column;

      .members {
        width: 100%;
      }
    }
    .team-member-about {
      padding-left: 0;
      padding-top: 2rem;
      .team-member-about-header {
        text-align: center;
      }
    }
  }
`;
