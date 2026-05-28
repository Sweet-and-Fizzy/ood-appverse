import { useMemo } from 'react';

/**
 * Apply search + filters to a list of items (software, repos, or bundles).
 *
 * @param {Array} items - The list to filter.
 * @param {Object} options
 * @param {'software'|'repo'|'bundle'} options.kind - Determines per-kind matching rules.
 * @param {string} options.searchQuery - Free-text search.
 * @param {Object} options.filters - { topics, appType, tags, organizations }, each an array of names.
 * @param {Array} [options.repos] - Optional repos list. Used by the
 *   software-kind organization filter to join through app.repoId so a
 *   software item matches when any of its apps' parent Repo carries the
 *   selected organization (per spec §4 — Repos are the authoritative
 *   org-bearer once they exist).
 * @returns {Array} Filtered, alphabetically sorted items.
 */
export function useBrowseFilters(items, { kind, searchQuery, filters, repos = [] }) {
  return useMemo(() => {
    if (!items || items.length === 0) return [];
    let working = [...items];

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      working = working.filter(item => matchesSearch(item, q, kind));
    }

    if (filters.topics?.length) {
      working = working.filter(item => itemMatchesTopics(item, filters.topics, kind));
    }
    if (filters.appType?.length) {
      working = working.filter(item => itemMatchesAppType(item, filters.appType, kind));
    }
    if (filters.tags?.length) {
      working = working.filter(item => itemMatchesTags(item, filters.tags, kind));
    }
    if (filters.organizations?.length) {
      // Build a one-shot index of repoId → organization.name so the
      // software-kind matcher can join through app.repoId without
      // doing a linear scan of `repos` for every app.
      const repoOrgByRepoId = {};
      for (const c of repos) {
        if (c?.id && c.organization?.name) {
          repoOrgByRepoId[c.id] = c.organization.name;
        }
      }
      working = working.filter(item =>
        itemMatchesOrganization(item, filters.organizations, kind, repoOrgByRepoId)
      );
    }

    working.sort((a, b) => (a.title || '').toLowerCase().localeCompare((b.title || '').toLowerCase()));
    return working;
  }, [items, kind, searchQuery, filters, repos]);
}

function matchesSearch(item, q, kind) {
  const haystack = [];
  haystack.push(item.title || '');
  // Software items have `body` (HTML); repo/bundle items have `description` (plain).
  // Read whichever exists; strip HTML defensively from body content.
  if (item.body) {
    haystack.push(stripHtml(item.body));
  }
  if (item.description) {
    haystack.push(item.description);
  }
  if (kind === 'software') {
    // Software-level topics + tags belong in the search haystack too —
    // the old useSoftwareSearch matched on these, so dropping them would
    // regress the ability to find software by typing a topic or a
    // software-only tag.
    for (const t of (item.topics || [])) haystack.push(t.name);
    for (const t of (item.tags || [])) haystack.push(t.name);
    for (const app of (item.apps || [])) {
      haystack.push(app.title || '');
      for (const t of (app.tags || [])) haystack.push(t.name);
    }
  }
  if (kind === 'repo') {
    haystack.push(item.maintainer?.name || '');
    haystack.push(item.organization?.name || '');
    for (const app of (item.apps || [])) {
      haystack.push(app.title || '');
      for (const t of (app.tags || [])) haystack.push(t.name);
    }
  }
  if (kind === 'bundle') {
    haystack.push(item.curator?.name || '');
    haystack.push(item.organization?.name || '');
    for (const m of (item.members || [])) {
      haystack.push(m.cached?.appTitle || '');
    }
  }
  return haystack.some(s => s.toLowerCase().includes(q));
}

function itemMatchesTopics(item, topicNames, kind) {
  // Topics live on Software at the catalog level. Repos and Bundles do
  // not carry their own Topics in this spec — they match through their member
  // apps' parent Software (not yet resolvable client-side without a join).
  // For phase 1, Topics filter is software-only; Repos/Bundles return
  // false (empty result) when Topics is the active filter. Documented in the
  // spec at §2 cross-cutting decisions.
  if (kind === 'software') {
    return (item.topics || []).some(t => topicNames.includes(t.name));
  }
  return false;
}

function itemMatchesAppType(item, appTypeNames, kind) {
  if (kind === 'software') {
    const apps = item.apps || [];
    return apps.some(app => (app.appTypes || []).some(t => appTypeNames.includes(t.name)));
  }
  if (kind === 'repo') {
    const apps = item.apps || [];
    return apps.some(app => (app.appTypes || []).some(t => appTypeNames.includes(t.name)));
  }
  if (kind === 'bundle') {
    // Bundles' cached member data doesn't include app type — bundle filter is
    // a phase 2 concern, not enforced here.
    return false;
  }
  return false;
}

function itemMatchesTags(item, tagNames, kind) {
  // AND logic across selected tags (matches the existing useSoftwareSearch
  // behavior). Every selected tag must appear somewhere in the item's tag
  // repo.
  const allTagNames = collectAllTagNames(item, kind);
  return tagNames.every(name => allTagNames.has(name));
}

function collectAllTagNames(item, kind) {
  const tags = new Set();
  if (kind === 'software') {
    for (const t of (item.tags || [])) tags.add(t.name);
    for (const app of (item.apps || [])) {
      for (const t of (app.tags || [])) tags.add(t.name);
    }
  }
  if (kind === 'repo') {
    // Repos don't carry their own tags; collect from member apps.
    for (const app of (item.apps || [])) {
      for (const t of (app.tags || [])) tags.add(t.name);
    }
  }
  // Bundles: cached fields don't include tags; tag-filter on Bundles in
  // phase 1 returns empty.
  return tags;
}

function itemMatchesOrganization(item, orgNames, kind, repoOrgByRepoId = {}) {
  if (kind === 'repo') {
    return !!item.organization && orgNames.includes(item.organization.name);
  }
  if (kind === 'bundle') {
    return !!item.organization && orgNames.includes(item.organization.name);
  }
  if (kind === 'software') {
    // A software matches if any of its apps' parent Repo has the
    // selected org. Per spec §4, Repos are the authoritative
    // org-bearer once they exist — so the join is repoId → the
    // Repo's organization. App-level organization is a fallback
    // for apps that don't yet have a Repo set (e.g., pre-backfill
    // legacy data).
    return (item.apps || []).some(app => {
      // Primary: join through parent Repo.
      if (app.repoId && repoOrgByRepoId[app.repoId]) {
        if (orgNames.includes(repoOrgByRepoId[app.repoId])) {
          return true;
        }
      }
      // Fallback: app's own organization field (legacy or sync-set).
      return app.organization && orgNames.includes(app.organization.name);
    });
  }
  return false;
}

function stripHtml(html) {
  if (typeof html !== 'string') return '';
  // Strip tags. Defensive — html may be empty/null.
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
