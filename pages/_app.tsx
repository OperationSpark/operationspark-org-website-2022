import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';

import { getStaticAsset } from '@this/pages-api/static/[asset]';
import { IAlert } from '@this/data/types/bits';
import { MainContainer } from '@this/components/layout';
import theme from '@this/src/theme';
import { ILogo, ISupporterFunderLogos } from '../data/types/logos';
import Meta from '@this/src/components/Elements/Meta';
import { PixelRoot } from '@this/lib/pixel';
import Notifications from '@this/src/components/Notifications';

const Theme = dynamic(() => import('@this/src/theme/styled/Theme'));
const Navbar = dynamic(() => import('@this/components/Navbar/Navbar'));
const Footer = dynamic(() => import('@this/components/footer/footer'));

export default function App({ Component, pageProps }: AppProps) {
  const [logos, setLogos] = useState<ILogo[]>([]);
  const [alertInfo, setAlertInfo] = useState<IAlert>({ message: '', url: '' });

  useEffect(() => {
    getStaticAsset('logos').then((l: ISupporterFunderLogos) => setLogos(l.funders));
    getStaticAsset('alert').then(setAlertInfo);
  }, []);

  return (
    <Theme theme={theme.colors.brand}>
      <Notifications />
      <PixelRoot />
      <Meta />
      <Navbar alertInfo={alertInfo} />

      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>

      <Footer logos={logos} />
      <div id='tooltip-root'></div>
    </Theme>
  );
}
