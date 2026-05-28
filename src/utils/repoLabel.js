/**
 * Per the Collection→Repo rename plan: UI labels switch on app count.
 *
 *   - 1 or fewer apps → "Repo"
 *   - 2 or more apps  → "Monorepo"
 *
 * Shape (declared/inferred) tracks provenance and does NOT drive the label —
 * a 1-app declared repo is still labeled "Repo." Email subjects do NOT use
 * this rule (locked static-subject policy in the rename plan).
 *
 * Use the generic plural "Repos" for tabs and list-of-many contexts.
 *
 * @param {object} repo - a repo object from the cache (with `apps` array or `app_count`)
 * @returns {'Repo' | 'Monorepo'}
 */
export function repoLabel(repo) {
  if (!repo) return 'Repo';
  const count = Array.isArray(repo.apps) ? repo.apps.length : (repo.app_count ?? 1);
  return count > 1 ? 'Monorepo' : 'Repo';
}
