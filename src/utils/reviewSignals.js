/**
 * Review signals on the app card.
 *
 * The catalog cache carries each app's published review as enum keys
 * (solid / some_notes / needs_attention) with one-line summaries and links;
 * this module is the one place those keys become words and colours. Pure
 * functions, no DOM, so the rules are testable and a relabel is one edit.
 */

/** What people read. Low = the good end; High = most to read before deploying. */
export const LEVEL_LABELS = {
  solid: 'Low',
  some_notes: 'Medium',
  needs_attention: 'High',
};

/** Colour tone per level: reuses the site's green/red, amber is the addition. */
export const LEVEL_TONES = {
  solid: 'good',
  some_notes: 'note',
  needs_attention: 'attention',
};

/** The four axes, in the fixed order every card shares. */
export const AXES = [
  { key: 'security', axis: 'Security' },
  { key: 'portability', axis: 'Portability' },
  { key: 'documentation', axis: 'Docs' },
  { key: 'upkeep', axis: 'Upkeep' },
];

export function levelLabel(level) {
  return LEVEL_LABELS[level] ?? null;
}

export function levelTone(level) {
  return LEVEL_TONES[level] ?? 'none';
}

/**
 * The strip's cells for a review object from the cache, or [] without one.
 * An axis with no level still gets a cell (marked 'none') so the four stay
 * in their positions down a stack of cards.
 */
export function stripCells(review) {
  if (!review || typeof review !== 'object') {
    return [];
  }
  return AXES.map(({ key, axis }) => {
    const entry = review[key] ?? {};
    return {
      key,
      axis,
      level: entry.level ?? null,
      label: levelLabel(entry.level),
      tone: levelTone(entry.level),
      summary: entry.summary ?? '',
      anchor: entry.anchor ?? '',
    };
  });
}

/** The out-of-date marker text, or null when the review still matches the repo. */
export function outOfDateText(review) {
  if (!review || !review.outOfDate) {
    return null;
  }
  return review.sha7 ? `Reviewed at ${review.sha7}; the repo has changed since` : 'The repo has changed since this review';
}
