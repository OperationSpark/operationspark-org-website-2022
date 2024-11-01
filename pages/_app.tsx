import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { MainContainer } from '@this/components/layout';
import { IAlert } from '@this/data/types/bits';
import { GoogleAnalyticsRoot } from '@this/lib/googleAnalytics';
import { PixelRoot } from '@this/lib/pixel';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import Meta from '@this/src/components/Elements/Meta';
import Notifications from '@this/src/components/Notifications';
import theme from '@this/src/theme';
import { ILogo, ISupporterFunderLogos } from '../data/types/logos';

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
      <GoogleAnalyticsRoot />

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
