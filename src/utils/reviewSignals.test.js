import { describe, it, expect } from 'vitest';
import { axisChip, securityChip, reviewsByAppId, reviewLink } from './reviewSignals';

describe('axisChip', () => {
  it('maps each stored level to its per-axis public label and fill', () => {
    expect(axisChip('portability', { level: 'solid' })).toMatchObject({ label: 'Portable', fill: 'full' });
    expect(axisChip('portability', { level: 'some_notes' })).toMatchObject({ label: 'Needs site config', fill: 'half' });
    expect(axisChip('portability', { level: 'needs_attention' })).toMatchObject({ label: 'Site-specific', fill: 'empty' });
    expect(axisChip('documentation', { level: 'solid' }).label).toBe('Complete');
    expect(axisChip('documentation', { level: 'some_notes' }).label).toBe('Adequate');
    expect(axisChip('documentation', { level: 'needs_attention' }).label).toBe('Minimal');
    expect(axisChip('upkeep', { level: 'solid' }).label).toBe('Well maintained');
    expect(axisChip('upkeep', { level: 'some_notes' }).label).toBe('Active');
    expect(axisChip('upkeep', { level: 'needs_attention' }).label).toBe('Inactive');
  });

  it('names the axis and carries the summary and anchor', () => {
    const chip = axisChip('upkeep', { level: 'solid', summary: 'Commits this month.', anchor: '/r/1#maintenance' });
    expect(chip).toMatchObject({ axis: 'upkeep', name: 'Upkeep', summary: 'Commits this month.', href: '/r/1#maintenance' });
  });

  it('returns null for a missing or unknown level, so no chip claims a state', () => {
    expect(axisChip('portability', undefined)).toBeNull();
    expect(axisChip('portability', { level: null })).toBeNull();
    expect(axisChip('portability', { level: 'excellent' })).toBeNull();
  });
});

describe('securityChip', () => {
  it('states a count with no level', () => {
    expect(securityChip({ count: 2, anchor: '/r/1#app-a' })).toEqual({
      axis: 'security', name: 'Security', label: '2 findings to review', href: '/r/1#app-a',
    });
    expect(securityChip({ count: 1 }).label).toBe('1 finding to review');
    expect(securityChip({ count: 0 }).label).toBe('No findings');
  });

  it('returns null without a security block', () => {
    expect(securityChip(undefined)).toBeNull();
  });

  it('shows no chip for a count that is missing or not a whole number, rather than "No findings"', () => {
    expect(securityChip({})).toBeNull();
    expect(securityChip({ count: null })).toBeNull();
    expect(securityChip({ count: '2' })).toBeNull();
    expect(securityChip({ count: -1 })).toBeNull();
    expect(securityChip({ count: 1.5 })).toBeNull();
  });
});

describe('reviewsByAppId', () => {
  it('indexes reviews from software-nested and repo-nested cache apps', () => {
    const r1 = { url: '/r/1' };
    const r2 = { url: '/r/2' };
    const index = reviewsByAppId(
      { sw1: [{ id: 'a1', review: r1 }, { id: 'a3', review: null }] },
      [{ id: 'repo', apps: [{ id: 'a2', review: r2 }] }],
    );
    expect(index.get('a1')).toBe(r1);
    expect(index.get('a2')).toBe(r2);
    expect(index.has('a3')).toBe(false);
  });

  it('tolerates an empty cache', () => {
    expect(reviewsByAppId(undefined, undefined).size).toBe(0);
  });
});

describe('reviewLink', () => {
  it('prefixes a site-relative link with the site base URL', () => {
    expect(reviewLink('/appverse/review/1#app-a', 'https://example.org')).toBe('https://example.org/appverse/review/1#app-a');
    expect(reviewLink('/appverse/review/1', '')).toBe('/appverse/review/1');
  });

  it('keeps https links and drops empty ones', () => {
    expect(reviewLink('https://other.org/r', 'https://example.org')).toBe('https://other.org/r');
    expect(reviewLink('', 'https://example.org')).toBe('');
    expect(reviewLink(undefined)).toBe('');
  });

  it('drops protocol-relative, javascript: and plain http links', () => {
    expect(reviewLink('//evil.example/x', '')).toBe('');
    expect(reviewLink('//evil.example/x', 'https://example.org')).toBe('');
    expect(reviewLink('javascript:alert(1)', '')).toBe('');
    expect(reviewLink('http://other.org/r', '')).toBe('');
  });
});
