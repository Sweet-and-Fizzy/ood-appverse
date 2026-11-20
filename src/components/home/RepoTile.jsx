/**
 * RepoTile Component
 * Individual card displaying a Repo summary
 *
 * The title link is the card's main link; an ::after overlay stretches its
 * clickable area over the whole card. Match-reason links sit above the overlay
 * with `relative z-10`. Links can't be nested, so the card itself is not
 * wrapped in a <Link> (D8-3117).
 *
 * Props:
 * @param {Object} repo - Repo object from cache contract
 *   - id: string
 *   - title: string
 *   - slug: string (derived from pathauto pattern /repo/[node:title])
 *   - apps: Array (list of app references; used for count)
 *   - matchReasons: optional, set during a search (utils/matchedApps getMatchReasons)
 * @param {string} searchQuery - Current search text, used to highlight matches
 */
import { Link } from 'react-router-dom';
import { useTracking } from '../../hooks/useTracking';
import RepoIcon from '../common/RepoIcon';
import MatchReasons from './MatchReasons';
import { repoSlug } from '../../utils/slugify';

export default function RepoTile({ repo, searchQuery = '' }) {
  const track = useTracking();
  const appCount = (repo.apps || []).length;
  const slug = repoSlug(repo);
  return (
    <div
      data-testid="repo-tile"
      className="relative flex flex-col gap-4 bg-white border border-appverse-gray rounded-appverse p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col items-center text-center">
        {/* Stacked-tree icon: horizontal bars connected by a vertical trunk. */}
        <div className="mb-4 flex justify-center">
          <RepoIcon size={60} />
        </div>
        <h3 className="font-serif font-bold text-lg text-appverse-black mb-2">
          <Link
            to={`/repo/${slug}`}
            className="after:absolute after:inset-0 after:rounded-appverse"
            onClick={() => track('repo_click', {
              repo_title: repo.title,
              repo_slug: repo.slug,
              repo_id: repo.id,
            })}
          >
            {repo.title}
          </Link>
        </h3>
        <div className="flex items-center gap-1 text-sm font-sans text-appverse-black">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-appverse-blue text-white font-semibold text-xs">
            {appCount}
          </span>
          <span>apps</span>
        </div>
      </div>

      {/* Why this card matched the search (D8-3117) */}
      <MatchReasons
        reasons={repo.matchReasons}
        searchQuery={searchQuery}
        appLinkBase={`/repo/${slug}`}
        trackContext={{ repo_title: repo.title }}
        track={track}
      />
    </div>
  );
}
