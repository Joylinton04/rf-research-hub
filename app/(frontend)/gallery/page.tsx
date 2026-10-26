import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GalleryGrid, type GalleryImage } from '@/components/GalleryGrid';
import { imageAlt, imageSrc } from '@/lib/media';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Gallery',
  description:
    'Photographs from the R&S RF & Microwave Research Center at KNUST: antenna design sessions, VNA measurement work and the instrument benches the group builds on.',
  path: '/gallery',
});

export default async function GalleryPage() {
  // Editable in the admin panel at /admin → Collections → Gallery. The
  // collection is `orderable`, so `_order` is the editor-controlled grid order.
  const payload = await getPayload({ config });
  // depth 1 so the `image` upload arrives as a Media doc with a URL and its
  // pixel dimensions — at depth 0 Payload returns a bare id and every tile
  // would render empty.
  const { docs } = await payload.find({
    collection: 'gallery',
    sort: '_order',
    limit: 100,
    depth: 1,
  });

  // Rows whose upload did not come back populated are dropped rather than
  // handed to next/image as an unusable src. `width`/`height` are the original's
  // true pixel size, which is what lets the masonry column reserve the right
  // height before the file arrives, so the layout does not jump as it loads.
  const images: GalleryImage[] = docs.flatMap((row) => {
    const media = typeof row.image === 'object' && row.image ? row.image : null;
    const src = imageSrc(row.image, 'card');

    if (!src || !media?.width || !media?.height) return [];

    return [
      {
        id: row.id,
        src,
        // sharp skips any size wider than the source, so a small upload has no
        // `feature` and the lightbox falls back to the tile's file.
        fullSrc: imageSrc(row.image, 'feature') ?? src,
        width: media.width,
        height: media.height,
        title: row.title,
        category: row.category,
        description: row.description,
        alt: imageAlt(row.image, row.description),
      },
    ];
  });

  // The hero backdrop is the first photograph in the editor's order, so the
  // page needs no second place to manage it and no file left behind in /public.
  const hero = images[0] ?? null;

  return (
    <>
      <Navbar overlay />

      <main className="flex-grow">
        {/* Hero Banner — same dark-photo treatment as /about and /projects. */}
        <section className="relative flex min-h-[430px] items-center overflow-hidden bg-black pt-20 text-white lg:min-h-[490px]">
          <div className="absolute inset-0 z-0 flex justify-end">
            <div className="relative h-full w-full lg:w-3/5">
              {hero && (
                /* `fill` rather than width/height: the backdrop is sized by its
                   container, not by the file. */
                <Image
                  src={hero.fullSrc}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                  className="object-cover object-center brightness-90 contrast-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent lg:via-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-container-max px-6 py-12 lg:px-12">
            <div className="max-w-2xl">
              <h1 className="mb-5 font-sans text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[54px]">
                Gallery
              </h1>
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
                Inside the R&amp;S RF &amp; Microwave Research Center — the antenna
                design sessions, measurement work and instrument benches behind
                the group&apos;s research.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-outline-variant bg-surface-container-low px-6 py-16 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-container-max">
            <div className="mb-12 border-b border-outline-variant pb-4">
              <h2 className="font-headline-lg text-headline-lg text-primary">
                From the Lab
              </h2>
              <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
                {images.length > 0
                  ? 'Select any photograph to view it full size.'
                  : 'No photographs have been published yet.'}
              </p>
            </div>

            {images.length > 0 && <GalleryGrid images={images} />}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
