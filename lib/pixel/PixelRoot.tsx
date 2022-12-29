import { Fragment, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

import pixel from './pixel';

export const PixelRoot = () => {
  const router = useRouter();

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    pixel.pageView();

    const handleRouteChange = () => pixel.pageView();

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  //Global Site Code Pixel - Facebook Pixel
  return (
    <Fragment>
      <Script
        id='fb-pixel'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', ${process.env.FB_PIXEL_ID});
            `,
        }}
      />
      <Script
        id='rvq-pixel'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            var _tvq = window._tvq = window._tvq || [];
            (function() {
                var u = (("https:" == document.location.protocol) ? "https://collector-17253.us.tvsquared.com/" : "http://collector-17253.us.tvsquared.com/");
                _tvq.push(['setSiteId', "TV-8127724563-1"]);
                _tvq.push(['setTrackerUrl', u + 'tv2track.php']);
                _tvq.push([function() {
                    this.deleteCustomVariable(5, 'page')
                }]);
                _tvq.push(['trackPageView']);
                var d = document,
                    g = d.createElement('script'),
                    s = d.getElementsByTagName('script')[0];
                g.type = 'text/javascript';
                g.defer = true;
                g.async = true;
                g.src = u + 'tv2track.js';
                s.parentNode.insertBefore(g, s);
            })();
          `,
        }}
      />
    </Fragment>
  );
};

export default PixelRoot;
