import { GetStaticProps, NextPage } from 'next';

import { IHome } from '@this/data/types/home';

import { Main } from '@this/components/layout';
import ProgramsForAll from '@this/src/components/Home/ProgramsForAll';
import { getStaticAsset } from '@this/pages-api/static/[asset]';

const Programs: NextPage<IHome['programsForAll']> = ({
  title,
  description,
  programs,
}) => {
  return (
    <Main>
      <ProgramsForAll
        title={title}
        description={description}
        programs={programs}
      />
    </Main>
  );
};

export const getStaticProps: GetStaticProps<
  IHome['programsForAll']
> = async () => {
  const { title, description, programs }: IHome['programsForAll'] =
    await getStaticAsset('index', 'programsForAll');

  return {
    props: { title, description, programs },
  };
};

export default Programs;
