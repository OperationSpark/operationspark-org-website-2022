import axios, { isAxiosError } from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

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
import { toDayJs } from '@this/src/helpers/time';

// const gCloudBaseUrl = 'https://storage.googleapis.com/operationspark-org';

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
  showcase,
}) => {
  const [showcaseInfo, setShowcaseInfo] = useState<Showcase | null>(showcase || null);

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

const getShowcase = async () => {
  try {
    const { data } = await axios.get<Showcase>(
      'https://showcase.operationspark.org/api/showcases/active',
    );

    if (!data || !data.startDateTime || !data.websiteActive || !data.active) {
      return null;
    }

    const disableTime = toDayJs(data.startDateTime).add(data.doorsOffset ?? 30, 'minutes');

    if (disableTime.isBefore(toDayJs())) {
      return null;
    }

    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 404) {
      console.info('Showcase inactive');
      return null;
    }
    console.error('Showcase fetch error: ', err);
    return null;
  }
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { greatCompanies, programsForAll, igniteCareer, teamEffort }: IHome = await getStaticAsset(
    'index',
  );
  const logos: ILogo[] = await getStaticAsset('logos', 'partners');

  const showcase = await getShowcase();

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
