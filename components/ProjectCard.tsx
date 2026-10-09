import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  /** Where the card points — the project's real detail route. */
  href: string;
  title: string;
  description: string;
  image: string;
  /** Alt text, which an editor may have written on the Media row. */
  alt: string;
  /** Reference chip over the image. Not drawn when the project has no tag. */
  tag?: string;
  /** Footer line. Not drawn when the project has no status. */
  status?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  title,
  description,
  image,
  alt,
  tag,
  status,
}) => {
  return (
    <Link href={href} className="group bg-surface-container-lowest border border-slate-300 rounded-xl p-6 flex flex-col transition-all duration-300">
      <div className="w-full aspect-video mb-6 overflow-hidden bg-surface-container-low border border-outline-variant relative">
        {/* `fill` rather than width/height: the tile is sized by its 16:9
            container, and an uploaded thumbnail can be any shape. */}
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        {tag && (
          <div className="absolute top-3 right-3 bg-primary text-on-primary font-label-caps text-[10px] px-2 py-1 font-semibold tracking-wider">
            {tag}
          </div>
        )}
      </div>
      <h3 className="font-headline-md text-headline-md-2 text-primary mb-3">
        {title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed">
        {description}
      </p>
      {/* The arrow stays put when there is no status, so a row of cards with
          mixed metadata still lines up. */}
      <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
        <span className="font-label-caps text-[11px] text-outline uppercase tracking-widest font-semibold">
          {status}
        </span>
        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-300" />
      </div>
    </Link>
  );
};
