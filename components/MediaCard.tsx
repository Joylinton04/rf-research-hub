import React from 'react';

interface MediaCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  title,
  category,
  description,
  image,
  date,
}) => {
  return (
    <div className="group relative bg-white border border-outline-variant overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300">
      <div className="aspect-[4/5] relative overflow-hidden bg-surface-container">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 border border-outline-variant rounded-sm shadow-sm">
          <span className="font-label-caps text-label-caps text-primary font-bold">
            {date}
          </span>
        </div>
      </div>
      <div className="p-6 border-t border-outline-variant bg-white">
        <h3 className="font-label-caps text-label-caps text-secondary font-semibold mb-1">
          {category}
        </h3>
        <p className="font-body-md text-body-md font-semibold text-primary mb-2 leading-tight">
          {title}
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
};
