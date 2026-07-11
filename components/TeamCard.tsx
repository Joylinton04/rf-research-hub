import React from 'react';

interface TeamCardProps {
  name: string;
  role: string;
  specialties: string[];
  description: string;
  image: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  specialties,
  description,
  image,
}) => {
  return (
    <div className="group flex flex-col border border-outline-variant hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="aspect-square bg-surface-container overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <span className="font-label-caps text-label-caps text-secondary font-semibold">
            {role}
          </span>
          <h4 className="font-headline-md text-headline-md text-primary mt-1 mb-3">
            {name}
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {specialties.map((spec) => (
            <span
              key={spec}
              className="bg-primary-container text-on-primary-container text-[10px] px-2 py-0.5 font-label-caps font-semibold tracking-wider rounded-sm"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
