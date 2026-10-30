import type { MetadataRoute } from 'next';

import { absoluteUrl, siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // A preview or branch deployment should never compete with the real site in
  // search results, and the surest way to prevent that is to refuse crawling
  // outright anywhere the production origin has not been configured.
  const isProduction = !siteUrl.includes('localhost');

  if (!isProduction) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        // The admin panel and the API behind it: nothing here is a landing
        // page, and the login screen is not something to rank.
        '/admin',
        '/api/',
        // Next's image optimizer endpoint, which would otherwise be crawled as
        // thousands of near-duplicate URLs of images already on the pages.
        '/_next/image',
      ],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl,
  };
}
