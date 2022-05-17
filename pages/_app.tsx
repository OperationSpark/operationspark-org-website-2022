import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '@this/src/theme';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import { IAlert } from '@this/data/types/bits';

import { MainContainer } from '@this/components/layout';
import { ILogo, ISupporterFunderLogos } from '../data/types/logos';

const Theme = dynamic(() => import('@this/src/theme/styled/Theme'));
const Navbar = dynamic(() => import('@this/components/Navbar/Navbar'));
const Footer = dynamic(() => import('@this/components/footer/footer'));

const formatRouteTitle = (str: string) => {
  if (!str || str === '/') {
    return '';
  }
  return (
    (str || '')
      .slice(str.lastIndexOf('/') + 1, str.length)
      .split('')
      .map((char, i) =>
        i === 0 ? char.toUpperCase() : char.match(/[A-Z]/) ? ` ${char}` : char,
      )
      .join('') + ' | '
  );
};

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const route = formatRouteTitle(pathname);
  const title = `${route}Operation Spark`;
  const [logos, setLogos] = useState<ILogo[]>([]);
  const [alertInfo, setAlertInfo] = useState<IAlert>({ message: '', url: '' });

  useEffect(() => {
    getStaticAsset('logos').then((l: ISupporterFunderLogos) =>
      setLogos(l.funders),
    );
    getStaticAsset('alert').then(setAlertInfo);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Theme theme={theme.colors.brand}>
        <Head>
          <title> {title} </title>
          <meta
            name='description'
            content='The Official Operation Spark Website'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Navbar alertInfo={alertInfo} />
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>

        <Footer logos={logos} />
      </Theme>
    </ChakraProvider>
  );
}

export default App;
