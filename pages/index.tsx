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
import ShowcasePromo from '@this/src/components/Home/ShowcasePromo';
import { IGradShowcase } from '@this/data/types/gradShowcase';
import { toDayJs } from '@this/src/helpers/time';

// const gCloudBaseUrl = 'https://storage.googleapis.com/operationspark-org';

interface HomeProps extends IHome {
  logos: ILogo[];
  showcase?: IGradShowcase;
}

const Home: NextPage<HomeProps> = ({
  logos,
  igniteCareer,
  greatCompanies,
  programsForAll,
  teamEffort,
  showcase,
}) => {
  return (
    <Main style={{ paddingTop: 0 }}>
      {showcase ? <ShowcasePromo info={showcase} /> : <TopCard />}

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
  const showcase: IGradShowcase = await getStaticAsset('gradShowcase');

  return {
    props: {
      greatCompanies,
      programsForAll,
      igniteCareer,
      teamEffort,
      logos,
      showcase: {
        ...showcase,
        startDateTime: toDayJs(new Date(showcase.startDateTime))
          .tz('America/Chicago', true)
          .toISOString(),
      },
    },
  };
};

export default Home;
