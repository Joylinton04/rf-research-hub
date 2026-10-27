import { heroPages, pageHeroDefaults, type HeroPage } from '../lib/page-heroes';
import { safeRevalidatePath } from '../lib/revalidate';
import type { CollectionConfig } from 'payload';

const revalidateHero = (page: HeroPage | null | undefined) => {
  if (page) safeRevalidatePath(pageHeroDefaults[page].path);
};

// The dark-photo banner at the top of each inner page. One row per page: the
// `page` select is unique, so an editor cannot create two heroes that compete
// for the same banner. A page with no row falls back to the copy in
// lib/page-heroes.ts rather than rendering an empty headline.
export const PageHeroes: CollectionConfig = {
  slug: 'page-heroes',
  labels: {
    singular: 'Page Hero',
    plural: 'Page Heroes',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'page', 'updatedAt'],
    description:
      'Headline, intro paragraph and backdrop photo for the banner at the top of each inner page. One row per page.',
  },
  access: {
    // Published copy is public; only signed-in admins can change it.
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    // The pages are statically prerendered, so writes have to invalidate them
    // or edits would not appear until the next deploy. Moving a row to another
    // page changes two banners, so the previous page is invalidated as well.
    afterChange: [
      ({ doc, previousDoc }) => {
        revalidateHero(doc.page);
        if (previousDoc?.page !== doc.page) revalidateHero(previousDoc?.page);
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateHero(doc.page);
      },
    ],
  },
  fields: [
    {
      name: 'page',
      type: 'select',
      required: true,
      unique: true,
      options: heroPages.map((page) => ({ label: pageHeroDefaults[page].label, value: page })),
      admin: {
        position: 'sidebar',
        description: 'Which page this banner belongs to. Each page can have only one.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The page’s main headline. Keep it short — it renders at 54px on desktop.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Intro paragraph beneath the headline. Line breaks are preserved exactly as typed.',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Backdrop photo on the right of the banner, faded into black on the left so the text stays legible. Optional — left blank, the page keeps its built-in photo (the Gallery page uses its first photograph).',
      },
    },
  ],
};
