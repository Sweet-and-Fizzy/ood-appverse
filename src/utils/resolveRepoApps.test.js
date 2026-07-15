import { describe, it, expect } from 'vitest';
import { resolveRepoApps } from './resolveRepoApps';

// The cache-nested apps may include unpublished apps and lack `readme`; the
// JSON:API fetch (filter[status]=1) is the authoritative, published-only,
// README-bearing source. resolveRepoApps decides which list to render so that:
//   - during the initial fetch we may show cache apps to avoid flicker,
//   - once the fetch SUCCEEDS we show only the fetched apps,
//   - if the fetch FAILS we do NOT silently fall back to stale cache apps
//     (that would show unpublished apps + broken READMEs with no error).

const fetched = [{ id: 'a1', readme: 'real' }];
const cache = [{ id: 'a1' }, { id: 'draft-2' }];

describe('resolveRepoApps', () => {
  it('shows fetched apps once the fetch has succeeded', () => {
    const r = resolveRepoApps({ apps: fetched, appsLoading: false, appsError: null, cacheApps: cache });
    expect(r.apps).toBe(fetched);
    expect(r.showError).toBe(false);
  });

  it('falls back to cache apps DURING the initial load to avoid flicker', () => {
    const r = resolveRepoApps({ apps: [], appsLoading: true, appsError: null, cacheApps: cache });
    expect(r.apps).toBe(cache);
    expect(r.showError).toBe(false);
  });

  it('does NOT fall back to cache when the fetch FAILED — surfaces an error instead', () => {
    const err = new Error('network');
    const r = resolveRepoApps({ apps: [], appsLoading: false, appsError: err, cacheApps: cache });
    expect(r.apps).toEqual([]);      // no stale/unpublished cache apps
    expect(r.showError).toBe(true);
    expect(r.error).toBe(err);
  });

  it('a successful fetch that returns zero apps shows zero, not the cache', () => {
    // Empty published set is a valid result, not a reason to leak cache apps.
    const r = resolveRepoApps({ apps: [], appsLoading: false, appsError: null, cacheApps: cache });
    expect(r.apps).toEqual([]);
    expect(r.showError).toBe(false);
  });

  it('handles missing cacheApps gracefully during load', () => {
    const r = resolveRepoApps({ apps: [], appsLoading: true, appsError: null, cacheApps: undefined });
    expect(r.apps).toEqual([]);
    expect(r.showError).toBe(false);
  });
});
