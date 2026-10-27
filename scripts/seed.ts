/**
 * Seeds the Page Heroes, FAQs, Projects, Researchers, Bootcamps and Gallery
 * collections, and the Contact Details global, with the content that used to be hard-coded in
 * the page components, uploading the images each row needs to the media bucket
 * along the way.
 *
 * Run with: npm run seed
 *
 * It is idempotent — a collection that already holds rows is left untouched, so
 * re-running never duplicates or overwrites an editor's changes. The uploads sit
 * inside those same guards, so a second run does not re-upload the files.
 */
import path from 'path';
import { fileURLToPath } from 'url';

import { getPayload, type Payload } from 'payload';

import { heroPages, pageHeroDefaults } from '../lib/page-heroes';
import config from '../payload.config';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, '../public');

/**
 * Uploads `file` from /public to the media bucket and returns the new Media
 * row's id, reusing it if this run already stored that file.
 *
 * Passing `filePath` is what does the work: Payload reads the file from disk,
 * runs it through sharp to build every size declared on the Media collection,
 * and PUTs the original plus each derivative to the bucket.
 */
const uploadOnce = async (
  payload: Payload,
  cache: Map<string, number>,
  file: string,
  alt: string,
): Promise<number> => {
  const cached = cache.get(file);
  if (cached !== undefined) return cached;

  const media = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: path.join(publicDir, file),
  });

  payload.logger.info(`media: uploaded ${file} -> id ${media.id}`);
  cache.set(file, media.id);
  return media.id;
};

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
    thumbnailFile: 'research-img.png',
    content: richText(lorem),
  },
];

// Image-to-name pairing confirmed with the maintainer: the portrait filenames,
// not the order the names were first listed in, are authoritative — note that
// prof-3 belongs to the second researcher and prof-2 to the third. Keep each
// `portraitFile` next to its name so that cannot drift.
const researchers = [
  {
    portraitFile: 'prof-1.jpg',
    title: 'Professor',
    name: 'Prof. Sani Mubarak Ellis',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    socials: { phone: '+233 123 123455', email: 'lecture@knust.edu.gh' },
    tag: 'ANTENNA DESIGN',
    teamLeader: true,
  },
  {
    portraitFile: 'prof-3-oteng.jpg',
    title: 'Lecturer',
    name: 'Dr. Kwame Oteng Gyasi',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.',
    socials: { phone: '+233 123 123455', email: 'lecture@knust.edu.gh' },
    tag: 'ANTENNA DESIGN',
  },
  {
    portraitFile: 'prof-2-sarkodie.jpg',
    title: 'Lecturer',
    name: 'Dr. Kingsford Sarkodie Obeng Kwakye',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis.',
    socials: { phone: '+233 123 123455', email: 'lecture@knust.edu.gh' },
    tag: 'ANTENNA DESIGN',
  },
];

// Photographs for /gallery, in the order the page used to list them. The first
// one is also the page's hero backdrop, so it stays at the top.
//
// The descriptions are the alt text as well as the captions, so they describe
// what is actually in each frame rather than adding unseen detail.
// The one bootcamp the group has published a flyer for. Every detail here is
// read off that flyer — there is no date on it, so none is claimed.
const bootcamps = [
  {
    flyerFile: 'bootcamp2026.jpeg',
    title: 'Vacation BootCamp 2026',
    organiser:
      'Antenna Group in collaboration with the Rohde & Schwarz RF and Microwave Research Centre',
    fee: 'GHS 350',
    duration: '2 weeks',
    venue: 'Rohde & Schwarz RF and Microwave Research Lab, behind Kumapley Auditorium',
    note: '3rd year students can use this for their internship.',
    description: richText([
      'The Antenna Group runs Vacation BootCamp 2026 in collaboration with the Rohde & Schwarz RF and Microwave Research Centre — two weeks in the lab that houses the group’s measurement benches, working with the instruments rather than reading about them.',
      'Sessions are held at the Rohde & Schwarz RF and Microwave Research Lab, behind Kumapley Auditorium. Registration is GHS 350 for the full two weeks.',
      'Third-year students can count the bootcamp towards their internship requirement. For dates and registration, follow the group’s social channels.',
    ]),
  },
];

const gallery = [
  {
    imageFile: 'Rohde and Schwarz RF Microwave Research Center.jpg',
    title: 'R&S RF & Microwave Research Center',
    category: 'FACILITY',
    description:
      'The research center at KNUST, Department of Telecommunication Engineering, with its activity banner and workstation benches.',
  },
  {
    imageFile: 'Array Antennas Lab.jpg',
    title: 'Array Antenna Design Session',
    category: 'LABORATORY',
    description:
      'Students working through an array antenna layout on screen, alongside a vector network analyzer and bench power supply.',
  },
  {
    imageFile: 'VNA Gain Measurement with Dr. Ellis.jpg',
    title: 'VNA Gain Measurement',
    category: 'MEASUREMENT',
    description:
      'Researchers taking a gain measurement, with a planar antenna under test cabled to the bench instruments.',
  },
  {
    imageFile: 'Rohde and Schwarz Knust Lab.jpeg',
    title: 'Lab Workstation',
    category: 'LABORATORY',
    description:
      'Group members at a lab workstation, with a board-milling setup and copper-clad substrate on the bench.',
  },
  {
    imageFile: 'Rohde Schwarz Equipment Setup.webp',
    title: 'Instrument Bench',
    category: 'EQUIPMENT',
    description:
      'A test bench of oscilloscope, signal generator, power supply and spectrum analyzers cabled to a device under test.',
  },
];

// The Contact Details global. The socials are the group's own accounts, taken
// from the Links page. Email and phone are deliberately absent: nobody has
// given the group's real ones, and a contact page is the last place to guess —
// a wrong address silently swallows messages. The card omits each until it is
// filled in at /admin → Globals → Contact Details.
const contactDetails = {
  heading: 'Get in Touch',
  intro:
    'Use the details below to contact us directly, or fill out the form and we’ll get back to you as soon as possible.',
  address: 'Faculty of Electrical and Computer Engineering\nKNUST - Kumasi\nGhana',
  socials: [
    { platform: 'website' as const, url: 'https://antennagroupknust.com/' },
    { platform: 'x' as const, url: 'https://x.com/antennaknust' },
    {
      platform: 'linkedin' as const,
      url: 'https://www.linkedin.com/company/rohde-schwarz-radio-frequency-and-microwave-lab/',
    },
    { platform: 'instagram' as const, url: 'https://www.instagram.com/antennaknust/' },
    { platform: 'youtube' as const, url: 'https://www.youtube.com/@AntennaGroupStudios' },
  ],
};

const seed = async () => {
  const payload = await getPayload({ config });
  // Shared across both collections so a file used twice is stored once.
  const uploads = new Map<string, number>();

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
    for (const { thumbnailFile, ...project } of projects) {
      const thumbnail = await uploadOnce(payload, uploads, thumbnailFile, project.title);
      await payload.create({ collection: 'projects', data: { ...project, thumbnail } });
    }
    payload.logger.info(`projects: seeded ${projects.length} row(s).`);
  }

  const existingResearchers = await payload.count({ collection: 'researchers' });
  if (existingResearchers.totalDocs > 0) {
    payload.logger.info(
      `researchers: ${existingResearchers.totalDocs} row(s) already present — skipping.`,
    );
  } else {
    for (const { portraitFile, ...researcher } of researchers) {
      // The person's name is the correct alt text for a portrait.
      const portrait = await uploadOnce(payload, uploads, portraitFile, researcher.name);
      await payload.create({ collection: 'researchers', data: { ...researcher, portrait } });
    }
    payload.logger.info(`researchers: seeded ${researchers.length} row(s).`);
  }

  const existingBootcamps = await payload.count({ collection: 'bootcamps' });
  if (existingBootcamps.totalDocs > 0) {
    payload.logger.info(
      `bootcamps: ${existingBootcamps.totalDocs} row(s) already present — skipping.`,
    );
  } else {
    for (const { flyerFile, ...bootcamp } of bootcamps) {
      // The flyer's own name is what a screen reader should hear for it.
      const flyer = await uploadOnce(payload, uploads, flyerFile, `${bootcamp.title} flyer`);
      await payload.create({ collection: 'bootcamps', data: { ...bootcamp, flyer } });
    }
    payload.logger.info(`bootcamps: seeded ${bootcamps.length} row(s).`);
  }

  const existingGallery = await payload.count({ collection: 'gallery' });
  if (existingGallery.totalDocs > 0) {
    payload.logger.info(
      `gallery: ${existingGallery.totalDocs} row(s) already present — skipping.`,
    );
  } else {
    for (const { imageFile, ...item } of gallery) {
      // For a photograph the caption description is also the right alt text.
      const image = await uploadOnce(payload, uploads, imageFile, item.description);
      await payload.create({ collection: 'gallery', data: { ...item, image } });
    }
    payload.logger.info(`gallery: seeded ${gallery.length} row(s).`);
  }

  const existingHeroes = await payload.count({ collection: 'page-heroes' });
  if (existingHeroes.totalDocs > 0) {
    payload.logger.info(
      `page-heroes: ${existingHeroes.totalDocs} row(s) already present — skipping.`,
    );
  } else {
    for (const page of heroPages) {
      const { title, description, imageFile } = pageHeroDefaults[page];
      // The backdrop is decorative, so the alt text only needs to say what it is.
      // The Gallery hero has no file and keeps following its first photograph.
      const backgroundImage = imageFile
        ? await uploadOnce(payload, uploads, imageFile, 'Research laboratory')
        : undefined;
      await payload.create({
        collection: 'page-heroes',
        data: { page, title, description, backgroundImage },
      });
    }
    payload.logger.info(`page-heroes: seeded ${heroPages.length} row(s).`);
  }

  // Globals always exist, so there is no count to guard on: a global that has
  // never been saved comes back with only its field defaults. Writing only in
  // that case keeps the seed from overwriting an editor's real contact details
  // on a re-run.
  const existingContact = await payload.findGlobal({ slug: 'contact-details' });
  if (existingContact.address || existingContact.email || existingContact.phone) {
    payload.logger.info('contact-details: already filled in — skipping.');
  } else {
    await payload.updateGlobal({ slug: 'contact-details', data: contactDetails });
    payload.logger.info('contact-details: seeded.');
  }

  await payload.destroy();
  process.exit(0);
};

await seed();
