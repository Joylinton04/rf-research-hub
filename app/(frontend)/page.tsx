import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { MediaGallery } from "@/components/MediaGallery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export default async function Home() {
  // Editable in the admin panel at /admin → Globals → Home Hero.
  const payload = await getPayload({ config });
  const hero = await payload.findGlobal({ slug: "home-hero" });

  // Editable in the admin panel at /admin → Collections → FAQs. The collection
  // is `orderable`, so `_order` is the editor-controlled running order.
  const { docs: faqs } = await payload.find({
    collection: "faqs",
    sort: "_order",
    limit: 100,
    depth: 0,
  });


  const keyProjects = [
    {
      title: "6G ISAC Systems",
      description:
        "Integrating sensing and communication for 6G networks, enabling environmental awareness alongside high-speed data transfer.",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      tag: "6G-01",
      status: "Active Development",
    },
    {
      title: "Antenna Design",
      description:
        "High-gain phased array systems for satellite and terrestrial links, focusing on beamforming efficiency and thermal management.",
      image:
        "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80",
      tag: "RF-04",
      status: "Lab Validated",
    },
    {
      title: "Embedded IoT",
      description:
        "Low-power wireless sensor networks for industrial automation, optimized for interference-rich electromagnetic environments.",
      image:
        "https://images.unsplash.com/photo-1553406830-ef2513677841?auto=format&fit=crop&w=1200&q=80",
      tag: "IOT-09",
      status: "Pilot Phase",
    },
  ];

  const mediaItems = [
    {
      title: "Spectrum Analyzer Setup",
      category: "HARDWARE SETUP",
      filterTag: "PCB DESIGN",
      description: "Real-time frequency analysis of sub-6GHz signals.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      date: "OCT 2023",
    },
    {
      title: "Anechoic Chamber Testing",
      category: "FIELD TESTING",
      filterTag: "ANTENNAS",
      description:
        "Antenna radiation pattern characterization in a controlled environment.",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      date: "NOV 2023",
    },
    {
      title: "PCB Layout Design",
      category: "RESEARCH DESIGN",
      filterTag: "PCB DESIGN",
      description: "Custom multi-layer RF board for satellite ground stations.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      date: "JAN 2024",
    },
    {
      title: "5G Base Station Testbed",
      category: "FIELD DEPLOYMENT",
      filterTag: "5G/6G",
      description: "Field deployment of mmWave small cells for urban testing.",
      image:
        "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80",
      date: "FEB 2024",
    },
  ];

  const stats = [
    { value: "142+", label: "Journal Papers" },
    { value: "12", label: "Active Patents" },
    { value: "$4.5M", label: "Research Grants" },
    { value: "08", label: "Corporate Partners" },
  ];

  const filters = ["ALL", "ANTENNAS", "5G/6G", "PCB DESIGN"];

  return (
    <>
      <Navbar />

      <main className="flex-grow">

        {/* Hero Section */}
        <section className="relative hero-pattern py-16 lg:py-24 px-6 lg:px-12 overflow-hidden border-b border-outline-variant">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[550px]">
            <div className="lg:col-span-7 space-y-6 z-10">
              <div className="inline-block rounded-full border border-secondary bg-secondary-container px-4 py-1 text-label-caps font-semibold text-on-secondary-container">
                Antenna &amp; RF Research &middot; KNUST
              </div>
              {/* hero Title */}
              <h1 className="font-headline-xl sm:text-headline-xl text-headline-lg text-primary leading-tight">
                {hero.title}
              </h1>
              {/* hero description */}
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl whitespace-pre-line">
                {hero.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/about"
                  className="bg-primary text-on-primary px-8 py-3.5 font-label-caps text-label-caps rounded-sm flex items-center gap-2 group hover:bg-opacity-95 transition-all"
                >
                  Explore Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/publications"
                  className="border border-primary text-primary px-8 py-3.5 font-label-caps text-label-caps rounded-sm hover:bg-surface-container-low transition-colors"
                >
                  Technical Specs
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative hidden lg:block h-full">
              <div className="aspect-square bg-primary-container rounded-lg overflow-hidden border border-outline shadow-2xl transform rotate-1 relative">
                <img
                  className="w-full h-full object-cover mix-blend-overlay"
                  src="https://cellbusters.com/wp-content/uploads/2023/10/The-RF-Technology-Revolution-scaled.jpg"
                  alt="A high-tech printed circuit board designed for telecommunications"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-primary/20"></div>
                <div className="absolute bottom-6 left-6 bg-surface/95 backdrop-blur-sm p-4 border border-outline-variant rounded-sm shadow-md animate-bounce-slow">
                  <div className="font-label-caps text-[10px] text-primary mb-1 uppercase tracking-widest font-bold">
                    Live Spectrum Analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse block"></span>
                    <span className="font-code-md text-code-md text-primary font-semibold">
                      28.5 GHz Signal Lock
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Section 2: FAQs */}
        <section className="py-16 lg:py-24 px-6 lg:px-12 bg-surface border-b border-outline-variant">
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 border-b border-outline-variant pb-4">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary">
                  FAQs
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Frequently asked questions about amateur radio and our group.
                </p>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>


        {/* Key Projects Section */}
        <section className="py-16 lg:py-24 px-6 lg:px-12 bg-surface">
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-outline-variant pb-4">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary">
                  Current Key Projects
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Active research tracks and experimental testbeds.
                </p>
              </div>
              <Link
                href="/about"
                className="font-label-caps text-label-caps text-secondary flex items-center gap-1 hover:underline mt-4 md:mt-0 font-semibold"
              >
                View All Initiatives <span className="text-xs">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {keyProjects.map((project) => (
                <ProjectCard
                  key={project.tag}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tag={project.tag}
                  status={project.status}
                />
              ))}
            </div>
          </div>
        </section>

        <MediaGallery items={mediaItems} filters={filters} />

        {/* Lab Infrastructure & Telemetry (Merged) */}
        <section className="py-16 lg:py-24 px-6 lg:px-12 bg-surface">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="bg-tertiary p-8 text-white rounded-lg shadow-2xl relative border border-white/5">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-outline opacity-50 block"></span>
                  </div>
                  <h2 className="font-headline-md text-headline-md mb-6 font-bold tracking-tight">
                    Real-time Telemetry
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-on-tertiary-fixed-variant pb-3">
                      <span className="font-label-caps text-label-caps text-on-tertiary-container font-semibold">
                        SIGNAL BANDWIDTH
                      </span>
                      <span className="font-code-md text-code-md text-secondary-fixed font-bold">
                        800 MHz
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-on-tertiary-fixed-variant pb-3">
                      <span className="font-label-caps text-label-caps text-on-tertiary-container font-semibold">
                        PEAK THROUGHPUT
                      </span>
                      <span className="font-code-md text-code-md text-secondary-fixed font-bold">
                        4.2 Gbps
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-on-tertiary-fixed-variant pb-3">
                      <span className="font-label-caps text-label-caps text-on-tertiary-container font-semibold">
                        LATENCY (U-PLANE)
                      </span>
                      <span className="font-code-md text-code-md text-secondary-fixed font-bold">
                        0.8 ms
                      </span>
                    </div>
                  </div>
                  <div className="mt-8 h-24 bg-surface-container-highest/10 rounded-sm border border-white/10 flex items-end px-4 gap-1 pb-2">
                    <div className="flex-1 bg-secondary-fixed h-[40%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[65%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[90%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[85%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[70%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[45%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[30%] rounded-t-sm"></div>
                    <div className="flex-1 bg-secondary-fixed h-[60%] rounded-t-sm"></div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-6">
                  <h2 className="font-headline-lg text-headline-lg text-primary">
                    Advanced RF Characterization Infrastructure
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Our lab is equipped with state-of-the-art Vector Network
                    Analyzers (VNAs), real-time spectrum analyzers up to 110GHz,
                    and a fully shielded MIMO-ready anechoic chamber. We bridge
                    the gap between theoretical electromagnetic modeling and
                    real-world physical deployment.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="border-l-4 border-secondary pl-4 py-1">
                      <div className="font-headline-md text-headline-md text-primary font-bold">
                        110GHz
                      </div>
                      <div className="font-label-caps text-label-caps text-on-surface-variant font-semibold tracking-wider">
                        ANALYSIS CAPACITY
                      </div>
                    </div>
                    <div className="border-l-4 border-secondary pl-4 py-1">
                      <div className="font-headline-md text-headline-md text-primary font-bold">
                        15+
                      </div>
                      <div className="font-label-caps text-label-caps text-on-surface-variant font-semibold tracking-wider">
                        RESEARCH PATENTS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Readout / Lab Stats */}
        <section className="py-16 bg-tertiary text-on-tertiary">
          <div className="max-w-container-max mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="font-code-md text-headline-lg text-primary-fixed-dim font-bold">
                    {stat.value}
                  </div>
                  <div className="font-label-caps text-label-caps text-on-tertiary-container uppercase tracking-wider font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
