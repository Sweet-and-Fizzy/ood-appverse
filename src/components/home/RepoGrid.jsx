/**
 * RepoGrid Component
 * Displays a grid of Repo tiles with skeleton loading and empty state.
 *
 * Props:
 * @param {Array} repos - Array of Repo items to display
 * @param {boolean} loading - Whether data is still loading
 */
import RepoTile from './RepoTile';
import SkeletonTile from './SkeletonTile';

export default function RepoGrid({ repos, loading }) {
  if (loading) {
    return (
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(199px, 1fr))' }}>
        {Array.from({ length: 10 }).map((_, i) => <SkeletonTile key={i} />)}
      </div>
    );
  }
  if (!repos || repos.length === 0) {
    return (
      <div className="text-center py-12 text-appverse-black font-sans">
        No repos match your filters.
      </div>
    );
  }
  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(199px, 1fr))' }}>
      {repos.map(c => <RepoTile key={c.id} repo={c} />)}
    </div>
  );
}
