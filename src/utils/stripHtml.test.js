import { describe, it, expect } from 'vitest';
import { stripHtml } from './stripHtml';

describe('stripHtml', () => {
  it('removes tags and collapses whitespace', () => {
    expect(stripHtml('<p>Hello  <b>world</b></p>\n<p>again</p>')).toBe('Hello world again');
  });

  it('returns "" for non-strings', () => {
    expect(stripHtml(null)).toBe('');
    expect(stripHtml(undefined)).toBe('');
    expect(stripHtml(42)).toBe('');
  });
});
