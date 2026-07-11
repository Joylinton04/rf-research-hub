import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  const links = [
    { name: 'University Home', href: '#' },
    { name: 'Department of Engineering', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Accessibility', href: '#' },
  ];

  return (
    <footer className="w-full mt-auto bg-surface-container-lowest border-t border-outline-variant py-8">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-12 max-w-container-max mx-auto gap-6">
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
          <div className="font-headline-sm text-headline-sm text-primary font-bold">
            RF & Telecommunications Lab
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">
            © 2026 RF & Telecommunications Engineering Lab. All rights reserved.
          </div>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
