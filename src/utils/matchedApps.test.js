import { describe, it, expect } from 'vitest';
import {
  getMatchedApps,
  splitOnMatch,
  matchedAppsLabel,
  visibleMatches,
  snippetAround,
  getMatchReasons,
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

describe('snippetAround', () => {
  const long = `${'alpha beta gamma '.repeat(10)}NEEDLE ${'delta epsilon zeta '.repeat(10)}`;

  it('adds ellipses on both sides for long text', () => {
    const r = snippetAround(long, 'needle');
    expect(r.match).toBe('NEEDLE');
    expect(r.before.startsWith('…')).toBe(true);
    expect(r.after.endsWith('…')).toBe(true);
    expect(r.before.length).toBeLessThanOrEqual(61);
  });

  it('has no ellipses for short text', () => {
    expect(snippetAround('A short Needle here', 'needle')).toEqual({
      before: 'A short ',
      match: 'Needle',
      after: ' here',
    });
  });

  it('returns null when not found or inputs empty', () => {
    expect(snippetAround('nothing here', 'zzz')).toBeNull();
    expect(snippetAround('', 'a')).toBeNull();
    expect(snippetAround('text', '  ')).toBeNull();
    expect(snippetAround(null, 'a')).toBeNull();
  });
});

describe('getMatchReasons (software)', () => {
  const base = { title: 'Some Tool', body: '', tags: [], topics: [], apps: [] };

  it('tag-only match', () => {
    const r = getMatchReasons({ ...base, tags: [{ name: 'chemistry' }, { name: 'other' }] }, 'chem', 'software');
    expect(r.tags).toEqual([{ name: 'chemistry' }]);
    expect(r.topics).toEqual([]);
    expect(r.apps).toEqual([]);
    expect(r.description).toBeNull();
  });

  it('partial tag match, alphabetical', () => {
    const r = getMatchReasons(
      { ...base, tags: [{ name: 'simulation' }, { name: 'Simple' }] },
      'sim',
      'software'
    );
    expect(r.tags.map((t) => t.name)).toEqual(['Simple', 'simulation']);
  });

  it('topic-only match', () => {
    const r = getMatchReasons({ ...base, topics: [{ name: 'Genomics' }] }, 'genom', 'software');
    expect(r.topics).toEqual([{ name: 'Genomics' }]);
    expect(r.tags).toEqual([]);
    expect(r.description).toBeNull();
  });

  it('description-only match strips HTML and decodes entities', () => {
    const r = getMatchReasons(
      { ...base, body: '<p>Runs R &amp; Python &lt;fast&gt; with &quot;quantum&quot; &#39;x&#039;&nbsp;y</p>' },
      'quantum',
      'software'
    );
    expect(r.description.match).toBe('quantum');
    expect(r.description.before).toBe('Runs R & Python <fast> with "');
    expect(r.description.after).toBe('" \'x\' y');
  });

  it('decodes &amp; last', () => {
    const r = getMatchReasons({ ...base, body: 'a &amp;lt; b needle' }, 'needle', 'software');
    expect(r.description.before).toBe('a &lt; b ');
  });

  it('omits description when a tag also matches', () => {
    const r = getMatchReasons(
      { ...base, body: 'about physics', tags: [{ name: 'physics' }] },
      'physics',
      'software'
    );
    expect(r.tags).toHaveLength(1);
    expect(r.description).toBeNull();
  });

  it('returns null for title match, empty query, or no match', () => {
    expect(getMatchReasons({ ...base, body: 'tool' }, 'some', 'software')).toBeNull();
    expect(getMatchReasons(base, '  ', 'software')).toBeNull();
    expect(getMatchReasons(base, 'zzz', 'software')).toBeNull();
    expect(getMatchReasons(null, 'zzz', 'software')).toBeNull();
  });
});

describe('getMatchReasons (repo)', () => {
  const base = { title: 'Repo One', description: '', apps: [], tags: [], topics: [] };

  it('matches through an app title', () => {
    const r = getMatchReasons({ ...base, apps: [drona] }, 'drona', 'repo');
    expect(r.apps).toEqual([{ app: drona, matchType: 'title' }]);
    expect(r.description).toBeNull();
  });

  it('matches through an app tag', () => {
    const r = getMatchReasons({ ...base, apps: [drona] }, 'batch', 'repo');
    expect(r.apps[0].matchType).toBe('tag');
  });

  it('matches maintainer', () => {
    const r = getMatchReasons({ ...base, maintainer: { name: 'Jane Doe' } }, 'jane', 'repo');
    expect(r.maintainer).toBe('Jane Doe');
    expect(r.organization).toBeNull();
    expect(r.description).toBeNull();
  });

  it('matches organization', () => {
    const r = getMatchReasons({ ...base, organization: { name: 'Ohio Supercomputer' } }, 'ohio', 'repo');
    expect(r.organization).toBe('Ohio Supercomputer');
    expect(r.maintainer).toBeNull();
  });

  it('matches description as a fallback', () => {
    const r = getMatchReasons({ ...base, description: 'Tools for fluid dynamics' }, 'fluid', 'repo');
    expect(r.description).toEqual({ before: 'Tools for ', match: 'fluid', after: ' dynamics' });
  });

  it('ignores item.tags and topics', () => {
    const r = getMatchReasons(
      { ...base, tags: [{ name: 'physics' }], topics: [{ name: 'physics' }] },
      'physics',
      'repo'
    );
    expect(r).toBeNull();
  });
});
