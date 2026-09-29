/**
 * Turns "Software-Defined Networks: Advances & Opportunities" into
 * "software-defined-networks-advances-opportunities".
 *
 * Shared by the Projects collection (which derives a document's slug from its
 * title) and the Projects page (which derives stable filter keys from author
 * names), so both sides agree on what a given string slugifies to.
 */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
