/**
 * RepoTile Component
 * Individual card displaying a Repo summary
 *
 * Props:
 * @param {Object} repo - Repo object from cache contract
 *   - id: string
 *   - title: string
 *   - slug: string (derived from pathauto pattern /repo/[node:title])
 *   - apps: Array (list of app references; used for count)
 */
import { Link } from 'react-router-dom';
import { useTracking } from '../../hooks/useTracking';
import RepoIcon from '../common/RepoIcon';
import { repoSlug } from '../../utils/slugify';

export default function RepoTile({ repo }) {
  const track = useTracking();
  const appCount = (repo.apps || []).length;
  const slug = repoSlug(repo);
  return (
    <Link
      to={`/repo/${slug}`}
      onClick={() => track('repo_click', {
        repo_title: repo.title,
        repo_slug: repo.slug,
        repo_id: repo.id,
      })}
      className="block bg-white border border-appverse-gray rounded-appverse p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col items-center text-center">
        {/* Stacked-tree icon: horizontal bars connected by a vertical trunk. */}
        <div className="mb-4 flex justify-center">
          <RepoIcon size={60} />
        </div>
        <h3 className="font-serif font-bold text-lg text-appverse-black mb-2">
          {repo.title}
        </h3>
        <div className="flex items-center gap-1 text-sm font-sans text-appverse-black">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-appverse-blue text-white font-semibold text-xs">
            {appCount}
          </span>
          <span>apps</span>
        </div>
      </div>
    </Link>
  );
}
