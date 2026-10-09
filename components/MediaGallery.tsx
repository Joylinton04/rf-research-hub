'use client';

import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { MediaCard } from '@/components/MediaCard';

export interface MediaItem {
  /** Row id from the Gallery collection, used as the React key. */
  id: number;
  title: string;
  category: string;
  /** Which filter chip shows this item. The Gallery `category` fills it. */
  filterTag: string;
  description: string;
  image: string;
  /** Alt text, which for a photograph is its description rather than its title. */
  alt: string;
  /** Absent when the row carries no date — the card then shows no badge. */
  date?: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
  filters: string[];
}

// Split out of the home page so that page.tsx can stay a server component and
// fetch hero copy from Payload; only this filter UI needs client state.
export const MediaGallery: React.FC<MediaGalleryProps> = ({ items, filters }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const visibleItems =
    activeFilter === 'ALL'
      ? items
      : items.filter((item) => item.filterTag === activeFilter);

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-12 bg-surface-container-low border-t border-b border-outline-variant">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 border-b border-outline-variant pb-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Research Media Gallery
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Visual documentation of our hardware setups, field tests, and
              laboratory research.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 font-label-caps text-label-caps rounded-full cursor-pointer transition-all ${activeFilter === filter
                    ? "bg-primary text-on-primary font-semibold border border-primary"
                    : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2 text-outline font-label-caps text-label-caps font-semibold select-none ml-auto lg:ml-0">
              <ArrowUpDown className="w-4 h-4 text-outline" />
              <span>SORT BY DATE</span>
            </div>
          </div>
        </div>

        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleItems.map((item) => (
              <MediaCard
                key={item.id}
                title={item.title}
                category={item.category}
                description={item.description}
                image={item.image}
                alt={item.alt}
                date={item.date}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-outline-variant rounded bg-surface-container-lowest">
            <p className="font-body-md text-on-surface-variant">
              No media found for the selected category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
