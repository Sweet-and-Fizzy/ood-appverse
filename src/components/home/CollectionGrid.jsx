/**
 * CollectionGrid Component
 * Displays a grid of Collection tiles with skeleton loading and empty state.
 *
 * Props:
 * @param {Array} collections - Array of Collection items to display
 * @param {boolean} loading - Whether data is still loading
 */
import CollectionTile from './CollectionTile';
import SkeletonTile from './SkeletonTile';

export default function CollectionGrid({ collections, loading }) {
  if (loading) {
    return (
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(199px, 1fr))' }}>
        {Array.from({ length: 10 }).map((_, i) => <SkeletonTile key={i} />)}
      </div>
    );
  }
  if (!collections || collections.length === 0) {
    return (
      <div className="text-center py-12 text-appverse-black font-sans">
        No collections match your filters.
      </div>
    );
  }
  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(199px, 1fr))' }}>
      {collections.map(c => <CollectionTile key={c.id} collection={c} />)}
    </div>
  );
}
