import { safeRevalidatePath } from '../lib/revalidate';
import type { CollectionConfig } from 'payload';

const revalidateGallery = () => {
  safeRevalidatePath('/gallery');
  safeRevalidatePath('/');
};

// Photographs shown in the masonry grid on /gallery. The first row also
// supplies the page's hero backdrop, so `orderable: true` is doing double duty:
// it gives the admin list a drag handle and a hidden `_order` column that both
// the grid order and the hero image follow.
//
// The same rows also fill the Research Media Gallery on the home page, where
// `category` doubles as the filter chip.
export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery Image',
    plural: 'Gallery',
  },
  orderable: true,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'updatedAt'],
    description:
      'Photographs on the Gallery page. Drag rows to reorder them — the top row is also the hero backdrop.',
  },
  access: {
    // Published copy is public; only signed-in admins can change it.
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    // Both pages are statically prerendered, so writes have to invalidate them
    // or edits would not appear until the next deploy. The home page's Research
    // Media Gallery reads the same rows as /gallery, so it is listed too.
    afterChange: [revalidateGallery],
    afterDelete: [revalidateGallery],
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'The photograph. Upload a file or pick one already in Media. Nothing is cropped — the masonry grid keeps whatever shape the file has.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Caption heading, e.g. "VNA Gain Measurement".',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      defaultValue: 'LABORATORY',
      admin: {
        description:
          'Small-caps chip above the title, e.g. FACILITY, LABORATORY, MEASUREMENT, EQUIPMENT. Displayed in caps.',
      },
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'monthOnly', displayFormat: 'MMM yyyy' },
        description:
          'When the photograph was taken. Shown as a badge on the home page card, and omitted there when left blank — so leave it blank rather than guessing.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'One line describing what is actually in the frame. This is also the image’s alt text, so describe the photo rather than adding detail that is not visible in it.',
      },
    },
  ],
};
