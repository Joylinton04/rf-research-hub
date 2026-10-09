import { safeRevalidatePath } from '../lib/revalidate';
import { slugify } from '../lib/slug';
import type { CollectionConfig, FieldHook } from 'payload';

const revalidateProjects = () => {
  safeRevalidatePath('/projects', 'layout');
  safeRevalidatePath('/');
};

// Fills the slug from the title when the editor leaves it blank, and normalises
// whatever they do type so the value is always URL-safe. `originalDoc` keeps a
// partial update (one that sends no title and no slug) from blanking the field.
const formatSlug: FieldHook = ({ data, originalDoc, value }) => {
  if (typeof value === 'string' && value.length > 0) return slugify(value);
  if (typeof data?.title === 'string' && data.title.length > 0) return slugify(data.title);
  return originalDoc?.slug ?? value;
};

// Long-form project write-ups. These back /projects, /projects/[slug] and the
// Current Key Projects strip on the home page.
export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'authors', 'date'],
    description: 'Research projects listed on the Projects page.',
  },
  access: {
    // Published copy is public; only signed-in admins can change it.
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    // /projects and its detail routes are statically prerendered, and so is the
    // home page that now shows three of these rows.
    afterChange: [revalidateProjects],
    afterDelete: [revalidateProjects],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Full project or paper title.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL segment under /projects. Leave blank to derive it from the title.',
      },
      hooks: {
        beforeValidate: [formatSlug],
      },
    },
    {
      name: 'authors',
      type: 'text',
      required: true,
      admin: {
        description: 'Comma-separated author list, rendered as a single line on the card.',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Publication date. Only the month and year are shown on the card.',
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Card image. Upload a file or pick one already in Media. Shown on the Projects grid and at the top of the write-up.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Body of the project write-up shown on the detail page.',
      },
    },
    {
      name: 'tag',
      type: 'text',
      admin: {
        description:
          'Short reference code on the home page card, e.g. "6G-01". Left blank, the chip is not drawn.',
      },
    },
    {
      name: 'status',
      type: 'text',
      admin: {
        description:
          'Where the work stands, e.g. "Active Development". Shown at the foot of the home page card, and omitted when blank.',
      },
    },
    {
      name: 'featured',
      label: 'Show in Current Key Projects',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Puts this project in the home page strip, newest first, up to three. Tick nothing and the strip simply falls back to the three most recent projects.',
      },
    },
  ],
};
