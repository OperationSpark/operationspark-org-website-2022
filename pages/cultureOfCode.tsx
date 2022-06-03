import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';

import { ICultureOfCode } from '@this/data/types/cultureOfCode';
import PlainCard from '@this/components/Cards/PlainCard';
import { SlashDivider } from '@this/components/Elements/SlashDivider';
import Main from '@this/components/layout/Main';
import Content from '@this/components/layout/Content';
import Section from '@this/components/layout/Section';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import { BgImg } from '@this/src/components/Elements';
import { useEffect, useState } from 'react';

export interface CultureOfCodeProps extends ICultureOfCode {}

type ColorHue = {
  filter: string;
  transform: string;
};

const CultureOfCode: NextPage<CultureOfCodeProps> = ({
  header,
  ourDeal,
  opSparkValues1,
  opSparkValues2,
  effectiveLearning,
}) => {
  const [colorHues, setColorHues] = useState<ColorHue[]>([]);

  useEffect(() => {
    setColorHues(
      new Array(10).fill(0).map((e, i) => ({
        filter: `hue-rotate(${Math.floor(Math.random() * 180)}deg)`,
        transform: `rotate(${Math.floor(Math.random() * 45 * (!(i % 2) ? -1 : 1))}deg)`,
      })),
    );
  }, []);

  return (
    <Main style={{ paddingTop: 0 }}>
      <CultureOfCodeStyles>
        <BgImg src='/images/display/code-editor.png'>
          <Content className='culture-of-code-header'>
            <h1 className='dynamic-xl'>{header.title}</h1>
            <p className='dynamic-txt'>{header.description}</p>
          </Content>
        </BgImg>
        <SlashDivider />
        <Content>
          <h2 className='dynamic-h2 text-center' style={{ paddingBottom: '2rem' }}>
            {ourDeal.title}
          </h2>
          <p className='opspark-community dynamic-txt'>{ourDeal.opSparkCommunity}</p>
          <div className='our-deal-sections'>
            {ourDeal.sections.map((section) => (
              <div key={section.title.join('')} className='our-deal-section'>
                <h4>{section.title}</h4>
                <p className='dynamic-txt'>{section.description}</p>
              </div>
            ))}
          </div>

          <div className='opspark-principles'>
            <h4>
              <b>{ourDeal.principleIssues.title}</b>
            </h4>
            <p className='dynamic-txt'>{ourDeal.principleIssues.description}</p>
          </div>
        </Content>
        <Content>
          <h2 className='dynamic-h2'>Operation Spark Values</h2>
          {opSparkValues1.map(({ title, description, image, effects }, i) => (
            <div className='opspark-value' key={title.join('')}>
              <PlainCard className='opspark-value-card'>
                <h4 className='card-title'>{title}</h4>

                {description.map((desc) => (
                  <p key={desc} className='dynamic-txt'>
                    {desc}
                  </p>
                ))}
              </PlainCard>
              {image ? (
                <div className='opspark-value-img' style={effects ? colorHues[i] : {}}>
                  <Image
                    src={image}
                    layout='fill'
                    objectFit='contain'
                    alt='hallebot'
                    aria-label='display'
                    priority
                  />
                </div>
              ) : null}
            </div>
          ))}
        </Content>
        <Section className='effective-learning'>
          <Content>
            <h1 className='dynamic-h1 title'>{effectiveLearning.title}</h1>
            <p className='dynamic-txt desc'>{effectiveLearning.description}</p>
            <div className='tips'>
              {effectiveLearning.tips.map(({ title, description }) => (
                <div key={title} className={!description.length ? 'tip center' : 'tip'}>
                  <h4 className='dynamic-h4'>
                    <b>{title}</b>
                  </h4>
                  <p style={{ padding: '0.5rem 0' }} className='dynamic-txt'>
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </Content>
        </Section>

        <Content>
          {opSparkValues2.map(({ title, description, image, rules }, i) => (
            <div className='opspark-value' key={title.join('')}>
              <PlainCard className='opspark-value-card two-col-card'>
                <h4 className='card-title'>{title}</h4>
                <div className={rules ? 'two-col' : ''}>
                  <div>
                    {description.map((desc) => (
                      <p key={desc} className='dynamic-txt'>
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              </PlainCard>
              <div
                className={
                  !rules
                    ? 'opspark-value-img dynamic-txt'
                    : 'opspark-value-img dynamic-txt card-rules'
                }
                style={!rules ? colorHues[i + 6] : {}}
              >
                {image ? (
                  <Image
                    src='/images/hallebot3d.png'
                    layout='fill'
                    objectFit='contain'
                    alt='hallebot'
                    aria-label='layout'
                    priority
                  />
                ) : rules ? (
                  <div className='card-rules-list'>
                    <h4 className='dynamic-h4'>{rules.title}</h4>
                    <ul>
                      {rules.list.map(({ rule, subRules }) => (
                        <li key={rule}>
                          {rule}
                          {!subRules.length ? null : (
                            <ul>
                              {subRules.map((subRule) => (
                                <li key={subRule}>{subRule}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </Content>
      </CultureOfCodeStyles>
    </Main>
  );
};

export const getStaticProps: GetStaticProps<CultureOfCodeProps> = async () => {
  const { header, ourDeal, opSparkValues1, opSparkValues2, effectiveLearning }: ICultureOfCode =
    await getStaticAsset('cultureOfCode');

  return {
    props: {
      header,
      ourDeal,
      opSparkValues1,
      opSparkValues2,
      effectiveLearning,
    },
  };
};

export default CultureOfCode;

const CultureOfCodeStyles = styled.div`
  h1,
  h2,
  h3,
  h4 {
    color: ${({ theme: { isLightMode, primary, secondary } }) =>
      isLightMode ? primary[700] : secondary[500]};
  }
  h4 {
    font-size: 1.25rem;
    font-weight: 600;
  }
  .culture-of-code-header {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    height: 100%;

    p.dynamic-txt {
      padding: 1.5rem;
      background: ${({ theme }) => theme.alpha.bg};
      border-radius: 0.5rem;
      backdrop-filter: blur(4px);
      box-shadow: 0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.8);
    }
  }
  .our-deal-sections {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    border-radius: 0.25rem;
    padding: 1rem;
    margin-top: 1rem;
    .our-deal-section {
      width: 32%;
      padding: 0 1rem;
      text-align: center;

      h4 {
        font-weight: 700;
        padding-bottom: 0.5rem;
      }
      :first-child {
        padding-left: 0;
        text-align: left;
      }
      :last-child {
        text-align: right;
        padding-right: 0;
      }
    }
  }
  .opspark-community {
    margin: 0 auto 2rem auto;
    max-width: 100%;
    width: 60rem;

    line-height: 1.75em;
    font-weight: 500;
    border-radius: 0.25rem;
  }
  .opspark-principles {
    margin: 0 auto 2rem auto;
    max-width: 100%;
    width: 60rem;
    h4 {
      padding: 0.5rem 0;
    }
  }

  .opspark-value {
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    :nth-child(even) {
      flex-flow: row-reverse;
    }
    .opspark-value-card {
      width: calc(56% - 0.5rem);
      padding: 0;
      .card-title {
        font-weight: 700;
      }
      p {
        padding: 0.5rem 0;
      }
      :only-child {
        width: 100%;
      }
    }
    .opspark-value-img {
      width: calc(34% - 0.5rem);
      max-width: 60vw;
      margin: 0 auto;
      border-radius: 0.25rem;
      overflow: hidden;
      position: relative;
      * > img {
        user-select: none;
        -webkit-user-drag: none;
      }

      &.card-rules {
        filter: none;
        width: calc(42% - 0.5rem);
        user-select: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        li::marker {
          content: '🪙 ';
          font-size: 0.9rem;
        }
      }
      ul {
        margin-left: 1.75rem;
      }
    }
  }

  .effective-learning {
    background: ${({ theme }) => theme.secondary[500]};
    h1.title {
      color: ${({ theme }) => theme.primary[700]};
    }
    p,
    h4 {
      color: ${({ theme }) => theme.black};
    }
    .desc {
      line-height: 1.75em;
      width: 75%;
      font-weight: 600;
      padding: 2rem 0;
    }
    .tips {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }
    .tip {
      width: 30%;
      padding: 1rem 0;
      &.center {
        display: flex;
        align-items: center;
      }
    }
  }
  .conclusion {
    p {
      padding: 0.5rem 0;
    }
  }

  @media screen and (max-width: 768px) {
    .our-deal-sections {
      flex-flow: column;

      .our-deal-section {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        padding: 0 0 1rem 0;
        :first-child,
        :last-child {
          padding: 0 0 1rem 0;
          text-align: center;
        }
      }
    }

    .opspark-value {
      flex-flow: column;
      padding-bottom: 0;
      :nth-child(even) {
        flex-flow: column;
      }
      .opspark-value-card {
        width: 100%;
        padding: 0;
        margin-bottom: 2rem;
        :only-child {
          width: 100%;
        }

        p {
          padding: 0.5rem 0;
        }
      }
      .opspark-value-img {
        width: 100%;
        height: 200px;
        border-radius: 0.25rem;

        overflow: hidden;
        position: relative;
        &.card-rules {
          height: fit-content;
          width: 100%;
          max-width: 400px;
        }
      }
    }
    .effective-learning {
      .desc {
        width: 100%;
      }
    }
    .tips {
      display: flex;
      flex-flow: row wrap;
      .tip {
        width: 100%;
      }
    }
  }
`;
