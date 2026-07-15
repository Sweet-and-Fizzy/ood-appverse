import AppRow from './AppRow';
import RepoMainCard from './RepoMainCard';

/**
 * RepoTreeList
 *
 * Renders the Main Repo card at the top of a Repo detail page with a
 * CSS-only tree connector descending into each member AppRow.
 *
 * AppRow expects `app`, `isExpanded`, and `onToggle`. Since `isExpanded` and
 * `onToggle` are per-row (driven by the parent's `?app=<slug>` URL state), the
 * parent should pass `expandedAppId` and `onToggleApp` here — same shape as
 * `AppList` — and we'll wire them per AppRow.
 *
 * Props:
 * @param {Object} repo - Repo with `repoUrl`, `maintainer`, and `apps`
 * @param {string} expandedAppId - ID of the currently expanded app (or null)
 * @param {Function} onToggleApp - Callback invoked with appId when an app is toggled
 */
export default function RepoTreeList({ repo, expandedAppId, onToggleApp }) {
  const apps = repo.apps || [];
  return (
    <div className="relative">
      <RepoMainCard repo={repo} />

      {apps.length > 0 && (
        <div className="ml-6 mt-0">
          {/* Vertical trunk descending from the Main Repo card */}
          <div className="w-0.5 bg-appverse-black h-4 ml-0" />

          <ul className="m-0 p-0 list-none">
            {apps.map((app, i) => (
              <li key={app.id} className="relative pl-6">
                {/* Branch line: vertical trunk continuing through unless this
                    is the last item, plus a horizontal stub into the row. */}
                <div
                  className="absolute left-0 top-0 w-0.5 bg-appverse-black"
                  style={{ height: i === apps.length - 1 ? '1.5rem' : '100%' }}
                />
                <div className="absolute left-0 top-6 h-0.5 w-6 bg-appverse-black" />
                <div className="pt-3">
                  <AppRow
                    app={app}
                    isExpanded={expandedAppId === app.id}
                    onToggle={() => onToggleApp && onToggleApp(app.id)}
                    hideRepoLevel
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
