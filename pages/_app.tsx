import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { getStaticAsset } from '@this/pages-api/static/[asset]';
import { IAlert } from '@this/data/types/bits';
import { MainContainer } from '@this/components/layout';
import theme from '@this/src/theme';
import { ILogo, ISupporterFunderLogos } from '../data/types/logos';
import Meta from '@this/src/components/Elements/Meta';

const Theme = dynamic(() => import('@this/src/theme/styled/Theme'));
const Navbar = dynamic(() => import('@this/components/Navbar/Navbar'));
const Footer = dynamic(() => import('@this/components/footer/footer'));

const hostname = 'https://staging.operationspark.org';

function App({ Component, pageProps }: AppProps) {
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
        <Meta hostname={hostname} />
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
