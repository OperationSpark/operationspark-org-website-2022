import Head from 'next/head';
import { useRouter } from 'next/router';

import defaultMetaData from '@this/data/meta.json';
import { IMeta } from '@this/data/types/bits';

const meta: { [key: string]: IMeta } = defaultMetaData;

const formatRouteTitle = (str: string) => {
  if (!str || str === '/') {
    return '';
  }
  return (str || '')
    .slice(str.lastIndexOf('/') + 1, str.length)
    .split('')
    .map((char, i) => (i === 0 ? char.toUpperCase() : char.match(/[A-Z]/) ? ` ${char}` : char))
    .join('');
};

const Meta = () => {
  const { pathname } = useRouter();
  const route = formatRouteTitle(pathname);
  const metaData = meta[route.toLowerCase().replaceAll(' ', '_')] || {};
  const defaultMeta = meta.defaultMeta || {};

  const hostname = defaultMeta.host ?? 'https://operationspark.org';
  const description = metaData.description ?? defaultMeta.description;
  const title = metaData.title ?? `${route ? route + ' | ' : ''}${defaultMeta.title}`;
  const imageUrl = hostname + (metaData.imageUrl ?? defaultMeta.imageUrl);
  const favicon = metaData.favicon ?? defaultMeta.favicon ?? '/favicon.ico';

  return (
    <Head>
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <link rel='icon' href={favicon} />

      <title> {title} </title>

      <meta name='description' content={description} />

      {/* Open Graph */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:url' content={hostname} />

      {/* Twitter */}
      <meta property='twitter:url' content={hostname} />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={imageUrl} />
    </Head>
  );
};

export default Meta;
