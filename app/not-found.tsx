'use client';

import React from 'react';
import Link from 'next/link';
import { Home, AlertCircle, Terminal, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar />

      <main className="w-full flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-12 grid-pattern relative">
        <div className="w-full bg-surface-container-lowest border border-outline-variant p-8 md:p-12 shadow-xl rounded-sm text-center relative overflow-hidden mx-auto">

          {/* Top warning pip */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping block"></span>
            <span className="font-code-md text-[10px] text-error font-bold uppercase tracking-wider">
              Error 404: Link Lost
            </span>
          </div>

          {/* Radar Sweep SVG Animation */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            <svg className="w-full h-full text-secondary" viewBox="0 0 200 200">
              {/* Radar Grid circles */}
              <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
              <circle cx="100" cy="100" r="35" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
              
              {/* Radar Crosshairs */}
              <line x1="100" y1="15" x2="100" y2="185" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="15" y1="100" x2="185" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

              {/* Angle helper lines */}
              <line x1="40" y1="40" x2="160" y2="160" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
              <line x1="40" y1="160" x2="160" y2="40" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />

              {/* Rotational Sweep Slice */}
              <path 
                d="M100,100 L100,15 A85,85 0 0,1 160.1,40.1 Z" 
                fill="url(#radarSweep)" 
                opacity="0.4"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 100 100"
                  to="360 100 100"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Sweeping Line indicator */}
              <line x1="100" y1="100" x2="100" y2="15" stroke="#008080" strokeWidth="1.5" strokeLinecap="round">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 100 100"
                  to="360 100 100"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Lost Targets (flashing pips) */}
              <g id="lost-signal-pips">
                {/* Pip 1 */}
                <circle cx="130" cy="65" r="4.5" fill="#ba1a1a">
                  <animate attributeName="opacity" values="1;0.8;0.3;0;0;1" dur="3s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="130" cy="65" r="10" fill="none" stroke="#ba1a1a" strokeWidth="1">
                  <animate attributeName="opacity" values="0.8;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                  <animate attributeName="r" values="4.5;18" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                </circle>

                {/* Pip 2 */}
                <circle cx="70" cy="125" r="3.5" fill="#ba1a1a">
                  <animate attributeName="opacity" values="0;1;0.7;0.2;0;0" dur="3s" repeatCount="indefinite" begin="1.8s" />
                </circle>
              </g>

              {/* Defs for Sweep Gradient */}
              <defs>
                <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#008080" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#008080" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Center Lock Dot */}
              <circle cx="100" cy="100" r="3" fill="#001e40" />
            </svg>

            {/* Glowing signal overlay badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-code-md text-[11px] text-error font-bold tracking-widest px-2 py-1 bg-white/80 backdrop-blur-sm border border-error/30 rounded-sm shadow-sm animate-pulse mt-32">
                SIGNAL LOST
              </span>
            </div>
          </div>

          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">
            Carrier Frequency Out of Range
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 mx-auto leading-relaxed">
            The page you are trying to tune into is currently offline, out of range, or has migrated to another spectrum index.
          </p>

          {/* Technical Diagnostics */}
          <div className="bg-surface-container-low border border-outline-variant p-4 rounded-sm mb-8 text-left space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Terminal className="w-4 h-4" />
              <span className="font-label-caps text-label-caps font-bold">Diagnostics Output</span>
            </div>
            <div className="font-code-md text-xs text-on-surface-variant space-y-1">
              <div>&gt; STATUS_CODE: 404_NOT_FOUND</div>
              <div>&gt; COORDS: TX_ALTITUDE_NULL</div>
              <div>&gt; CARRIER: NO_SIGNAL_DETECTED</div>
              <div>&gt; ATTEMPTS: RE-TUNING SYSTEM... FAILED</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-primary text-on-primary px-6 py-3 font-label-caps text-label-caps rounded-sm flex items-center justify-center gap-2 hover:bg-opacity-90 active:scale-95 transition-all font-semibold"
            >
              <Home className="w-4 h-4" />
              Return to Base
            </Link>
            <Link
              href="/publications"
              className="border border-primary text-primary px-6 py-3 font-label-caps text-label-caps rounded-sm flex items-center justify-center gap-2 hover:bg-surface-container-low active:scale-95 transition-all font-semibold"
            >
              <HelpCircle className="w-4 h-4" />
              Check Technical Specs
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
