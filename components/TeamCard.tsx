import React from 'react';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';

interface TeamCardProps {
  name: string;
  title: string;
  description: string;
  image: string | null;
  tag: string;
  socials?: {
    phone?: string | null;
    email?: string | null;
  } | null;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  title,
  description,
  image,
  tag,
  socials,
}) => {
  const phone = socials?.phone?.trim();
  const email = socials?.email?.trim();

  return (
    <div className="group flex flex-col border border-outline-variant hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md mt-6">
      {/* A researcher with no portrait yet falls back to the empty tile rather
          than handing next/image an empty src. */}
      <div className="aspect-square bg-surface-container overflow-hidden relative">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="w-full h-full object-cover transition-all duration-500"
          />
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <span className="font-label-caps text-label-caps text-secondary font-semibold">
            {title}
          </span>
          <h4 className="font-headline-md text-headline-md text-primary mt-1 mb-3 font-bold">
            {name}
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
            {description}
          </p>
        </div>
        <div className="space-y-4">
          {(phone || email) && (
            <div className="space-y-1.5">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>{phone}</span>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{email}</span>
                </a>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-1.5 pt-2">
            <span className="bg-primary-container text-on-primary-container text-[10px] px-2 py-0.5 font-label-caps font-semibold tracking-wider rounded-sm">
              {tag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
