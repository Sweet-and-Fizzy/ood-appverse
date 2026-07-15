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
    for (const t of accessors.ownTopics(item)) add(topics, t);
    for (const t of accessors.ownTags(item)) add(tags, t);

    for (const app of accessors.memberApps(item)) {
      const sid = app.softwareId;
      if (sid) {
        for (const t of (topicsBySoftwareId[sid] || [])) add(topics, t);
      }
      for (const t of (app.appTypes || [])) add(appType, t);
      for (const t of (app.tags || [])) add(tags, t);
    }

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
