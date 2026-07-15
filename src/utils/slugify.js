/**
 * Convert a string to a URL-friendly slug
 * @param {string} str - String to slugify (e.g., "AlphaFold", "LAMMPS")
 * @returns {string} Slug (e.g., "alphafold", "lammps")
 */
export function slugify(str) {
  if (!str) return '';

  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove non-word chars (except spaces and hyphens)
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/-+/g, '-')        // Collapse multiple hyphens
    .replace(/^-|-$/g, '');     // Remove leading/trailing hyphens
}

/**
 * Resolve a repo's URL slug, falling back to slugify(title) when the API
 * did not supply one. This MUST match repoSlugMap in AppverseDataContext so
 * that a /repo/<slug> link built here resolves via getRepoBySlug. Building a
 * link straight from repo.slug (which may be undefined) yields a dead
 * /repo/undefined link, so all repo links go through this helper.
 *
 * @param {object} repo - a repo object (with `slug` and/or `title`)
 * @returns {string|null} the slug, or null if neither slug nor title exists
 */
export function repoSlug(repo) {
  if (!repo) return null;
  if (repo.slug) return repo.slug;
  return repo.title ? slugify(repo.title) : null;
}

