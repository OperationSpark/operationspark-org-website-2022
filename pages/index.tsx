import type { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';

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
import { parseShowcaseTime } from '@this/src/helpers/timeUtils';

// const gCloudBaseUrl = 'https://storage.googleapis.com/operationspark-org';

interface HomeProps extends IHome {
  logos: ILogo[];
  showcase?: IGradShowcase | null;
}

const Home: NextPage<HomeProps> = ({
  logos,
  igniteCareer,
  greatCompanies,
  programsForAll,
  teamEffort,
  showcase,
}) => {
  const [showcaseInfo, setShowcaseInfo] = useState<IGradShowcase | null>(showcase || null);

  return (
    <Main style={{ paddingTop: 0 }}>
      {showcaseInfo ? (
        <ShowcasePromo info={showcaseInfo} clearShowcase={() => setShowcaseInfo(null)} />
      ) : (
        <TopCard />
      )}

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
  const showcaseInfo: IGradShowcase = await getStaticAsset('gradShowcase');
  const startDateTime = parseShowcaseTime(showcaseInfo.startDateTime);
  const showcase = startDateTime ? { ...showcaseInfo, startDateTime: startDateTime } : null;

  return {
    props: {
      greatCompanies,
      programsForAll,
      igniteCareer,
      teamEffort,
      logos,
      showcase,
    },
  };
};

export default Home;
