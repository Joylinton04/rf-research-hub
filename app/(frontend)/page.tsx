import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { MediaGallery, type MediaItem } from "@/components/MediaGallery";
import { imageAlt, imageSrc } from "@/lib/media";
import { lexicalToParagraphs } from "@/lib/lexical";
import { pageMetadata, siteDescription, siteName } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


// Dates are stored as midnight UTC. Formatting in the server's local zone would
// roll "2026-08-01" back into July west of Greenwich, so pin the zone.
const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

// The home page keeps the site name as its own title rather than taking the
// "%s — ARGG" template, which would read "ARGG — ARGG".
export const metadata: Metadata = {
  ...pageMetadata({
    title: siteName,
    description: siteDescription,
    path: "/",
  }),
  title: siteName,
};


export default async function Home() {
  // Editable in the admin panel at /admin → Globals → Home Hero.
  const payload = await getPayload({ config });
  const hero = await payload.findGlobal({ slug: "home-hero" });

  // Feeds the Organization block below. Same global the Contact page renders,
  // so the structured data and the visible contact details stay in step.
  const contactDetails = await payload.findGlobal({ slug: "contact-details" });

  // Editable in the admin panel at /admin → Collections → FAQs. The collection
  // is `orderable`, so `_order` is the editor-controlled running order.
  const { docs: faqs } = await payload.find({
    collection: "faqs",
    sort: "_order",
    limit: 100,
    depth: 0,
  });

  // Editable in the admin panel at /admin → Collections → Gallery — the same
  // rows /gallery renders, so a photograph is described once and appears in
  // both places. depth 1 so the `image` upload arrives as a Media doc with a
  // URL; at depth 0 Payload returns a bare id and every card would be empty.
  const { docs: galleryRows } = await payload.find({
    collection: "gallery",
    sort: "_order",
    limit: 100,
    depth: 1,
  });

  // Newest first, which is what the "SORT BY DATE" indicator above the grid
  // claims. Sorted here rather than in the query so the undated rows can be
  // placed deliberately: Postgres orders NULLs first on a DESC sort, which
  // would put every photograph that has no date yet at the head of a list
  // labelled newest-first. They go last instead, and since `find` returned them
  // in `_order` and sort is stable, they keep the editor's order among
  // themselves.
  const sortedRows = [...galleryRows].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Editable in the admin panel at /admin → Collections → Projects. Editors
  // curate this strip with the "Show in Current Key Projects" checkbox; with
  // nothing ticked the query comes back empty and the three most recent
  // projects stand in, so the section is never blank just because no one has
  // chosen yet.
  const featuredProjects = await payload.find({
    collection: "projects",
    where: { featured: { equals: true } },
    sort: "-date",
    limit: 3,
    depth: 1,
  });

  const { docs: projectRows } =
    featuredProjects.docs.length > 0
      ? featuredProjects
      : await payload.find({
          collection: "projects",
          sort: "-date",
          limit: 3,
          depth: 1,
        });

  const keyProjects = projectRows.flatMap((project) => {
    const image = imageSrc(project.thumbnail, "card");
    if (!image) return [];

    return [
      {
        id: project.id,
        href: `/projects/${project.slug}`,
        title: project.title,
        // The write-up's opening paragraph, the same excerpt the Projects
        // listing shows, so the two never drift apart.
        description: lexicalToParagraphs(project.content)[0] ?? "",
        image,
        alt: imageAlt(project.thumbnail, project.title),
        tag: project.tag ?? undefined,
        status: project.status ?? undefined,
      },
    ];
  });

  const mediaItems: MediaItem[] = sortedRows.flatMap((row) => {
    const src = imageSrc(row.image, "card");
    if (!src) return [];

    return [
      {
        id: row.id,
        title: row.title,
        category: row.category,
        // The gallery category is already the axis a visitor would filter on.
        filterTag: row.category,
        description: row.description,
        image: src,
        alt: imageAlt(row.image, row.description),
        // Left off entirely when the row has no date, rather than inventing one.
        ...(row.date ? { date: monthYear.format(new Date(row.date)) } : {}),
      },
    ];
    // One row of four here; /gallery is where the full set lives. Sliced after
    // the map so a row whose upload failed to populate is skipped over rather
    // than leaving a gap in the four.
  }).slice(0, 4);


  const stats = [
    { value: "142+", label: "Journal Papers" },
    { value: "12", label: "Active Patents" },
    { value: "$4.5M", label: "Research Grants" },
    { value: "08", label: "Corporate Partners" },
  ];

  // Filter chips come from the published rows, so a chip can never be offered
  // that would filter the grid down to nothing.
  const filters = ["ALL", ...new Set(mediaItems.map((item) => item.filterTag))];

  return (
    <>
      {/* Identity of the site and the group behind it. Rendered once, here on
          the home page, and referenced by @id from the other pages' blocks. */}
      <JsonLd data={organizationSchema(contactDetails)} />
      <JsonLd data={websiteSchema()} />

      <Navbar />

      <main className="flex-grow">

        {/* Hero Section */}
        <section className="relative hero-pattern py-16 lg:py-24 px-6 lg:px-12 overflow-hidden border-b border-outline-variant">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[550px]">
            <div className="lg:col-span-7 space-y-6 z-10">
              <div className="inline-block rounded-full border border-secondary bg-secondary-container px-4 py-1 text-label-caps font-semibold text-on-secondary-container">
                Antenna &amp; RF Research &middot; KNUST
              </div>
              {/* hero Title */}
              <h1 className="font-headline-xl sm:text-headline-xl text-headline-lg text-primary leading-tight">
                {hero.title}
              </h1>
              {/* hero description */}
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl whitespace-pre-line">
                {hero.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/about"
                  className="bg-primary text-on-primary px-8 py-3.5 font-label-caps text-label-caps rounded-sm flex items-center gap-2 group hover:bg-opacity-95 transition-all"
                >
                  Explore Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="border border-primary text-primary px-8 py-3.5 font-label-caps text-label-caps rounded-sm hover:bg-surface-container-low transition-colors"
                >
                  About RF Research Group
                </Link>
              </div>
            </div>
            {/* hero Image */}
            <div className="lg:col-span-5 relative hidden lg:block h-full">
              <div className="aspect-square bg-primary-container rounded-lg overflow-hidden border border-outline shadow-2xl transform rotate-1 relative">
                {/* `fill` rather than width/height: the tile is sized by its
                    square container, not by the file. */}
                <Image
                  className="object-cover mix-blend-overlay"
                  src="https://cellbusters.com/wp-content/uploads/2023/10/The-RF-Technology-Revolution-scaled.jpg"
                  alt="A high-tech printed circuit board designed for telecommunications"
                  fill
                  sizes="(min-width: 1024px) 40vw, 0px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-primary/20"></div>
                <div className="absolute bottom-6 left-6 bg-surface/95 backdrop-blur-sm p-4 border border-outline-variant rounded-sm shadow-md animate-bounce-slow">
                  <div className="font-label-caps text-[10px] text-primary mb-1 uppercase tracking-widest font-bold">
                    Live Spectrum Analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse block"></span>
                    <span className="font-code-md text-code-md text-primary font-semibold">
                      28.5 GHz Signal Lock
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Section 2: FAQs */}
        <section className="py-16 lg:py-24 px-6 lg:px-12 bg-surface border-b border-outline-variant">
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 border-b border-outline-variant pb-4">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary">
                  FAQs
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Frequently asked questions about amateur radio and our group.
                </p>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>


        {/* Key Projects Section */}
        <section className="py-16 lg:py-24 px-6 lg:px-12 bg-surface">
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-outline-variant pb-4">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary">
                  Current Key Projects
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Active research tracks and experimental testbeds.
                </p>
              </div>
              <Link
                href="/about"
                className="font-label-caps text-label-caps text-secondary flex items-center gap-1 hover:underline mt-4 md:mt-0 font-semibold"
              >
                View All Initiatives <span className="text-xs">→</span>
              </Link>
            </div>
            {keyProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {keyProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    href={project.href}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    alt={project.alt}
                    tag={project.tag}
                    status={project.status}
                  />
                ))}
              </div>
            ) : (
              <p className="font-body-md text-body-md text-on-surface-variant">
                No projects have been published yet.
              </p>
            )}
          </div>
        </section>

        <MediaGallery items={mediaItems} filters={filters} />

        {/* Lab Infrastructure & Telemetry (Merged) */}
        <section className="py-16 lg:py-24 px-6 lg:px-12 bg-surface">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="bg-tertiary p-8 text-white rounded-lg shadow-2xl relative border border-white/5">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-outline opacity-50 block"></span>
                  </div>
                  <h2 className="font-headline-md text-headline-md mb-6 font-bold tracking-tight">
                    Real-time Telemetry
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-on-tertiary-fixed-variant pb-3">
                      <span className="font-label-caps text-label-caps text-on-tertiary-container font-semibold">
                        SIGNAL BANDWIDTH
                      </span>
                      <span className="font-code-md text-code-md text-secondary-fixed font-bold">
                        800 MHz
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-on-tertiary-fixed-variant pb-3">
                      <span className="font-label-caps text-label-caps text-on-tertiary-container font-semibold">
                        PEAK THROUGHPUT
                      </span>
                      <span className="font-code-md text-code-md text-secondary-fixed font-bold">
                        4.2 Gbps
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-on-tertiary-fixed-variant pb-3">
                      <span className="font-label-caps text-label-caps text-on-tertiary-container font-semibold">
                        LATENCY (U-PLANE)
                      </span>
                      <span className="font-code-md text-code-md text-secondary-fixed font-bold">
                        0.8 ms
                      </span>
                    </div>
                  </div>
                  <div className="mt-8 h-24 bg-surface-container-highest/10 rounded-sm border border-white/10 flex items-end px-4 gap-1 pb-2">
                    <div className="flex-1 bg-secondary-fixed h-[40%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[65%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[90%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[85%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[70%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[45%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[30%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[60%] rounded-t-sm"></div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-6">
                  <h2 className="font-headline-lg text-headline-lg text-primary">
                    Advanced RF Characterization Infrastructure
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Our lab is equipped with state-of-the-art Vector Network
                    Analyzers (VNAs), real-time spectrum analyzers up to 110GHz,
                    and a fully shielded MIMO-ready anechoic chamber. We bridge
                    the gap between theoretical electromagnetic modeling and
                    real-world physical deployment.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="border-l-4 border-secondary pl-4 py-1">
                      <div className="font-headline-md text-headline-md text-primary font-bold">
                        110GHz
                      </div>
                      <div className="font-label-caps text-label-caps text-on-surface-variant font-semibold tracking-wider">
                        ANALYSIS CAPACITY
                      </div>
                    </div>
                    <div className="border-l-4 border-secondary pl-4 py-1">
                      <div className="font-headline-md text-headline-md text-primary font-bold">
                        15+
                      </div>
                      <div className="font-label-caps text-label-caps text-on-surface-variant font-semibold tracking-wider">
                        RESEARCH PATENTS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Readout / Lab Stats */}
        <section className="py-16 bg-tertiary text-on-tertiary">
          <div className="max-w-container-max mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="font-code-md text-headline-lg text-primary-fixed-dim font-bold">
                    {stat.value}
                  </div>
                  <div className="font-label-caps text-label-caps text-on-tertiary-container uppercase tracking-wider font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
