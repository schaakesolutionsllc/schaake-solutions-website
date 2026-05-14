---
id: plan-01-homepage-messaging
name: Homepage Messaging and Experience Section Refresh
branch: revise-schaake-solutions-homepage-messaging-and-replace-track-record/plan-01-homepage-messaging
---

# Homepage Messaging and Experience Section Refresh

## Architecture Context

This Astro site implements the homepage inline in `src/pages/index.astro` and shared navigation/footer/metadata in `src/layouts/Layout.astro`. Styling is applied directly with Tailwind utility classes; `src/styles/global.css` only imports Tailwind and configures source scanning. The change is a focused content and markup refresh, not a component or dependency refactor.

The current homepage has Hero, Services, Approach, Track Record, Current Thinking, and Contact sections. The `Track Record` section uses `id="track-record"`, centers on FLEX, and is linked from desktop navigation, mobile navigation, and the footer Company column. The replacement must use broader credibility framing while preserving the existing dark slate visual language, cyan/teal accents, rounded cards, responsive layout, Calendly CTA, LinkedIn link, and single-page flow.

## Implementation

### Overview

Revise homepage copy so the site communicates hands-on technical leadership, reliable software delivery, practical AI leverage, and experience with complex business workflows. Replace the current FLEX-centered `Track Record` section with an `Experience That Transfers` section using `id="experience"`, and update all internal links and labels that point to the old proof section.

### Key Decisions

1. Use `Experience That Transfers` as the section heading and `experience` as the anchor. This avoids résumé chronology while giving buyers a clear credibility section.
2. Use the anonymized proof point `roughly a decade building and maintaining commercial-lending SaaS` instead of naming FLEX.
3. Keep the three service-card structure, but rewrite headings, paragraphs, and bullets around client outcomes and problems.
4. Keep first-person voice because the page opens with `Hi, I'm Mark Schaake.`
5. Do not introduce new components, images, routes, packages, case studies, testimonials, client names, or company names.

### Content Targets

Use these draft copy targets unless a small wording adjustment is needed to fit the existing markup.

#### Page title and meta description

- In `src/pages/index.astro`, update the `Layout` title prop to a title aligned with the new positioning, for example: `Schaake Solutions - Practical AI, Reliable Software, Technical Leadership`.
- In `src/layouts/Layout.astro`, update the meta description to: `Schaake Solutions helps companies turn complex business workflows into reliable software, practical AI leverage, and hands-on technical leadership.`

#### Hero section

- Keep the `Hi, I'm Mark Schaake.` heading and existing CTA buttons.
- Replace the cyan headline with: `Hands-on technical leadership for complex workflows, reliable software, and practical AI leverage.`
- Replace the supporting paragraph with: `I help startups and established companies turn messy business processes into production systems, apply AI where it creates operational value, and make the technical decisions that move high-stakes work forward.`
- Remove the existing `bridge the gap between heavy-duty software engineering and the AI-first future` wording.

#### Services section

Keep exactly three cards in the existing responsive grid. Rewrite the cards with these headings and content themes:

1. `Fractional CTO & Technical Leadership`
   - Paragraph: `For teams that need senior technical judgment without full-time executive overhead, I help set direction, evaluate tradeoffs, and keep delivery connected to business outcomes.`
   - Bullets:
     - `Technical strategy for business-critical product decisions`
     - `Architecture review before expensive rebuilds or pivots`
     - `Engineering mentorship and hiring guidance`
     - `Roadmaps that balance delivery risk with product goals`
2. `Applied AI Implementation`
   - Paragraph: `I help companies move beyond experiments and chatbot wrappers into AI-enabled workflows that improve real operations. The focus is use cases with defined data, reliability, and adoption paths.`
   - Bullets:
     - `AI workflow discovery and prioritization`
     - `LLM integrations inside existing systems`
     - `Agentic tools for internal operations`
     - `Guardrails, evaluation, and production rollout planning`
3. `Architecture & Delivery Consulting`
   - Paragraph: `When software has become hard to change, I help teams find the pressure points, simplify the architecture, and ship safer improvements without losing momentum.`
   - Bullets:
     - `System architecture and codebase assessment`
     - `Integration and data-flow design`
     - `Delivery plans for migrations or modernization`
     - `Performance, reliability, and security risk review`

Also update the footer Services link labels in `src/layouts/Layout.astro` to match these revised service names while keeping the `/#services` target.

#### Experience section

Replace the entire current `Track Record` block in `src/pages/index.astro`:

- Change the comment to `<!-- Experience Section -->`.
- Change the section anchor to `id="experience"`.
- Change the heading to `Experience That Transfers`.
- Do not name FLEX in the replacement section.
- Use a layout that fits the existing style: a rounded slate card, introductory text, a concise proof callout, and a two-column grid of four smaller cards/pillars.

Recommended section copy:

Intro paragraph:

`I work where business complexity, technical ambiguity, and execution risk overlap. The value is not one résumé line; it is the pattern of turning complicated operations into software that teams can trust.`

Proof paragraph/callout:

`For roughly a decade, I have built and maintained commercial-lending SaaS in a domain that demands complex workflows, third-party integrations, auditability, and reliability. That experience informs how I evaluate AI, architecture, and delivery choices for other businesses.`

Four pillar cards:

1. Heading: `Translate business complexity into systems`
   - Text: `Model messy workflows, edge cases, approvals, exceptions, and handoffs without losing sight of what users need to get done.`
2. Heading: `Build and operate long-lived production software`
   - Text: `Make technical decisions with production realities in mind: reliability, data integrity, change management, integrations, and support.`
3. Heading: `Apply AI where it creates operational leverage`
   - Text: `Use AI to reduce review time, surface context, assist decisions, and automate internal work where evaluation and human oversight can be built in.`
4. Heading: `Lead through technical ambiguity`
   - Text: `Help teams choose a path, understand tradeoffs, communicate risks, and keep high-stakes work moving when the answer is not obvious.`

#### Current Thinking section

A small copy alignment edit is in scope if it connects the existing blog teaser to practical internal tools and AI leverage. Preserve the existing external blog link. Suggested paragraph:

`Right now, I'm exploring the "disposability" of software—using agentic AI to make useful internal tools cheaper to build, easier to discard, and more closely matched to the workflow they serve.`

#### Navigation and footer

In `src/layouts/Layout.astro`:

- Change desktop navigation `/#track-record` link to `/#experience` and visible text to `Experience`.
- Change mobile navigation `/#track-record` link to `/#experience` and visible text to `Experience`.
- Change footer Company link `/#track-record` to `/#experience` and visible text to `Experience`.
- Keep Services, Approach, LinkedIn, Contact, Home, Client Portal, and email link targets unchanged except for revised service labels described above.

## Scope

### In Scope

- Homepage copy changes in `src/pages/index.astro`.
- Hero copy refresh around complex workflows, reliable software, practical AI leverage, and hands-on technical leadership.
- Three service-card copy refresh while retaining the existing three-card structure.
- Replacement of the FLEX-centered Track Record section with the `Experience That Transfers` section.
- Use of the anonymized commercial-lending SaaS proof point for approximately 10 years.
- Internal link, nav label, footer label, page title, and meta description consistency updates in `src/layouts/Layout.astro`.
- A minor Current Thinking paragraph edit that preserves the existing blog link.

### Out of Scope

- New pages, CMS/data files, testimonials, client logos, case-study pages, images, or external integrations.
- Chronological résumé content.
- Named client or company details beyond Schaake Solutions.
- Deployment configuration or infrastructure changes.
- Package dependency, lockfile, Astro config, Tailwind config, or global CSS changes.
- Component extraction or reusable component refactors.

## Files

### Create

- None.

### Modify

- `src/pages/index.astro` — Update the Layout title, hero copy, service cards, proof/experience section, and optional Current Thinking paragraph while preserving existing CTAs and visual structure.
- `src/layouts/Layout.astro` — Update meta description, desktop/mobile navigation, footer Company link, and footer service labels for consistency with the refreshed homepage.

## Database Migration

None.

## Verification

- [ ] `src/pages/index.astro` uses the `Layout` title `Schaake Solutions - Practical AI, Reliable Software, Technical Leadership` or an equivalent title containing `Practical AI`, `Reliable Software`, and `Technical Leadership`.
- [ ] Hero copy in `src/pages/index.astro` contains `complex workflows`, `reliable software`, `practical AI leverage`, and `technical leadership`.
- [ ] `rg "bridge the gap" src/pages/index.astro` returns no matches.
- [ ] The Services section in `src/pages/index.astro` contains exactly three card headings: `Fractional CTO & Technical Leadership`, `Applied AI Implementation`, and `Architecture & Delivery Consulting`.
- [ ] `src/pages/index.astro` contains `<section id="experience"` and the heading text `Experience That Transfers`.
- [ ] `rg "Track Record|track-record" src/pages/index.astro src/layouts/Layout.astro` returns no matches.
- [ ] The replacement experience section in `src/pages/index.astro` contains `commercial-lending SaaS` and either `roughly a decade` or `approximately 10 years`.
- [ ] The replacement experience section in `src/pages/index.astro` does not contain `FLEX`.
- [ ] The experience section contains four pillar headings covering business complexity translation, long-lived production software, operational AI leverage, and technical ambiguity leadership.
- [ ] `src/layouts/Layout.astro` contains desktop nav, mobile nav, and footer Company links pointing to `/#experience` with visible label `Experience`.
- [ ] `src/layouts/Layout.astro` meta description contains `complex business workflows`, `reliable software`, `practical AI leverage`, and `hands-on technical leadership`.
- [ ] Calendly and LinkedIn URLs remain unchanged in `src/pages/index.astro` and `src/layouts/Layout.astro`.
- [ ] `package.json`, `pnpm-lock.yaml`, `astro.config.mjs`, `tsconfig.json`, and `src/styles/global.css` have no content changes.
- [ ] After installing dependencies with `pnpm install --frozen-lockfile` when `node_modules` is absent, `pnpm build` exits with status 0.
