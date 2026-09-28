import { revalidatePath } from 'next/cache';
import type { GlobalConfig } from 'payload';

// The home page hero. A global rather than a collection: there is exactly one
// hero, so editors get a single edit screen instead of a list with one row.
export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: 'Home Hero',
  admin: {
    description: 'Headline and intro paragraph at the top of the home page.',
  },
  access: {
    // Published copy is public; only signed-in admins can change it.
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    // The home page is statically prerendered, so a save has to invalidate it
    // or edits would not appear until the next deploy.
    afterChange: [
      () => {
        revalidatePath('/');
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'What is Amateur Radio?',
      admin: {
        description: 'Main headline. Keep it short — it renders at 48px on desktop.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Amateur Radio, often called Ham Radio, is a worldwide community of licensed hobbyists who use radio technology for non-commercial communication, experimentation, and public service.',
      admin: {
        description: 'Supporting paragraph shown directly beneath the headline.',
      },
    },
  ],
};
