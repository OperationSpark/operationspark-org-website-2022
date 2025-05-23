import type { GetStaticProps, NextPage } from 'next';

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
import { Content } from '@this/src/components/layout';
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
      <Content
        style={{
          paddingTop: '.75rem',
          paddingBottom: '.75rem',
        }}
      >
        <p>Our grads have been hired by:</p>
      </Content>
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
