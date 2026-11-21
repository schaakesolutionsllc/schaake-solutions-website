# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for Schaake Solutions, LLC (www.schaake.solutions): a single static page presenting Mark Schaake's work building business operating systems, AI-first (what he builds, the systems he has in production, and how to get in touch). It is built with Astro and Tailwind CSS and hosted on Vercel.

## Tech Stack

- **Astro** 7.4 (static output, no adapter or integrations)
- **Tailwind CSS** 4.3 via the `@tailwindcss/vite` plugin (configured in `astro.config.mjs`; no `tailwind.config` file, CSS entry is `src/styles/global.css`)
- **sharp** 0.35 for `astro:assets` image optimization (no images are processed at the moment)
- **pnpm** (lockfile: `pnpm-lock.yaml`)
- **Node** 22.23.4 or newer is required by Astro 7 (Vercel builds with Node 24.x)

## Commands

```bash
pnpm install          # install dependencies
pnpm dev              # dev server at http://localhost:4321
pnpm build            # production build to dist/
pnpm preview          # serve the built dist/ locally
node --test tests/    # run the tests (Node's built-in test runner)
```

There is no `pnpm test` script; run the tests with `node --test tests/`.

## Structure

- `src/pages/index.astro`: the only page (hero, `#build`, `#systems`, `#contact` sections). The copy lives here, including the system descriptions passed to `SystemEntry` as slot content.
- `src/layouts/Layout.astro`: HTML shell, metadata (canonical, Open Graph, Twitter card), skip link, header with one responsive `<nav aria-label="Main">`, masthead strip, footer
- `src/components/`: `SchaakeSolutionsLogo.astro` (inline SVG logo), `Orbit.astro` (hero diagram, inline SVG), `SystemEntry.astro` (numbered entry in the Systems section)
- `src/styles/global.css`: Tailwind import plus the design tokens in `@theme` (colours `paper`, `ink`, `ink-2`, `ink-3`, `rule`, `accent`, `accent-bright`, `on-ink`, `ok`, `logo-cyan`, `logo-slate`; system font stacks; the type scale) and base styles (focus ring, reduced-motion-aware smooth scrolling)
- `public/`: files served as-is (`favicon.svg`, `apple-touch-icon.png`, `og.png` for link previews)
- `tests/homepage-messaging.test.mjs`: copy tests
- `dist/`: build output (gitignored)

Navigation is in-page anchors (`/#build`, `/#systems`, `/#contact`). The design is light only, with system fonts and no client-side JavaScript. Keep colour pairs to the AA-checked combinations: `accent-bright` and `on-ink` only on `ink`, and `rule`, `logo-cyan` and `logo-slate` never for text.

## Tests pin the homepage copy

`tests/homepage-messaging.test.mjs` reads `src/pages/index.astro` and `src/layouts/Layout.astro` as text and asserts on the copy: the page title, hero phrases, the three "What I Build" headings, the two system titles, the Systems intro and closing line, the meta description, the Open Graph and canonical metadata, navigation and footer links (with their counts), and the Calendly and LinkedIn URLs. It also asserts that certain retired copy and markup are absent (e.g. "Track Record", "FLEX", "eforge", "Client Portal", the old hero image, `hover:scale`). Any intentional copy change must update these tests in the same change.

## Deployment

- **Pushing `master` to `origin` deploys to production.** Vercel's GitHub connection builds and publishes every push to `master`. Do not push without the owner's approval.
- `pnpm run deploy` runs `vercel --prod`, a manual alternative that deploys the local working copy to production (needs the Vercel CLI and the linked project in `.vercel/`).
- Note: `pnpm deploy` without `run` is pnpm's built-in workspace deploy command, not this script, and fails in this repo.

## Shared design tokens

The `@theme` tokens in `src/styles/global.css` (colours and type) are shared with markschaake.com, which adopted them in its commit 02ca198 (2026-11-20). If you change a token, tell the schaake.solutions lead so the markschaake.com lead can follow. markschaake.com's dark mode uses the dark A/B palette from the design review (#020618 background, #00d3f3 accent).
