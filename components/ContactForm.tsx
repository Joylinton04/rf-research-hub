'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, TriangleAlert } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactFormSchema, type ContactFormValues } from '@/lib/contact';
import { submitContactForm } from '@/app/(frontend)/contact/actions';

/** Marks a field as required without relying on colour alone to say so. */
const RequiredMark = () => (
  <span className="text-error" aria-hidden="true">
    {' '}
    *
  </span>
);

export const ContactForm: React.FC = () => {
  // Null until a submission comes back; then either the thank-you panel or an
  // error banner above the fields.
  const [result, setResult] = useState<'sent' | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    // Controlled from the first render — react-hook-form warns about an input
    // flipping from uncontrolled to controlled otherwise.
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    const response = await submitContactForm(values);

    if (response.status === 'sent') {
      form.reset();
      setResult('sent');
      return;
    }

    setSubmitError(response.message);
  };

  if (result === 'sent') {
    return (
      <div
        // Announced to screen readers, which would otherwise see the form
        // vanish with no explanation.
        role="status"
        className="flex flex-col items-start gap-4 rounded-sm border border-outline-variant bg-surface-container-lowest p-8"
      >
        <CheckCircle2 className="h-8 w-8 text-secondary" aria-hidden="true" />
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary">
            Message sent
          </h3>
          <p className="mt-2 font-body-md text-body-md leading-relaxed text-on-surface-variant">
            Thank you for getting in touch. Someone from the group will reply to
            the address you gave.
          </p>
        </div>
        <Button variant="outline" onClick={() => setResult(null)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      {/* noValidate hands validation to the resolver, so a visitor sees one
          consistent set of messages rather than the browser's as well. */}
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
        {submitError && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-sm border border-error bg-error-container p-4 font-body-sm text-body-sm text-on-error-container"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {submitError}
          </p>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your Name
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your Email
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Subject
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your Message
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Textarea rows={7} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </Form>
  );
};
