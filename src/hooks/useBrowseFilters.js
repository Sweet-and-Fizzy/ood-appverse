import { useMemo } from 'react';
import { KIND_ACCESSORS } from '../utils/browseKinds';

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

function itemMatchesTopics(item, topicNames, kind, topicsBySoftwareId = {}) {
  const accessors = KIND_ACCESSORS[kind];
  if (!accessors) return false;
  if (accessors.ownTopics(item).some(t => topicNames.includes(t.name))) {
    return true;
  }
  return accessors.memberApps(item).some(app => {
    if (!app.softwareId) return false;
    const swTopics = topicsBySoftwareId[app.softwareId] || [];
    return swTopics.some(t => topicNames.includes(t.name));
  });
}

function itemMatchesAppType(item, appTypeNames, kind) {
  const accessors = KIND_ACCESSORS[kind];
  if (!accessors) return false;
  return accessors.memberApps(item).some(app =>
    (app.appTypes || []).some(t => appTypeNames.includes(t.name))
  );
}

function itemMatchesTags(item, tagNames, kind) {
  // AND logic across selected tags (matches the existing useSoftwareSearch
  // behavior). Every selected tag must appear somewhere in the item's tag
  // repo.
  const allTagNames = collectAllTagNames(item, kind);
  return tagNames.every(name => allTagNames.has(name));
}

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

function itemMatchesOrganization(item, orgNames, kind, repoOrgByRepoId = {}) {
  const accessors = KIND_ACCESSORS[kind];
  if (!accessors) return false;
  if (!accessors.orgThroughApps) {
    const own = accessors.ownOrg(item);
    return !!own && orgNames.includes(own.name);
  }
  return accessors.memberApps(item).some(app => {
    if (app.repoId && repoOrgByRepoId[app.repoId] && orgNames.includes(repoOrgByRepoId[app.repoId])) {
      return true;
    }
    return app.organization && orgNames.includes(app.organization.name);
  });
}

function stripHtml(html) {
  if (typeof html !== 'string') return '';
  // Strip tags. Defensive — html may be empty/null.
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
