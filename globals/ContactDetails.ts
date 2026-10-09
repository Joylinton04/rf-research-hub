import { safeRevalidatePath } from '../lib/revalidate';
import type { GlobalConfig } from 'payload';

// The "Get in Touch" card beside the contact form. A global rather than a
// collection: there is one set of contact details, so editors get a single
// edit screen instead of a list with one row.
//
// Every field below is optional except the copy at the top. A blank address,
// email or phone is simply not rendered, so the card never shows an empty row
// or a mailto: link pointing nowhere.
export const ContactDetails: GlobalConfig = {
  slug: 'contact-details',
  label: 'Contact Details',
  admin: {
    description: 'Address, email, phone and social links shown on the Contact page.',
  },
  access: {
    // Published copy is public; only signed-in admins can change it.
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    // The Contact page is statically prerendered, so a save has to invalidate
    // it or edits would not appear until the next deploy.
    afterChange: [
      () => {
        safeRevalidatePath('/contact');
      },
    ],
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Get in Touch',
      admin: {
        description: 'Headline on the details card.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      required: true,
      defaultValue:
        'Use the details below to contact us directly, or fill out the form and we’ll get back to you as soon as possible.',
      admin: {
        description: 'Short paragraph under the headline.',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      admin: {
        description: 'Postal address. Line breaks are preserved exactly as typed.',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Rendered as a mailto: link. Omitted from the card when blank.',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Rendered as a tel: link. Omitted from the card when blank.',
      },
    },
    {
      name: 'socials',
      type: 'array',
      labels: { singular: 'Social link', plural: 'Social links' },
      admin: {
        description: 'Icons under "Follow Us". Drag to reorder; leave empty to hide the row.',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'X (Twitter)', value: 'x' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Website', value: 'website' },
          ],
          admin: {
            description: 'Picks the icon. "Website" is the fallback for anything else.',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Full URL including https://.',
          },
        },
      ],
    },
  ],
};
