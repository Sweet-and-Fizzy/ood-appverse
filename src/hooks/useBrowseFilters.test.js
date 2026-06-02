import { describe, it, expect } from 'vitest';
import { applyBrowseFilters } from './useBrowseFilters';

const software = [
  { id: 'sw1', topics: [{ id: 't1', name: 'data science' }] },
  { id: 'sw2', topics: [{ id: 't2', name: 'statistics' }] },
];

const repoWithDataApp = {
  id: 'r1', title: 'Has Data App', organization: { id: 'o1', name: 'OSC' },
  apps: [{ id: 'a1', softwareId: 'sw1', appTypes: [], tags: [] }],
};
const repoWithStatsApp = {
  id: 'r2', title: 'Has Stats App', organization: { id: 'o2', name: 'PSC' },
  apps: [{ id: 'a2', softwareId: 'sw2', appTypes: [], tags: [] }],
};

const base = { kind: 'repo', searchQuery: '', filters: { topics: [], appType: [], tags: [], organizations: [] }, repos: [], software };

describe('applyBrowseFilters — repo topics (via software join)', () => {
  it('returns a repo whose member app software has the selected topic', () => {
    const out = applyBrowseFilters([repoWithDataApp, repoWithStatsApp], {
      ...base, filters: { ...base.filters, topics: ['data science'] },
    });
    expect(out.map(r => r.id)).toEqual(['r1']);
  });

  it('excludes a repo with no member app matching the topic', () => {
    const out = applyBrowseFilters([repoWithStatsApp], {
      ...base, filters: { ...base.filters, topics: ['data science'] },
    });
    expect(out).toEqual([]);
  });

  it('ANY-match: a repo with two apps matches if EITHER app qualifies', () => {
    const mixed = {
      id: 'r3', title: 'Mixed', organization: null,
      apps: [
        { id: 'a1', softwareId: 'sw1', appTypes: [], tags: [] },
        { id: 'a2', softwareId: 'sw2', appTypes: [], tags: [] },
      ],
    };
    const out = applyBrowseFilters([mixed], {
      ...base, filters: { ...base.filters, topics: ['data science'] },
    });
    expect(out.map(r => r.id)).toEqual(['r3']);
  });

  it('skips empty softwareId (no bogus topic match)', () => {
    const blank = {
      id: 'r4', title: 'Blank', organization: null,
      apps: [{ id: 'a9', softwareId: '', appTypes: [], tags: [] }],
    };
    const out = applyBrowseFilters([blank], {
      ...base, filters: { ...base.filters, topics: ['data science'] },
    });
    expect(out).toEqual([]);
  });
});
