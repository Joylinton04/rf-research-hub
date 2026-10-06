/**
 * One-shot backfill: copies the images that `researchers.image` and
 * `projects.image` point at into the Neon media bucket, and links each row to
 * the resulting Media row via its new upload field.
 *
 * Run with: npm run migrate:images
 *
 * This cannot live in scripts/seed.ts — that script skips any collection that
 * already holds rows, and all of these do.
 *
 * It is idempotent twice over: a row whose upload field is already set is left
 * alone, and a file already uploaded in this run is reused rather than stored
 * twice. Safe to re-run after a partial failure.
 *
 * The source of truth for which file belongs to which row is the legacy `image`
 * column, never the person's name — the portrait filenames do not run in the
 * same order as the names (prof-3 is the second researcher, prof-2 the third),
 * so re-deriving the pairing by hand would silently swap two faces.
 */
import path from 'path';
import { fileURLToPath } from 'url';

import { getPayload, type Payload } from 'payload';

import config from '../payload.config';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, '../public');

/**
 * Uploads `legacyPath` (a /public path such as `/prof-1.jpg`) to the bucket and
 * returns the new Media row's id, reusing it if this run already stored it.
 *
 * Passing `filePath` is what does the work: Payload reads the file from disk,
 * runs it through sharp to build every size declared on the Media collection,
 * and PUTs the original plus each derivative to the bucket.
 */
const uploadOnce = async (
  payload: Payload,
  cache: Map<string, number>,
  legacyPath: string,
  alt: string,
): Promise<number> => {
  const cached = cache.get(legacyPath);
  if (cached !== undefined) return cached;

  const filePath = path.join(publicDir, path.basename(legacyPath));
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    filePath,
  });

  payload.logger.info(`media: uploaded ${legacyPath} -> id ${media.id}`);
  cache.set(legacyPath, media.id);
  return media.id;
};

const migrate = async () => {
  const payload = await getPayload({ config });
  const cache = new Map<string, number>();
  let linked = 0;
  let skipped = 0;

  // depth 0 keeps the upload fields as plain ids, which is all the check needs.
  const { docs: researchers } = await payload.find({
    collection: 'researchers',
    limit: 100,
    depth: 0,
  });

  for (const researcher of researchers) {
    if (researcher.portrait) {
      skipped += 1;
      continue;
    }
    if (!researcher.image) {
      payload.logger.warn(
        `researchers/${researcher.id} (${researcher.name}): no legacy image to migrate.`,
      );
      continue;
    }

    // The person's name is the correct alt text for a portrait.
    const portrait = await uploadOnce(payload, cache, researcher.image, researcher.name);
    await payload.update({
      collection: 'researchers',
      id: researcher.id,
      data: { portrait },
    });
    payload.logger.info(`researchers/${researcher.id}: portrait -> media/${portrait}`);
    linked += 1;
  }

  const { docs: projects } = await payload.find({
    collection: 'projects',
    limit: 100,
    depth: 0,
  });

  for (const project of projects) {
    if (project.thumbnail) {
      skipped += 1;
      continue;
    }
    if (!project.image) {
      payload.logger.warn(`projects/${project.id} (${project.slug}): no legacy image to migrate.`);
      continue;
    }

    const thumbnail = await uploadOnce(payload, cache, project.image, project.title);
    await payload.update({
      collection: 'projects',
      id: project.id,
      data: { thumbnail },
    });
    payload.logger.info(`projects/${project.id}: thumbnail -> media/${thumbnail}`);
    linked += 1;
  }

  payload.logger.info(
    `done — ${cache.size} file(s) uploaded, ${linked} row(s) linked, ${skipped} already done.`,
  );

  await payload.destroy();
  process.exit(0);
};

await migrate();
