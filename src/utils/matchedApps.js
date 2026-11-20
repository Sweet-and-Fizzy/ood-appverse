import { stripHtml } from './stripHtml';

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

/**
 * Build a short snippet of text around the first case-insensitive occurrence
 * of the query. Plain substring search (no regex). Whitespace runs collapse to
 * single spaces; cut sides are trimmed to word boundaries and marked with "…".
 *
 * @param {string} text - text to search
 * @param {string} query - search query
 * @param {number} [radius=60] - max characters kept before and after the match
 * @returns {{before: string, match: string, after: string}|null} parts, or null
 */
export function snippetAround(text, query, radius = 60) {
  const q = (query || '').toLowerCase().trim();
  if (typeof text !== 'string' || !text || !q) return null;

  const str = text.replace(/\s+/g, ' ').trim();
  const lower = str.toLowerCase();
  if (lower.length !== str.length || text.toLowerCase().length !== text.length) return null;

  const index = lower.indexOf(q);
  if (index === -1) return null;

  const end = index + q.length;
  let before = str.slice(Math.max(0, index - radius), index);
  let after = str.slice(end, end + radius);
  const cutBefore = index - radius > 0;
  const cutAfter = end + radius < str.length;

  if (cutBefore) {
    // Drop a partial leading word, unless there is no space to cut at.
    const space = before.indexOf(' ');
    if (space !== -1 && str[index - radius - 1] !== ' ') before = before.slice(space + 1);
    before = `…${before}`;
  }
  if (cutAfter) {
    const space = after.lastIndexOf(' ');
    if (space !== -1 && str[end + radius] !== ' ') after = after.slice(0, space);
    after = `${after}…`;
  }

  return { before, match: str.slice(index, end), after };
}

const nameContains = (obj, q) => (obj?.name || '').toLowerCase().includes(q);

const byName = (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase());

/**
 * Decode a small set of HTML entities. &amp; is decoded last so that
 * "&amp;lt;" becomes "&lt;" rather than "<".
 * @param {string} text - text with entities
 * @returns {string} decoded text
 */
function decodeEntities(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

/**
 * Explain why an item matched a search query when its title did not.
 *
 * Returns null when the query is empty, the title matches, or nothing below
 * matched. The description snippet is only included when no other reason
 * (apps, tags, topics, maintainer, organization) was found.
 *
 * @param {object} item - software or repo item
 * @param {string} query - search query
 * @param {'software'|'repo'} kind - item kind
 * @returns {{
 *   apps: Array,
 *   tags: Array<{name: string}>,
 *   topics: Array<{name: string}>,
 *   maintainer: string|null,
 *   organization: string|null,
 *   description: {before: string, match: string, after: string}|null
 * }|null} reasons, or null
 */
export function getMatchReasons(item, query, kind) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return null;
  if ((item?.title || '').toLowerCase().includes(q)) return null;

  const isRepo = kind === 'repo';
  const apps = getMatchedApps(item, query);
  const tags = isRepo
    ? []
    : (Array.isArray(item?.tags) ? item.tags : []).filter((t) => nameContains(t, q)).sort(byName);
  const topics = isRepo
    ? []
    : (Array.isArray(item?.topics) ? item.topics : []).filter((t) => nameContains(t, q)).sort(byName);
  const maintainer = isRepo && nameContains(item?.maintainer, q) ? item.maintainer.name : null;
  const organization = isRepo && nameContains(item?.organization, q) ? item.organization.name : null;

  let description = null;
  if (!apps.length && !tags.length && !topics.length && !maintainer && !organization) {
    const text = isRepo
      ? (typeof item?.description === 'string' ? item.description : '')
      : decodeEntities(stripHtml(item?.body));
    description = snippetAround(text, query);
    if (!description) return null;
  }

  return { apps, tags, topics, maintainer, organization, description };
}
