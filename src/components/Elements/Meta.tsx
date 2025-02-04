import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';

import defaultMetaData from '@this/data/meta.json';
import { IMeta } from '@this/data/types/bits';

const meta: { [key: string]: IMeta } = defaultMetaData;

const formatRouteTitle = (router: NextRouter) => {
  const pathname = router.pathname;
  if (!pathname || pathname === '/') {
    return '';
  }

  // Handle Teacher Training sub-views
  // /teacherTraining/[info|register]/level-[levelNumber]
  if (pathname.includes('[level]') && typeof router.query.level === 'string') {
    const levelNum = parseInt(router.query.level.replaceAll(/\D/g, ''));
    const level = isNaN(levelNum) ? 1 : levelNum;
    const view = pathname.includes('info') ? 'Info' : 'Registration';
    return `Teacher Training Level ${level} - ${view}`;
  }

  return (pathname || '')
    .slice(pathname.lastIndexOf('/') + 1, pathname.length)
    .split('')
    .map((char, i) => (i === 0 ? char.toUpperCase() : char.match(/[A-Z]/) ? ` ${char}` : char))
    .join('');
};

const Meta = () => {
  const router = useRouter();
  const routeTitle = formatRouteTitle(router);

  const metaData = meta[routeTitle.toLowerCase().replaceAll(' ', '_')] || {};
  const defaultMeta = meta.defaultMeta || {};
  const allMeta = { ...defaultMeta, ...metaData };

  const hostname = allMeta.host ?? 'https://operationspark.org';
  const description = metaData.description ?? allMeta.description;
  const title = metaData.title ?? `${routeTitle ? routeTitle + ' | ' : ''}${allMeta.title}`;
  const imageUrl = hostname + (metaData.imageUrl ?? allMeta.imageUrl);
  const favicon = metaData.favicon ?? allMeta.favicon ?? '/favicon.ico';

  return (
    <Head>
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <link rel='icon' href={favicon} />

      <title>{title}</title>

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
