import { describe, it, expect } from 'vitest';
import {
  getMatchedApps,
  splitOnMatch,
  matchedAppsLabel,
  visibleMatches,
} from './matchedApps';

const drona = {
  id: 'fe86b505-b615-4622-9bdc-4843757dea3c',
  title: 'Drona Composer',
  tags: [{ name: 'batch connect' }],
};
const openComposer = { id: 'other', title: 'Open Composer', tags: [{ name: 'web' }] };
const workflow = { title: 'Workflow Composers', apps: [drona, openComposer] };

describe('getMatchedApps', () => {
  it('returns the app whose title matches', () => {
    const result = getMatchedApps(workflow, 'drona');
    expect(result).toEqual([{ app: drona, matchType: 'title' }]);
    expect(result[0].app.id).toBe('fe86b505-b615-4622-9bdc-4843757dea3c');
  });

  it('returns [] when the software title matches', () => {
    expect(getMatchedApps(workflow, 'workflow')).toEqual([]);
  });

  it('is case-insensitive', () => {
    expect(getMatchedApps(workflow, 'DRONA')).toEqual(getMatchedApps(workflow, 'drona'));
  });

  it('returns [] for empty or whitespace-only queries', () => {
    expect(getMatchedApps(workflow, '')).toEqual([]);
    expect(getMatchedApps(workflow, '   ')).toEqual([]);
    expect(getMatchedApps(workflow, null)).toEqual([]);
  });

  it('returns every matching app, and visibleMatches caps the display', () => {
    const apps = ['E', 'D', 'C', 'B', 'A'].map((n) => ({ id: n, title: `Foo ${n}`, tags: [] }));
    const result = getMatchedApps({ title: 'Suite', apps }, 'foo');
    expect(result).toHaveLength(5);
    const { shown, moreCount } = visibleMatches(result);
    expect(shown).toHaveLength(3);
    expect(moreCount).toBe(2);
  });

  it('matches by tag only', () => {
    const tag = { name: 'batch connect' };
    const app = { id: 'x', title: 'Zed', tags: [tag] };
    const result = getMatchedApps({ title: 'Suite', apps: [app] }, 'batch');
    expect(result).toEqual([{ app, matchType: 'tag', tag }]);
    expect(result[0].tag).toBe(tag);
  });

  it('prefers a title match and omits the tag key', () => {
    const app = { id: 'x', title: 'GPU Tool', tags: [{ name: 'gpu' }] };
    const result = getMatchedApps({ title: 'Suite', apps: [app] }, 'gpu');
    expect(result[0].matchType).toBe('title');
    expect(result[0]).not.toHaveProperty('tag');
  });

  it('picks the first matching tag alphabetically', () => {
    const app = {
      id: 'x',
      title: 'Zed',
      tags: [{ name: 'gpu-enabled' }, { name: 'a100-gpu' }],
    };
    const result = getMatchedApps({ title: 'Suite', apps: [app] }, 'gpu');
    expect(result[0].tag.name).toBe('a100-gpu');
  });

  it('lists title matches before tag matches, each alphabetical', () => {
    const apps = [
      { id: '1', title: 'Zeta', tags: [{ name: 'gpu' }] },
      { id: '2', title: 'Beta gpu', tags: [] },
      { id: '3', title: 'Alpha', tags: [{ name: 'gpu' }] },
      { id: '4', title: 'Alpha gpu', tags: [] },
    ];
    const result = getMatchedApps({ title: 'Suite', apps }, 'gpu');
    expect(result.map((m) => m.app.id)).toEqual(['4', '2', '3', '1']);
    expect(result.map((m) => m.matchType)).toEqual(['title', 'title', 'tag', 'tag']);
  });

  it('ignores matches on the software item\'s own topics', () => {
    const item = {
      title: 'Suite',
      topics: [{ name: 'genomics' }],
      apps: [drona, openComposer],
    };
    expect(getMatchedApps(item, 'genomics')).toEqual([]);
  });

  it('does not throw on missing apps or tags', () => {
    expect(getMatchedApps({ title: 'Suite' }, 'x')).toEqual([]);
    expect(getMatchedApps(null, 'x')).toEqual([]);
    expect(getMatchedApps({ title: 'Suite', apps: [{ id: '1' }, null] }, 'x')).toEqual([]);
    expect(getMatchedApps({ title: 'Suite', apps: [{ title: 'A', tags: null }] }, 'x')).toEqual([]);
  });
});

describe('splitOnMatch', () => {
  it('splits around the first match preserving casing', () => {
    expect(splitOnMatch('Drona Composer', 'drona')).toEqual({
      before: '',
      match: 'Drona',
      after: ' Composer',
    });
  });

  it('treats special characters as plain text', () => {
    expect(splitOnMatch('Foo c++ bar', 'C++')).toEqual({
      before: 'Foo ',
      match: 'c++',
      after: ' bar',
    });
  });

  it('returns the whole text when not found or query empty', () => {
    expect(splitOnMatch('Drona', 'xyz')).toEqual({ before: 'Drona', match: '', after: '' });
    expect(splitOnMatch('Drona', '')).toEqual({ before: 'Drona', match: '', after: '' });
    expect(splitOnMatch(null, 'a')).toEqual({ before: '', match: '', after: '' });
  });
});

describe('matchedAppsLabel', () => {
  it('pluralizes', () => {
    expect(matchedAppsLabel(1)).toBe('Matching app');
    expect(matchedAppsLabel(2)).toBe('Matching apps');
  });
});

describe('visibleMatches', () => {
  it('handles null and short lists', () => {
    expect(visibleMatches(null)).toEqual({ shown: [], moreCount: 0 });
    expect(visibleMatches([1, 2])).toEqual({ shown: [1, 2], moreCount: 0 });
  });
});
