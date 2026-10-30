import type { Metadata } from 'next';

/**
 * Where the site lives, and the handful of constants the metadata repeats.
 *
 * Canonical URLs, the sitemap and robots.txt all need an absolute origin, and
 * none of them can be derived from the incoming request at build time — these
 * are statically prerendered. So the origin comes from the environment:
 *
 *   NEXT_PUBLIC_SITE_URL   set this in production; it wins over everything.
 *   VERCEL_PROJECT_PRODUCTION_URL   Vercel sets this (no protocol) on every
 *                          deployment of a project, so a deploy that forgot the
 *                          variable above still emits its real domain rather
 *                          than localhost.
 *   http://localhost:3000  development fallback.
 *
 * Getting this wrong is quiet but costly: a sitemap full of localhost URLs is
 * ignored, and canonical tags pointing at the wrong origin de-index the real
 * pages. Set NEXT_PUBLIC_SITE_URL before the first production build.
 */
const fromEnvironment = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return 'http://localhost:3000';
};

/** Origin with no trailing slash, so joining a path never doubles the slash. */
export const siteUrl = fromEnvironment().replace(/\/$/, '');

/** `metadataBase` wants a URL object, and building it once avoids re-parsing. */
export const siteUrlObject = new URL(siteUrl);

export const siteName = 'ARGG — Antenna Research Group Ghana';

export const siteShortName = 'ARGG';

export const siteDescription =
  'The Antenna Research Group at KNUST: RF and microwave research, antenna design, measurement work and training out of the Rohde & Schwarz RF and Microwave Research Centre in Kumasi, Ghana.';

/** Absolute URL for `path`, which should start with a slash. */
export const absoluteUrl = (path: string): string =>
  path === '/' ? siteUrl : `${siteUrl}${path}`;

/**
 * Per-page metadata, with the pieces that are easy to get wrong filled in.
 *
 * `openGraph` is the reason this exists. Next merges metadata between segments
 * *shallowly*, so a page that sets `openGraph: { title }` replaces the root
 * layout's whole openGraph object and silently loses `siteName`, `type` and
 * `locale`. Re-emitting the full object here keeps that from happening one page
 * at a time.
 *
 * `path` also becomes the canonical URL, which is what tells a crawler that
 * /projects and /projects?year=2026 are the same page.
 */
export const pageMetadata = ({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Route path beginning with a slash, e.g. "/about". */
  path: string;
}): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: 'website',
    siteName,
    // The root layout's title template does not apply to openGraph, so the
    // suffix is added here to match what the browser tab shows.
    title: path === '/' ? siteName : `${title} — ${siteShortName}`,
    description,
    url: path,
    locale: 'en_GH',
  },
  twitter: {
    card: 'summary',
    title: path === '/' ? siteName : `${title} — ${siteShortName}`,
    description,
  },
});
