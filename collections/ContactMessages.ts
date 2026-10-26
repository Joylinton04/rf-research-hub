import type { CollectionAfterChangeHook, CollectionConfig } from 'payload';

import type { ContactMessage } from '../payload-types';

/**
 * Emails the group when a new message arrives, so nobody has to poll the inbox.
 *
 * Sent to CONTACT_NOTIFY_EMAIL, else the public address from the Contact
 * Details global. Reply-To is the sender, so answering the email answers them.
 *
 * A failed send is logged and swallowed: the message is already stored, and the
 * visitor should not be told their submission failed when it did not.
 */
const notifyNewMessage: CollectionAfterChangeHook<ContactMessage> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') return doc;

  try {
    let to = process.env.CONTACT_NOTIFY_EMAIL;
    if (!to) {
      const details = await req.payload.findGlobal({ slug: 'contact-details', req });
      to = details.email ?? undefined;
    }

    if (!to) {
      req.payload.logger.warn(
        'contact form: no notification address set (CONTACT_NOTIFY_EMAIL or Contact Details email); skipping email',
      );
      return doc;
    }

    // Plain text only: every field is visitor input, and text sidesteps any
    // HTML injection into the recipient's mail client.
    await req.payload.sendEmail({
      to,
      replyTo: { name: doc.name, address: doc.email },
      subject: `New contact message: ${doc.subject}`,
      text: [
        `From: ${doc.name} <${doc.email}>`,
        `Subject: ${doc.subject}`,
        '',
        doc.message,
        '',
        '—',
        'Reply to this email to answer the sender directly.',
        'Mark it as replied to in Admin → Inbox → Messages.',
      ].join('\n'),
    });
  } catch (error) {
    req.payload.logger.error({ err: error, msg: 'contact form: failed to send notification email' });
  }

  return doc;
};

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
  hooks: {
    afterChange: [notifyNewMessage],
  },
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
