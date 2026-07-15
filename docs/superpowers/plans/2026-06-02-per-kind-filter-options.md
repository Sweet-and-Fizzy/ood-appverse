# Per-Kind Filter Options + Working Monorepo Topics — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Each browse page's filter sidebar shows only options that match its displayed items, and every shown filter works — including making the Topics filter work on the Monorepos page (currently dead).

**Architecture:** A per-kind accessor config (`KIND_ACCESSORS`) describes how to reach each browse kind's filterable data (member apps, own organization). A pure `deriveAvailableOptions(items, kind, {software, repos})` walks a page's structural candidate set and returns only reachable option values. `useBrowseFilters`' matchers route through the same accessor + a `softwareId → topics` index so container kinds (repo) filter by their member apps' parent-software topics. Pages pass derived options to FilterSidebar/FilterDrawer and the structural candidate set to the hook.

**Tech Stack:** React, Vite, Vitest (added in Task 0 — repo currently has no JS test runner).

**Spec:** `docs/superpowers/specs/2026-06-02-per-kind-filter-options-design.md`

**Working directory:** `/Users/drew/Sites/connectci/ood-appverse` (the React widget repo, branch `collections-mvp`). All paths below are relative to it.

**Commit workflow constraint:** The user runs `git commit` themselves. For every "Commit" step, STAGE the files (`git add ...`) and PROVIDE the commit message text; do NOT run `git commit`, and do NOT add a `Co-Authored-By` trailer.

**Deploy note (NOT part of this plan):** these are React source changes. They only reach DDEV/Pantheon after `npm run build:lib`, committing `dist/`, pushing, and (because the `@collections-mvp` jsDelivr branch alias caches stale) pinning the embed to the new commit SHA. Do NOT run build:lib or touch `dist/` during this plan — implement + test source only; deploy is a separate user-driven step.

**Verified preconditions (do not re-litigate):**
- The cache (`appverse-data.json`) carries everything needed: `software[].topics`, repo member apps' `softwareId`, repo `organization`. No Drupal/cache change.
- `FilterSidebar` already takes a `filterOptions` prop (default `{}`) and hides facets whose array is empty (`filterOptions.x?.length > 0`) — so passing derived options needs no sidebar structural change.
- `SoftwareHome` ALREADY passes `repos` to `useBrowseFilters` (the software org-through-repo join is already live) — only `software` is newly threaded there.
- `ReposHome` currently runs the hook on the FULL repo list then post-filters `monorepos = filteredRepos.filter(apps>1)` — this plan INVERTS that (structural filter before the hook).
- In the current data 0/79 repo apps have empty `softwareId`, but the cache CAN emit `''` (`buildAppData($node, '')`) — the empty-`softwareId` guard is required defensive code.

---

## File Structure

| File | Responsibility | Change |
|------|----------------|--------|
| `vite.config.js` | Add Vitest `test` config (jsdom not needed — pure-function + hook tests) | Modify (Task 0) |
| `package.json` | Add `vitest` devDep + `"test"` script | Modify (Task 0) |
| `src/utils/browseKinds.js` | `KIND_ACCESSORS` — per-kind data accessors | Create (Task 1) |
| `src/utils/deriveFilterOptions.js` | `deriveAvailableOptions()` — pure option deriver | Create (Task 2) |
| `src/utils/deriveFilterOptions.test.js` | Unit tests for the deriver | Create (Task 2) |
| `src/hooks/useBrowseFilters.js` | Accessor-based matchers + `software` param + topics index | Modify (Task 3) |
| `src/hooks/useBrowseFilters.test.js` | Unit test: repo-topics matching | Create (Task 3) |
| `src/pages/ReposHome.jsx` | Invert ordering; derive options from `monorepos`; thread `software` | Modify (Task 4) |
| `src/pages/SoftwareHome.jsx` | Derive options from software list; thread `software` | Modify (Task 5) |

**Design note on boundaries:** `browseKinds.js` is the single source of "how to reach a kind's data" — both the deriver and the hook import it, so adding bundle/classroom later is one config entry, not edits in two places.

---

### Task 0: Add Vitest test infrastructure

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`

- [ ] **Step 1: Add vitest as a dev dependency**

Run: `npm install -D vitest`
Expected: `vitest` appears under `devDependencies` in `package.json`, install succeeds.

- [ ] **Step 2: Add the `test` script**

In `package.json`, inside the `"scripts"` block, add a `test` entry (after `serve:demo`):

```json
    "serve:demo": "npm run build:lib && echo '\n✅ Demo ready! Open: http://localhost:3000/demo/index.html\n' && npx serve . -l 3000",
    "test": "vitest run",
    "test:watch": "vitest"
```

(Keep the existing trailing comma rules valid — `serve:demo` now needs a trailing comma.)

- [ ] **Step 3: Add Vitest config to vite.config.js**

`vite.config.js` uses `export default defineConfig(({ mode }) => { ... return { ... } })`. Add a `test` key to the returned config object (alongside `plugins`, `server`, etc.). These tests are pure JS (no DOM), so the default node environment is fine:

```js
    test: {
      // Pure-function + hook-logic unit tests; no DOM needed.
      environment: 'node',
      include: ['src/**/*.test.{js,jsx}'],
    },
```

- [ ] **Step 4: Add a throwaway smoke test to prove the runner works**

Create `src/utils/__vitest_smoke.test.js`:

```js
import { describe, it, expect } from 'vitest';

describe('vitest smoke', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Run the test suite**

Run: `npm test`
Expected: `1 passed` (the smoke test). If vitest can't resolve config, confirm the `test` key landed inside the returned object (not at the top level of the file).

- [ ] **Step 6: Delete the smoke test**

Run: `rm src/utils/__vitest_smoke.test.js`

- [ ] **Step 7: Commit (stage + message)**

Stage: `git add package.json package-lock.json vite.config.js`

Commit message:
```
chore: add vitest test runner

Adds vitest + a `test`/`test:watch` script and a node-env test config to
vite.config.js, so the new filter-option pure functions can have unit
coverage. No tests yet beyond this scaffolding.
```

---

### Task 1: `KIND_ACCESSORS` config

**Files:**
- Create: `src/utils/browseKinds.js`

This is a pure data/accessor module. No test of its own (it's exercised by Tasks 2 and 3); a standalone test would just restate the literals.

- [ ] **Step 1: Create the accessor config**

Create `src/utils/browseKinds.js`:

```js
/**
 * Per-kind accessors for the browse filter system.
 *
 * Each entry describes how to reach a browse kind's filterable data so the
 * option deriver (deriveFilterOptions.js) and the matchers (useBrowseFilters.js)
 * share ONE definition instead of duplicating `if (kind === ...)` branches.
 *
 *   memberApps(item) -> Array of the item's member app objects (each may carry
 *                       softwareId, appTypes[], tags[]).
 *   ownTopics(item)  -> Array of the item's OWN topic terms ({id,name}). Only
 *                       software has these; containers get topics through their
 *                       member apps' parent software.
 *   ownTags(item)    -> Array of the item's OWN tag terms ({id,name}).
 *   ownOrg(item)     -> The item's OWN organization term ({id,name}) or null.
 *   orgThroughApps   -> true when organization is reached via member apps'
 *                       parent repo (software kind) rather than item.ownOrg.
 *
 * Bundles and Classrooms are intentionally ABSENT: their cache data and
 * member-app attribute shape don't exist yet. A missing entry makes the
 * deriver/matchers yield empty results for that kind (a documented stub).
 * When their cache ships, add an entry here — no other logic changes.
 */
export const KIND_ACCESSORS = {
  software: {
    memberApps: (item) => item.apps || [],
    ownTopics: (item) => item.topics || [],
    ownTags: (item) => item.tags || [],
    ownOrg: () => null,
    orgThroughApps: true,
  },
  repo: {
    memberApps: (item) => item.apps || [],
    ownTopics: () => [],
    ownTags: () => [],
    ownOrg: (item) => item.organization || null,
    orgThroughApps: false,
  },
};
```

- [ ] **Step 2: Verify it imports cleanly**

Run: `node -e "import('./src/utils/browseKinds.js').then(m => console.log(Object.keys(m.KIND_ACCESSORS)))"`
Expected: `[ 'software', 'repo' ]`

- [ ] **Step 3: Commit (stage + message)**

Stage: `git add src/utils/browseKinds.js`

Commit message:
```
feat(filters): add KIND_ACCESSORS config for browse kinds

Single source describing how each browse kind (software, repo) reaches its
filterable data — member apps and own organization. The option deriver and
the filter matchers will both read through this. Bundle/classroom entries
are deliberately omitted until their cache data exists.
```

---

### Task 2: `deriveAvailableOptions` pure deriver + tests (TDD)

**Files:**
- Create: `src/utils/deriveFilterOptions.test.js`
- Create: `src/utils/deriveFilterOptions.js`

- [ ] **Step 1: Write the failing tests**

Create `src/utils/deriveFilterOptions.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { deriveAvailableOptions } from './deriveFilterOptions';

// Minimal fixtures. Topic/tag/appType/org terms are {id,name}.
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
    // sw1's app a1 belongs to repo r1 (org OSC) via app.repoId join.
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
    // Two software both carry topic t1; should appear once.
    const dup = [
      { id: 'x', topics: [{ id: 't1', name: 'data science' }], tags: [], apps: [] },
      { id: 'y', topics: [{ id: 't1', name: 'data science' }], tags: [], apps: [] },
    ];
    const opts = deriveAvailableOptions(dup, 'software', { software: dup, repos: [] });
    expect(opts.topics).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- deriveFilterOptions`
Expected: FAIL — `deriveAvailableOptions` is not defined / module not found.

- [ ] **Step 3: Implement the deriver**

Create `src/utils/deriveFilterOptions.js`:

```js
import { KIND_ACCESSORS } from './browseKinds';

/**
 * Compute the filter options actually reachable from a set of items.
 *
 * Returns only option values present on the given `items` (the page's
 * STRUCTURAL candidate set — see the plan/spec: derived pre-search/pre-facet
 * so options stay stable). Shape matches what FilterSidebar consumes:
 * { topics, appType, tags, organizations }, each [{id,name}] alpha-sorted,
 * de-duped by id.
 *
 * @param {Array} items - candidate items for the page (e.g. monorepos).
 * @param {'software'|'repo'} kind
 * @param {{software: Array, repos: Array}} ctx - software[] powers the
 *   softwareId->topics join; repos[] powers software-kind org options.
 * @returns {{topics:Array,appType:Array,tags:Array,organizations:Array}}
 */
export function deriveAvailableOptions(items, kind, { software = [], repos = [] } = {}) {
  const accessors = KIND_ACCESSORS[kind];
  const empty = { topics: [], appType: [], tags: [], organizations: [] };
  if (!accessors || !items || items.length === 0) {
    return empty;
  }

  // softwareId -> topic terms, for the member-app topics join.
  const topicsBySoftwareId = {};
  for (const sw of software) {
    if (sw?.id) {
      topicsBySoftwareId[sw.id] = sw.topics || [];
    }
  }
  // repoId -> organization TERM ({id,name}), for software-kind org options.
  // NOTE: the matcher in useBrowseFilters keeps a parallel NAME-keyed index
  // (repoOrgByRepoId[id] = organization.name) because it compares by name,
  // whereas the deriver dedupes option terms by id. Two indexes of the same
  // relationship, each correct for its consumer — intentional, not a bug.
  const orgByRepoId = {};
  for (const r of repos) {
    if (r?.id && r.organization) {
      orgByRepoId[r.id] = r.organization;
    }
  }

  const topics = new Map();
  const appType = new Map();
  const tags = new Map();
  const organizations = new Map();
  const add = (map, term) => { if (term && term.id != null) map.set(term.id, term); };

  for (const item of items) {
    // Own topics/tags (software has these; containers don't).
    for (const t of accessors.ownTopics(item)) add(topics, t);
    for (const t of accessors.ownTags(item)) add(tags, t);

    // Member-app-derived: topics via software join, appType + tags directly.
    for (const app of accessors.memberApps(item)) {
      const sid = app.softwareId;
      if (sid) {
        for (const t of (topicsBySoftwareId[sid] || [])) add(topics, t);
      }
      for (const t of (app.appTypes || [])) add(appType, t);
      for (const t of (app.tags || [])) add(tags, t);
    }

    // Organization: own field, or (software kind) the app->repo join.
    if (accessors.orgThroughApps) {
      for (const app of accessors.memberApps(item)) {
        const viaRepo = app.repoId ? orgByRepoId[app.repoId] : null;
        add(organizations, viaRepo || app.organization || null);
      }
    } else {
      add(organizations, accessors.ownOrg(item));
    }
  }

  const sortByName = (a, b) => (a.name || '').toLowerCase().localeCompare((b.name || '').toLowerCase());
  return {
    topics: [...topics.values()].sort(sortByName),
    appType: [...appType.values()].sort(sortByName),
    tags: [...tags.values()].sort(sortByName),
    organizations: [...organizations.values()].sort(sortByName),
  };
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- deriveFilterOptions`
Expected: all tests in the file PASS.

- [ ] **Step 5: Commit (stage + message)**

Stage: `git add src/utils/deriveFilterOptions.js src/utils/deriveFilterOptions.test.js`

Commit message:
```
feat(filters): derive per-kind filter options from displayed items

deriveAvailableOptions(items, kind, {software, repos}) returns only the
filter option values reachable from a page's candidate items, so the
sidebar never offers a value that matches nothing. Topics for repos come
from the member-app -> software join; software org options come from the
app -> repo join (same source the matcher uses). Skips empty softwareId.
Unit-tested for software, repo (incl. topics join), empty/unknown kind,
and de-dup.
```

---

### Task 3: Rewire `useBrowseFilters` matchers + repo-topics test (TDD)

**Files:**
- Create: `src/hooks/useBrowseFilters.test.js`
- Modify: `src/hooks/useBrowseFilters.js`

The hook is a `useMemo`-wrapped pure transform; the matchers are module-level pure functions. We test the EXPORTED `useBrowseFilters` by calling it outside React is not valid (it uses `useMemo`). Instead, refactor the matchers to be individually testable by exporting the core matching as a plain function the hook wraps. Simplest: extract the filter body into an exported pure `applyBrowseFilters(items, opts)` that the hook calls inside `useMemo`. Test `applyBrowseFilters` directly.

- [ ] **Step 1: Write the failing test**

Create `src/hooks/useBrowseFilters.test.js`:

```js
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
        { id: 'a1', softwareId: 'sw1', appTypes: [], tags: [] }, // data science
        { id: 'a2', softwareId: 'sw2', appTypes: [], tags: [] }, // statistics
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- useBrowseFilters`
Expected: FAIL — `applyBrowseFilters` is not exported (it doesn't exist yet).

- [ ] **Step 3: Refactor the hook to expose `applyBrowseFilters` + add `software`**

In `src/hooks/useBrowseFilters.js`:

(a) Add the import at the top:

```js
import { useMemo } from 'react';
import { KIND_ACCESSORS } from '../utils/browseKinds';
```

(b) Change the hook signature to accept `software` and delegate to the new exported function, and add `software` to the dep array:

```js
export function useBrowseFilters(items, { kind, searchQuery, filters, repos = [], software = [] }) {
  return useMemo(
    () => applyBrowseFilters(items, { kind, searchQuery, filters, repos, software }),
    [items, kind, searchQuery, filters, repos, software]
  );
}

/**
 * Pure filter transform extracted from the hook so it can be unit-tested
 * without a React render. Same behavior; the hook just memoizes this.
 */
export function applyBrowseFilters(items, { kind, searchQuery, filters, repos = [], software = [] }) {
  if (!items || items.length === 0) return [];
  let working = [...items];

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    working = working.filter(item => matchesSearch(item, q, kind));
  }

  if (filters.topics?.length) {
    // Build the softwareId -> topics index lazily (only when topics active),
    // mirroring the repoOrgByRepoId pattern below.
    const topicsBySoftwareId = {};
    for (const sw of software) {
      if (sw?.id) topicsBySoftwareId[sw.id] = sw.topics || [];
    }
    working = working.filter(item => itemMatchesTopics(item, filters.topics, kind, topicsBySoftwareId));
  }
  if (filters.appType?.length) {
    working = working.filter(item => itemMatchesAppType(item, filters.appType, kind));
  }
  if (filters.tags?.length) {
    working = working.filter(item => itemMatchesTags(item, filters.tags, kind));
  }
  if (filters.organizations?.length) {
    const repoOrgByRepoId = {};
    for (const c of repos) {
      if (c?.id && c.organization?.name) repoOrgByRepoId[c.id] = c.organization.name;
    }
    working = working.filter(item =>
      itemMatchesOrganization(item, filters.organizations, kind, repoOrgByRepoId)
    );
  }

  working.sort((a, b) => (a.title || '').toLowerCase().localeCompare((b.title || '').toLowerCase()));
  return working;
}
```

(c) Replace `itemMatchesTopics` to use the accessor + index (member-app -> software topics; software keeps own topics):

```js
function itemMatchesTopics(item, topicNames, kind, topicsBySoftwareId = {}) {
  const accessors = KIND_ACCESSORS[kind];
  if (!accessors) return false;
  // Own topics (software).
  if (accessors.ownTopics(item).some(t => topicNames.includes(t.name))) {
    return true;
  }
  // Member-app -> software topics (containers). ANY member app qualifies.
  return accessors.memberApps(item).some(app => {
    if (!app.softwareId) return false; // skip software-less apps
    const swTopics = topicsBySoftwareId[app.softwareId] || [];
    return swTopics.some(t => topicNames.includes(t.name));
  });
}
```

(d) Replace `itemMatchesAppType` to use the accessor (behavior unchanged for software/repo):

```js
function itemMatchesAppType(item, appTypeNames, kind) {
  const accessors = KIND_ACCESSORS[kind];
  if (!accessors) return false;
  return accessors.memberApps(item).some(app =>
    (app.appTypes || []).some(t => appTypeNames.includes(t.name))
  );
}
```

(e) Replace `collectAllTagNames` to use the accessor (union of own tags + member-app tags):

```js
function collectAllTagNames(item, kind) {
  const accessors = KIND_ACCESSORS[kind];
  const names = new Set();
  if (!accessors) return names;
  for (const t of accessors.ownTags(item)) names.add(t.name);
  for (const app of accessors.memberApps(item)) {
    for (const t of (app.tags || [])) names.add(t.name);
  }
  return names;
}
```

(`itemMatchesTags` is unchanged — it still does AND-across-selected-tags over `collectAllTagNames`.)

(f) Replace `itemMatchesOrganization` to use the accessor for the container/own case while keeping the software repo-join:

```js
function itemMatchesOrganization(item, orgNames, kind, repoOrgByRepoId = {}) {
  const accessors = KIND_ACCESSORS[kind];
  if (!accessors) return false;
  if (!accessors.orgThroughApps) {
    const own = accessors.ownOrg(item);
    return !!own && orgNames.includes(own.name);
  }
  // Software: join through apps' parent repo, app.organization as fallback.
  return accessors.memberApps(item).some(app => {
    if (app.repoId && repoOrgByRepoId[app.repoId] && orgNames.includes(repoOrgByRepoId[app.repoId])) {
      return true;
    }
    return app.organization && orgNames.includes(app.organization.name);
  });
}
```

Leave `matchesSearch` and `stripHtml` exactly as they are. Delete the now-stale "not yet resolvable client-side without a join" comment block that preceded the old `itemMatchesTopics`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- useBrowseFilters`
Expected: all 4 repo-topics tests PASS.

- [ ] **Step 5: Run the full suite (no regressions)**

Run: `npm test`
Expected: deriveFilterOptions + useBrowseFilters suites all green.

- [ ] **Step 6: Commit (stage + message)**

Stage: `git add src/hooks/useBrowseFilters.js src/hooks/useBrowseFilters.test.js`

Commit message:
```
feat(filters): route matchers through KIND_ACCESSORS; topics work for repos

Extracts the filter transform into a testable pure applyBrowseFilters and
routes topics/appType/tags/organization through KIND_ACCESSORS. Topics now
match for repos via the member-app -> software join (ANY member app, empty
softwareId skipped), fixing the previously-dead Topics filter on the
Monorepos page. software is threaded in + added to the memo deps. No
behavior change for software/repo appType/tags/org.
```

---

### Task 4: ReposHome — invert ordering, derive options, thread software

**Files:**
- Modify: `src/pages/ReposHome.jsx`

- [ ] **Step 1: Destructure `software` from the data hook**

Find the `useAppverseData()` destructure (around line 15):

```js
const { repos, filterOptions, loading, error, refetch } = useAppverseData();
```

Change it to also pull `software`:

```js
const { repos, software, filterOptions, loading, error, refetch } = useAppverseData();
```

- [ ] **Step 2: Invert the filter ordering — structural filter BEFORE the hook**

Find the current block (around lines 108-120):

```js
  const filteredRepos = useBrowseFilters(repos, {
    kind: 'repo',
    searchQuery,
    filters: {
      topics: filters.topics || [],
      appType: filters.appType || [],
      tags: filters.tags || [],
      organizations: filters.organizations || [],
    },
  });
  // Monorepos display: only repos with more than one app. ...
  const monorepos = filteredRepos.filter((r) => (r.apps?.length ?? 0) > 1);
  // Track the count actually shown ...
  resultCountRef.current = monorepos.length;
```

Replace it with: compute the structural `monorepos` candidate set FIRST, feed it to the hook, and pass `software` + `repos`:

```js
  // Monorepos display: only repos with more than one app. This STRUCTURAL
  // filter runs BEFORE useBrowseFilters so single-app repos never enter
  // matching or option derivation. (Single-app repos stay in the cache for
  // RepoDetail/AppRow — this filter is display-only.)
  const monorepos = (repos || []).filter((r) => (r.apps?.length ?? 0) > 1);

  const displayedRepos = useBrowseFilters(monorepos, {
    kind: 'repo',
    searchQuery,
    filters: {
      topics: filters.topics || [],
      appType: filters.appType || [],
      tags: filters.tags || [],
      organizations: filters.organizations || [],
    },
    repos,
    software,
  });
  // Track the count actually shown.
  resultCountRef.current = displayedRepos.length;
```

(Note: the grid prop later in the file currently reads `monorepos` — Step 4 updates it to `displayedRepos`.)

- [ ] **Step 3: Derive available options from the structural candidate set**

Add the import at the top of the file (with the other util imports):

```js
import { deriveAvailableOptions } from '../utils/deriveFilterOptions';
```

And add a `useMemo` right after the `monorepos`/`displayedRepos` block (ensure `useMemo` is imported from `react` — add it if not already):

```js
  // Available filter options reflect the STRUCTURAL candidate set (monorepos),
  // NOT the search/facet-filtered result, so facets stay stable as the user
  // selects. Only options reachable from a displayed monorepo appear.
  const availableOptions = useMemo(
    () => deriveAvailableOptions(monorepos, 'repo', { software, repos }),
    [monorepos, software, repos]
  );
```

- [ ] **Step 4: Pass derived options to BOTH FilterDrawer and FilterSidebar; grid reads displayedRepos**

Find the `<FilterDrawer ... filterOptions={filterOptions} />` (around line 159) and the `<FilterSidebar ... filterOptions={filterOptions} />` (around line 169). Change BOTH `filterOptions={filterOptions}` to `filterOptions={availableOptions}`.

Find where the grid receives the repos to display (the `<RepoGrid repos={monorepos} ... />`, around line 172) and change it to `repos={displayedRepos}`.

- [ ] **Step 5: Verify it compiles (no full build — avoid clobbering dist)**

Do NOT run `npm run build` here — the standard app build writes `dist/assets/` + `dist/index.html`, overwriting the committed library bundle and requiring a restore. The source is plain JSX; Vite surfaces syntax/import errors instantly on the dev server. Start it briefly and confirm a clean compile:

Run: `npm run dev` (Ctrl-C after it prints the local URL with no compile error).
Expected: dev server starts, no transform/parse errors in the terminal for `ReposHome.jsx`. (If you'd rather not start a server, `npx vite optimize` also triggers a dependency/transform pass — but the dev-server start is the simplest signal.)

Confirm `dist/` was not touched: `git status --short dist` → no output.

- [ ] **Step 6: Commit (stage + message)**

Stage: `git add src/pages/ReposHome.jsx`
(Verify `git status` shows NO `dist/` changes before staging.)

Commit message:
```
feat(repos): per-kind filter options + working topics on Monorepos

Apply the app_count>1 structural filter BEFORE useBrowseFilters so only
monorepos enter matching/derivation, derive the sidebar+drawer options
from that candidate set (no zero-result options), and thread software +
repos into the hook so the Topics filter works for monorepos. Org options
now reflect only orgs that have a monorepo (intended).
```

---

### Task 5: SoftwareHome — derive options, thread software

**Files:**
- Modify: `src/pages/SoftwareHome.jsx`

`SoftwareHome` already passes `repos` to the hook; only `software` (for the topics index, though software already has own topics) and the derived-options swap are new.

- [ ] **Step 1: Thread `software` into the hook call**

Find the `useBrowseFilters(software, { kind: 'software', ... repos })` call (around line 146). Add `software` to its options object (alongside the existing `repos`):

```js
  const filteredSoftware = useBrowseFilters(software, {
    kind: 'software',
    searchQuery,
    filters: {
      topics: filters.topics || [],
      appType: filters.appType || [],
      tags: filters.tags || [],
      organizations: filters.organizations || [],
    },
    repos,
    software,
  });
```

- [ ] **Step 2: Derive available options from the full software list**

Add the import at the top (with the other util imports):

```js
import { deriveAvailableOptions } from '../utils/deriveFilterOptions';
```

Ensure `useMemo` is imported from `react` (add if missing). Add this `useMemo` after the `filteredSoftware` block:

```js
  // Available options reflect the full software candidate set (not the
  // search/facet-filtered result), so facets stay stable while filtering.
  const availableOptions = useMemo(
    () => deriveAvailableOptions(software, 'software', { software, repos }),
    [software, repos]
  );
```

- [ ] **Step 3: Pass derived options to both FilterSidebar call sites**

`SoftwareHome` passes `filterOptions={filterOptions}` in two places (around lines 240 and 252 — a mobile/drawer and a desktop sidebar). Change BOTH to `filterOptions={availableOptions}`.

- [ ] **Step 4: Verify it compiles (no full build — avoid clobbering dist)**

As in Task 4 Step 5: do NOT run `npm run build` (it overwrites the committed lib bundle). Start the dev server briefly to surface any syntax/import error:

Run: `npm run dev` (Ctrl-C after the local URL prints with no compile error).
Expected: no transform/parse errors for `SoftwareHome.jsx`.
Confirm `dist/` untouched: `git status --short dist` → no output.

- [ ] **Step 5: Commit (stage + message)**

Stage: `git add src/pages/SoftwareHome.jsx`
(Verify `git status` shows NO `dist/` changes.)

Commit message:
```
feat(software): derive filter options from displayed software

SoftwareHome now derives sidebar options from its software candidate set
(only reachable values appear) and threads software into useBrowseFilters.
Software org options already came from the repo join; this keeps the
sidebar's offered options consistent with what the matcher accepts.
```

---

### Task 6: Full-suite check + manual smoke

**Files:** none (verification)

- [ ] **Step 1: Run the whole test suite**

Run: `npm test`
Expected: all suites green (deriveFilterOptions + useBrowseFilters).

- [ ] **Step 2: Dev-server manual smoke (Monorepos topics)**

Run: `npm run dev` and open the widget at the Monorepos tab (`/#/repos`).
Verify:
- The Topics facet lists only topics reachable from a displayed monorepo (for the example data: "data science", "computer science", "statistics", etc. from the example monorepo's apps' software).
- Selecting one of those topics returns the example monorepo (not zero results).
- No facet offers an option that yields zero results (absent an active search).
- The Organization facet lists only orgs that have a monorepo.
- **Option stability (the wiring backstop — see Self-Review):** select one topic, then confirm the OTHER topic options are still listed (the available option set does NOT shrink to only the selected one). If options collapse as you select, the page is wrongly deriving from the filtered result (`displayedRepos`) instead of the structural set (`monorepos`) — fix the deriver input in Task 4 Step 3.

- [ ] **Step 3: Dev-server manual smoke (Software unaffected)**

On the Software tab, confirm filters still behave as before (topics/appType/tags/org all filter; options reflect the software set).

- [ ] **Step 4: No commit unless a fix was needed**

If Steps 1-3 surfaced a bug, fix it, re-run `npm test`, and stage + provide a commit message. If all clean, report results — nothing to commit.

---

## Self-Review

**Spec coverage:**
- KIND_ACCESSORS config → Task 1. ✓
- deriveAvailableOptions (+ `{software, repos}` signature, license-drop, empty-softwareId guard, de-dup, empty/unknown kind) → Task 2 (impl + tests). ✓
- Topics work for repos via software join; lazy topics index; `software` in memo deps; accessor-routed matchers → Task 3. ✓
- ReposHome ordering inversion (structural filter before hook; old post-hook line removed; resultCountRef retained); derive from `monorepos`; BOTH drawer+sidebar; org-narrowing behavior → Task 4. ✓
- SoftwareHome thread software + derive options + both sidebar sites (repos already passed) → Task 5. ✓
- Tests: deriver (software, repo-topics, empty-softwareId, empty/unknown, de-dup), repo-topics matching (ANY-match, exclusion, empty-softwareId) → Tasks 2, 3. ✓
- Option stability: the deriver provably ignores `filters` (it never receives them), so a unit-level stability test would only assert a function doesn't use an argument it lacks. BUT the page-level stability guarantee depends on the WIRING — ReposHome/SoftwareHome must pass the STRUCTURAL candidate set (`monorepos` / full `software`) into the deriver, not the facet-filtered result. That wiring has no automated test here (pages aren't unit-tested), so its backstop is the manual smoke (Task 6 Step 2, with an explicit "options don't change as you select" check). Do NOT claim this is structurally guaranteed — it's wiring-dependent. ✓ (backstopped manually)
- Test runner (none existed) → Task 0 adds Vitest. ✓
- Bundles/classrooms out of scope (absent KIND_ACCESSORS entry → empty) → covered by Task 2's unknown-kind test. ✓

**Placeholder scan:** No TBD/TODO. Every code step shows complete code; commands are exact with expected output. ✓

**Type/name consistency:**
- `KIND_ACCESSORS` (Task 1) — imported identically in Tasks 2, 3. ✓
- `deriveAvailableOptions(items, kind, {software, repos})` — defined Task 2, called identically in Tasks 4, 5. ✓
- `applyBrowseFilters` — exported Task 3, tested Task 3. ✓
- `availableOptions` / `displayedRepos` / `filteredSoftware` — consistent within each page task. ✓
- Accessor method names (`memberApps`, `ownTopics`, `ownTags`, `ownOrg`, `orgThroughApps`) — defined Task 1, used identically Tasks 2, 3. ✓

---

## Execution Handoff

(Filled in after the user picks an execution approach.)
