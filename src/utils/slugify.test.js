import { describe, it, expect } from 'vitest';
import { slugify, repoSlug } from './slugify';

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('AlphaFold Pro')).toBe('alphafold-pro');
  });

  it('returns empty string for falsy input', () => {
    expect(slugify('')).toBe('');
    expect(slugify(null)).toBe('');
  });
});

describe('repoSlug', () => {
  it('uses the repo slug when present', () => {
    expect(repoSlug({ slug: 'my-repo', title: 'My Repo' })).toBe('my-repo');
  });

  it('falls back to slugify(title) when slug is missing', () => {
    // This is the fix: a slug-less repo must NOT produce a dead /repo/undefined
    // link. It falls back to the slugified title, matching repoSlugMap in
    // AppverseDataContext so getRepoBySlug resolves it.
    expect(repoSlug({ title: 'Tufts nf-core' })).toBe('tufts-nf-core');
  });

  it('falls back when slug is empty string', () => {
    expect(repoSlug({ slug: '', title: 'Blender Renderer' })).toBe('blender-renderer');
  });

  it('returns null when neither slug nor title is available', () => {
    expect(repoSlug({})).toBe(null);
    expect(repoSlug(null)).toBe(null);
  });
});
