# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for Schaake Solutions, LLC (www.schaake.solutions): a single static page presenting Mark Schaake's consulting services (fractional CTO and technical leadership, applied AI implementation, architecture and delivery consulting). It is built with Astro and Tailwind CSS and hosted on Vercel.

## Tech Stack

- **Astro** 7.4 (static output, no adapter or integrations)
- **Tailwind CSS** 4.3 via the `@tailwindcss/vite` plugin (configured in `astro.config.mjs`; no `tailwind.config` file, CSS entry is `src/styles/global.css`)
- **sharp** 0.35 for `astro:assets` image optimization
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

- `src/pages/index.astro`: the only page (hero, services, approach, experience, contact sections)
- `src/layouts/Layout.astro`: HTML shell, metadata, sticky header with desktop and mobile navigation, footer
- `src/components/`: `SchaakeSolutionsLogo.astro` (inline SVG logo), `Link.astro` (styled anchor)
- `src/styles/global.css`: Tailwind import
- `src/assets/`: images processed by `astro:assets` (only `landing-page-background.webp` is currently referenced)
- `public/`: files served as-is (favicon)
- `tests/homepage-messaging.test.mjs`: copy tests
- `dist/`: build output (gitignored)

Navigation is in-page anchors (`/#services`, `/#approach`, `/#experience`, `/#contact`) with Tailwind's `scroll-smooth`; a small inline script toggles the mobile menu.

## Tests pin the homepage copy

`tests/homepage-messaging.test.mjs` reads `src/pages/index.astro` and `src/layouts/Layout.astro` as text and asserts on the copy: the page title, hero phrases, the three service card headings, the experience section headings, the meta description, navigation and footer links, and the Calendly and LinkedIn URLs. It also asserts that certain retired copy is absent (e.g. "Track Record", "FLEX", "eforge"). Any intentional copy change must update these tests in the same change.

## Deployment

- **Pushing `master` to `origin` deploys to production.** Vercel's GitHub connection builds and publishes every push to `master`. Do not push without the owner's approval.
- `pnpm run deploy` runs `vercel --prod`, a manual alternative that deploys the local working copy to production (needs the Vercel CLI and the linked project in `.vercel/`).
- Note: `pnpm deploy` without `run` is pnpm's built-in workspace deploy command, not this script, and fails in this repo.
