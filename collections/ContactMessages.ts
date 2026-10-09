import type { CollectionConfig } from 'payload';

// Everything submitted through the form on /contact. Nothing here is rendered
// on the site — it is an inbox the group reads in the admin panel.
export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Message',
    plural: 'Messages',
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'name', 'email', 'handled', 'createdAt'],
    description: 'Messages sent through the contact form. Newest first.',
    group: 'Inbox',
  },
  access: {
    // Nothing is public here, `create` included: visitors never touch this
    // collection through the REST API. The form posts to a server action, and
    // Payload's Local API bypasses access control, so a closed `create` keeps
    // /api/contact-messages shut to anonymous writes without blocking the form.
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Sender’s name, as they typed it.',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Reply address. Treat it as unverified — nobody confirmed it.',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'handled',
      label: 'Replied to',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Tick once someone has answered, so the rest stand out as outstanding.',
      },
    },
  ],
};
