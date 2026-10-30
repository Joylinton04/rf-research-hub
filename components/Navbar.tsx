'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, PhoneCall } from 'lucide-react';
import Image from 'next/image';

type NavbarProps = {
  /** Let the page's first section run up underneath the bar, for pages that
   *  open with a full-bleed banner. That section must add `pt-20` (the
   *  header's height) so its content clears the bar. */
  overlay?: boolean;
};

export const Navbar = ({ overlay = false }: NavbarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Links', href: '/links' },
    { name: 'Bootcamps', href: '/bootcamps' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Gallery', href: '/gallery' },
  ];
//  HOME ABOUT PROJECTS BOOTCAMP TUTORIALS LINKS GALLERY

  return (
    // The header itself is transparent; the glass pill floats inside it so the
    // page shows through around the rounded corners while scrolling.
    <header className={`w-full sticky top-0 z-50 px-4 lg:px-6 pt-4 ${overlay ? '-mb-20' : ''}`}>
      <div className="liquid-glass rounded-full flex justify-between items-center h-16 pl-3 pr-3 sm:pl-4 max-w-container-max mx-auto">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-primary tracking-tight font-sans hover:opacity-90 transition-opacity"
        >
          <Image src="/argg.svg" alt="ARGG Logo" width={44} height={44} priority/>
          <div className="flex flex-col">
            <span className='text-headline-md block sm:hidden'>ARGG</span>
            <span className='text-headline-sm hidden sm:block'>ARGG</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`font-sans text-label-caps px-3.5 py-2 rounded-full transition-all duration-200 ${isActive
                    ? 'liquid-glass text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest/50'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Trailing Action & Search */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/contact"
            className="bg-primary text-on-primary px-6 py-2.5 font-label-caps text-label-caps rounded-full hover:bg-primary-container active:scale-95 transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-on-primary px-4 py-2 font-label-caps text-label-caps rounded-full hover:bg-primary-container active:scale-95 transition-all text-xs shadow-md"
          >
            Contact
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-on-surface hover:text-primary transition-colors focus:outline-none p-2 rounded-full hover:bg-surface-container-lowest/50"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="md:hidden liquid-glass rounded-3xl mt-2 p-4 absolute top-full left-4 right-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-label-caps text-label-caps px-4 py-3 rounded-2xl transition-colors ${isActive
                      ? 'bg-surface-container-lowest/70 text-primary font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-lowest/50'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex items-center bg-surface-container-lowest/60 border border-outline-variant/40 rounded-full px-4 py-2.5 mt-3">
              <Search className="text-outline w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Search research..."
                className="bg-transparent border-none outline-none focus:ring-0 text-body-sm font-body-sm w-full text-on-surface placeholder-outline"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
