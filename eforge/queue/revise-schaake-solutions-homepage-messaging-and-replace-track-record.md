---
title: Revise Schaake Solutions Homepage Messaging and Replace Track Record
created: 2026-05-14
profile: pi-codex-5-5
---

# Revise Schaake Solutions Homepage Messaging and Replace Track Record

## Problem / Motivation

The Schaake Solutions homepage currently positions Mark/Schaake Solutions as strategic technology leadership and AI consulting, but the “Track Record” section provides only one major proof point: FLEX. The user stated this feels too narrow because Mark has done substantially more than build FLEX, but does not want to solve that by listing a chronological résumé.

Affected audience: prospective clients evaluating whether Mark has the judgment and range to help with complex technical leadership, AI implementation, and business-critical software.

Why it matters: the current proof section risks under-selling broader credibility and may make Schaake Solutions appear centered on a single product rather than a transferable pattern of experience across complex systems, leadership, and applied AI.

Evidence sources reviewed:
- `CLAUDE.md`: project is an Astro marketing website for Schaake Solutions, LLC, using Astro components and Tailwind utility classes; homepage lives in `src/pages/index.astro`; layout/navigation lives in `src/layouts/Layout.astro`; build command is `npm run build`.
- `src/pages/index.astro`: homepage currently has Hero, Services, Approach, Track Record, Current Thinking, and Contact sections. The Track Record section focuses almost entirely on FLEX and four associated capabilities.
- `src/layouts/Layout.astro`: desktop/mobile navigation and footer link directly to `/#track-record` with the visible label “Track Record”; meta description is generic.
- `README.org`: contains FLEX product details plus generic AI consulting service notes. It supports FLEX as a real proof point but does not provide a fuller personal/professional history.
- Search results: there are no `docs/roadmap.md` or `AGENTS.md` files in this repo. `CLAUDE.md` references product pages that are not present in `src/pages/`, so that project note may be stale.
- `src/pages/index.astro` Track Record section consists of one paragraph about FLEX plus four FLEX-related bullets.
- `src/layouts/Layout.astro` navigation/footer label the section “Track Record,” reinforcing a résumé/proof framing.
- The user explicitly said they are “not happy with” Track Record and want a different approach rather than listing a résumé.

User-stated requirement:
- The current “Track Record” framing is unsatisfactory because it makes the proof point too narrow: Mark has done substantially more than build FLEX.
- The desired direction is likely a new approach that avoids listing a résumé chronologically while communicating broader credibility.

## Goal

Sharpen homepage positioning and copy so the site communicates broader credibility, practical AI leverage, reliable software delivery, and hands-on technical leadership without turning the page into a résumé.

Replace the current FLEX-centered “Track Record” section with a broader credibility section, preferably “Experience That Transfers,” that presents transferable patterns of experience and uses the decade-long commercial-lending SaaS proof point without over-centering FLEX.

## Approach

Evidence-backed conclusions:
- This is primarily a homepage copy/structure change, with likely changes in `src/pages/index.astro` and matching nav/footer label updates in `src/layouts/Layout.astro`.
- Any replacement for `#track-record` either should preserve the existing anchor for compatibility or update every internal link that references it.
- The existing visual style can be preserved: dark slate background, rounded cards, cyan/teal gradient headings, Tailwind utility classes, CTA links to Calendly and LinkedIn.

Recommended content direction:
- Replace “Track Record” with a positioning section such as “Experience That Transfers” or “Built for Complex Work.”
- Present credibility as transferable patterns:
  - Turning messy business processes into software.
  - Operating long-lived production systems.
  - Applying AI pragmatically.
  - Leading through ambiguity.
- Mention the decade-long commercial-lending SaaS maintenance/build experience as a concise proof point without centering the section on FLEX.

Design decisions:
- Use **“Experience That Transfers”** as the replacement for “Track Record.”
  - Rationale: it directly addresses the user's concern by signaling that the section is not a résumé, while still answering the buyer's underlying question: “Can I trust this person with my complex technical problem?”
- Alternative acceptable title: **“Built for Complex Work.”**
  - Rationale: stronger and more benefit-oriented, but slightly less explicit about breadth of experience.
- Avoid “Proof of Range” as the primary recommendation.
  - Rationale: it is accurate, but sounds more internally focused and less natural for a client-facing consulting website.
- Replace the broad “bridge the gap” AI phrase in the hero with a more concrete promise: helping companies turn complex business workflows into reliable software and use AI where it creates real operational leverage.
- Keep first-person voice because the site currently positions Mark personally: “Hi, I'm Mark Schaake.”
- Keep the three-card services structure but make headings/outcomes more client-centered:
  1. Fractional CTO / technical leadership for teams that need senior judgment without full-time overhead.
  2. Applied AI implementation for moving from experiments/chatbots to production workflows.
  3. Architecture and delivery consulting for untangling complex systems and shipping safely.
- Preserve detailed service bullet lists, but tune them toward outcomes rather than generic service inventory.
- Replacement credibility section structure:
  - Intro paragraph: Mark works where business complexity, technical ambiguity, and execution risk overlap.
  - Proof paragraph or callout: decade maintaining/building SaaS in commercial lending, a domain with complex workflows, integrations, auditability, and reliability requirements.
  - Four non-résumé cards/pillars:
    1. Translate business complexity into systems.
    2. Build and operate long-lived production software.
    3. Apply AI pragmatically inside real workflows.
    4. Lead technical decisions through ambiguity.
- Do not name FLEX unless the copy needs a concrete example; use “commercial lending SaaS” instead per user input.
- Anchor/link decision:
  - Either preserve `id="track-record"` for link compatibility while changing visible label to “Experience,” or rename to `id="experience"` and update all internal links.
  - Recommendation: rename to `experience` for cleaner semantics and update nav/footer references in `src/layouts/Layout.astro`.
- Validation decision:
  - After implementation, run dependency install if needed: `pnpm install`.
  - Validate with `pnpm build` or `npm run build` after `node_modules` exists.
  - Current local `npm run build` failed because `astro` is not installed locally (`node_modules` missing), not because of source errors.

Code impact:
- Files likely to change:
  - `src/pages/index.astro`
    - Hero section copy.
    - Services section headings/body bullets.
    - Track Record section replacement: new title, section id, copy, and card content.
    - Potential Current Thinking copy refinement to connect “disposable software” to practical internal tools and AI leverage.
  - `src/layouts/Layout.astro`
    - Desktop/mobile nav label and href for the renamed proof/experience section.
    - Footer company link label and href.
    - Optional meta description update to match sharpened positioning.
- Files likely not changed:
  - `src/styles/global.css`: currently minimal Tailwind import/source config; existing utility classes can handle the redesign.
  - Components in `src/components/`: no evidence that new reusable components are needed for this modest homepage edit.
  - Assets: no new image requirements.
  - `package.json` / build config: no dependency or tooling change required.
- Evidence:
  - Search found all “Track Record” labels and `/#track-record` links in `src/pages/index.astro` and `src/layouts/Layout.astro`.
  - Homepage is implemented inline in `src/pages/index.astro`, so copy/section changes do not require component refactoring.
  - `global.css` contains only Tailwind directives, and existing page sections already use Tailwind utilities directly.

Assumptions and validation:
| Assumption | Evidence / validation performed | Confidence | Cost to validate further | Validation path | Impact if wrong |
|---|---|---:|---:|---|---|
| Scope is homepage messaging/structure only. | User asked for website review and specifically raised Track Record; later confirmed “yes, sharpen” for hero/services. Code search shows relevant copy concentrated in `src/pages/index.astro` and nav/footer labels in `src/layouts/Layout.astro`. | High | Low | User can object if they want new pages/case studies/testimonials. | Could under-scope the work if the user wanted a broader site redesign. |
| “Experience That Transfers” is the best recommended framing. | User wants guidance and does not want a résumé list. This title directly conveys broad credibility without chronology. | Medium | Low | User can choose “Built for Complex Work” or another title before implementation. | Copy may feel slightly too abstract or not distinctive enough. |
| Avoid naming FLEX and instead use “commercial-lending SaaS for 10 years.” | User explicitly said FLEX can be removed and offered the commercial-lending SaaS proof point. | High | Low | User can confirm exact wording: “maintain,” “built and maintain,” “10 years,” “commercial lending,” etc. | Inaccurate wording could overstate or understate the experience. |
| No client/company names should be introduced. | User said examples without company/client names may be acceptable; no specific names were supplied. | High | Low | Ask user for any named examples if desired. | Section may be less concrete, but avoids confidentiality/positioning risk. |
| Existing Tailwind/Astro structure is sufficient. | `src/pages/index.astro` already implements all homepage sections inline with utility classes; no new data/source needs were identified. | High | Low | Build after edits. | Low; if styling gets unwieldy, refactor later. |
| Build validation currently requires installing dependencies. | `npm run build` failed with `astro: command not found`; `node_modules` is missing; `pnpm-lock.yaml` exists and `pnpm` is available. | High | Low/Medium | Run `pnpm install`, then build. | Without install, build failure could be misread as a code problem. |

Additional assumptions / unknowns:
- Assumption: the scope is homepage messaging only, not adding new routes, images, CMS data, testimonials, or product pages.
  - Confidence: medium.
  - Validation cost: low.
  - User can confirm.
- Assumption: “Proof of Range” or a similar positioning-based section is preferable to a résumé-style timeline.
  - Confidence: medium-high based on the prior conversation.
  - Validation cost: low.
  - User can choose language.
- Unknown: whether there are specific non-FLEX accomplishments, industries, companies, roles, or outcomes that should be named.
  - The implementation can either stay general or include user-provided specifics.

No unresolved low-confidence/high-impact assumptions remain. The main subjective decision is the section title; the plan recommends “Experience That Transfers” while allowing the user to override it.

Recommended eforge profile: **Excursion**.

Rationale: this is a cohesive homepage messaging/structure change spanning two files (`src/pages/index.astro` and `src/layouts/Layout.astro`). It requires copy judgment and consistency across hero, services, proof/experience section, nav, footer, and metadata, but it does not require delegated module planning or architecture changes. It is more than a trivial errand because the core value is positioning and integrated copy refinement, not a mechanical text replacement.

## Scope

In scope:
- Sharpen homepage positioning and copy in `src/pages/index.astro`.
- Revise hero headline/subheadline to focus on complex business workflows, reliable software, practical AI leverage, and hands-on technical leadership.
- Reframe the three service cards around client problems/outcomes rather than generic consulting categories.
- Replace the current “Track Record” section with a broader credibility section that avoids a chronological résumé.
- Use the user-provided fact that Mark currently maintains a SaaS platform in commercial lending and has done so for approximately 10 years.
- Prefer general proof themes and anonymized examples over company/client names.
- FLEX does not need to be named in the replacement section; it may be replaced by the broader commercial-lending SaaS proof point.
- Update `src/layouts/Layout.astro` navigation/footer labels and anchors if the section title/anchor changes.
- Preserve existing site structure, dark visual style, Tailwind utility approach, Calendly CTA, LinkedIn link, and single-page homepage flow.

Out of scope:
- Adding new pages, CMS/data files, testimonials, case-study pages, client logos, images, or external integrations.
- Listing a full résumé, chronological career timeline, or named client/company history.
- Changing deployment infrastructure.
- Reworking unrelated footer/contact behavior beyond label/link consistency.

## Acceptance Criteria

- Homepage hero copy is sharpened to clearly state the consulting value proposition: complex business workflows, reliable software, practical AI leverage, and hands-on technical leadership.
- Services section remains three cards but reads as client-centered outcomes/problems rather than generic consulting service inventory.
- The old “Track Record” section is replaced with a broader credibility section, preferably titled “Experience That Transfers,” that avoids résumé chronology.
- Replacement credibility section does not over-center FLEX; it either omits FLEX entirely or replaces it with the broader, user-stated proof point of maintaining/building commercial-lending SaaS for approximately 10 years.
- New credibility section includes transferable patterns of experience:
  - Business-process translation.
  - Long-lived production software.
  - Pragmatic AI/workflow leverage.
  - Technical leadership through ambiguity.
- Internal navigation and footer links are consistent with the new section title/anchor.
- Existing visual design language is preserved:
  - Dark slate background.
  - Cyan/teal accents.
  - Rounded cards.
  - Responsive Tailwind layout.
  - Existing CTAs.
- No named client/company details are introduced unless explicitly supplied by the user.
- Site builds successfully after dependencies are installed:
  - `pnpm install` if needed.
  - Then `pnpm build` or `npm run build`.
- No unrelated pages, deployment scripts, or package dependencies are changed.
