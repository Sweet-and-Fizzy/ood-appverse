import { describe, it, expect } from 'vitest';
import { applyBrowseFilters, appMatchesFilters, buildRepoOrgByRepoId } from './useBrowseFilters';

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

describe('appMatchesFilters', () => {
  const none = { topics: [], appType: [], tags: [], organizations: [] };
  const item = { id: 'sw1', tags: [{ name: 'hpc' }] };
  const app = {
    id: 'a1',
    repoId: 'r1',
    appTypes: [{ name: 'Dashboard' }],
    tags: [{ name: 'gpu' }],
  };
  const repoOrg = buildRepoOrgByRepoId([{ id: 'r1', organization: { name: 'OSC' } }]);

  it('passes when no filters are active or filters are missing', () => {
    expect(appMatchesFilters(app, item, none, repoOrg)).toBe(true);
    expect(appMatchesFilters(app, item, undefined, repoOrg)).toBe(true);
    expect(appMatchesFilters({ id: 'bare' }, item, none)).toBe(true);
  });

  it('filters by app type', () => {
    expect(appMatchesFilters(app, item, { ...none, appType: ['Dashboard', 'Widget'] }, repoOrg)).toBe(true);
    expect(appMatchesFilters(app, item, { ...none, appType: ['Widget'] }, repoOrg)).toBe(false);
    expect(appMatchesFilters({ id: 'bare' }, item, { ...none, appType: ['Widget'] }, repoOrg)).toBe(false);
  });

  it('filters by organization via repoId', () => {
    expect(appMatchesFilters(app, item, { ...none, organizations: ['OSC'] }, repoOrg)).toBe(true);
    expect(appMatchesFilters(app, item, { ...none, organizations: ['PSC'] }, repoOrg)).toBe(false);
  });

  it('filters by organization via app.organization', () => {
    const direct = { id: 'a2', organization: { name: 'PSC' } };
    expect(appMatchesFilters(direct, item, { ...none, organizations: ['PSC'] }, {})).toBe(true);
    expect(appMatchesFilters(direct, item, { ...none, organizations: ['OSC'] }, {})).toBe(false);
  });

  it('requires every selected tag, counting software-level tags', () => {
    expect(appMatchesFilters(app, item, { ...none, tags: ['gpu'] }, repoOrg)).toBe(true);
    expect(appMatchesFilters(app, item, { ...none, tags: ['gpu', 'hpc'] }, repoOrg)).toBe(true);
    expect(appMatchesFilters(app, item, { ...none, tags: ['gpu', 'missing'] }, repoOrg)).toBe(false);
  });

  it('ignores topics', () => {
    expect(appMatchesFilters(app, item, { ...none, topics: ['anything'] }, repoOrg)).toBe(true);
  });

  it('combines filter types with AND', () => {
    const f = { ...none, appType: ['Dashboard'], organizations: ['OSC'] };
    expect(appMatchesFilters(app, item, f, repoOrg)).toBe(true);
    expect(appMatchesFilters(app, item, { ...f, organizations: ['PSC'] }, repoOrg)).toBe(false);
    expect(appMatchesFilters(app, item, { ...f, appType: ['Widget'] }, repoOrg)).toBe(false);
  });
});
