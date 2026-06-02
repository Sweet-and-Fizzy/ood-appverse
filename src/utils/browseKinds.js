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
