import Script from 'next/script';
import { Fragment } from 'react';

export const GoogleAnalyticsRoot = () => {
  return (
    <Fragment>
      {/* Facebook Pixel Script*/}
      <Script
        id='google-analytics-script'
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
      />

      <Script
        id='google-analytics-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
          `,
        }}
      />
    </Fragment>
  );
};

export default GoogleAnalyticsRoot;
