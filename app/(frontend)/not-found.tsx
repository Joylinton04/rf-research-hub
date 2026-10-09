import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/NotFoundContent';

export const metadata: Metadata = {
  title: 'Page not found',
  // A 404 already carries the status code, but the tag keeps the page out of
  // the index if it is ever served at 200 by a misconfigured host or CDN.
  robots: { index: false, follow: true },
};

export default function FrontendNotFound() {
  return <NotFoundContent />;
}
