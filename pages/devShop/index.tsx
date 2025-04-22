import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
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
  const [showModal, setShowModal] = useState(false);
  return (
    <Main style={{ paddingTop: 0 }}>
      <DevShopStyles>
        <button className='req-info-btn' onClick={() => setShowModal(true)}>
          Request Info
        </button>
        {showModal && (
          <div className='modal-container'>
            <div className='modal-content'>
              <h1 className='dynamic-h2'>TODO: Request Info Modal</h1>
            </div>
          </div>
        )}
        <BgImg src='/images/display/abstract-space.webp' height='18rem'>
          <Content className='page-header-container'>
            <div className='page-header-content'>
              <h1 className='dynamic-xl secondary'>{title}</h1>
              <h2 className='dynamic-h2 fw-800'>{subtitle}</h2>
            </div>
          </Content>
        </BgImg>

        <Content>
          <NeumorphismListCard
            title='Who We Are'
            width='1000px'
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
            width='1000px'
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
                  <Markdown>{text}</Markdown>
                </p>
                {grid && <GridList items={grid} itemStyle={{ flex: '1 1 fit-content' }} />}
              </div>
            ))}
          />
        </Content>
        <Content>
          <NeumorphismListCard
            title='How Can Operation Spark Help My Company'
            subtitle='Contract to Hire or Our Dev Shop'
            color='primary'
            width='1000px'
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
                  <div
                    className='dynamic-txt text-center primary-secondary'
                    style={{ marginTop: '1.5rem' }}
                  >
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
  margin-bottom: 4rem;
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
  .req-info-btn {
    position: fixed;
    top: ${({ theme }) => `${theme.navHeight - 20}px`};
    right: 1rem;
    z-index: 1000;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    font-weight: 700;

    background: ${({ theme }) => theme.rgb('secondary', 1)};
    color: ${({ theme }) => theme.rgb('black', 1)};

    box-shadow: ${({ theme }) => {
      const c1 = theme.rgb('secondary', 0.5, -10);
      const c2 = theme.rgb('secondary', 0.25, -20);
      return `
      0 0 0.1rem 2px ${c1},
      0 0 0.5rem 1px ${c2}
      `;
    }};

    transition: all 225ms;

    &:hover {
      background: ${({ theme }) => theme.rgb('secondary', 1, theme.isLightMode ? 4 : 8)};
      transform: translateY(-2px) scale(1.05, 1.02);

      box-shadow: ${({ theme }) => {
        const c1 = theme.rgb('secondary', 0.5, -10);
        const c2 = theme.rgb('secondary', 0.25, -20);
        return `
        0 0 0.25rem 2px ${c1},
        0 0 0.75rem 2px ${c2}
        `;
      }};
    }
  }

  .modal-container {
    position: fixed;
    inset: 0;
    z-index: 100000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.rgb('bg', 0.5)};
  }

  .modal-content {
    background: ${({ theme }) => theme.rgb('bg', 1)};
    width: 100%;
    max-width: 800px;
    min-height: 500px;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: ${({ theme }) =>
      `0 0 0.25rem 1px inset ${theme.rgb(theme.isLightMode ? 'primary.800' : 'secondary.600', 1)},
      -0.2rem 0.5rem 1rem 2px ${
        theme.isLightMode ? theme.rgb('primary.500', 0.5) : theme.rgb('secondary.500', 0.325)
      }`};
  }
`;
