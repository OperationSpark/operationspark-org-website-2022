import type { GetStaticProps, NextPage } from 'next';

import { IHome } from '../data/types/home';
import { getStaticAsset } from './api/static/[asset]';

import Main from '@this/components/layout/Main';
import {
  TopCard,
  AlumSpotlight,
  ProgramsForAll,
  IgniteCareer,
  GreatCompanies,
  TeamEffort,
} from '@this/components/Home';

import Carousel from '@this/components/Elements/Carousel';
import { ILogo } from '@this/data/types/logos';
import AtlantaPromo from '@this/src/components/Elements/AtlantaPromo';
import PromoVideo from '@this/src/components/Home/PromoVideo';

interface HomeProps extends IHome {
  logos: ILogo[];
}

const Home: NextPage<HomeProps> = ({
  logos,
  igniteCareer,
  greatCompanies,
  programsForAll,
  teamEffort,
}) => {
  return (
    <Main style={{ paddingTop: '0' }}>
      <TopCard />
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
    props: { greatCompanies, programsForAll, igniteCareer, teamEffort, logos },
  };
};

export default Home;
