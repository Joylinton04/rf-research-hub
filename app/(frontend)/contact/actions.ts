'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

import { contactFormSchema, type ContactFormResult } from '@/lib/contact';

/**
 * Stores one contact form submission.
 *
 * The row lands in the Messages collection, which editors read at
 * /admin → Inbox → Messages. Nothing is emailed: the Payload config declares no
 * email adapter, so adding one is what would turn this into a notification.
 */
export const submitContactForm = async (values: unknown): Promise<ContactFormResult> => {
  // Re-validated server-side. The client resolver runs on the same schema, but
  // a server action is a public endpoint and whatever arrives here is untrusted.
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Those details did not look right. Please check them and try again.',
    };
  }

  try {
    const payload = await getPayload({ config });

    // Local API, so the collection's admin-only `create` does not block this —
    // see the note on the collection for why it is closed to the REST API.
    await payload.create({
      collection: 'contact-messages',
      data: parsed.data,
    });

    return { status: 'sent' };
  } catch (error) {
    // The visitor gets a generic line; the detail belongs in the server log.
    console.error('contact form: failed to store submission', error);
    return {
      status: 'error',
      message: 'Something went wrong sending your message. Please try again, or email us directly.',
    };
  }
};
