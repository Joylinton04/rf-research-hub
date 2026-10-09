import type { ContactDetail, Project } from '@/payload-types';

import { absoluteUrl, siteDescription, siteName, siteShortName, siteUrl } from '@/lib/site';

/** The organization itself, referenced by @id from the other blocks. */
const organizationId = `${siteUrl}/#organization`;

/**
 * schema.org ResearchOrganization for the group.
 *
 * Built from the Contact Details global rather than a second hard-coded copy,
 * so the address a crawler reads and the address on /contact cannot disagree.
 * Every optional field is omitted when blank — an empty `email` or a `sameAs`
 * of [] is worse than no property at all, since it asserts emptiness.
 */
export const organizationSchema = (details: ContactDetail): Record<string, unknown> => {
  const socials = (details.socials ?? []).map((social) => social.url).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    '@id': organizationId,
    name: siteName,
    alternateName: siteShortName,
    url: siteUrl,
    description: siteDescription,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'Kwame Nkrumah University of Science and Technology',
      alternateName: 'KNUST',
    },
    ...(details.address
      ? {
          address: {
            '@type': 'PostalAddress',
            // The global stores the address as the editor typed it, one line
            // per line; schema.org wants a single string.
            streetAddress: details.address.split('\n').join(', '),
            addressCountry: 'GH',
          },
        }
      : {}),
    ...(details.email ? { email: details.email } : {}),
    ...(details.phone ? { telephone: details.phone } : {}),
    ...(socials.length > 0 ? { sameAs: socials } : {}),
  };
};

/** The site as a searchable entity, so the name resolves to this domain. */
export const websiteSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  publisher: { '@id': organizationId },
  inLanguage: 'en',
});

/**
 * One project write-up as a ScholarlyArticle.
 *
 * `authors` is a comma-separated string in the collection, so it is split into
 * a Person each — a single string in the author field would be read as one
 * person with a very long name.
 */
export const projectSchema = (
  project: Project,
  { excerpt, image }: { excerpt: string; image: string | null },
): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: project.title,
  name: project.title,
  url: absoluteUrl(`/projects/${project.slug}`),
  datePublished: project.date,
  dateModified: project.updatedAt,
  author: project.authors
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => ({ '@type': 'Person', name })),
  publisher: { '@id': organizationId },
  isPartOf: { '@id': `${siteUrl}/#website` },
  inLanguage: 'en',
  ...(excerpt ? { description: excerpt, abstract: excerpt } : {}),
  // Relative media URLs have to be absolute for a crawler that fetches the
  // JSON-LD on its own.
  ...(image ? { image: image.startsWith('http') ? image : absoluteUrl(image) } : {}),
});

/** Breadcrumb trail, which Google renders in place of the raw URL. */
export const breadcrumbSchema = (
  trail: { name: string; path: string }[],
): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});
