import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { getStaticAsset } from '@this/pages-api/static/[asset]';
import { IAlert, IMeta } from '@this/data/types/bits';
import { MainContainer } from '@this/components/layout';
import theme from '@this/src/theme';
import { ILogo, ISupporterFunderLogos } from '../data/types/logos';
import Meta from '@this/src/components/Elements/Meta';

const Theme = dynamic(() => import('@this/src/theme/styled/Theme'));
const Navbar = dynamic(() => import('@this/components/Navbar/Navbar'));
const Footer = dynamic(() => import('@this/components/footer/footer'));

function App({ Component, pageProps }: AppProps) {
  const [meta, setMeta] = useState<{ [key: string]: IMeta }>({});
  const [logos, setLogos] = useState<ILogo[]>([]);
  const [alertInfo, setAlertInfo] = useState<IAlert>({ message: '', url: '' });

  useEffect(() => {
    getStaticAsset('logos').then((l: ISupporterFunderLogos) =>
      setLogos(l.funders),
    );
    getStaticAsset('alert').then(setAlertInfo);
    getStaticAsset('meta').then(setMeta);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Theme theme={theme.colors.brand}>
        <Meta meta={meta} />

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
