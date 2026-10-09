'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

export interface GalleryImage {
  /** Row id from the Gallery collection, used as the React key. */
  id: number;
  /** Media URL for the tile — the `card` derivative where there is one. */
  src: string;
  /** Larger derivative for the lightbox, which renders the photo much bigger. */
  fullSrc: string;
  /** Intrinsic dimensions of the original, so the masonry column reserves the
   *  right height before the file loads and nothing reflows. The derivatives
   *  are resized on width alone, so the ratio holds for every one of them. */
  width: number;
  height: number;
  title: string;
  /** Small caps chip above the title. */
  category: string;
  /** One line describing what is actually in the frame. */
  description: string;
  /** Alt text — the editor's wording on the Media row, else the description. */
  alt: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

/**
 * Masonry gallery with a lightbox.
 *
 * The images run from 1.33:1 to 2.22:1, so a fixed-aspect grid would have to
 * crop the panoramas hard to keep its rhythm. CSS columns let every tile keep
 * its own shape — nothing is cropped at any breakpoint, and the varied heights
 * are what gives the layout its texture.
 */
export const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  // Index of the open image, or null when the lightbox is closed.
  const [openAt, setOpenAt] = useState<number | null>(null);
  const isOpen = openAt !== null;

  const dialogRef = useRef<HTMLDivElement>(null);
  // Whatever was focused before opening, so focus can go back there on close
  // instead of jumping to the top of the document.
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = (index: number) => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setOpenAt(index);
  };

  const close = useCallback(() => {
    setOpenAt(null);
    lastFocused.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      // Wraps, so the arrows never dead-end at either edge.
      setOpenAt((current) =>
        current === null ? current : (current + delta + images.length) % images.length,
      );
    },
    [images.length],
  );

  // Keyboard control, and the scroll lock that keeps the page behind the
  // overlay from moving under the pointer.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowRight') step(1);
      else if (event.key === 'ArrowLeft') step(-1);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, step]);

  const active = openAt === null ? null : images[openAt];

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {images.map((image, index) => (
          <figure key={image.id} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => open(index)}
              aria-label={`Enlarge: ${image.title}`}
              className="group block w-full cursor-pointer overflow-hidden rounded-lg border border-outline-variant bg-surface-container text-left transition-all duration-300 hover:border-primary hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                />

                {/* Scrim + icon on hover, to signal the tile is clickable. */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                  <span className="rounded-full bg-white/90 p-2.5 shadow-sm">
                    <Expand className="h-5 w-5 text-primary" />
                  </span>
                </div>
              </div>

              <figcaption className="border-t border-outline-variant bg-surface-container-lowest p-5">
                <span className="font-label-caps text-label-caps font-semibold text-secondary">
                  {image.category}
                </span>
                <h3 className="mt-1 font-body-md text-body-md font-semibold leading-tight text-primary">
                  {image.title}
                </h3>
                <p className="mt-1.5 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                  {image.description}
                </p>
              </figcaption>
            </button>
          </figure>
        ))}
      </div>

      {active && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} — image ${(openAt ?? 0) + 1} of ${images.length}`}
          tabIndex={-1}
          // Clicking the backdrop closes; the stopPropagation on the inner
          // figure keeps a click on the photo itself from doing the same.
          onClick={close}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="flex w-full max-w-6xl items-center justify-between gap-4 pb-4 text-white">
            <span className="font-label-caps text-label-caps text-white/70">
              {(openAt ?? 0) + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="cursor-pointer rounded-full p-2 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <figure
            onClick={(event) => event.stopPropagation()}
            className="flex min-h-0 w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4"
          >
            <Image
              src={active.fullSrc}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="100vw"
              priority
              className="max-h-[70vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="max-w-2xl text-center">
              <span className="font-label-caps text-label-caps font-semibold text-white/60">
                {active.category}
              </span>
              <h2 className="mt-1 font-headline-sm text-headline-sm text-white">
                {active.title}
              </h2>
              <p className="mt-1.5 font-body-sm text-body-sm leading-relaxed text-white/70">
                {active.description}
              </p>
            </figcaption>
          </figure>

          {/* Stop propagation so the arrows do not close the dialog. */}
          <div
            onClick={(event) => event.stopPropagation()}
            className="flex items-center gap-3 pt-4"
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="cursor-pointer rounded-full border border-white/20 p-3 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="cursor-pointer rounded-full border border-white/20 p-3 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
