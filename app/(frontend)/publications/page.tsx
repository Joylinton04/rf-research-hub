'use client';

import React, { useState } from 'react';
import { User, Calendar } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PublicationItem } from '@/components/PublicationItem';
import { LiveTelemetry } from '@/components/LiveTelemetry';


export default function Publications() {
  const [selectedYear, setSelectedYear] = useState('2024');

  const publications = [
    {
      title: 'Deep Learning-Based Interference Mitigation for Shared Spectrum 6G Networks',
      type: 'JOURNAL ARTICLE',
      source: 'IEEE Transactions on Communications • May 2024',
      authors: 'A. Chen, E. Vance, R. Gupta',
      year: '2024',
      bibtex: `@article{chen2024deep,
  title={Deep Learning-Based Interference Mitigation for Shared Spectrum 6G Networks},
  author={Chen, A. and Vance, E. and Gupta, R.},
  journal={IEEE Transactions on Communications},
  year={2024},
  month={May}
}`,
    },
    {
      title: 'Design of Ultra-Low Latency RF Frontend for Industrial IoT',
      type: 'CONFERENCE PAPER',
      source: 'International Microwave Symposium (IMS) • March 2024',
      authors: 'M. Thorne, L. Petrov, S. Kim',
      year: '2024',
      bibtex: `@inproceedings{thorne2024design,
  title={Design of Ultra-Low Latency RF Frontend for Industrial IoT},
  author={Thorne, M. and Petrov, L. and Kim, S.},
  booktitle={International Microwave Symposium (IMS)},
  year={2024},
  month={March}
}`,
    },
    {
      title: 'Polarization Agile Patch Antennas for Satellite Communications in the Ka-Band',
      type: 'JOURNAL ARTICLE',
      source: 'Journal of Applied Electromagnetics • January 2024',
      authors: 'E. Vance, D. Wu',
      year: '2024',
      bibtex: `@article{vance2024polarization,
  title={Polarization Agile Patch Antennas for Satellite Communications in the Ka-Band},
  author={Vance, E. and Wu, D.},
  journal={Journal of Applied Electromagnetics},
  year={2024},
  month={January}
}`,
    },
    {
      title: 'Cooperative Beamforming in Distributed Antenna Systems',
      type: 'JOURNAL ARTICLE',
      source: 'IEEE Transactions on Wireless Communications • September 2023',
      authors: 'M. Thorne, E. Vance, S. Chen',
      year: '2023',
      bibtex: `@article{thorne2023cooperative,
  title={Cooperative Beamforming in Distributed Antenna Systems},
  author={Thorne, M. and Vance, E. and Chen, S.},
  journal={IEEE Transactions on Wireless Communications},
  year={2023},
  month={September}
}`,
    },
    {
      title: 'Low-Complexity Channel Estimation for mmWave MIMO Systems',
      type: 'CONFERENCE PAPER',
      source: 'IEEE Globecom • December 2023',
      authors: 'S. Chen, R. Gupta',
      year: '2023',
      bibtex: `@inproceedings{chen2023low,
  title={Low-Complexity Channel Estimation for mmWave MIMO Systems},
  author={Chen, S. and Gupta, R.},
  booktitle={IEEE Global Communications Conference (GLOBECOM)},
  year={2023},
  month={December}
}`,
    },
    {
      title: 'Wideband RF Front-End Architecture for Multiband Cognitive Radio',
      type: 'JOURNAL ARTICLE',
      source: 'International Journal of RF and Microwave CAE • June 2022',
      authors: 'Prof. Marcus Thorne, Dr. James Wilson',
      year: '2022',
      bibtex: `@article{thorne2022wideband,
  title={Wideband RF Front-End Architecture for Multiband Cognitive Radio},
  author={Thorne, M. and Wilson, J.},
  journal={International Journal of RF and Microwave Computer-Aided Engineering},
  year={2022},
  month={June}
}`,
    },
  ];

  const years = ['2024', '2023', '2022'];

  const filteredPublications = publications.filter(pub => pub.year === selectedYear);

  return (
    <>
      <Navbar />

      <main className="max-w-container-max mx-auto px-6 lg:px-12 py-12 lg:py-16 space-y-16">
        {/* Page Header */}
        <header className="border-l-4 border-primary pl-6 py-2">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4">
            Publications & Technical Research
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
            Our lab is dedicated to pushing the boundaries of wireless communication through rigorous experimentation and peer-reviewed analysis. This repository showcases our contributions to high-frequency engineering, antenna design, and next-generation telecommunications infrastructure.
          </p>
        </header>

        {/* Featured Research Paper */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-surface-container-lowest border border-outline-variant rounded-sm shadow-sm overflow-hidden">
          <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-center">
            <span className="font-label-caps text-label-caps text-secondary mb-2 uppercase tracking-widest font-semibold">
              Featured Publication
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4 leading-tight">
              Characterization of Wideband Phased Array Antennas in Millimeter-Wave Anechoic Environments
            </h2>
            <div className="flex items-center gap-2 mb-6">
              <User className="text-primary w-4 h-4 shrink-0" />
              <p className="font-label-caps text-label-caps text-on-surface font-semibold">
                Dr. Elena Vance, Prof. Marcus Thorne, et al.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-label-caps text-label-caps text-primary border-b border-outline-variant pb-1 font-bold">
                Abstract
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                This paper presents a comprehensive methodology for the characterization of phased array antenna radiation patterns within a controlled mmWave anechoic chamber. By utilizing a high-precision robotic positioner and a localized spectrum analyzer interface, we achieved sub-degree spatial resolution in pattern measurement. The study specifically addresses the calibration challenges inherent in 28GHz beamforming systems, providing a new standard for wideband characterization.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="border-l-2 border-secondary-fixed pl-4 py-1">
                <span className="font-label-caps text-label-caps text-on-surface-variant block text-[10px] font-semibold">
                  Beamforming Efficiency
                </span>
                <span className="font-code-md text-code-md font-bold text-primary">
                  28.5 GHz / 94%
                </span>
              </div>
              <div className="border-l-2 border-secondary-fixed pl-4 py-1">
                <span className="font-label-caps text-label-caps text-on-surface-variant block text-[10px] font-semibold">
                  Sidelobe Suppression
                </span>
                <span className="font-code-md text-code-md font-bold text-primary">
                  -24.2 dB
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full bg-surface-container border-t lg:border-t-0 lg:border-l border-outline-variant">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80"
              alt="A technical anechoic chamber setup with dark blue acoustic foam"
            />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 border border-outline-variant rounded-sm shadow-md">
              <p className="font-label-caps text-label-caps text-on-surface text-[10px] font-bold">
                FIG 1.0: ANECHOIC CHAMBER CHARACTERIZATION SETUP @ 28GHz
              </p>
            </div>
          </div>
        </section>

        {/* Data Visualization Section */}
        <section>
          <LiveTelemetry />
        </section>

        {/* Publication List */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant pb-3">
            <h3 className="font-headline-md text-headline-md text-primary">
              Recent Publications
            </h3>
            <div className="flex gap-2">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`font-label-caps text-[12px] px-4 py-1.5 border transition-all rounded-sm ${
                    selectedYear === year
                      ? 'border-primary text-primary bg-surface-container font-semibold'
                      : 'border-outline-variant text-outline hover:text-primary'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            {filteredPublications.map((pub, idx) => (
              <PublicationItem
                key={idx}
                title={pub.title}
                type={pub.type}
                source={pub.source}
                authors={pub.authors}
                bibtex={pub.bibtex}
              />
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <button className="font-label-caps text-label-caps text-primary border-b border-primary hover:border-b-2 pb-0.5 transition-all font-semibold">
              Load Archive (2010—2021)
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
