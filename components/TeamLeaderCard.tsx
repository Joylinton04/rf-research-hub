import React from 'react';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

interface TeamLeaderCardProps {
  name: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  socials?: {
    phone?: string | null;
    email?: string | null;
  } | null;
}

/**
 * The wide variant of `TeamCard`: portrait on the left, details on the right.
 * Rendered above the grid for whoever carries the `teamLeader` flag.
 */
export const TeamLeaderCard: React.FC<TeamLeaderCardProps> = ({
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
    <div className="group grid grid-cols-1 md:grid-cols-12 border border-outline-variant hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md mb-12">
      <div className="md:col-span-5 lg:col-span-4 relative aspect-square md:aspect-auto md:min-h-[520px] bg-surface-container overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 34vw, (min-width: 768px) 42vw, 100vw"
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      <div className="md:col-span-7 lg:col-span-8 p-6 lg:p-10 flex flex-col justify-center gap-4">
        <div>
          <span className="font-label-caps text-label-caps text-on-primary-container bg-primary-container px-2 py-0.5 rounded-sm font-semibold tracking-wider">
            Team Leader
          </span>
        </div>
        <div>
          <span className="font-label-caps text-label-caps text-secondary font-semibold">
            {title}
          </span>
          <h3 className="font-headline-lg text-headline-lg text-primary mt-1">
            {name}
          </h3>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-2xl">
          {description}
        </p>

        {(phone || email) && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-1">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>{phone}</span>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
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
  );
};
