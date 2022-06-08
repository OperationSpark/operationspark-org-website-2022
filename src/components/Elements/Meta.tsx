import Head from 'next/head';
import { useRouter } from 'next/router';

import { IMeta } from '@this/data/types/bits';
import defaultMetaData from '@this/data/meta.json';

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
      <title> {title} </title>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageUrl} />
      <link rel='icon' href={favicon} />
      <meta property='og:url' content={hostname} />
      <meta property='twitter:url' content={hostname} />
      <title> {title} </title>
      <meta name='description' content={description} />

      <meta property='og:description' content={description} />

      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={imageUrl} />

      <meta property='twitter:card' content='summary_large_image' />

      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={imageUrl} />
      <link rel='icon' href={favicon} />
    </Head>
  );
};

export default Meta;
