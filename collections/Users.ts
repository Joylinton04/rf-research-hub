import type { CollectionConfig } from 'payload';

// Admin accounts. `auth: true` gives Payload's built-in email/password login,
// session handling and password reset — do not hand-roll auth alongside this.
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email'],
  },
  auth: true,
  access: {
    // Only signed-in admins may read or manage other admin accounts.
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
};
