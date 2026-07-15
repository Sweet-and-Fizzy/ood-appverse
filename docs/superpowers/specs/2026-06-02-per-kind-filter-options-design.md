# Per-Kind Filter Options + Working Topics for Monorepos — Design

**Date:** 2026-06-02
**Status:** Approved, ready for implementation planning
**Scope:** React widget only (`/Users/drew/Sites/connectci/ood-appverse`). No Drupal/cache changes.

## Problem

The browse pages (Software, Monorepos, and future Bundles/Classrooms) share one global
`filterOptions` object and one `FilterSidebar` that renders the same facets regardless of
which entity kind the page lists. Two concrete defects on the Monorepos page (`ReposHome`,
`kind === 'repo'`):

1. **Dead Topics filter.** `FilterSidebar` renders a Topics facet (because the global
   `filterOptions.topics` is populated from software), but `useBrowseFilters`'
   `itemMatchesTopics` returns `false` for `kind === 'repo'`. A user can select a Topic and
   always gets zero results.
2. **Unreachable option values.** Even for facets that do work for repos (App Type, Tags,
   Organization), the displayed option *values* come from the global set, so the sidebar can
   offer values that match zero displayed monorepos (e.g. an Organization that only single-app
   repos have — and those are hidden by the `app_count > 1` monorepo filter).

User intent (verbatim): *"we would prefer all the filters to work (including topics) but only
to display options that actually filter."*

## Goal

On every browse page: (a) every filter facet shown actually filters the listed entity, and
(b) every option value shown matches at least one currently-displayed item. Fix this for
`software` and `repo` now, and structure the code so `bundle` and `classroom` slot in later
as configuration rather than new logic.

## Key facts established during exploration

- A monorepo's member apps carry `softwareId`; the cache's `software[]` (85 entries, 80 with
  topics) lets us map `softwareId → [topic names]`. So **Topics for repos is resolvable
  client-side** via the repo → app → software → topics join. The old "not yet resolvable
  without a join" comment in `useBrowseFilters` is stale.
- A container entity (repo, and later bundle/classroom) has no topics/appType/tags of its
  own — those are reached *through* its member apps. Organization is the container's own
  field for repos.
- Bundles and Classrooms are **placeholders** (`BundlesPlaceholder.jsx`,
  `ClassroomsPlaceholder.jsx`); there is **no `bundles` key in the cache yet** and a bundle
  member is cached as `member.cached.appTitle` only — not rich enough for attribute filtering.
  So they cannot be implemented or tested now.

## Filter semantics (decided)

Two distinct axes — keep them separate to avoid the ANY-vs-AND confusion:

- **Member-reachability (Topics / App Type, and per-value for Tags):** a container's
  attribute is the **union** over its member apps. A container *has* attribute value V if
  **any** member app qualifies for V (e.g. a monorepo "has" Topic "data science" if any
  member app's software has that topic). This is the "containers that include X" reading and
  matches the existing repo appType behavior.

- **Multi-select combination (across selected values within one facet):**
  - **Topics, App Type, Organization:** a single selected value matches via member-
    reachability above. (Multiple selected values OR together implicitly — matching the
    existing per-facet behavior; not changed here.)
  - **Tags:** **AND across selected tag values** (unchanged from today's `itemMatchesTags`).
    Every selected tag must be present in the container's *collected* tag set, where that
    collected set is the **union** of all member apps' tags. So "member-reachability builds
    the set (ANY app contributes), then AND requires all selected tags to be in that set."
    No behavior change for Tags — it's only re-routed through the accessor.

## Architecture

### 1. Per-kind accessor config — `src/utils/browseKinds.js` (new)

A single source of truth describing how to reach each kind's filterable data. Both the
option-deriver and the matchers read through this instead of `if (kind === ...)` ladders
(consolidating the existing copy-pasted branches in `useBrowseFilters`).

```js
export const KIND_ACCESSORS = {
  software: {
    memberApps: (item) => item.apps || [],
    ownTopics:  (item) => item.topics || [],
    ownTags:    (item) => item.tags || [],
    ownOrg:     () => null,
    // Software matches Organization through its apps' parent repo (existing behavior).
    orgThroughApps: true,
  },
  repo: {
    memberApps: (item) => item.apps || [],
    ownTopics:  () => [],
    ownTags:    () => [],
    ownOrg:     (item) => item.organization || null,
    orgThroughApps: false,
  },
  // bundle, classroom: add an entry here when their cache data + member-app
  // attributes exist. No new matching/derive logic will be required — only a
  // memberApps/ownOrg accessor. Until then they are absent and fall through to
  // empty results (documented stubs).
};
```

Topics for ANY kind = the union of `memberApps(item)`' parent-software topics (via the
`softwareId → topics` index), PLUS `ownTopics(item)` (software's own topics). For repos
`ownTopics` is empty, so repo topics come entirely from the member-app→software join.

### 2. Option deriver — `src/utils/deriveFilterOptions.js` (new, pure)

```
deriveAvailableOptions(items, kind, { software, repos }) → { topics, appType, tags, organizations }
```

Note the signature takes **both** `software` (for the topics index) AND `repos` (for software-
kind Organization options — software's org values live on repos via the app→repo join, so the
deriver must use the SAME org source as the matcher; deriving software org from `app.organization`
alone would diverge and reintroduce the "option yields zero results" bug). For repo kind, org
options come from each repo's own `organization`.

Walks the **candidate** `items` (see §4 — the structural set, NOT the facet-filtered result)
via `KIND_ACCESSORS[kind]` and the `softwareId → topics` index built from `software`, collecting
only the option values reachable from those items. Returns the same shape `FilterSidebar` already
consumes (`{ topics, appType, tags, organizations }`, each an array of `{ id, name }`). Facets
with zero reachable values yield empty arrays; `FilterSidebar` already hides empty facets
(`filterOptions.x?.length > 0`), so no sidebar structural change is needed. If `kind` has no
accessor entry (bundle/classroom today), returns all-empty (sidebar shows nothing — correct for
an unbuilt kind; verified the sidebar renders nothing when every facet array is empty).

**License is intentionally NOT derived.** The cache's `extractFilterOptions` emits `licenses`,
but `FilterSidebar` renders no license section today, so the deriver returns only the four
facets the sidebar uses. This is not a regression — license was never a rendered facet.

De-duplication is by option `id`. Sorting matches the cache's existing alpha sort.

**Empty `softwareId` guard:** when joining member apps to software topics, skip apps whose
`softwareId` is falsy (`''`/null). Repo-only apps can carry `softwareId === ''` (the cache
builds them via `buildAppData($node, '')`), and an empty key must not resolve into a bogus
topics bucket. (In the current data snapshot 0/79 repo apps have empty `softwareId`, but the
guard is correct defensive code for when they do.)

### 3. Matcher rewrite — `src/hooks/useBrowseFilters.js`

- Add a `software` param (default `[]`) alongside the existing `repos` param.
- Build a `softwareTopicsBySoftwareId` index **lazily, inside the `if (filters.topics?.length)`
  branch** — mirroring the existing `repoOrgByRepoId`, which is built inside the
  `if (filters.organizations?.length)` branch (verified), NOT unconditionally. This avoids
  paying for the index on every filter pass when topics isn't active. The topic match must skip
  member apps with a falsy `softwareId` (same guard as the deriver §2) so a software-less app
  can't resolve a bogus topic.
- **Add `software` to the hook's `useMemo` dependency array.** It's currently
  `[items, kind, searchQuery, filters, repos]`; it must become
  `[items, kind, searchQuery, filters, repos, software]`. Missing this silently breaks topic
  matching when `software` changes (e.g. data reload) — explicit checklist item.
- Rewrite `itemMatchesTopics`, `itemMatchesAppType`, `collectAllTagNames`, and
  `itemMatchesOrganization` to read member apps via `KIND_ACCESSORS[kind].memberApps` and
  topics via the index. **Result:** repo topics now match (ANY member app's software has the
  topic). appType/tags repo behavior is unchanged in outcome but now routed through the
  accessor. Organization: repo uses `ownOrg`; software uses the `orgThroughApps` repo-join
  with app-org fallback (existing behavior preserved).
- Bundle/classroom: no accessor entry → matchers return empty (documented).
- `matchesSearch` is left as-is (its per-kind haystack is search, not facet filtering, and is
  out of scope).

### 4. Pages — `ReposHome.jsx`, `SoftwareHome.jsx`

**Candidate set for deriving options (resolves the ordering question):** options are derived
from each page's **structural candidate set — BEFORE search and BEFORE facet filters** — so
the set of available options is stable as the user types and selects. Concretely:
- ReposHome derives from `monorepos` (= `repos.filter(r => r.apps.length > 1)`), NOT from the
  search-or-facet-filtered result.
- SoftwareHome derives from the full `software` list.

Consequence (call out, accepted): because options ignore the active search/facets, an option
can occasionally yield zero rows when *combined* with an active search or another facet. This
is the deliberate trade for "filters don't vanish as you use them." (We derive from the
structural set, not even post-search, to keep facets fully stable.)

**REQUIRED REFACTOR — invert ReposHome's filter ordering (plan step, easy to half-do).** Today
ReposHome runs the hook on the FULL repo list, then post-filters:
```js
const filteredRepos = useBrowseFilters(repos, { kind: 'repo', ... });   // current
const monorepos = filteredRepos.filter(r => (r.apps?.length ?? 0) > 1); // current: AFTER hook
```
The new design **inverts** this: the `app_count > 1` structural filter must run **before** the
hook, so `monorepos` is the candidate input to BOTH the deriver and the hook:
```js
const monorepos = repos.filter(r => (r.apps?.length ?? 0) > 1);          // new: BEFORE hook
const availableOptions = useMemo(() => deriveAvailableOptions(monorepos, 'repo', { software, repos }), [monorepos, software, repos]);
const displayed = useBrowseFilters(monorepos, { kind: 'repo', searchQuery, filters, repos, software });
```
The plan must explicitly REMOVE the old post-hook `monorepos = filteredRepos.filter(...)` line —
if the structural filter stays after the hook, single-app repos leak into matching/derivation.
(Keep the `resultCountRef.current = monorepos.length` analytics, now pointing at the displayed
result.)

**Behavior change to note — repo Organization options narrow.** Because the repo-kind candidate
set is `monorepos` only, the Organization facet on the Monorepos page shows ONLY orgs that have
a monorepo (not the global org list). This is the intended "no zero-result options" goal, but
it's a visible change from today's global list — fewer org options appear. Intended; documented.

Wiring:
- Call `deriveAvailableOptions(candidates, kind, { software, repos })` and pass the result to
  the page's filter UI as `filterOptions` instead of the global object from context. **Both
  the `FilterSidebar` AND the `FilterDrawer`** receive it (ReposHome passes `filterOptions` to
  both — line ~159 drawer, ~169 sidebar; SoftwareHome likewise passes it in two places). Easy
  to miss — swap every call site.
- Wrap the derive call in `useMemo` keyed on `(candidates, kind, software, repos)` — deriving
  over 85 software × their apps on every render is avoidable; the inputs are static after load.
- `useBrowseFilters` call:
  - **ReposHome:** add both `repos` and `software`. (ReposHome currently destructures only
    `repos` from `useAppverseData`; it must also destructure `software`.)
  - **SoftwareHome:** add `software`. (SoftwareHome **already passes `repos`** to the hook —
    verified — so the software org-through-repo join is already active today; this is NOT a
    behavior change for software org. Only `software` is newly threaded, for the topics index.)

## Data flow

```
useAppverseData() ──► page gets repos[], software[]
       │
       ▼
candidates = structural set (ReposHome: repos.filter(apps>1); SoftwareHome: all software)
       │
       ├─► useMemo: deriveAvailableOptions(candidates, kind, {software, repos})
       │             └─► FilterSidebar + FilterDrawer (show only reachable options)
       │
       └─► useBrowseFilters(candidates, {kind, searchQuery, filters, repos, software})
                 │ (matchers read KIND_ACCESSORS + softwareId→topics index)
                 ▼
            displayed grid
```

Note the deriver receives the **structural candidates** (pre-search, pre-facet) so the option
set is stable; the matcher receives the same candidates plus the active search/filters.

## Testing

- **`deriveFilterOptions.test.js`** (unit, pure):
  - software-kind options (topics/tags from software + apps, appType from apps);
  - **software org options come from the repo join** — derived org list includes repo
    organizations (via `repos`), and matches what the matcher would accept;
  - repo-kind options including the topics-via-software-join;
  - **empty-`softwareId` guard** — a repo whose member apps all have `softwareId === ''`
    contributes NO topics (and matches no topic);
  - empty input → all-empty; unknown kind (e.g. `'bundle'`) → all-empty; de-dup by id.
- **`useBrowseFilters` repo-topics test**: a repo whose member app's software has topic T is
  returned when topic T is selected; a repo with no such app is not; ANY-match (one of two
  apps qualifying still matches).
- **Option stability test** (the §4 guarantee): given a candidate set, the derived option
  list for a facet does not change when a different facet is actively selected — i.e. picking
  one topic does not remove the other topics from the available set. (Derive depends only on
  candidates, not on `filters`, so this is structurally guaranteed; the test pins it.)
- **Manual / smoke:** Monorepos page Topics facet shows only the example monorepo's apps'
  software-topics (e.g. "data science", "computer science", "statistics"); selecting one
  returns that monorepo; no facet offers a value that yields zero results (absent search).

## Out of scope (YAGNI)

- Bundle and Classroom filtering. No cache data exists for them; their member-app attribute
  shape isn't finalized. They are accommodated structurally (add a `KIND_ACCESSORS` entry +
  ensure the cache exposes member-app attributes) but NOT implemented or tested now.
- Any Drupal / `AppverseCacheService` / cache-format change. The cache already carries every
  field this needs (`software[].topics`, app `softwareId`, repo `organization`).
- `matchesSearch` behavior.
- The global `filterOptions` in the cache stays as-is (still emitted; simply no longer the
  source for the sidebar's displayed options — it can remain as a fallback/reference).

## Files

| File | Change |
|------|--------|
| `src/utils/browseKinds.js` | Create — `KIND_ACCESSORS` config |
| `src/utils/deriveFilterOptions.js` | Create — `deriveAvailableOptions()` |
| `src/hooks/useBrowseFilters.js` | Modify — accessor-based matchers + `software` param + topics index |
| `src/pages/ReposHome.jsx` | Modify — derive options from `monorepos`, pass `software` to hook |
| `src/pages/SoftwareHome.jsx` | Modify — derive options from software list, pass `software` to hook |
| `src/utils/deriveFilterOptions.test.js` | Create — unit tests |
| (test for repo-topics in useBrowseFilters) | Create/extend |
