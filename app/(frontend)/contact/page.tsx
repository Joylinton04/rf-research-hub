import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with the Antenna Research Group at KNUST — address, email, phone and a message form that reaches the group directly.',
  path: '/contact',
});

// lucide dropped its brand glyphs in v1, so these are drawn inline from the
// same paths the Links page already uses. `website` is the one real lucide icon
// here, and the fallback for a platform with no glyph of its own.
const brandPaths: Record<string, string> = {
  x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  linkedin:
    'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
};

const socialLabels: Record<string, string> = {
  x: 'X (Twitter)',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  youtube: 'YouTube',
  website: 'Website',
};

export default async function ContactPage() {
  // Editable in the admin panel at /admin → Globals → Contact Details.
  const payload = await getPayload({ config });
  const details = await payload.findGlobal({ slug: 'contact-details' });

  const socials = details.socials ?? [];

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Hero Banner — same dark-photo treatment as the other inner pages. */}
        <section className="relative flex min-h-[350px] items-center overflow-hidden bg-black text-white lg:min-h-[410px]">
          <div className="absolute inset-0 z-0 flex justify-end">
            <div className="relative h-full w-full lg:w-3/5">
              {/* `fill` rather than width/height: the backdrop is sized by its
                  container, not by the file. */}
              <Image
                src="/rf-lab2.jpg"
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
                Contact Us
              </h1>
              <p className="text-base font-medium leading-relaxed text-slate-300 sm:text-xl">
                Questions about the group, the lab, a bootcamp or a possible
                collaboration — this reaches us directly.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-outline-variant bg-surface-container-low px-6 py-16 lg:px-12">
          <div className="mx-auto grid max-w-container-max grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Details card */}
            <div className="lg:col-span-5">
              <div className="h-full rounded-sm border border-outline-variant bg-surface-container p-8 lg:p-10">
                <h2 className="font-headline-lg text-headline-lg text-primary">
                  {details.heading}
                </h2>
                <p className="mt-3 font-body-md text-body-md leading-relaxed text-on-surface-variant">
                  {details.intro}
                </p>

                <dl className="mt-10 space-y-8">
                  {details.address && (
                    <div className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container">
                        <MapPin className="h-5 w-5 text-on-secondary-container" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="font-body-md text-body-md font-bold text-primary">
                          Address
                        </dt>
                        {/* The editor's line breaks are the formatting here. */}
                        <dd className="mt-1 whitespace-pre-line font-body-md text-body-md leading-relaxed text-on-surface-variant">
                          {details.address}
                        </dd>
                      </div>
                    </div>
                  )}

                  {details.email && (
                    <div className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container">
                        <Mail className="h-5 w-5 text-on-secondary-container" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <dt className="font-body-md text-body-md font-bold text-primary">
                          Email
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={`mailto:${details.email}`}
                            className="break-words font-body-md text-body-md text-secondary underline underline-offset-2 hover:text-primary"
                          >
                            {details.email}
                          </a>
                        </dd>
                      </div>
                    </div>
                  )}

                  {details.phone && (
                    <div className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container">
                        <Phone className="h-5 w-5 text-on-secondary-container" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="font-body-md text-body-md font-bold text-primary">
                          Phone
                        </dt>
                        <dd className="mt-1">
                          {/* Strip spacing and punctuation for the dial string
                              while the label keeps its readable formatting. */}
                          <a
                            href={`tel:${details.phone.replace(/[^+\d]/g, '')}`}
                            className="font-body-md text-body-md text-secondary underline underline-offset-2 hover:text-primary"
                          >
                            {details.phone}
                          </a>
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>

                {socials.length > 0 && (
                  <div className="mt-10">
                    <h3 className="font-body-md text-body-md font-bold text-primary">
                      Follow Us
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-3">
                      {socials.map((social) => {
                        const path = brandPaths[social.platform];
                        const label = socialLabels[social.platform] ?? social.platform;

                        return (
                          <li key={social.id ?? social.url}>
                            <a
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={label}
                              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary transition-colors hover:bg-secondary hover:text-on-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                              {path ? (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                >
                                  <path d={path} />
                                </svg>
                              ) : (
                                <Globe className="h-5 w-5" aria-hidden="true" />
                              )}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Form card */}
            <div className="lg:col-span-7">
              <div className="rounded-sm bg-surface-container-lowest p-8 lg:p-10">
                <h2 className="mb-8 font-headline-lg text-headline-lg text-primary">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
