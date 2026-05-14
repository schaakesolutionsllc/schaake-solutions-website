import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const layout = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

test('homepage title and hero copy match refreshed positioning', () => {
  assert.match(page, /<Layout title="[^"]*Practical AI[^"]*Reliable Software[^"]*Technical Leadership[^"]*">/);
  for (const phrase of ['complex workflows', 'reliable software', 'practical AI leverage', 'technical leadership']) {
    assert.match(page, new RegExp(phrase));
  }
  assert.doesNotMatch(page, /bridge the gap/i);
});

test('services section contains the three refreshed service cards', () => {
  const headings = [...page.matchAll(/<h3 class="text-2xl font-bold text-cyan-400 mb-4">([^<]+)<\/h3>/g)].map((match) => match[1]);
  assert.deepEqual(headings, [
    'Fractional CTO & Technical Leadership',
    'Applied AI Implementation',
    'Architecture & Delivery Consulting',
  ]);
});

test('experience section replaces track record with anonymized transferable experience', () => {
  assert.match(page, /<section id="experience"/);
  assert.match(page, /Experience That Transfers/);
  assert.doesNotMatch(`${page}\n${layout}`, /Track Record|track-record/);
  assert.match(page, /commercial-lending SaaS/);
  assert.match(page, /roughly a decade|approximately 10 years/);
  assert.doesNotMatch(page, /FLEX/);

  for (const heading of [
    'Translate business complexity into systems',
    'Build and operate long-lived production software',
    'Apply AI where it creates operational leverage',
    'Lead through technical ambiguity',
  ]) {
    assert.match(page, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('layout navigation, footer links, and metadata point to the refreshed experience section', () => {
  assert.match(layout, /content="[^"]*complex business workflows[^"]*reliable software[^"]*practical AI leverage[^"]*hands-on technical leadership[^"]*"/);
  const experienceLinks = [...layout.matchAll(/<a href="\/#experience"[^>]*>Experience<\/a>/g)];
  assert.equal(experienceLinks.length, 3);
  for (const service of [
    'Fractional CTO & Technical Leadership',
    'Applied AI Implementation',
    'Architecture & Delivery Consulting',
  ]) {
    assert.match(layout, new RegExp(service.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('external Calendly and LinkedIn links remain available', () => {
  assert.match(page, /https:\/\/calendly\.com\/mark-schaake\/30min/);
  assert.match(page, /https:\/\/www\.linkedin\.com\/in\/mark-schaake/);
  assert.match(layout, /https:\/\/www\.linkedin\.com\/in\/mark-schaake/);
});
