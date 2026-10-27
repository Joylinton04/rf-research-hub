/**
 * The inner pages that open with the dark-photo hero banner, and the copy each
 * one shipped with.
 *
 * Shared by three places that must agree: the Page Heroes collection (its
 * `page` options), the seed script (the rows it writes) and the pages
 * themselves (what they render when no row exists yet, so a fresh database
 * never produces a page with an empty <h1>).
 *
 * Deliberately import-free — the seed script runs outside Next.js, where the
 * `@/` alias is not resolved.
 */
export const pageHeroDefaults = {
  about: {
    label: 'About',
    path: '/about',
    title: 'Our Mission & Infrastructure',
    description:
      'Our laboratory is dedicated to bridging the gap between theoretical electromagnetics and practical telecommunications hardware. We provide state-of-the-art facilities for RF characterization, antenna testing, and signal processing research.',
    imageFile: 'rf-lab.jpg',
  },
  projects: {
    label: 'Projects',
    path: '/projects',
    title: 'Project Publications',
    description:
      'Explore our projects that contribute to knowledge and innovation across various domains and disciplines.',
    imageFile: 'rf-lab2.jpg',
  },
  bootcamps: {
    label: 'Bootcamps',
    path: '/bootcamps',
    title: 'BootCamps',
    description:
      "Upcoming and past bootcamps — intensive short courses on measurement tools, antenna principles and practical RF/microwave engineering.\nFor information about new sessions, please follow the group's social channels",
    imageFile: 'rf-lab.jpg',
  },
  gallery: {
    label: 'Gallery',
    path: '/gallery',
    title: 'Gallery',
    description:
      "Inside the R&S RF & Microwave Research Center — the antenna design sessions, measurement work and instrument benches behind the group's research.",
    // No file of its own: the Gallery page falls back to its first photograph.
    imageFile: null,
  },
  links: {
    label: 'Links',
    path: '/links',
    title: 'Official Links & Research Media',
    description:
      'Connect directly with our lab initiatives, official university research groups, real-time broadcasts, and affiliated social channels.',
    imageFile: 'gallery-1.jpeg',
  },
  contact: {
    label: 'Contact',
    path: '/contact',
    title: 'Contact Us',
    description:
      'Questions about the group, the lab, a bootcamp or a possible collaboration — this reaches us directly.',
    imageFile: 'rf-lab2.jpg',
  },
} as const;

export type HeroPage = keyof typeof pageHeroDefaults;

export const heroPages = Object.keys(pageHeroDefaults) as HeroPage[];
