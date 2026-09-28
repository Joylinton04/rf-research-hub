import React from 'react';
import Link from 'next/link';
import { ExternalLink, Radio, ArrowRight, Info, Globe } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Links & Resources | ARGG - RF & Telecom Lab',
  description:
    'Connect directly with our lab initiatives, official university research groups, real-time broadcasts, and affiliated social channels.',
};

export default function LinksPage() {
  const featuredPortals = [
    {
      title: 'Antenna Research Group KNUST',
      subtitle: 'Official Portal',
      domain: 'antennagroupknust.com',
      url: 'https://antennagroupknust.com/',
      description:
        'Official university portal for the Antenna and Radio Frequency Research Group at Kwame Nkrumah University of Science and Technology. Explore academic research, electromagnetic simulations, antenna design, and student publications.',
      protocol: 'Protocol: HTTPS / Web',
      actionText: 'Visit Website',
      category: 'Official Portal',
      badgeColor: 'bg-secondary-container/30 text-secondary border-secondary/20',
      accentHover: 'hover:border-primary group-hover:text-primary',
      iconType: 'antenna',
    },
    {
      title: 'Rohde & Schwarz RF & Microwave Lab',
      subtitle: 'Professional Network',
      domain: 'linkedin.com/company',
      url: 'https://www.linkedin.com/company/rohde-schwarz-radio-frequency-and-microwave-lab/',
      description:
        'Connect with our industry-partnered laboratory on LinkedIn. Stay updated on laboratory equipment, academic partnerships, seminar announcements, mmWave research milestones, and career opportunities in wireless engineering.',
      protocol: 'Platform: LinkedIn Organization',
      actionText: 'Open Profile',
      category: 'Professional Network',
      badgeColor: 'bg-[#0077b5]/10 text-[#0077b5] border-[#0077b5]/20',
      accentHover: 'hover:border-[#0077B5] group-hover:text-[#0077B5]',
      iconType: 'linkedin',
    },
  ];

  const socialChannels = [
    {
      title: 'YouTube Studio',
      handle: '@AntennaGroupStudios',
      url: 'https://www.youtube.com/@AntennaGroupStudios',
      description:
        'Watch recorded tutorials, field test walkthroughs, hardware demos, RF measurements, and student presentations.',
      badge: 'Video Lab',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      brandColor: '#FF0000',
      domain: 'youtube.com',
      actionText: 'Subscribe & Watch',
      iconType: 'youtube',
    },
    {
      title: 'X / Twitter',
      handle: '@antennaknust',
      url: 'https://x.com/antennaknust',
      description:
        'Real-time notices on upcoming ham radio bootcamps, technical meetups, field tests, and amateur radio frequencies in Ghana.',
      badge: 'Broadcasts',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
      brandColor: '#0f172a',
      domain: 'x.com',
      actionText: 'Follow @antennaknust',
      iconType: 'x',
    },
    {
      title: 'Instagram',
      handle: '@antennaknust',
      url: 'https://www.instagram.com/antennaknust/',
      description:
        'Behind-the-scenes photography from anechoic chambers, solder bench sessions, outdoor antenna rigging, and group cohorts.',
      badge: 'Visual Feed',
      badgeColor: 'bg-pink-50 text-pink-700 border-pink-200',
      brandColor: '#E1306C',
      domain: 'instagram.com',
      actionText: 'View Gallery',
      iconType: 'instagram',
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface flex flex-col">
        {/* Hero Banner with Dark Ambient Lab Background */}
        <section className="relative bg-black text-white overflow-hidden min-h-[360px] lg:min-h-[420px] flex items-center">
          {/* Background photo positioned on right and faded seamlessly into black */}
          <div className="absolute inset-0 z-0 flex justify-end">
            <div className="relative w-full lg:w-3/5 h-full">
              <img
                src="/gallery-1.jpeg"
                alt="ARGG Links and Research Media"
                className="w-full h-full object-cover object-center brightness-90 contrast-105"
              />
              {/* Multi-layer gradient overlays for smooth dark blending */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 lg:via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-container-max mx-auto px-6 lg:px-12 py-16 w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white mb-5 leading-tight font-sans">
                Official Links & Research Media
              </h1>
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
                Connect directly with our lab initiatives, official university research groups, real-time broadcasts, and affiliated social channels.
              </p>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="flex-grow max-w-container-max w-full mx-auto px-6 lg:px-12 py-12">
          
          {/* Section 1: Featured Portals & Academic Laboratories */}
          <section className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-outline-variant pb-3 mb-6 gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary font-sans">
                  Featured Portals & Academic Laboratories
                </h2>
                <p className="font-code-md text-xs text-on-surface-variant mt-0.5">
                  Direct institutional sites and research laboratory affiliations
                </p>
              </div>
              <span className="font-code-md text-xs text-outline font-semibold">
                02 ENTRIES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPortals.map((portal) => (
                <a
                  key={portal.title}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-lg border border-outline-variant hover:border-primary p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                          {portal.iconType === 'antenna' ? (
                            <Radio className="w-6 h-6" />
                          ) : (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <span className={`text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${portal.badgeColor}`}>
                            {portal.category}
                          </span>
                          <p className="font-code-md text-xs text-outline mt-1">
                            {portal.domain}
                          </p>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
                      {portal.title}
                    </h3>
                    <p className="text-body-sm text-on-surface-variant leading-relaxed mb-6">
                      {portal.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs font-mono font-medium">
                    <span className="text-outline">{portal.protocol}</span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 font-semibold">
                      {portal.actionText}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Section 2: Media & Social Channels */}
          <section className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-outline-variant pb-3 mb-6 gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary font-sans">
                  Social Media & Broadcasting Channels
                </h2>
                <p className="font-code-md text-xs text-on-surface-variant mt-0.5">
                  Video demonstrations, announcements, and lab updates
                </p>
              </div>
              <span className="font-code-md text-xs text-outline font-semibold">
                03 CHANNELS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialChannels.map((channel) => (
                <a
                  key={channel.title}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-lg border border-outline-variant hover:border-outline hover:shadow-md p-6 shadow-sm transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor:
                            channel.iconType === 'youtube'
                              ? '#fee2e2'
                              : channel.iconType === 'x'
                              ? '#f1f5f9'
                              : '#fce7f3',
                          color: channel.brandColor,
                        }}
                      >
                        {channel.iconType === 'youtube' && (
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        )}
                        {channel.iconType === 'x' && (
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        )}
                        {channel.iconType === 'instagram' && (
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${channel.badgeColor}`}>
                        {channel.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-0.5">
                      {channel.title}
                    </h3>
                    <p className="font-code-md text-xs text-outline mb-3">
                      {channel.handle}
                    </p>
                    <p className="text-body-sm text-on-surface-variant leading-relaxed mb-6">
                      {channel.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs font-mono font-medium">
                    <span className="text-outline">{channel.domain}</span>
                    <span
                      className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold"
                      style={{ color: channel.brandColor }}
                    >
                      {channel.actionText} &rarr;
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Section 3: Technical Note / Quick Contact Box */}
          <div className="bg-white rounded-lg border border-outline-variant p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container/50 border border-secondary/30 flex-shrink-0 flex items-center justify-center text-secondary">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-primary text-base">
                  Looking for official documentation or licensing resources?
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-2xl">
                  All external links open in secure new tabs. For amateur radio frequency allocations, syllabus material, or exam guides, explore our upcoming{' '}
                  <Link href="/tutorials" className="text-primary underline font-medium hover:text-secondary transition-colors">
                    Tutorials section
                  </Link>{' '}
                  or review the{' '}
                  <Link href="/bootcamps" className="text-primary underline font-medium hover:text-secondary transition-colors">
                    Bootcamp overview
                  </Link>.
                </p>
              </div>
            </div>
            <a
              href="mailto:contact@argg.org.gh?subject=Suggest%20a%20Resource"
              className="px-5 py-2.5 border border-outline-variant text-primary hover:bg-surface-container text-xs font-mono font-semibold uppercase tracking-wider rounded-sm whitespace-nowrap transition-colors"
            >
              Suggest a Resource
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
