'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, PhoneCall } from 'lucide-react';
import Image from 'next/image';

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Bootcamps', href: '/bootcamps' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Links', href: '/links' },
    { name: 'Gallery', href: '/gallery' },
  ];
//  HOME ABOUT PROJECTS BOOTCAMP TUTORIALS LINKS GALLERY

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-outline-variant shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="flex justify-between items-center h-20 px-6 lg:px-12 max-w-container-max mx-auto">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-4 font-bold text-primary tracking-tight font-sans hover:opacity-90 transition-opacity"
        >
          <Image src="/argg.png" alt="ARGG Logo" width={60} height={60} priority/>
          <div className="flex flex-col">
            <span className='text-headline-md'>ARGG</span>
            <span className='text-headline-sm'>Amateur Radio Group Ghana</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-label-caps text-label-caps transition-all duration-200 pb-1 ${isActive
                    ? 'text-primary border-b-2 border-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Trailing Action & Search */}
        <div className="hidden md:flex items-center gap-6">
          <button className="bg-primary text-on-primary px-6 py-2.5 font-label-caps text-label-caps rounded-sm hover:bg-opacity-90 active:scale-95 transition-all flex items-center gap-2">
            <PhoneCall className="w-4 h-4" />
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button className="bg-primary text-on-primary px-4 py-2 font-label-caps text-label-caps rounded-sm hover:bg-opacity-90 active:scale-95 transition-all text-xs">
            Contact
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-on-surface hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant py-4 px-6 absolute top-20 left-0 w-full shadow-lg transition-all duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-label-caps text-label-caps py-2 border-b border-outline-variant/30 ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex items-center bg-surface-container-low border border-outline-variant rounded px-3 py-2 mt-2">
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
