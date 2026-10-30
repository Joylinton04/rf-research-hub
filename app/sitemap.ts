import type { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';

import { absoluteUrl } from '@/lib/site';

/**
 * Routes that exist regardless of what is in the database.
 *
 * `/tutorials` is deliberately absent: it is a placeholder carrying `noindex`,
 * and listing a page here that tells crawlers not to index it is a
 * contradiction Search Console reports as an error. Add it back when the page
 * has content.
 *
 * `priority` and `changeFrequency` are hints, not instructions — Google ignores
 * both. They are set to something honest rather than tuned.
 */
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/publications', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/bootcamps', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/gallery', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/links', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });

  // Every project detail route, with the real edit time as `lastModified` so a
  // crawler can tell which write-ups actually changed since its last visit.
  const { docs: projects } = await payload.find({
    collection: 'projects',
    limit: 1000,
    depth: 0,
    select: { slug: true, updatedAt: true },
  });

  // The newest project edit also dates the listing pages that render it, which
  // is more useful to a crawler than stamping every page with "now".
  const latestProjectEdit = projects.reduce<Date | null>((latest, project) => {
    const updated = new Date(project.updatedAt);
    return !latest || updated > latest ? updated : latest;
  }, null);

  const lastModified = latestProjectEdit ?? new Date();

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency,
      priority,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
