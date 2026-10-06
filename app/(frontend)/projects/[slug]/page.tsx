import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { lexicalToParagraphs } from '@/lib/lexical';
import { imageSrc } from '@/lib/media';

// Dates are stored as midnight UTC — see the note on the Projects listing page.
const fullDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const findProject = async (slug: string) => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return docs[0];
};

// Prerenders every project that exists at build time. `dynamicParams` is left at
// its default, so a project added in the admin panel afterwards still renders on
// first request instead of 404ing until the next deploy.
export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'projects',
    limit: 1000,
    depth: 0,
    select: { slug: true },
  });
  return docs.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project) return { title: 'Project not found' };

  return {
    title: project.title,
    description: lexicalToParagraphs(project.content)[0]?.slice(0, 200),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project) notFound();

  const thumbnail = imageSrc(project.thumbnail, project.image, 'feature');

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-black text-white px-6 lg:px-12 py-14 lg:py-20">
          <div className="max-w-container-max mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-label-caps text-label-caps text-slate-300 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-tight font-sans max-w-4xl">
              {project.title}
            </h1>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-slate-300">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">{project.authors}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Calendar className="w-4 h-4" />
                <span className="font-code-md text-code-md">
                  {fullDate.format(new Date(project.date))}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="max-w-container-max mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-4">
              <div className="border border-outline-variant rounded-lg bg-surface-container-lowest p-3 lg:sticky lg:top-28">
                {thumbnail && (
                  /* eslint-disable-next-line @next/next/no-img-element -- intrinsic height on an unknown aspect ratio; next/image needs fixed dimensions */
                  <img
                    src={thumbnail}
                    alt={project.title}
                    className="w-full h-auto object-contain rounded-sm"
                  />
                )}
              </div>
            </div>

            <div
              className="lg:col-span-8 space-y-5
                [&_p]:font-body-md [&_p]:text-body-md [&_p]:text-on-surface-variant [&_p]:leading-relaxed
                [&_h2]:font-headline-md [&_h2]:text-headline-md [&_h2]:text-primary [&_h2]:pt-4
                [&_h3]:font-headline-sm [&_h3]:text-headline-sm [&_h3]:text-primary [&_h3]:pt-2
                [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6
                [&_li]:font-body-md [&_li]:text-body-md [&_li]:text-on-surface-variant [&_li]:leading-relaxed
                [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2
                [&_blockquote]:border-l-4 [&_blockquote]:border-secondary [&_blockquote]:pl-4 [&_blockquote]:italic"
            >
              <RichText data={project.content} disableContainer />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
