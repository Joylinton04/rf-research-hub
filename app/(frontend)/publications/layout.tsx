import React from 'react';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

// The page itself is a Client Component — it holds the filter state — and a
// Client Component cannot export `metadata`, which has to resolve on the
// server. A layout for the route is the place that can.
export const metadata: Metadata = pageMetadata({
  title: 'Publications',
  description:
    'Peer-reviewed publications and technical write-ups from the Antenna Research Group at KNUST, with BibTeX for each entry.',
  path: '/publications',
});

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
