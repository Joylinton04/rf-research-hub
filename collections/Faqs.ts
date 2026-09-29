import { safeRevalidatePath } from '../lib/revalidate';
import type { CollectionConfig } from 'payload';

// Accordion entries rendered in the FAQs section of the home page.
// `orderable: true` gives the admin list a drag handle and a hidden `_order`
// column — the home page sorts on it, so editors control the running order.
export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  orderable: true,
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'updatedAt'],
    description:
      'Questions shown in the FAQs accordion on the home page. Drag rows to reorder them.',
  },
  access: {
    // Published copy is public; only signed-in admins can change it.
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    // The home page is statically prerendered, so writes have to invalidate it
    // or edits would not appear until the next deploy.
    afterChange: [
      () => {
        safeRevalidatePath('/');
      },
    ],
    afterDelete: [
      () => {
        safeRevalidatePath('/');
      },
    ],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      admin: {
        description: 'The accordion trigger. Phrase it as the visitor would ask it.',
      },
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Plain-text answer revealed when the row is expanded.',
      },
    },
  ],
};
