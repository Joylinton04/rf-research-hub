import { z } from 'zod';

/**
 * One schema for both ends of the contact form.
 *
 * The client uses it through the resolver so a visitor sees errors as they
 * type; the server action re-parses the same shape before anything is written,
 * because the client check is a convenience and a POST can be made without it.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Please enter your name.' })
    .max(120, { message: 'That name is too long.' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your email address.' })
    .email({ message: 'Please enter a valid email address.' })
    .max(200, { message: 'That email address is too long.' }),
  subject: z
    .string()
    .trim()
    .min(3, { message: 'Please give your message a subject.' })
    .max(200, { message: 'That subject is too long — try a shorter summary.' }),
  message: z
    .string()
    .trim()
    .min(20, { message: 'Please write at least 20 characters so we can help.' })
    .max(3000, { message: 'That message is too long — please keep it under 3000 characters.' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** What the server action hands back to the form. */
export type ContactFormResult =
  | { status: 'sent' }
  | { status: 'error'; message: string };
