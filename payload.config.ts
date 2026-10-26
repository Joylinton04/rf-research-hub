import path from 'path';
import { fileURLToPath } from 'url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { resendAdapter } from '@payloadcms/email-resend';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Bootcamps } from './collections/Bootcamps';
import { ContactMessages } from './collections/ContactMessages';
import { Faqs } from './collections/Faqs';
import { Gallery } from './collections/Gallery';
import { Media } from './collections/Media';
import { Projects } from './collections/Projects';
import { Researchers } from './collections/Researchers';
import { Users } from './collections/Users';
import { ContactDetails } from './globals/ContactDetails';
import { HomeHero } from './globals/HomeHero';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— ARGG Admin',
    },
  },
  collections: [Users, Faqs, Projects, Researchers, Bootcamps, Gallery, ContactMessages, Media],
  globals: [HomeHero, ContactDetails],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    // Uploads go to the Neon "media" bucket rather than the local filesystem —
    // the only option on a serverless host, where the disk is read-only and
    // ephemeral. Neon Object Storage speaks the real S3 wire protocol, so this
    // is the stock AWS adapter with no Neon-specific code.
    s3Storage({
      collections: {
        // `true` leaves Payload's access control in front of the files, which
        // serves them from /api/media/file/<filename>. Deliberate: Neon buckets
        // are private with no public-read mode, and the alternative — presigned
        // URLs — expire, so a URL baked into a statically prerendered page
        // would start 403ing once the signature outlived the ISR cache. The
        // proxy route is same-origin, so next/image needs no remotePatterns
        // entry for it either.
        media: true,
      },
      // Defaults to the bucket Neon was asked to create. S3_BUCKET overrides it
      // so a branch or a second environment can point somewhere else without a
      // code change.
      bucket: process.env.S3_BUCKET || 'media',
      config: {
        region: process.env.AWS_REGION,
        endpoint: process.env.AWS_ENDPOINT_URL_S3,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        // Both are required by Neon Object Storage. Without forcePathStyle the
        // SDK builds virtual-host URLs (bucket.endpoint) that Neon does not
        // serve; without the checksum setting it sends trailing checksum
        // headers Neon rejects.
        forcePathStyle: true,
        requestChecksumCalculation: 'WHEN_REQUIRED',
      },
      // No `acl` on purpose: Neon does not document ACL support, and some
      // S3-compatible stores reject an x-amz-acl header outright.
    }),
  ],
  // Only wired up when a key is present. Without one Payload falls back to
  // logging each email to the console, which keeps local dev working with no
  // Resend account. The from address must be on a domain verified in Resend;
  // onboarding@resend.dev works for testing but only delivers to the address
  // that owns the Resend account.
  ...(process.env.RESEND_API_KEY
    ? {
        email: resendAdapter({
          apiKey: process.env.RESEND_API_KEY,
          defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'onboarding@resend.dev',
          defaultFromName: 'ARGG Website',
        }),
      }
    : {}),
  sharp,
});
