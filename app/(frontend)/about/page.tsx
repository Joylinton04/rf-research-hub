import React from 'react';
import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Radio } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TeamCard } from '@/components/TeamCard';
import { TeamLeaderCard } from '@/components/TeamLeaderCard';
import { imageSrc } from '@/lib/media';
import { pageMetadata } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'The mission, facilities and people behind the Antenna Research Group at KNUST — RF characterization, antenna testing and signal processing research, and the faculty leading it.',
  path: '/about',
});


export default async function About() {
  // Editable in the admin panel at /admin → Collections → Researchers. The
  // collection is `orderable`, so `_order` is the editor-controlled grid order.
  const payload = await getPayload({ config });
  // depth 1 so the `portrait` upload arrives as a Media doc with a URL — at
  // depth 0 Payload returns a bare id and every card would render empty.
  const { docs: researchers, totalDocs: facultyCount } = await payload.find({
    collection: 'researchers',
    sort: '_order',
    limit: 100,
    depth: 1,
  });

  // Whoever carries the `teamLeader` flag gets the wide card above the grid; the
  // collection's beforeChange hook keeps that to at most one person.
  const teamLeader = researchers.find((researcher) => researcher.teamLeader);
  const teamMembers = researchers.filter((researcher) => researcher !== teamLeader);

  return (
    <>
      <Navbar overlay />

      <main className="min-h-screen">
        {/* Hero Banner with Dark Ambient Lab Background */}
        <section className="relative bg-black text-white overflow-hidden min-h-[440px] lg:min-h-[500px] pt-20 flex items-center">
          {/* Background lab photo positioned on right and faded seamlessly into black */}
          <div className="absolute inset-0 z-0 flex justify-end">
            <div className="relative w-full lg:w-3/5 h-full">
              {/* `fill` rather than width/height: the backdrop is sized by
                  its container, not by the file. */}
              <Image
                src="/rf-lab.jpg"
                alt="Research Laboratory"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority
                className="object-cover object-center brightness-90 contrast-105"
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
                Our Mission & Infrastructure
              </h1>
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
                Our laboratory is dedicated to bridging the gap between theoretical electromagnetics and practical telecommunications hardware. We provide state-of-the-art facilities for RF characterization, antenna testing, and signal processing research.
              </p>
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
                FACULTY_COUNT: {String(facultyCount).padStart(2, '0')}
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-outline-variant pb-4">
                <h2 className="font-headline-lg text-headline-lg text-primary">
                  Team Leader
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  The intellectual core driving our innovations in telecommunications.
                </p>
              </div>
              {teamLeader && (
                <TeamLeaderCard
                  name={teamLeader.name}
                  title={teamLeader.title}
                  description={teamLeader.description}
                  image={imageSrc(teamLeader.portrait, 'feature')}
                  tag={teamLeader.tag}
                  socials={teamLeader.socials}
                />
              )}
            </div>
            <div>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-outline-variant pb-4 mt-12">
                <h2 className="font-headline-lg text-headline-lg text-primary">
                  Team Members
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  The intellectual core driving our innovations in telecommunications.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <TeamCard
                    key={member.id}
                    name={member.name}
                    title={member.title}
                    description={member.description}
                    image={imageSrc(member.portrait, 'card')}
                    tag={member.tag}
                    socials={member.socials}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
