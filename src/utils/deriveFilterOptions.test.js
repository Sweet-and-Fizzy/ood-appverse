import { describe, it, expect } from 'vitest';
import { deriveAvailableOptions } from './deriveFilterOptions';

const software = [
  {
    id: 'sw1', topics: [{ id: 't1', name: 'data science' }], tags: [{ id: 'g1', name: 'gpu' }],
    apps: [{ id: 'a1', softwareId: 'sw1', appTypes: [{ id: 'at1', name: 'batch' }], tags: [{ id: 'g1', name: 'gpu' }] }],
  },
  {
    id: 'sw2', topics: [{ id: 't2', name: 'statistics' }], tags: [],
    apps: [{ id: 'a2', softwareId: 'sw2', appTypes: [], tags: [{ id: 'g2', name: 'r-lang' }] }],
  },
];

const repos = [
  {
    id: 'r1', organization: { id: 'o1', name: 'OSC' },
    apps: [
      { id: 'a1', softwareId: 'sw1', appTypes: [{ id: 'at1', name: 'batch' }], tags: [{ id: 'g1', name: 'gpu' }] },
      { id: 'a2', softwareId: 'sw2', appTypes: [], tags: [{ id: 'g2', name: 'r-lang' }] },
    ],
  },
];

describe('deriveAvailableOptions — software kind', () => {
  it('collects topics/tags from software + apps, appType from apps', () => {
    const opts = deriveAvailableOptions(software, 'software', { software, repos: [] });
    expect(opts.topics.map(t => t.name).sort()).toEqual(['data science', 'statistics']);
    expect(opts.appType.map(t => t.name)).toEqual(['batch']);
    expect(opts.tags.map(t => t.name).sort()).toEqual(['gpu', 'r-lang']);
  });

  it('derives software organization options from the repo join', () => {
    const swWithRepoLink = [{
      ...software[0],
      apps: [{ ...software[0].apps[0], repoId: 'r1' }],
    }];
    const opts = deriveAvailableOptions(swWithRepoLink, 'software', { software: swWithRepoLink, repos });
    expect(opts.organizations.map(o => o.name)).toEqual(['OSC']);
  });
});

describe('deriveAvailableOptions — repo kind', () => {
  it('derives topics via the member-app -> software join', () => {
    const opts = deriveAvailableOptions(repos, 'repo', { software, repos });
    expect(opts.topics.map(t => t.name).sort()).toEqual(['data science', 'statistics']);
  });

  it('derives appType/tags from member apps and org from the repo itself', () => {
    const opts = deriveAvailableOptions(repos, 'repo', { software, repos });
    expect(opts.appType.map(t => t.name)).toEqual(['batch']);
    expect(opts.tags.map(t => t.name).sort()).toEqual(['gpu', 'r-lang']);
    expect(opts.organizations.map(o => o.name)).toEqual(['OSC']);
  });

  it('skips member apps with empty softwareId (no bogus topics)', () => {
    const repoWithBlankSw = [{
      id: 'r2', organization: { id: 'o2', name: 'NoSoftware Inc' },
      apps: [{ id: 'a3', softwareId: '', appTypes: [], tags: [] }],
    }];
    const opts = deriveAvailableOptions(repoWithBlankSw, 'repo', { software, repos: repoWithBlankSw });
    expect(opts.topics).toEqual([]);
  });
});

describe('deriveAvailableOptions — edge cases', () => {
  it('returns all-empty for empty input', () => {
    const opts = deriveAvailableOptions([], 'repo', { software: [], repos: [] });
    expect(opts).toEqual({ topics: [], appType: [], tags: [], organizations: [] });
  });

  it('returns all-empty for an unknown kind (e.g. bundle)', () => {
    const opts = deriveAvailableOptions(repos, 'bundle', { software, repos });
    expect(opts).toEqual({ topics: [], appType: [], tags: [], organizations: [] });
  });

  it('de-duplicates options by id', () => {
    const dup = [
      { id: 'x', topics: [{ id: 't1', name: 'data science' }], tags: [], apps: [] },
      { id: 'y', topics: [{ id: 't1', name: 'data science' }], tags: [], apps: [] },
    ];
    const opts = deriveAvailableOptions(dup, 'software', { software: dup, repos: [] });
    expect(opts.topics).toHaveLength(1);
  });
});
