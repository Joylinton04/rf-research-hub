import React from 'react';
import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Tutorials',
    description:
      'Step-by-step guides from the Antenna Research Group on antenna design, RF measurement and lab instrumentation. Coming soon.',
    path: '/tutorials',
  }),
  // A placeholder with no content is thin content: indexing it earns a weak
  // result that competes with the pages that do say something. Flip this to
  // true — and add the route to app/sitemap.ts — once there are tutorials here.
  robots: { index: false, follow: true },
};

export default function TutorialsPage() {
  return (
    <>
      <Navbar />

      <main className="flex flex-grow items-center justify-center px-6 py-24 lg:px-12">
        <div className="max-w-xl text-center">
          <h1 className="font-headline-lg text-headline-lg text-primary">
            Tutorials
          </h1>
          <p className="mt-3 font-body-md text-body-md leading-relaxed text-on-surface-variant">
            Step-by-step guides on antenna design, RF measurement and working
            the lab instruments are on the way. Coming soon.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
