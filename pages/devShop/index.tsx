import { GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { DevShopType } from '@this/data/types/devShop';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import NeumorphismListCard from '@this/src/components/Cards/NeumorphismListCard';
import { BgImg } from '@this/src/components/Elements';
import GridList from '@this/src/components/Elements/GridList';
import Markdown from '@this/src/components/layout/Markdown';

const DevShop: NextPage<DevShopType> = ({ title, subtitle, about, skills, contractToHire }) => {
  return (
    <Main style={{ paddingTop: 0 }}>
      <DevShopStyles>
        <BgImg src='/images/display/abstract-space.webp' height='18rem'>
          <Content className='page-header-container'>
            <div className='page-header-content'>
              <h1 className='dynamic-xl secondary'>{title}</h1>
              <h2 className='dynamic-h2'>{subtitle}</h2>
            </div>
          </Content>
        </BgImg>

        <Content>
          <NeumorphismListCard
            title='Who We Are'
            width='900px'
            color='primary'
            style={{ margin: '0 auto', backdropFilter: 'blur(0.5rem)' }}
            items={[
              <div className='dynamic-txt' key='who-we-are'>
                <Markdown>{about}</Markdown>
              </div>,
            ]}
          />
        </Content>
        <Content>
          <NeumorphismListCard
            title={skills.title}
            width='900px'
            color='secondary'
            center
            style={{ margin: '0 auto' }}
            items={skills.sections.map(({ header, text, grid }, i) => (
              <div
                key={`skills-performance-1-${i}-${header}`}
                className={`sub-card${grid ? ' center-sub-card' : ''}`}
              >
                <h3 className='dynamic-h3 text-center fw-900'>{header}</h3>
                <p
                  className={`dynamic-txt sub-card${grid ? ' text-center' : ''}`}
                  key={`skills-performance-1-${i}-${header}`}
                >
                  {text}
                </p>
                {grid && <GridList items={grid} itemStyle={{ flex: '1 1 150px' }} />}
              </div>
            ))}
          />
        </Content>
        <Content>
          <NeumorphismListCard
            title='How Can Operation Spark Help My Company'
            subtitle='Contract to Hire or Our Dev Shop'
            color='primary'
            width='900px'
            style={{ margin: '0 auto' }}
            center
            items={contractToHire.sections.map((section, i) => (
              <div key={`dev-shop-hire-${i}`} className='sub-card'>
                <h3 className='dynamic-h3 text-center fw-900'>{section.header}</h3>
                {section.text && (
                  <div className='dynamic-txt sub-card'>
                    <Markdown>{section.text}</Markdown>
                  </div>
                )}
                {section.list && (
                  <ul
                    className='checkmark-list center-sub-card dynamic-txt'
                    style={{ margin: '0 auto', width: 'fit-content' }}
                  >
                    {section.list.map((item, j) => (
                      <li key={`dev-shop-hire-${i}-${j}`}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.grid && (
                  <GridList
                    items={section.grid}
                    itemStyle={{ flex: '1 1 150px' }}
                    style={{ margin: '0 auto', width: 'fit-content' }}
                  />
                )}
                {section.tagline && (
                  <div className='dynamic-txt text-center' style={{ marginTop: '1.5rem' }}>
                    <Markdown>{section.tagline}</Markdown>
                  </div>
                )}
              </div>
            ))}
          />
        </Content>
      </DevShopStyles>
    </Main>
  );
};

export default DevShop;

export const getStaticProps: GetStaticProps<DevShopType> = async () => {
  const props: DevShopType = await getStaticAsset('devShop');
  return { props };
};

const DevShopStyles = styled.div`
  position: relative;
  z-index: 0;
  &::after {
    position: fixed;
    content: '';
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
  }
  .__content-container {
    padding-bottom: 0;
  }

  .contact-info {
    padding: 0.5rem;
    padding-left: 1rem;
    border-left: 3px solid ${({ theme }) => theme.rgb('primary.700', 1)};
    line-height: 1.25;
    font-size: 0.9rem;
    width: 100%;
  }

  .sub-card {
    padding: 0.5rem 1rem;
  }

  ._neu-card-list-item:has(.center-sub-card) {
    margin: 0 auto !important;
  }
  .contact-card {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checkmark-list {
    list-style: '✓ ';

    li::marker {
      color: ${({ theme }) =>
        theme.isLightMode ? theme.rgb('green.900', 1) : theme.rgb('green.500', 1)};
    }
  }
`;
