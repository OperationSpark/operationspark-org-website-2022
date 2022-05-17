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
import { cardShadow } from '@this/src/theme/styled/mixins/shadows';

export interface CultureOfCodeProps extends ICultureOfCode {}

const CultureOfCode: NextPage<CultureOfCodeProps> = ({
  header,
  ourDeal,
  opSparkValues1,
  opSparkValues2,
  effectiveLearning,
}) => {
  return (
    <Main>
      <CultureOfCodeStyles>
        <Content style={{ paddingTop: 0 }}>
          <h1 className='dynamic-xl'>{header.title}</h1>
          <p className='dynamic-txt' style={{ padding: '2rem 0' }}>
            {header.description}
          </p>
        </Content>
        <SlashDivider />
        <Content>
          <h2 className='dynamic-h2'>{ourDeal.title}</h2>
          <div className='our-deal-sections'>
            {ourDeal.sections.map((section) => (
              <div key={section.title.join('')} className='our-deal-section'>
                <h4>{section.title}</h4>
                <p>{section.description}</p>
              </div>
            ))}
          </div>
          <p className='opspark-community dynamic-txt'>
            {ourDeal.opSparkCommunity}
          </p>
          <div className='opspark-principles'>
            <h4>
              <b>{ourDeal.principleIssues.title}</b>
            </h4>
            <p>{ourDeal.principleIssues.description}</p>
          </div>
        </Content>
        <Content>
          {opSparkValues1.map(({ title, description, image }) => (
            <div className='opspark-value' key={title.join('')}>
              <PlainCard className='opspark-value-card'>
                <h4 className='card-title'>{title}</h4>

                {description.map((desc) => (
                  <p key={desc}>{desc}</p>
                ))}
              </PlainCard>
              {image ? (
                <div className='opspark-value-img'>
                  <Image
                    src='/images/hallebot-placeholder.png'
                    layout='fill'
                    objectFit='contain'
                    alt=''
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
                <div
                  key={title}
                  className={!description.length ? 'tip center' : 'tip'}
                >
                  <h4 className='dynamic-h4'>
                    <b>{title}</b>
                  </h4>
                  <p style={{ padding: '0.5rem 0' }}>{description}</p>
                </div>
              ))}
            </div>
          </Content>
        </Section>

        <Content>
          {opSparkValues2.map(({ title, description, image, rules }) => (
            <div className='opspark-value' key={title.join('')}>
              <PlainCard className='opspark-value-card two-col-card'>
                <h4 className='card-title'>{title}</h4>
                <div className={rules ? 'two-col' : ''}>
                  <div>
                    {description.map((desc) => (
                      <p key={desc}>{desc}</p>
                    ))}
                  </div>
                </div>
              </PlainCard>
              <div
                className={
                  !rules ? 'opspark-value-img' : 'opspark-value-img card-rules'
                }
              >
                {image ? (
                  <Image
                    src='/images/hallebot-placeholder.png'
                    layout='fill'
                    objectFit='contain'
                    alt=''
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
  const {
    header,
    ourDeal,
    opSparkValues1,
    opSparkValues2,
    effectiveLearning,
  }: ICultureOfCode = await getStaticAsset('cultureOfCode');

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
  .our-deal-sections {
    ${cardShadow}
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    border-radius: 0.25rem;
    padding: 1rem;
    margin-top: 1rem;
    .our-deal-section {
      width: 33.33%;
      padding: 1rem;

      h4 {
        font-weight: 700;
        padding-bottom: 0.5rem;
      }
      :first-child {
        padding-left: 0;
      }
      :last-child {
        padding-right: 0;
      }
    }
  }
  .opspark-community {
    margin: 2rem 0;
    line-height: 1.75em;
    width: 75%;
    font-weight: 500;

    border-radius: 0.25rem;
  }
  .opspark-principles {
    padding: 1rem 0;
    width: 65%;
    h4 {
      padding: 0.5rem 0;
    }
  }

  .opspark-value {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    :nth-child(even) {
      flex-flow: row-reverse;
    }
    .opspark-value-card {
      width: calc(60% - 0.5rem);
      padding: 0;
      .card-title {
        font-weight: 700;
      }
      p {
        padding: 0.5rem 0;
      }
      :only-child {
        width: 80%;
      }
    }
    .opspark-value-img {
      width: calc(40% - 0.5rem);
      border-radius: 0.25rem;
      overflow: hidden;
      position: relative;
      user-select: none;
      &.card-rules {
        user-select: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      ul {
        margin-left: 1.5rem;
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
      color: rgba(0, 0, 0, 1);
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
        padding: 1rem;
        padding-left: 0;
      }
    }
    .opspark-community,
    .opspark-principles {
      width: 100%;
    }
    .opspark-value {
      flex-flow: column;
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
