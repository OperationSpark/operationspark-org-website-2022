import type { GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';

import { IHome } from '../data/types/home';
import { getStaticAsset } from './api/static/[asset]';

import Carousel from '@this/components/Elements/Carousel';
import {
  AlumSpotlight,
  GreatCompanies,
  ProgramsForAll,
  TeamEffort,
  TopCard,
} from '@this/components/Home';
import Main from '@this/components/layout/Main';
import { Showcase } from '@this/data/types/gradShowcase';
import { ILogo } from '@this/data/types/logos';
import AtlantaPromo from '@this/src/components/Elements/AtlantaPromo';
import PromoVideo from '@this/src/components/Home/PromoVideo';
import ShowcasePromo from '@this/src/components/Home/ShowcasePromo';
import { useShowcase } from '@this/src/hooks/useShowcase';

interface HomeProps extends IHome {
  logos: ILogo[];
  showcase?: Showcase | null;
}

const Home: NextPage<HomeProps> = ({ logos, greatCompanies, programsForAll, teamEffort }) => {
  const { showcase, clearShowcase } = useShowcase();

  return (
    <Main style={{ paddingTop: 0 }}>
      {showcase ? <ShowcasePromo info={showcase} clearShowcase={clearShowcase} /> : <TopCard />}

      <AtlantaPromo />
      <PromoVideo />
      <GradsHiredBadge>
        <p className='badge-inner fw-500'>Our grads have been hired by</p>
      </GradsHiredBadge>
      <Carousel logos={logos} />
      <ProgramsForAll {...programsForAll} className='_progress' id='programs' />
      <GreatCompanies {...greatCompanies} />
      <AlumSpotlight />
      <TeamEffort {...teamEffort} />
    </Main>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { greatCompanies, programsForAll, igniteCareer, teamEffort }: IHome = await getStaticAsset(
    'index',
  );
  const logos: ILogo[] = await getStaticAsset('logos', 'partners');

  return {
    props: {
      greatCompanies,
      programsForAll,
      igniteCareer,
      teamEffort,
      logos,
    },
  };
};

export default Home;

const GradsHiredBadge = styled.div`
  position: relative;

  z-index: 100;
  .badge-inner {
    user-select: none;
    position: absolute;
    left: 2.5rem;
    top: -0.75rem;
    background: ${({ theme }) => theme.rgb('bg', 1, 2)};
    color: ${({ theme }) => theme.rgb('fg', 0.9)};

    box-shadow: ${({ theme }) => `
      0 0 1px 1px inset ${theme.rgb('black', 0.25)},
      0 0 0.25rem 1px ${theme.isLightMode ? theme.rgb('primary', 0.5) : theme.rgb('secondary', 0.5)}

    `};
    padding: 0 0.5rem;
    border-radius: 0.25rem;
  }
`;
