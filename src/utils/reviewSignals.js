/**
 * Public review signals for an app card.
 *
 * The portal's catalog cache carries a `review` object per app (built by
 * ReviewSignals::shape in ood_software). Levels arrive as stored enum keys;
 * the words viewers see are chosen here, per axis, so each axis reads in its
 * own terms rather than as a shared grade.
 */

// Stored level → fill of the state dot. The fill repeats the colour so the
// state survives colour-vision deficiency and greyscale.
const FILLS = {
  solid: 'full',
  some_notes: 'half',
  needs_attention: 'empty',
};

const AXES = {
  upkeep: {
    name: 'Upkeep',
    labels: { solid: 'Well maintained', some_notes: 'Active', needs_attention: 'Inactive' },
  },
  documentation: {
    name: 'Documentation',
    labels: { solid: 'Complete', some_notes: 'Adequate', needs_attention: 'Minimal' },
  },
  portability: {
    name: 'Portability',
    labels: { solid: 'Portable', some_notes: 'Needs site config', needs_attention: 'Site-specific' },
  },
};

/**
 * The chip for a levelled axis, or null when the level is missing or unknown.
 */
export function axisChip(axis, signal) {
  const spec = AXES[axis];
  const level = signal?.level;
  if (!spec || !FILLS[level]) return null;
  return {
    axis,
    name: spec.name,
    label: spec.labels[level],
    fill: FILLS[level],
    summary: signal.summary || '',
    href: signal.anchor || '',
  };
}

/**
 * The security chip: a count of findings to review, never a level.
 */
export function securityChip(signal) {
  // A count that isn't a whole number must not read as "No findings".
  const count = signal?.count;
  if (!Number.isInteger(count) || count < 0) return null;
  let label = 'No findings';
  if (count === 1) label = '1 finding to review';
  else if (count > 1) label = `${count} findings to review`;
  return { axis: 'security', name: 'Security', label, href: signal.anchor || '' };
}

/**
 * App UUID → review, from the cache's software-nested and repo-nested apps.
 * Detail pages render apps fetched from JSON:API, which has no review, so
 * they look the review up here.
 */
export function reviewsByAppId(appsBySoftwareId, repos) {
  const index = new Map();
  const add = (app) => {
    if (app?.id && app.review) index.set(app.id, app.review);
  };
  Object.values(appsBySoftwareId || {}).forEach((apps) => (apps || []).forEach(add));
  (repos || []).forEach((repo) => (repo.apps || []).forEach(add));
  return index;
}

/**
 * Review links are site-relative; the widget may be served from elsewhere.
 * Only a site path or an https URL becomes a link: a protocol-relative
 * '//host' or any other scheme is dropped.
 */
export function reviewLink(href, siteBaseUrl = '') {
  if (typeof href !== 'string') return '';
  if (href.startsWith('/') && !href.startsWith('//')) return `${siteBaseUrl}${href}`;
  return href.startsWith('https://') ? href : '';
}
