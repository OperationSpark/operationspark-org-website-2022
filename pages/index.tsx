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
import { Content } from '@this/src/components/layout';

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
      <Content style={{ maxWidth: '1000px', paddingBottom: '0' }}>
        <p className='dynamic-txt'>
          The institution is applying to become a candidate for accreditation or for initial or
          reaffirmation of accreditation with the Commission of the Council on Occupational
          Education.
        </p>
        <p className='dynamic-txt' style={{ marginTop: '1rem' }}>
          Persons wishing to make comments should either:
        </p>
        <ul className='dynamic-txt' style={{ paddingLeft: '1rem' }}>
          <li>
            Write to the Executive Director of the Commission:
            <div
              style={{
                userSelect: 'all',
                fontSize: '1rem',
                paddingLeft: '1rem',
              }}
            >
              <b>
                Council on Occupational Education <br />
                7840 Roswell Road
                <br />
                Building 300, Suite 325
                <br />
                Atlanta, Georgia 30350
                <br />
              </b>
            </div>
          </li>

          <li>
            Submit comments through the Council’s website{' '}
            <a className='anchor' href='https://council.org/' target='_blank' rel='noreferrer'>
              council.org
            </a>
            . Persons making comments must provide their name and mailing address.
          </li>
        </ul>
      </Content>
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
