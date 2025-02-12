import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang='en-US'>
        <Head>
          <meta name='theme-color' media='(prefers-color-scheme: light)' content='#920CF8' />
          <meta name='theme-color' media='(prefers-color-scheme: dark)' content='#320067' />
          <meta name='facebook-domain-verification' content='u2igk2zap14ke4q4vdpr4m9n5jirpz' />

          {/* Roboto [Main font]  */}
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
            rel='stylesheet'
          />

          {/* Red Hat Display [Headers/Buttons] */}
          <link
            href='https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            rel='stylesheet'
          />

          {/* Source Code Pro - Monospace */}
          <link
            href='https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap'
            rel='stylesheet'
          />

          {/* Kalam - Cursive */}
          <link
            href='https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap'
            rel='stylesheet'
          />

          {/* Permanent Marker - Cursive | Used for TODOS */}
          <link
            href='https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap'
            rel='stylesheet'
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id='atlanta-promo-root'></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
