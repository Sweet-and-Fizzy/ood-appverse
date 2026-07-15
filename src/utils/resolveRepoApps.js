/**
 * Decide which app list RepoDetail should render, and whether to show an error.
 *
 * The JSON:API fetch (filter[status]=1) is the authoritative, published-only,
 * README-bearing source. The cache-nested repo.apps may include unpublished
 * apps and lack `readme`, so they are only acceptable as a brief anti-flicker
 * placeholder DURING the initial fetch — never as a fallback after the fetch
 * has completed or failed. Falling back to cache on failure would silently
 * display unpublished apps with broken READMEs and no error (the bug this
 * replaces). Mirrors SoftwareDetail's error handling.
 *
 * @param {object} args
 * @param {Array} args.apps - apps from the JSON:API fetch (published-only)
 * @param {boolean} args.appsLoading - fetch in flight
 * @param {Error|null} args.appsError - fetch failure, if any
 * @param {Array} [args.cacheApps] - cache-nested repo.apps (anti-flicker only)
 * @returns {{ apps: Array, showError: boolean, error: (Error|null) }}
 */
export function resolveRepoApps({ apps, appsLoading, appsError, cacheApps }) {
  if (appsError) {
    // Fetch failed: surface the error, do NOT leak stale/unpublished cache apps.
    return { apps: [], showError: true, error: appsError };
  }
  if (appsLoading) {
    // Initial load: cache apps as an anti-flicker placeholder.
    return { apps: cacheApps || [], showError: false, error: null };
  }
  // Fetch succeeded (possibly with zero published apps): show exactly what it
  // returned, never the cache.
  return { apps: apps || [], showError: false, error: null };
}
