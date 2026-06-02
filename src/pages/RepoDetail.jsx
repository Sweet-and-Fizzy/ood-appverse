import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Globe, Book } from 'react-bootstrap-icons';
import { useAppverseData } from '../hooks/useAppverseData';
import { useTracking } from '../hooks/useTracking';
import { useConfig } from '../contexts/ConfigContext';
import { fetchAppsByRepo } from '../utils/api';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DetailHeader from '../components/common/DetailHeader';
import RepoIcon from '../components/common/RepoIcon';
import RepoTreeList from '../components/detail/RepoTreeList';

export default function RepoDetail() {
  const { slug } = useParams();
  const { repos, loading, error, refetch, getRepoBySlug } = useAppverseData();
  const [searchParams, setSearchParams] = useSearchParams();
  const expandedAppSlug = searchParams.get('app');
  const track = useTracking();
  const config = useConfig();

  const repo = !loading ? getRepoBySlug(slug) : null;

  // Fetch apps via JSON:API so we have full README content (cache-nested apps
  // lack `readme`, so SHOW README is broken without this). Mirrors SoftwareDetail.
  const [apps, setApps] = useState([]);
  const [appsLoading, setAppsLoading] = useState(true);

  useEffect(() => {
    if (!repo?.id) return;
    setAppsLoading(true);
    fetchAppsByRepo(repo.id, config)
      .then(data => setApps(data))
      .catch(err => console.error('Failed to fetch apps for repo:', err))
      .finally(() => setAppsLoading(false));
  }, [repo?.id, config]);

  useEffect(() => {
    if (repo) {
      track('repo_view', { repo_slug: slug, repo_id: repo.id });
    }
  }, [repo, slug, track]);

  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  if (loading) return <LoadingSpinner />;
  if (!repo) {
    return (
      <div className="mx-6 mt-6">
        <p className="text-appverse-black font-sans">
          No Monorepo found with slug “{slug}”.{' '}
          <a href="#/repos" className="text-appverse-red hover:underline">Back to Monorepos</a>.
        </p>
      </div>
    );
  }

  // Prefer the freshly-fetched apps (with READMEs); fall back to cache during
  // the brief window before the JSON:API request resolves to avoid layout
  // flicker.
  const effectiveApps = apps.length ? apps : (repo.apps || []);
  const repoWithFullApps = { ...repo, apps: effectiveApps };

  // AppRow uses `isExpanded` keyed on app.id (not slug). RepoDetail
  // stores the expanded *app slug* in the URL for stable deep links;
  // resolve the slug back to an app.id when handing data to AppRow.
  const expandedApp = expandedAppSlug
    ? effectiveApps.find(a => {
        // Apps in the cache don't have a `slug` field today — fall back to
        // matching either a slug field if present or against app id.
        if (a.slug) return a.slug === expandedAppSlug;
        return a.id === expandedAppSlug || String(a.nid) === expandedAppSlug;
      })
    : null;
  const expandedAppId = expandedApp ? expandedApp.id : null;

  const handleToggleApp = (appId) => {
    const newParams = new URLSearchParams(searchParams);
    if (expandedAppId === appId) {
      newParams.delete('app');
    } else {
      // Find the toggled app to store its slug (or id as fallback) in the URL.
      const target = effectiveApps.find(a => a.id === appId);
      const key = target?.slug || target?.id || appId;
      newParams.set('app', key);
    }
    setSearchParams(newParams);
  };

  // Hardcoded for now; can become a ConfigContext key in a follow-up
  // once site operators ask to override per-deployment.
  const usingDocsUrl = 'https://openondemand.connectci.org/appverse-contributor-documentation';

  return (
    <div className="mb-4 bg-white">
      <div className="mx-6 mt-6">
        <DetailHeader
          backTo="/repos"
          backLabel="Back to Monorepos"
          usingButtonLabel="Using Monorepos"
          usingButtonUrl={usingDocsUrl}
          shareTitle={repo.title}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8">
          <aside>
            {/* Stacked-tree icon — same motif as RepoTile */}
            <div className="mb-4 flex justify-start">
              <RepoIcon size={72} />
            </div>

            <h1 className="text-3xl font-serif font-bold text-appverse-black mb-4">
              {repo.title}
            </h1>

            {/* WWW + DOCS icon-links */}
            {(repo.wwwUrl || repo.docsUrl) && (
              <div className="flex items-center gap-4 mb-4">
                {repo.wwwUrl && (
                  <a
                    href={repo.wwwUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-sans text-appverse-black hover:text-appverse-red transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>WWW</span>
                  </a>
                )}
                {repo.docsUrl && (
                  <a
                    href={repo.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-sans text-appverse-black hover:text-appverse-red transition-colors"
                  >
                    <Book className="w-4 h-4" />
                    <span>DOCS</span>
                  </a>
                )}
              </div>
            )}

            {/* Repo-level tag chips */}
            {repo.tags && repo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-2.5 py-1 text-xs font-sans text-appverse-black border border-appverse-gray rounded"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {repo.description && (
              <p className="text-base font-sans text-appverse-black mb-4">
                {repo.description}
              </p>
            )}

            {/* CONFIGURATION — shared paths */}
            {repo.sharedPaths && repo.sharedPaths.length > 0 && (
              <div className="mt-6">
                <h3 className="inline-block bg-appverse-black text-white font-sans font-bold text-sm uppercase tracking-wide px-3 py-1 mb-2">
                  Configuration
                </h3>
                <ul className="list-none p-0 m-0 text-sm font-sans text-appverse-black">
                  {repo.sharedPaths.map((path, i) => (
                    <li key={i} className="font-mono text-xs mb-1">
                      {path}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Maintainer/organization intentionally omitted — shown on Main Repo card */}
          </aside>

          <main>
            <RepoTreeList
              repo={repoWithFullApps}
              expandedAppId={expandedAppId}
              onToggleApp={handleToggleApp}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
