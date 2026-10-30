import React from 'react';
import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@payload-config';
import { imageSrc } from '@/lib/media';
import { pageHeroDefaults, type HeroPage } from '@/lib/page-heroes';

interface PageHeroProps {
  page: HeroPage;
  /**
   * Backdrop used when the editor has not picked one, ahead of the page's
   * built-in file. The Gallery page passes its first photograph here.
   */
  fallbackImage?: string | null;
}

/**
 * The dark-photo banner at the top of each inner page. Editable in the admin
 * panel at /admin → Collections → Page Heroes; a page with no row there renders
 * the copy it shipped with, from lib/page-heroes.ts.
 */
export async function PageHero({ page, fallbackImage }: PageHeroProps) {
  const payload = await getPayload({ config });
  // depth 1 so the `backgroundImage` upload arrives as a Media doc with a URL.
  const { docs } = await payload.find({
    collection: 'page-heroes',
    where: { page: { equals: page } },
    limit: 1,
    depth: 1,
  });

  const defaults = pageHeroDefaults[page];
  const hero = docs[0];
  const title = hero?.title ?? defaults.title;
  const description = hero?.description ?? defaults.description;
  const backdrop =
    imageSrc(hero?.backgroundImage, 'feature') ??
    fallbackImage ??
    (defaults.imageFile ? `/${defaults.imageFile}` : null);

  return (
    <section className="relative flex min-h-[430px] items-center overflow-hidden bg-black pt-20 text-white lg:min-h-[490px]">
      {/* Background photo positioned on the right and faded seamlessly into black */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="relative h-full w-full lg:w-3/5">
          {backdrop && (
            /* `fill` rather than width/height: the backdrop is sized by its
               container, not by the file. Decorative, so hidden from
               assistive tech — the headline carries the meaning. */
            <Image
              src={backdrop}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
              className="object-cover object-center brightness-90 contrast-105"
            />
          )}
          {/* Multi-layer gradient overlays for smooth dark blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent lg:via-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container-max px-6 py-12 lg:px-12">
        <div className="max-w-2xl">
          <h1 className="mb-5 font-sans text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[54px]">
            {title}
          </h1>
          {/* The editor's line breaks are the formatting here. */}
          <p className="whitespace-pre-line text-base font-medium leading-relaxed text-slate-300 sm:text-xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
