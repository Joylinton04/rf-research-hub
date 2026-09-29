import { revalidatePath } from 'next/cache';

/**
 * `revalidatePath` throws when it is called outside a Next.js request or render
 * — which is exactly what happens when Payload writes come from the CLI, the
 * seed script or a job. There is no route cache to invalidate in those contexts,
 * so the failure is safe to swallow.
 */
export const safeRevalidatePath = (path: string, type?: 'page' | 'layout'): void => {
  try {
    revalidatePath(path, type);
  } catch {
    // Not running inside Next.js — nothing to invalidate.
  }
};
