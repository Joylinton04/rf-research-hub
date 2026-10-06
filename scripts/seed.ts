/**
 * Seeds the FAQs, Projects and Researchers collections with the content that
 * used to be hard-coded in the page components.
 *
 * Run with: npm run seed
 *
 * It is idempotent — a collection that already holds rows is left untouched, so
 * re-running never duplicates or overwrites an editor's changes.
 */
import { getPayload } from 'payload';

import config from '../payload.config';

/** Minimal Lexical document: one root with a paragraph per string. */
const richText = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      textFormat: 0,
      textStyle: '',
      children: [
        {
          type: 'text',
          text,
          format: 0,
          style: '',
          mode: 'normal' as const,
          detail: 0,
          version: 1,
        },
      ],
    })),
  },
});

const faqs = [
  {
    question: 'What is ARGG?',
    answer:
      'Amateur Radio Group Ghana (ARGG) is an active community and research group dedicated to advancing wireless engineering, amateur radio communications, and high-frequency experimentation in Ghana and across Africa.',
  },
  {
    question: 'Who can join Amateur Radio Ghana Group?',
    answer:
      'Anyone with an interest in radio communications, telecommunications engineering, electronics, satellite tracking, or emergency communication networks is welcome to join, regardless of experience level.',
  },
  {
    question: 'Do I need a license to use amateur radio?',
    answer:
      'You can listen, learn, and participate in club activities without a license. However, transmitting on designated amateur radio frequency bands requires an official operator license issued by the National Communications Authority (NCA).',
  },
  {
    question: 'Why do I need a License?',
    answer:
      'Amateur radio operators transmit on allocated RF frequency bands. Licensing ensures safe operation, prevents harmful interference with commercial and emergency frequencies, and assigns you an internationally recognized unique callsign.',
  },
  {
    question: 'How can I get an amateur radio license in Ghana?',
    answer:
      'ARGG hosts training bootcamps and study groups to prepare candidates for the National Communications Authority (NCA) amateur radio examination. Upon passing, the NCA issues your official license and callsign.',
  },
  {
    question: 'Is amateur radio still relevant today?',
    answer:
      'Yes! Amateur radio drives innovation in modern wireless systems (like 5G/6G mesh networks, SDR, satellite communications), provides resilient off-grid emergency communications during disasters, and serves as an invaluable hands-on learning platform for RF engineering.',
  },
  {
    question: 'What equipment do I need to get started?',
    answer:
      'To start, an inexpensive handheld transceiver (Baofeng or similar), a software-defined radio (SDR) dongle connected to a computer, or even web-based WebSDR receivers are great ways to explore without a large investment.',
  },
  {
    question: 'Can students join the group?',
    answer:
      'Yes, absolutely! We actively encourage students in engineering, computer science, physics, and hobbyists of all academic backgrounds to join our workshops, research tracks, and practical build sessions.',
  },
  {
    question: 'Do I need prior technical experience?',
    answer:
      'No prior experience is necessary. Our community offers mentorship, tutorials, step-by-step workshops, and collaborative projects covering fundamentals from basic electronics to advanced antenna design.',
  },
  {
    question: 'Can I communicate with people in other countries?',
    answer:
      'Yes! High-Frequency (HF) radio signals can bounce off the ionosphere, allowing you to establish voice, Morse code (CW), and digital communications (FT8, JS8Call) with operators across the globe, as well as bounce signals off satellites and the International Space Station (ISS).',
  },
  {
    question: 'How do I become a member?',
    answer:
      'You can become a member by contacting us through our online registration form, attending one of our regular meetups, or joining our active community channels.',
  },
];

// Placeholder body copy — replace it in the admin panel once the real
// write-ups are ready.
const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
];

const projects = [
  {
    title:
      'Software-Defined Networks for Optical Networks Using Flexible Orchestration: Advances, Challenges, and Opportunities',
    slug: 'software-defined-networks-for-optical-networks-using-flexible-orchestration-advances-challenges-and-opportunities',
    authors:
      'Dr. Eliel Keelson, Dr. Andrew Agbemenu, Prof. Eric Tchao, Kenneth Nsafoa-Yeboah, Bright Yeboah-Akowuah, Benjamin Kommey, Mohammad Monirujjaman Khan',
    date: '2026-08-01T00:00:00.000Z',
    image: '/research-img.png',
    content: richText(lorem),
  },
];

// Image-to-name pairing confirmed with the maintainer: the portrait filenames,
// not the order the names were first listed in, are authoritative.
const researchers = [
  {
    image: '/prof-1.jpg',
    title: 'Professor',
    name: 'Prof. Sani Mubarak Ellis',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    socials: { phone: '+233 123 123455', email: 'lecture@knust.edu.gh' },
    tag: 'ANTENNA DESIGN',
    teamLeader: true,
  },
  {
    image: '/prof-3-oteng.jpg',
    title: 'Lecturer',
    name: 'Dr. Kwame Oteng Gyasi',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.',
    socials: { phone: '+233 123 123455', email: 'lecture@knust.edu.gh' },
    tag: 'ANTENNA DESIGN',
  },
  {
    image: '/prof-2-sarkodie.jpg',
    title: 'Lecturer',
    name: 'Dr. Kingsford Sarkodie Obeng Kwakye',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis.',
    socials: { phone: '+233 123 123455', email: 'lecture@knust.edu.gh' },
    tag: 'ANTENNA DESIGN',
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  const existingFaqs = await payload.count({ collection: 'faqs' });
  if (existingFaqs.totalDocs > 0) {
    payload.logger.info(`faqs: ${existingFaqs.totalDocs} row(s) already present — skipping.`);
  } else {
    for (const faq of faqs) {
      await payload.create({ collection: 'faqs', data: faq });
    }
    payload.logger.info(`faqs: seeded ${faqs.length} row(s).`);
  }

  const existingProjects = await payload.count({ collection: 'projects' });
  if (existingProjects.totalDocs > 0) {
    payload.logger.info(
      `projects: ${existingProjects.totalDocs} row(s) already present — skipping.`,
    );
  } else {
    for (const project of projects) {
      await payload.create({ collection: 'projects', data: project });
    }
    payload.logger.info(`projects: seeded ${projects.length} row(s).`);
  }

  const existingResearchers = await payload.count({ collection: 'researchers' });
  if (existingResearchers.totalDocs > 0) {
    payload.logger.info(
      `researchers: ${existingResearchers.totalDocs} row(s) already present — skipping.`,
    );
  } else {
    for (const researcher of researchers) {
      await payload.create({ collection: 'researchers', data: researcher });
    }
    payload.logger.info(`researchers: seeded ${researchers.length} row(s).`);
  }

  await payload.destroy();
  process.exit(0);
};

await seed();
