import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { stripCells, levelLabel, levelTone, outOfDateText, LEVEL_LABELS } from './reviewSignals';
import ReviewStrip from '../components/detail/ReviewStrip';

const review = {
  reviewedAt: 1789904397,
  sha7: 'a52c443',
  url: '/appverse/review/12334',
  outOfDate: false,
  security: { level: 'solid', summary: 'No security findings', anchor: 'https://x.test/r.html#security' },
  portability: { level: 'some_notes', summary: 'Cluster name hardcoded', anchor: 'https://x.test/r.html#portability' },
  documentation: { level: 'needs_attention', summary: 'No install section', anchor: '' },
  upkeep: { level: null, summary: '', anchor: '' },
};

describe('reviewSignals', () => {
  it('maps the cache enum to the words people read, and nothing else', () => {
    expect(LEVEL_LABELS).toEqual({ solid: 'Low', some_notes: 'Medium', needs_attention: 'High' });
    expect(levelLabel('some_notes')).toBe('Medium');
    expect(levelLabel('bogus')).toBeNull();
    expect(levelTone('needs_attention')).toBe('attention');
    expect(levelTone(null)).toBe('none');
  });

  it('keeps the four axes in fixed positions even when one is unrated', () => {
    const cells = stripCells(review);
    expect(cells.map((c) => c.axis)).toEqual(['Security', 'Portability', 'Docs', 'Upkeep']);
    expect(cells.map((c) => c.tone)).toEqual(['good', 'note', 'attention', 'none']);
    expect(cells[3].label).toBeNull();
    expect(stripCells(null)).toEqual([]);
    expect(stripCells(undefined)).toEqual([]);
  });

  it('marks a review the repo has moved past', () => {
    expect(outOfDateText(review)).toBeNull();
    expect(outOfDateText({ ...review, outOfDate: true })).toBe('Reviewed at a52c443; the repo has changed since');
  });
});

describe('ReviewStrip', () => {
  it('renders nothing without a review', () => {
    expect(renderToStaticMarkup(<ReviewStrip review={null} />)).toBe('');
  });

  it('renders four cells, links the ones with anchors, and the full-review link', () => {
    const html = renderToStaticMarkup(<ReviewStrip review={review} />);
    expect(html).toContain('data-testid="review-strip"');
    expect((html.match(/rounded-full/g) || []).length).toBe(4);
    expect(html).toContain('href="https://x.test/r.html#security"');
    expect(html).toContain('href="https://x.test/r.html#portability"');
    expect(html).not.toContain('href="https://x.test/r.html#documentation"');
    expect(html).toContain('href="/appverse/review/12334"');
    expect(html).toContain('Full review');
    expect(html).toContain('No install section');
    expect(html).toContain('bg-appverse-amber');
    expect(html).not.toContain('Some notes');
  });

  it('shows the out-of-date marker only when the repo has moved', () => {
    expect(renderToStaticMarkup(<ReviewStrip review={review} />)).not.toContain('has changed since');
    expect(renderToStaticMarkup(<ReviewStrip review={{ ...review, outOfDate: true }} />)).toContain('Reviewed at a52c443; the repo has changed since');
  });
});
