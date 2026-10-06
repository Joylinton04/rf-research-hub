import type { Media } from '@/payload-types';

/** An `upload` field as Payload returns it: a bare id at depth 0, a doc deeper. */
type UploadField = number | Media | null | undefined;

/** The derivatives declared on the Media collection. */
type SizeName = 'thumbnail' | 'card' | 'feature';

/**
 * Resolves the `src` for an image that may already live in the media bucket or
 * may still be the legacy /public path it is being migrated off.
 *
 * `size` picks one of the generated derivatives, falling back to the original —
 * sharp skips any size wider than the source, so a small upload has no `card`.
 *
 * Returns null when there is nothing to render: an empty upload field, or a row
 * queried at depth 0, where `upload` is a bare id and carries no URL. Callers
 * render their placeholder rather than passing an empty string to next/image.
 */
export const imageSrc = (
  upload: UploadField,
  legacy?: string | null,
  size?: SizeName,
): string | null => {
  if (upload && typeof upload === 'object') {
    const sized = size ? upload.sizes?.[size]?.url : null;
    return sized ?? upload.url ?? legacy ?? null;
  }

  return legacy ?? null;
};

/**
 * Prefers the alt text stored on the upload, since an editor wrote it for that
 * specific image, and falls back to whatever the page knows the subject is.
 */
export const imageAlt = (upload: UploadField, fallback: string): string => {
  if (upload && typeof upload === 'object' && upload.alt) return upload.alt;
  return fallback;
};
