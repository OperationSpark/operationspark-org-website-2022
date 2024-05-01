import type { GetStaticProps, NextPage } from 'next';

import { IHome } from '../data/types/home';
import { getStaticAsset } from './api/static/[asset]';

import Carousel from '@this/components/Elements/Carousel';
import {
  AlumSpotlight,
  GreatCompanies,
  IgniteCareer,
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

const Home: NextPage<HomeProps> = ({
  logos,
  igniteCareer,
  greatCompanies,
  programsForAll,
  teamEffort,
}) => {
  const { showcase, clearShowcase } = useShowcase();

  return (
    <Main style={{ paddingTop: 0 }}>
      {showcase ? <ShowcasePromo info={showcase} clearShowcase={clearShowcase} /> : <TopCard />}

      <AtlantaPromo />
      <PromoVideo />
      <IgniteCareer {...igniteCareer} />
      <ProgramsForAll {...programsForAll} className='_progress' id='programs' />
      <GreatCompanies {...greatCompanies} />
      <Carousel logos={logos} />
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
