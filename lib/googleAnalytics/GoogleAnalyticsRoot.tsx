import Script from 'next/script';
import { Fragment } from 'react';

import env from '@this/src/clientConfig';

export const GoogleAnalyticsRoot = () => {
  return (
    <Fragment>
      {/* Facebook Pixel Script*/}
      <Script
        id='google-analytics-script'
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${env.GOOGLE_ANALYTICS_ID}`}
      />

      <Script
        id='google-analytics-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${env.GOOGLE_ANALYTICS_ID}');
          `,
        }}
      />
    </Fragment>
  );
};

export default GoogleAnalyticsRoot;
