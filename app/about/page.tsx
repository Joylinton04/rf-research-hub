import React from 'react';
import { Cpu, Layers, Activity, Radio } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TeamCard } from '@/components/TeamCard';

export default function About() {
  const teamMembers = [
    {
      name: 'Dr. Elena Vance',
      role: 'Lead Investigator',
      specialties: ['WAVE_PROP', 'ANTENNA_DESIGN'],
      description: 'Specializing in high-frequency wave propagation and adaptive beamforming.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Prof. Marcus Thorne',
      role: 'Senior Faculty',
      specialties: ['RFIC', 'MICROWAVE'],
      description: 'Focused on microwave circuit design and integrated RF front-ends.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Dr. Sarah Chen',
      role: 'Research Fellow',
      specialties: ['6G_STANDARDS', 'PROTOCOLS'],
      description: 'Innovating network layer efficiency for 5G/6G protocol stacks.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Dr. James Wilson',
      role: 'Lab Director',
      specialties: ['SYSTEMS_ARCH', 'DIRECTOR'],
      description: 'Overseeing large-scale RF system architecture and cross-disciplinary projects.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Section 1: Mission & Infrastructure */}
        <section className="relative py-16 lg:py-24 border-b border-outline-variant hero-pattern technical-grid">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[550px] px-6 lg:px-12">
            <div className="lg:col-span-7">
              <span className="font-label-caps text-label-caps text-secondary mb-3 block font-semibold">
                LABORATORY OVERVIEW
              </span>
              <h1 className="font-headline-xl text-headline-xl text-primary mb-6 leading-tight">
                Our Mission & Infrastructure
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl">
                Our laboratory is dedicated to bridging the gap between theoretical electromagnetics and practical telecommunications hardware. We provide state-of-the-art facilities for RF characterization, antenna testing, and signal processing research.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-outline-variant bg-white p-6 rounded-sm shadow-sm hover:border-secondary transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="text-secondary w-5 h-5" />
                    <h3 className="font-label-caps text-label-caps text-primary font-bold">
                      PRECISION TESTING
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Anechoic chambers and VNA systems up to 110GHz for high-fidelity component validation.
                  </p>
                </div>
                <div className="border border-outline-variant bg-white p-6 rounded-sm shadow-sm hover:border-secondary transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="text-secondary w-5 h-5" />
                    <h3 className="font-label-caps text-label-caps text-primary font-bold">
                      HARDWARE SYNTHESIS
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Dedicated clean-room access for MMIC packaging and low-loss substrate fabrication.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-square bg-surface-container-high rounded-lg overflow-hidden border border-outline-variant shadow-md">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                  alt="An automated antenna testing range inside an anechoic chamber"
                />
              </div>
              {/* Floating Signal Pips Overlay */}
              <div className="absolute -bottom-4 -left-4 bg-primary p-4 rounded-sm shadow-xl hidden md:block border border-outline">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse block"></span>
                  <span className="font-code-md text-code-md text-on-primary font-semibold">
                    SYSTEM_STATUS: OPTIMAL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Section 2: Team Grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-container-max mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-outline-variant pb-4">
              <div className="mb-4 md:mb-0">
                <h2 className="font-headline-lg text-headline-lg text-primary">
                  Key Researchers and Faculty
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  The intellectual core driving our innovations in telecommunications.
                </p>
              </div>
              <div className="font-label-caps text-label-caps text-outline font-semibold">
                FACULTY_COUNT: 04
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <TeamCard
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  specialties={member.specialties}
                  description={member.description}
                  image={member.image}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Technical Readout Section (Atmospheric) */}
        <section className="bg-tertiary py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6">
            <div className="flex gap-1.5">
              <div className="w-1.5 h-8 bg-secondary opacity-25"></div>
              <div className="w-1.5 h-12 bg-secondary opacity-45"></div>
              <div className="w-1.5 h-6 bg-secondary opacity-15"></div>
            </div>
          </div>
          <div className="max-w-container-max mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-primary mb-4">
                  Advancing the Spectrum
                </h3>
                <p className="font-body-md text-body-md text-on-tertiary-container leading-relaxed">
                  Our research output is consistently ranked in the top percentile for spectral efficiency innovations. We utilize real-time oscilloscope data to refine our theoretical models, ensuring that every publication is backed by rigorous empirical testing.
                </p>
              </div>
              <div className="bg-black/20 p-6 rounded-sm border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-code-md text-code-md text-secondary font-semibold flex items-center gap-2">
                    <Radio className="w-4 h-4 text-secondary animate-pulse" />
                    SPECTRUM_ANALYSIS_V.04
                  </span>
                  <span className="font-label-caps text-[10px] text-white/50">ACTIVE MONITOR</span>
                </div>
                <div className="space-y-4">
                  <div className="h-1.5 bg-white/5 w-full relative overflow-hidden rounded-sm">
                    <div className="absolute inset-0 w-full h-full animate-shimmer-medium">
                      <div className="h-full bg-secondary w-3/4"></div>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/5 w-full relative overflow-hidden rounded-sm">
                    <div className="absolute inset-0 w-full h-full animate-shimmer-slow">
                      <div className="h-full bg-secondary w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/5 w-full relative overflow-hidden rounded-sm">
                    <div className="absolute inset-0 w-full h-full animate-shimmer-fast">
                      <div className="h-full bg-secondary w-5/6"></div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
