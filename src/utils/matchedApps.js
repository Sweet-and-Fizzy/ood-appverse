/**
 * Helpers for showing which apps of a software item matched a search query
 * (by app title or app tag) when the software item itself did not match by title.
 */

/**
 * Find the apps of a software item that match a search query.
 *
 * Returns [] when the query is empty or when the software title itself
 * matches (no "matching apps" section is needed in that case). Title matches
 * are listed before tag matches; each group is alphabetical by app title.
 *
 * @param {object} item - software item ({ title, apps: [{ id, title, tags: [{ name }] }] })
 * @param {string} query - search query
 * @returns {Array<{app: object, matchType: 'title'|'tag', tag?: object}>} matches
 */
export function getMatchedApps(item, query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return [];
  if ((item?.title || '').toLowerCase().includes(q)) return [];

  const apps = Array.isArray(item?.apps) ? item.apps : [];
  const titleMatches = [];
  const tagMatches = [];

  for (const app of apps) {
    if (!app) continue;
    if ((app.title || '').toLowerCase().includes(q)) {
      titleMatches.push({ app, matchType: 'title' });
      continue;
    }
    const tags = (Array.isArray(app.tags) ? app.tags : [])
      .filter((t) => (t?.name || '').toLowerCase().includes(q))
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    if (tags.length > 0) {
      tagMatches.push({ app, matchType: 'tag', tag: tags[0] });
    }
  }

  const byTitle = (a, b) =>
    (a.app.title || '').toLowerCase().localeCompare((b.app.title || '').toLowerCase());
  titleMatches.sort(byTitle);
  tagMatches.sort(byTitle);

  return [...titleMatches, ...tagMatches];
}

/**
 * Split text around the first case-insensitive occurrence of the query,
 * preserving the original casing. Plain substring search (no regex).
 *
 * @param {string} text - text to split
 * @param {string} query - search query
 * @returns {{before: string, match: string, after: string}} the parts
 */
export function splitOnMatch(text, query) {
  const str = text || '';
  const q = (query || '').toLowerCase().trim();
  if (!q) return { before: str, match: '', after: '' };

  // A few characters (e.g. "İ") change length when lowercased, which would
  // misalign the slice indexes below. Skip the highlight for those strings.
  const lower = str.toLowerCase();
  if (lower.length !== str.length) return { before: str, match: '', after: '' };

  const index = lower.indexOf(q);
  if (index === -1) return { before: str, match: '', after: '' };

  return {
    before: str.slice(0, index),
    match: str.slice(index, index + q.length),
    after: str.slice(index + q.length),
  };
}

/**
 * Label for the matching apps section.
 * @param {number} count - number of matching apps
 * @returns {string} "Matching app" or "Matching apps"
 */
export function matchedAppsLabel(count) {
  return count === 1 ? 'Matching app' : 'Matching apps';
}

/**
 * Limit the matches that are shown and count the remainder.
 * @param {Array} matches - matches from getMatchedApps
 * @param {number} [limit=3] - maximum matches to show
 * @returns {{shown: Array, moreCount: number}} visible matches and hidden count
 */
export function visibleMatches(matches, limit = 3) {
  const list = Array.isArray(matches) ? matches : [];
  return {
    shown: list.slice(0, limit),
    moreCount: Math.max(0, list.length - limit),
  };
}
