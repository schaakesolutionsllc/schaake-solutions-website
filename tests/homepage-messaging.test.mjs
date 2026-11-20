import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const layout = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildCards = [
  'Portals for Every Stakeholder',
  'Payments & Money Flows',
  'Workflows, Built AI-First',
];

test('homepage title and hero copy match the business operating systems positioning', () => {
  assert.match(page, /<Layout title="[^"]*Business Operating Systems[^"]*AI-First[^"]*">/);
  assert.match(page, /I build business operating systems, AI-first\./);
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
  const headings = [...page.matchAll(/<h3 class="text-2xl font-bold text-cyan-400 mb-4">([^<]+)<\/h3>/g)].map((match) => match[1]);
  assert.deepEqual(headings, buildCards);
});

test('systems section presents the two production systems, with the lending platform anonymized', () => {
  assert.match(page, /<section id="systems"/);
  assert.match(page, /Systems in Production/);
  const headings = [...page.matchAll(/<h3 class="text-xl font-bold text-cyan-400 mb-3">([^<]+)<\/h3>/g)].map((match) => match[1]);
  assert.deepEqual(headings, [
    'An operating system for equipment finance lenders',
    'An operating system for my tennis club',
  ]);
  assert.match(page, /still maintain it as a software service/);
  assert.match(page, /Pro bono software for running my tennis club/);
  assert.match(page, /roughly a decade/);
  assert.doesNotMatch(page, /FLEX/);
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
  assert.match(layout, /content="[^"]*business operating systems, AI-first[^"]*portals for every stakeholder[^"]*payment flows[^"]*"/);
  assert.equal([...layout.matchAll(/<a href="\/#build"[^>]*>What I Build<\/a>/g)].length, 2);
  assert.equal([...layout.matchAll(/<a href="\/#systems"[^>]*>Systems<\/a>/g)].length, 3);
  for (const card of buildCards) {
    assert.match(layout, new RegExp(`<a href="/#build"[^>]*>${escape(card)}</a>`));
  }
  for (const anchor of layout.matchAll(/href="\/#([a-z-]+)"/g)) {
    assert.match(page, new RegExp(`<section id="${anchor[1]}"`), `nav anchor #${anchor[1]} has a matching section`);
  }
});

test('writing, LinkedIn, and contact links are available', () => {
  assert.match(page, /https:\/\/markschaake\.com/);
  assert.equal([...layout.matchAll(/<a href="https:\/\/markschaake\.com"[^>]*>Writing<\/a>/g)].length, 3);
  assert.match(layout, /https:\/\/www\.linkedin\.com\/in\/mark-schaake/);
  assert.match(layout, /mailto:info@schaake\.solutions/);
});

test('homepage does not mention eforge or Grove', () => {
  assert.doesNotMatch(`${page}\n${layout}`, /eforge/i);
  assert.doesNotMatch(`${page}\n${layout}`, /grove/i);
});
