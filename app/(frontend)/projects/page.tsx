import React from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectExplorer, type ProjectSummary } from '@/components/ProjectExplorer';
import { lexicalToParagraphs } from '@/lib/lexical';
import { slugify } from '@/lib/slug';
import { imageSrc } from '@/lib/media';
import Image from 'next/image';

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
      <Navbar />

      {/* Hero Banner with Dark Ambient Lab Background */}
      <section className="relative bg-black text-white overflow-hidden min-h-[360px] lg:min-h-[420px] flex items-center">
        {/* Background lab photo positioned on right and faded seamlessly into black */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="relative w-full lg:w-3/5 h-full">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative full-bleed backdrop */}
            <img
              src="/rf-lab2.jpg"
              alt="Research Laboratory"
              className="w-full h-full object-cover object-center brightness-90 contrast-105"
            />
            {/* Multi-layer gradient overlays for smooth dark blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 lg:via-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-container-max mx-auto px-6 lg:px-12 py-16 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white mb-5 leading-tight font-sans">
              Project Publications
            </h1>
            <p className="text-base sm:text-2xl text-slate-300 leading-relaxed font-medium">
              Explore our projects that contribute to knowledge and innovation across various domains and disciplines.
            </p>
          </div>
        </div>
      </section>

      <ProjectExplorer projects={projects} years={years} authors={authors} />

      <Footer />
    </>
  );
}
