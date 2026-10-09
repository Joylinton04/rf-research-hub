import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@payload-config';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Banknote, Clock, MapPin } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { imageAlt, imageSrc } from '@/lib/media';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Bootcamps',
  description:
    'Intensive short courses from the Antenna Research Group on measurement tools, antenna principles and practical RF/microwave engineering.',
  path: '/bootcamps',
});

export default async function BootcampsPage() {
  // Editable in the admin panel at /admin → Collections → Bootcamps. The
  // collection is `orderable`, so `_order` is the editor-controlled running
  // order.
  const payload = await getPayload({ config });
  // depth 1 so the `flyer` upload arrives as a Media doc with a URL and its
  // pixel dimensions — at depth 0 Payload returns a bare id.
  const { docs: bootcamps } = await payload.find({
    collection: 'bootcamps',
    sort: '_order',
    limit: 100,
    depth: 1,
  });

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        <section className="relative flex min-h-[350px] items-center overflow-hidden bg-black text-white lg:min-h-[410px]">
          <div className="absolute inset-0 z-0 flex justify-end">
            <div className="relative h-full w-full lg:w-3/5">
              {/* `fill` rather than width/height: the backdrop is sized by its
                  container, not by the file. */}
              <Image
                src="/rf-lab.jpg"
                alt=""
                aria-hidden="true"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority
                className="object-cover object-center brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent lg:via-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-container-max px-6 py-12 lg:px-12">
            <div className="max-w-2xl">
              <h1 className="mb-5 font-sans text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[54px]">
                BootCamps
              </h1>
              <p className="text-base font-medium leading-relaxed text-slate-300 sm:text-xl">
                Upcoming and past bootcamps — intensive short courses on
                measurement tools, antenna principles and practical RF/microwave
                engineering.
                <br />
                For information about new sessions, please follow the group&apos;s
                social channels
              </p>
            </div>
          </div>
        </section>

        <section className="border-outline-variant bg-surface-container-low px-6 py-16 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-container-max space-y-16 lg:space-y-24">
            {bootcamps.length === 0 && (
              <p className="font-body-md text-body-md text-on-surface-variant">
                No bootcamps have been published yet.
              </p>
            )}

            {bootcamps.map((bootcamp) => {
              const flyer =
                typeof bootcamp.flyer === 'object' && bootcamp.flyer ? bootcamp.flyer : null;
              const flyerSrc = imageSrc(bootcamp.flyer, 'feature');

              // Each one is only rendered when the editor filled it in, so a
              // bootcamp with no fee yet simply shows fewer rows.
              const details = [
                { icon: Banknote, label: 'Fees', value: bootcamp.fee },
                { icon: Clock, label: 'Duration', value: bootcamp.duration },
                { icon: MapPin, label: 'Venue', value: bootcamp.venue },
              ].filter((detail) => Boolean(detail.value));

              return (
                <article
                  key={bootcamp.id}
                  className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14"
                >
                  {/* The flyer is a designed artwork, so it is never cropped —
                      it keeps its own ratio and the column sizes around it. */}
                  {flyerSrc && flyer?.width && flyer?.height && (
                    <div className="lg:col-span-5">
                      <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest p-3 lg:sticky lg:top-28">
                        <Image
                          src={flyerSrc}
                          alt={imageAlt(bootcamp.flyer, `${bootcamp.title} flyer`)}
                          width={flyer.width}
                          height={flyer.height}
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="h-auto w-full rounded-sm object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <div className={flyerSrc ? 'lg:col-span-7' : 'lg:col-span-12'}>
                    {bootcamp.organiser && (
                      <span className="font-label-caps text-label-caps font-semibold text-secondary">
                        {bootcamp.organiser}
                      </span>
                    )}
                    <h2 className="mt-2 font-headline-lg text-headline-lg leading-tight text-primary">
                      {bootcamp.title}
                    </h2>

                    <div
                      className="mt-6 space-y-5
                        [&_p]:font-body-md [&_p]:text-body-md [&_p]:text-on-surface-variant [&_p]:leading-relaxed
                        [&_h2]:font-headline-md [&_h2]:text-headline-md [&_h2]:text-primary [&_h2]:pt-4
                        [&_h3]:font-headline-sm [&_h3]:text-headline-sm [&_h3]:text-primary [&_h3]:pt-2
                        [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6
                        [&_li]:font-body-md [&_li]:text-body-md [&_li]:text-on-surface-variant [&_li]:leading-relaxed
                        [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2
                        [&_blockquote]:border-l-4 [&_blockquote]:border-secondary [&_blockquote]:pl-4 [&_blockquote]:italic"
                    >
                      <RichText data={bootcamp.description} disableContainer />
                    </div>

                    {details.length > 0 && (
                      <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg sm:grid-cols-2">
                        {details.map(({ icon: Icon, label, value }) => (
                          <div key={label} className="bg-surface-container-lowest p-5">
                            <dt className="flex items-center gap-2 font-label-caps text-label-caps font-semibold text-on-surface-variant">
                              <Icon className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                              {label}
                            </dt>
                            <dd className="mt-1.5 font-body-md text-body-md font-semibold leading-snug text-primary">
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {bootcamp.note && (
                      <p className="mt-5 border-l-2 border-secondary pl-4 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                        {bootcamp.note}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
