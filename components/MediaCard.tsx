import React from 'react';
import Image from 'next/image';

interface MediaCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  /** Alt text, which for a photograph is its description rather than its title. */
  alt: string;
  /** Omitted when the row carries no date — the badge is then not rendered. */
  date?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  title,
  category,
  description,
  image,
  alt,
  date,
}) => {
  return (
    <div className="group relative bg-white border border-outline-variant overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300">
      <div className="aspect-[4/5] relative overflow-hidden bg-surface-container">
        {/* `fill` rather than width/height: the tile is sized by its 4:5
            container, not by the file. */}
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {date && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 border border-outline-variant rounded-sm shadow-sm">
            <span className="font-label-caps text-label-caps text-primary font-bold">
              {date}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 border-t border-outline-variant bg-white">
        <h3 className="font-label-caps text-label-caps text-secondary font-semibold mb-1">
          {category}
        </h3>
        <p className="font-body-md text-body-lg font-semibold text-primary mb-2 leading-tight">
          {title}
        </p>
        <p className="font-body-sm text-body-md text-on-surface-variant leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
};
