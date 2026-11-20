# Style handoff: schaake.solutions → markschaake.com

From: the schaake.solutions lead (Grove). Date: 2026-11-20.

## What happened
schaake.solutions launched a full redesign today (commit ea3858e, live at https://www.schaake.solutions). The owner picked "direction C": a **light, editorial studio** look. The previous site was dark slate/cyan. The site's "Writing" links point to markschaake.com, so visitors move between the two sites, and the owner wants to explore **synchronizing styles**.

This is an invitation to align, not a mandate. Whether and how markschaake.com changes is the owner's call, made with you.

## The design system (source of truth: the schaake.solutions repo)
- Repo: /Users/markschaake/projects/schaake-solutions-website
- Tokens: `src/styles/global.css` (Tailwind 4 `@theme`, copied below)
- Components: `src/components/Orbit.astro` (inline SVG "one system" orbit), `SystemEntry.astro` ("No. 1 / No. 2" entries), `SchaakeSolutionsLogo.astro`
- Layout and patterns: `src/layouts/Layout.astro` (header, masthead strip, footer), `src/pages/index.astro` (sections)
- Full spec with a WCAG AA contrast table: /tmp/design-review/c-spec.md. Mockup: /tmp/design-review/mockup-c-refresh.html. /tmp may be cleared, so the repo is canonical.

### Key traits
- **Palette:** paper #f6f4ef, ink #0f172a (with ink-2 #334155 and ink-3 #5b6577 for secondary text), hairline rules #d9d4c7, accent #0e7490 (text-safe on paper, 4.87:1), and a bright cyan #22d3ee used only on dark ink blocks. Logo colours (#0891b2 / #475569) are for marks only, never for text.
- **Type:** no web fonts.
  - Headings: system serif stack (Iowan Old Style / Palatino / Charter / Georgia).
  - Body: system sans.
  - Labels: system mono, uppercase, letter-spaced.
  - Italic accent words in headlines (e.g. "*AI-first.*" in accent colour).
- **Editorial devices:** a masthead strip under the header (two mono cells), "§ 1"-style section labels, 1.1/1.2 sub-numbers, large italic "No. 1" numerals, 1 px ruled columns, and a dark ink contact block.
- **Behaviour:** light only, no JS, reduced-motion respected, visible focus rings, a skip link, and a single responsive nav row (no hamburger).
- **Assets:** S2 favicon with a dark-mode rule, apple-touch-icon on paper, and a 1200×630 light OG image.

### Tokens (verbatim)
```css
@import "tailwindcss";

@source "../**/*.astro";

@theme {
  --color-paper: #f6f4ef;
  --color-ink: #0f172a;
  --color-ink-2: #334155;
  --color-ink-3: #5b6577;
  --color-rule: #d9d4c7;
  --color-accent: #0e7490;
  --color-accent-bright: #22d3ee;
  --color-on-ink: #cbd5e1;
  --color-ok: #15803d;
  --color-logo-cyan: #0891b2;
  --color-logo-slate: #475569;

  --font-serif: "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Charter, "Bitstream Charter", Georgia, serif;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --text-display: clamp(2.5rem, 7vw, 5.75rem);   --text-display--line-height: 0.98;  --text-display--letter-spacing: -0.025em;
  --text-h2: clamp(2.125rem, 4.5vw, 3.5rem);     --text-h2--line-height: 1.05;       --text-h2--letter-spacing: -0.02em;
  --text-h3: 1.625rem;                           --text-h3--line-height: 1.15;
  --text-h3-lg: 1.875rem;                        --text-h3-lg--line-height: 1.15;
  --text-lead: clamp(1.375rem, 2.4vw, 1.75rem);  --text-lead--line-height: 1.35;
  --text-lead-lg: clamp(1.5rem, 3vw, 2.125rem);  --text-lead-lg--line-height: 1.3;
  --text-number: 4.5rem;                         --text-number--line-height: 1;
  --text-mail: clamp(1.625rem, 4.6vw, 3.75rem);  --text-mail--line-height: 1.15;     --text-mail--letter-spacing: -0.03em;
  --text-sub: 1.1875rem;                         --text-sub--line-height: 1.65;
  --text-body: 1.0625rem;                        --text-body--line-height: 1.65;
  --text-label: 0.75rem;                         --text-label--letter-spacing: 0.08em;
  --text-label-xs: 0.6875rem;                    --text-label-xs--letter-spacing: 0.1em;

  --container-page: 74rem;
}

@layer base {
  html { color-scheme: light; }
  body { @apply bg-paper text-ink-2 font-sans text-body antialiased; }
  :focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
  @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
}

```

## Constraints the owner has set (apply on both sites)
- Never mention Grove publicly (it's not released). Don't name FLEX; eforge is shut down.
- Any public copy change needs the owner's approval. Deploys and pushes need the owner's approval.

## Suggested next step
Review markschaake.com against these tokens and propose (to the owner) one of the following:
- (a) share tokens only: colours and type, keeping the blog's layout
- (b) a fuller match: masthead, section devices, footer
- (c) leave as is

Mention any constraints on your side (framework, theme, blog templates).
