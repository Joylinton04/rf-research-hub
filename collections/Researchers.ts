import { safeRevalidatePath } from '../lib/revalidate';
import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload';

// There is one team leader, and the About page renders whoever carries the flag
// in a wide card above the grid. Promoting someone therefore has to demote the
// incumbent, or the page would silently ignore one of them.
const demoteOtherLeaders: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  if (data.teamLeader !== true) return data;

  await req.payload.update({
    collection: 'researchers',
    where: {
      teamLeader: { equals: true },
      ...(originalDoc?.id ? { id: { not_equals: originalDoc.id } } : {}),
    },
    data: { teamLeader: false },
    req,
  });

  return data;
};

// Cards in the "Key Researchers and Faculty" grid on the About page.
// `orderable: true` gives the admin list a drag handle and a hidden `_order`
// column — the grid sorts on it, so editors control the running order.
export const Researchers: CollectionConfig = {
  slug: 'researchers',
  labels: {
    singular: 'Researcher',
    plural: 'Researchers',
  },
  orderable: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'tag'],
    description:
      'Faculty and researchers shown in the team grid on the About page. Drag rows to reorder them.',
  },
  access: {
    // Published copy is public; only signed-in admins can change it.
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [demoteOtherLeaders],
    // The About page is statically prerendered, so writes have to invalidate it
    // or edits would not appear until the next deploy.
    afterChange: [
      () => {
        safeRevalidatePath('/about');
      },
    ],
    afterDelete: [
      () => {
        safeRevalidatePath('/about');
      },
    ],
  },
  fields: [
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Portrait. Upload a file or pick one already in Media. Rendered as a square, so a head-and-shoulders shot works best — the card centres and crops it.',
      },
    },
    {
      // Superseded by `portrait`. Retained unhidden-but-optional only until
      // scripts/migrate-images.ts has copied every path here into the bucket;
      // it is the mapping that backfill reads, and the rollback if a row's
      // upload goes wrong. Drop this field once the pages read `portrait`.
      name: 'image',
      type: 'text',
      admin: {
        hidden: true,
        description: 'Legacy /public path. Replaced by Portrait.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Role or academic title, shown in small caps above the name.',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name including any prefix, e.g. "Dr. Kwame Oteng Gyasi".',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Two or three sentences on their research focus. Keep it short — the card clamps long copy.',
      },
    },
    {
      name: 'socials',
      type: 'group',
      admin: {
        description: 'Contact details. Each one is omitted from the card when left blank.',
      },
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Rendered as a tel: link.',
          },
        },
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Rendered as a mailto: link.',
          },
        },
      ],
    },
    {
      name: 'tag',
      type: 'text',
      required: true,
      defaultValue: 'ANTENNA DESIGN',
      admin: {
        description: 'Research area chip at the foot of the card. Displayed in caps.',
      },
    },
    {
      name: 'teamLeader',
      label: 'Team leader',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Features this person in a wide card above the grid. Ticking it here unticks whoever held it before.',
      },
    },
  ],
};
