import type { Media } from '@/payload-types';

/** An `upload` field as Payload returns it: a bare id at depth 0, a doc deeper. */
type UploadField = number | Media | null | undefined;

/** The derivatives declared on the Media collection. */
type SizeName = 'thumbnail' | 'card' | 'feature';

/**
 * Resolves the `src` for an image stored in the media bucket.
 *
 * `size` picks one of the generated derivatives, falling back to the original —
 * sharp skips any size wider than the source, so a small upload has no `card`.
 *
 * Returns null rather than an empty string when there is nothing to render.
 * The upload fields are `required`, so a populated row always has one; the null
 * cases are a query run at depth 0 (where `upload` is a bare id carrying no
 * URL) and the optional URL on Payload's generated Media type. Callers render a
 * placeholder instead of handing next/image an unusable src.
 */
export const imageSrc = (upload: UploadField, size?: SizeName): string | null => {
  if (upload && typeof upload === 'object') {
    const sized = size ? upload.sizes?.[size]?.url : null;
    return sized ?? upload.url ?? null;
  }

  return null;
};

/**
 * Prefers the alt text stored on the upload, since an editor wrote it for that
 * specific image, and falls back to whatever the page knows the subject is.
 */
export const imageAlt = (upload: UploadField, fallback: string): string => {
  if (upload && typeof upload === 'object' && upload.alt) return upload.alt;
  return fallback;
};
