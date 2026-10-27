import React from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { ProjectExplorer, type ProjectSummary } from '@/components/ProjectExplorer';
import { lexicalToParagraphs } from '@/lib/lexical';
import { slugify } from '@/lib/slug';
import { imageSrc } from '@/lib/media';
import { pageMetadata } from '@/lib/site';
import type { Metadata } from 'next';

// Dates are stored as midnight UTC. Formatting in the server's local zone would
// roll "2026-08-01" back into July west of Greenwich, so pin the zone.
const monthYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const splitAuthors = (authors: string): string[] =>
  authors
    .split(',')
    .map((author) => author.trim())
    .filter(Boolean);

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'Research projects and publications from the Antenna Research Group at KNUST, searchable by year and author.',
  path: '/projects',
});


export default async function ProjectsPage() {
  // Editable in the admin panel at /admin → Collections → Projects.
  const payload = await getPayload({ config });
  // depth 1 so the `thumbnail` upload arrives as a Media doc with a URL.
  const { docs } = await payload.find({
    collection: 'projects',
    sort: '-date',
    limit: 100,
    depth: 1,
  });

  const projects: ProjectSummary[] = docs.map((project) => {
    const published = new Date(project.date);
    const paragraphs = lexicalToParagraphs(project.content);

    return {
      id: project.id,
      title: project.title,
      slug: project.slug,
      authors: project.authors,
      authorKeys: splitAuthors(project.authors).map(slugify),
      date: monthYear.format(published),
      year: String(published.getUTCFullYear()),
      excerpt: paragraphs[0] ?? '',
      searchText: [project.title, project.authors, ...paragraphs]
        .join(' ')
        .toLowerCase(),
      image: imageSrc(project.thumbnail, 'card'),
    };
  });

  // Filter options come from the published set, so the dropdowns can never
  // offer a year or an author that returns nothing.
  const years = [...new Set(projects.map((project) => project.year))].sort().reverse();

  const authors = [
    ...new Map(
      docs
        .flatMap((project) => splitAuthors(project.authors))
        .map((name) => [slugify(name), { key: slugify(name), label: name }]),
    ).values(),
  ].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
      <Navbar overlay />

      <main className="flex-grow">
      <PageHero page="projects" />

      <ProjectExplorer projects={projects} years={years} authors={authors} />
      </main>

      <Footer />
    </>
  );
}
