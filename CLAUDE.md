# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev     # dev server on http://localhost:3000
npm run build   # production build (also the only full type-check: tsconfig is noEmit)
npm start       # serve the production build
npm run lint    # eslint (flat config, next/core-web-vitals + next/typescript)
```

There is no test framework in this project. `npm run build` and `npm run lint` are the verification steps.

`next.config.ts` pins `allowedDevOrigins` to specific LAN IPs so the dev server can be reached from other devices on the network — add an IP there when testing from a new device.

## Architecture

Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4. Marketing/informational site for ARGG (Antenna Research Group Ghana) — an RF & telecommunications research lab. No backend, no database, no API routes.

**Content lives inside page components.** Every page declares its own data as plain arrays of object literals at the top of the default-exported function (`keyProjects`, `mediaItems`, `featuredPortals`, publications, team members, FAQ entries…), then maps them onto presentational components. There is no CMS, no `data/` directory, and no fetching. To change site content, edit the array in the relevant `app/*/page.tsx`.

**`app/layout.tsx` holds only fonts and the flex shell.** It does not render `Navbar`/`Footer` — each page imports and renders them itself, wrapping its own `<main>`. A new page must do the same or it will render chrome-less.

**Path alias:** `@/*` maps to the repo root, so imports read `@/components/Navbar`, `@/lib/utils`.

`lib/utils.ts` exports `cn()` (clsx + tailwind-merge), used by `components/ui/*` for className merging.

Most components are server components. `'use client'` appears only where state or browser APIs are needed: `Navbar` (mobile menu + `usePathname` active link), `PublicationItem` (clipboard BibTeX copy), `LiveTelemetry` (rAF-driven fake spectrum SVG), `app/page.tsx` and `app/publications/page.tsx` (filter state), `app/not-found.tsx`.

## Design system

`DESIGN.md` is the source of truth for colors and typography; `app/globals.css` is its implementation. Both must be kept in sync when tokens change.

The palette is a Material 3 token set (`primary`/`on-primary`/`primary-container`, `surface-container-*`, `outline-variant`, …) defined as `--color-*` in the Tailwind v4 `@theme` block, which makes every token available as a utility: `bg-surface-container-lowest`, `text-on-surface-variant`, `border-outline-variant`. **Use these tokens, not raw Tailwind palette colors or hex values.**

Typography is a set of custom `@utility` classes (`text-headline-xl`, `text-headline-lg`, `text-headline-md`, `text-headline-sm`, `text-body-lg/md/sm`, `text-label-caps`, `text-code-md`) rather than Tailwind's size scale. Manrope is the sans face, JetBrains Mono the mono face — both loaded via `next/font/google` in the root layout and wired to `--font-sans` / `--font-mono`. `text-label-caps` and `text-code-md` are the mono styles; `text-label-caps` uppercases automatically. Existing code often pairs `font-label-caps` with `text-label-caps`; the `font-*` variants only set the family.

Spacing/layout tokens: `max-w-container-max` (1280px) plus `px-6 lg:px-12` is the standard page container. Decorative backgrounds are plain CSS classes at the bottom of `globals.css`: `technical-grid`, `hero-pattern`, `grid-pattern`, `spectrum-gradient`. Animations (`animate-shimmer-*`, `animate-accordion-*`) are declared in `@theme`.

## Known gaps

`Navbar`'s `navLinks` point at `/projects`, `/bootcamps`, `/tutorials`, `/gallery`, none of which exist yet (they hit `app/not-found.tsx`). Conversely `app/publications/page.tsx` exists but is not linked from the nav. Root layout `metadata` still carries the create-next-app defaults.
