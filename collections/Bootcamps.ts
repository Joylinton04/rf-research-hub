import { safeRevalidatePath } from '../lib/revalidate';
import type { CollectionConfig } from 'payload';

// Bootcamp listings on /bootcamps: the flyer, the write-up beside it, and the
// handful of practical details an attendee needs before signing up.
//
// `orderable: true` gives the admin list a drag handle and a hidden `_order`
// column, so editors decide which bootcamp leads the page — there is no date
// field to sort on, because the flyers do not reliably carry one.
export const Bootcamps: CollectionConfig = {
  slug: 'bootcamps',
  labels: {
    singular: 'Bootcamp',
    plural: 'Bootcamps',
  },
  orderable: true,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'duration', 'fee', 'updatedAt'],
    description:
      'Bootcamps listed on the Bootcamps page. Drag rows to reorder them — the top row is shown first.',
  },
  access: {
    // Published copy is public; only signed-in admins can change it.
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    // The Bootcamps page is statically prerendered, so writes have to
    // invalidate it or edits would not appear until the next deploy.
    afterChange: [
      () => {
        safeRevalidatePath('/bootcamps');
      },
    ],
    afterDelete: [
      () => {
        safeRevalidatePath('/bootcamps');
      },
    ],
  },
  fields: [
    {
      name: 'flyer',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'The promotional flyer. Shown at its own aspect ratio and nothing is cropped, so whatever shape the design is will be respected.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the bootcamp as it appears on the flyer, e.g. "Vacation BootCamp 2026".',
      },
    },
    {
      name: 'organiser',
      type: 'text',
      admin: {
        description:
          'Who is running it, shown in small caps above the title. Left blank, the line is omitted.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description:
          'The write-up shown beside the flyer. Everything a prospective attendee should read before the details below.',
      },
    },
    {
      name: 'fee',
      type: 'text',
      admin: {
        description:
          'Cost to attend, including the currency, e.g. "GHS 350". Omitted from the page when blank.',
      },
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'How long it runs, e.g. "2 weeks". Omitted from the page when blank.',
      },
    },
    {
      name: 'venue',
      type: 'textarea',
      admin: {
        description: 'Where it is held. Omitted from the page when blank.',
      },
    },
    {
      name: 'note',
      type: 'text',
      admin: {
        description:
          'One extra line called out under the details, e.g. an internship credit. Omitted when blank.',
      },
    },
  ],
};
