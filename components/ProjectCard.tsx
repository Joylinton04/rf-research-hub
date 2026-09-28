import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tag: string;
  status: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tag,
  status,
}) => {
  return (
    <Link href={`projects/${title.replace(/\s+/g, "-")}`} className="group bg-surface-container-lowest border border-outline-variant p-6 flex flex-col hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="w-full aspect-video mb-6 overflow-hidden bg-surface-container-low border border-outline-variant relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute top-3 right-3 bg-primary text-on-primary font-label-caps text-[10px] px-2 py-1 font-semibold tracking-wider">
          {tag}
        </div>
      </div>
      <h3 className="font-headline-md text-headline-md text-primary mb-3">
        {title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed">
        {description}
      </p>
      <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
        <span className="font-label-caps text-[11px] text-outline uppercase tracking-widest font-semibold">
          {status}
        </span>
        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-300" />
      </div>
    </Link>
  );
};
