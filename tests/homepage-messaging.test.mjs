import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const layout = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
const pageText = page.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const sectionSlice = (id) => {
  const start = page.indexOf(`<section id="${id}"`);
  assert.notEqual(start, -1, `section #${id} exists`);
  const end = page.indexOf('</section>', start);
  return page.slice(start, end);
};

const buildCards = [
  'Portals for Every Stakeholder',
  'Payments & Money Flows',
  'Workflows, Built AI-First',
];

test('homepage title and hero copy match the business operating systems positioning', () => {
  assert.match(page, /<Layout title="[^"]*Business Operating Systems[^"]*AI-First[^"]*">/);
  assert.match(page, /Hi, I'm Mark Schaake\./);
  assert.match(page, /<h1[^>]*>I build business operating systems, /);
  assert.match(pageText, /I build business operating systems, AI-first\./);
  for (const phrase of ['One system a business runs on', 'portals for everyone involved', 'working on projects for fun']) {
    assert.match(page, new RegExp(escape(phrase)));
  }
});

test('homepage no longer pitches consulting or technical leadership services', () => {
  for (const retired of [
    /Fractional CTO/,
    /Technical Leadership/i,
    /Applied AI Implementation/,
    /Architecture & Delivery Consulting/,
    /Practical AI/,
    /Let's Talk/,
    /id="services"|id="approach"|#services|#approach/,
  ]) {
    assert.doesNotMatch(`${page}\n${layout}`, retired);
  }
});

test('what I build section contains the three system capability cards', () => {
  assert.match(page, /<section id="build"/);
  assert.match(page, />What I Build<\/h2>/);
  const headings = [...sectionSlice('build').matchAll(/<h3[^>]*>([^<]+)<\/h3>/g)].map((match) => match[1]);
  assert.deepEqual(headings, buildCards);
});

test('systems section presents the two production systems, with the lending platform anonymized', () => {
  assert.match(page, /<section id="systems"/);
  assert.match(page, />Systems in Production<\/h2>/);
  const systems = sectionSlice('systems');
  const titles = [...systems.matchAll(/<SystemEntry[^>]*\btitle="([^"]+)"|<h3[^>]*>([^<]+)<\/h3>/g)].map((match) => match[1] ?? match[2]);
  assert.deepEqual(titles, [
    'An operating system for equipment finance lenders',
    'An operating system for my tennis club',
  ]);
  assert.match(systems, /Two of the systems I've built and still look after\. Both are the kind of software I enjoy most: one place where a whole operation runs\./);
  assert.match(page, /still maintain it as a software service/);
  assert.match(page, /Pro bono software for running my tennis club/);
  assert.match(page, /roughly a decade/);
  const aiHouse = systems.indexOf("I've also done consulting for AI House (formerly AI2 Incubator) and worked on a range of other projects.");
  assert.ok(aiHouse > systems.lastIndexOf('<SystemEntry'), 'the AI House line follows the two system entries');
  assert.doesNotMatch(`${page}\n${layout}`, /Track Record|track-record/);
});

test('contact section leads with email and keeps Calendly as a secondary link', () => {
  assert.match(page, /<section id="contact"/);
  assert.match(page, />Get in Touch<\/h2>/);
  assert.match(page, /Have a system you need built, or want to compare notes\?/);
  const contact = page.slice(page.indexOf('<section id="contact"'));
  const email = contact.indexOf('href="mailto:info@schaake.solutions"');
  const calendly = contact.indexOf('href="https://calendly.com/mark-schaake/30min"');
  assert.ok(email !== -1 && calendly !== -1 && email < calendly, 'email CTA should come before the Calendly link');
  assert.match(contact, /Book a 30-minute call/);
  assert.doesNotMatch(page, /Schedule a Call/);
});

test('layout navigation, footer links, and metadata point to the refreshed sections', () => {
  assert.match(layout, /const description = '[^']*business operating systems, AI-first[^']*portals for every stakeholder[^']*payment flows[^']*'/);
  assert.match(layout, /<meta name="description" content=\{description\} \/>/);
  assert.equal([...layout.matchAll(/<nav aria-label="Main"/g)].length, 1, 'one responsive main nav');
  assert.match(layout, /<nav aria-label="Footer"/);
  assert.equal([...layout.matchAll(/<a href="\/#build"[^>]*>What I Build<\/a>/g)].length, 1);
  assert.equal([...layout.matchAll(/<a href="\/#systems"[^>]*>Systems<\/a>/g)].length, 2);
  assert.equal([...layout.matchAll(/<a href="\/#contact"[^>]*>Contact<\/a>/g)].length, 1);
  for (const card of buildCards) {
    assert.match(layout, new RegExp(`<a href="/#build"[^>]*>${escape(card)}</a>`));
  }
  for (const anchor of layout.matchAll(/href="\/#([a-z-]+)"/g)) {
    assert.match(page, new RegExp(`<section id="${anchor[1]}"`), `nav anchor #${anchor[1]} has a matching section`);
  }
});

test('layout has a skip link, a main landmark, and the masthead', () => {
  assert.match(layout, /<a href="#main"[^>]*>Skip to content<\/a>/);
  assert.match(layout, /<main id="main"/);
  assert.match(layout, /Projects for fun · open to requests/);
  assert.match(layout, /Business operating systems, built AI-first\./);
});

test('layout has canonical, theme-color, Open Graph, and Twitter metadata', () => {
  assert.match(layout, /const siteUrl = 'https:\/\/www\.schaake\.solutions\/'/);
  assert.match(layout, /const ogImage = 'https:\/\/www\.schaake\.solutions\/og\.png'/);
  assert.match(layout, /<meta name="viewport" content="width=device-width, initial-scale=1" \/>/);
  assert.match(layout, /<link rel="canonical" href=\{siteUrl\} \/>/);
  assert.match(layout, /<meta name="theme-color" content="#f6f4ef" \/>/);
  assert.match(layout, /<link rel="apple-touch-icon" href="\/apple-touch-icon\.png" \/>/);
  for (const [property, value] of [
    ['og:type', '"website"'],
    ['og:url', '{siteUrl}'],
    ['og:title', '{title}'],
    ['og:description', '{description}'],
    ['og:image', '{ogImage}'],
    ['og:image:width', '"1200"'],
    ['og:image:height', '"630"'],
  ]) {
    assert.match(layout, new RegExp(`<meta property="${escape(property)}" content=${escape(value)} />`), property);
  }
  assert.match(layout, /<meta property="og:image:alt" content="[^"]+" \/>/);
  assert.match(layout, /<meta name="twitter:card" content="summary_large_image" \/>/);
  assert.match(layout, /<meta name="twitter:image" content=\{ogImage\} \/>/);
});

test('the old hero image, fade-in animation, and scale hovers are gone', () => {
  const all = `${page}\n${layout}`;
  assert.doesNotMatch(all, /landing-page-background/);
  assert.doesNotMatch(all, /astro:assets/);
  assert.doesNotMatch(all, /animate-fade-in/);
  assert.doesNotMatch(all, /hover:scale/);
  assert.doesNotMatch(all, /id="menuButton"|id="mobileMenu"|<script/);
});

test('writing, LinkedIn, and contact links are available', () => {
  assert.match(page, /https:\/\/markschaake\.com/);
  assert.equal([...layout.matchAll(/<a href="https:\/\/markschaake\.com"[^>]*>Writing<\/a>/g)].length, 2);
  assert.equal([...layout.matchAll(/<a href="https:\/\/www\.linkedin\.com\/in\/mark-schaake"[^>]*>LinkedIn<\/a>/g)].length, 2);
  assert.match(layout, /mailto:info@schaake\.solutions/);
});

test('homepage does not mention Grove, FLEX, eforge, or the Client Portal', () => {
  const all = `${page}\n${layout}`;
  assert.doesNotMatch(all, /grove/i);
  assert.doesNotMatch(all, /FLEX/);
  assert.doesNotMatch(all, /eforge/i);
  assert.doesNotMatch(all, /Client Portal/i);
  assert.doesNotMatch(all, /os\.schaake\.solutions/);
});
