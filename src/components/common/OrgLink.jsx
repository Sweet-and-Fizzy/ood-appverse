/**
 * OrgLink — renders an organization name as a Link that applies the
 * Organization filter, preserving the user's current browse tab.
 *
 * If the user is on /collections, clicking the org name stays on
 * /collections with ?organizations=<name> applied. Same for /bundles
 * (future) and /. The pathname is preserved; only the query is rewritten.
 */
import { Link, useLocation } from 'react-router-dom';

// Browse-view paths that honor the organizations filter via useBrowseFilters.
// Detail pages (e.g., /collection/<slug>) and placeholder tabs aren't filter
// surfaces; clicking an org from those should route to the most relevant
// browse view rather than apply a filter to a detail page.
const BROWSE_PATHS = new Set(['/', '/collections', '/bundles']);

function resolveTargetPath(pathname) {
  if (BROWSE_PATHS.has(pathname)) {
    return pathname;
  }
  // From a detail page or placeholder, route to the matching browse view
  // when we can infer one; otherwise fall back to the Software home.
  if (pathname.startsWith('/collection/')) return '/collections';
  if (pathname.startsWith('/bundle/')) return '/bundles';
  return '/';
}

export default function OrgLink({ name, className = '' }) {
  const { pathname } = useLocation();
  const targetPath = resolveTargetPath(pathname);
  const to = `${targetPath}?organizations=${encodeURIComponent(name)}`;
  return (
    <Link
      to={to}
      className={`hover:text-appverse-red transition-colors ${className}`.trim()}
    >
      {name}
    </Link>
  );
}
