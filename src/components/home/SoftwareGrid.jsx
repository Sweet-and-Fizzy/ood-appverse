/**
 * SoftwareGrid Component
 * Displays grid of software tiles with filtering and search
 *
 * Props:
 * @param {Array} software - Array of software items to display
 * @param {Object} appsBySoftwareId - Apps grouped by software ID
 */
import SoftwareTile from './SoftwareTile';
import SkeletonTile from './SkeletonTile';
import { Search } from 'react-bootstrap-icons';

export default function SoftwareGrid({ software, appsBySoftwareId, loading, appsLoading }) {
  // Debug: Log render state
  // console.log('[SoftwareGrid] Render - loading:', loading, '| software count:', software?.length ?? 0);

  // Show skeleton grid while loading
  if (loading) {
    // console.log('[SoftwareGrid] Showing skeleton grid');
    return (
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(199px, 1fr))' }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonTile key={i} />
        ))}
      </div>
    );
  }
  // Handle empty state
  if (!software || software.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 rounded-full bg-appverse-gray flex items-center justify-center mb-4">
          <Search className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-serif font-bold text-appverse-black mb-2">
          No Software Found
        </h3>
        <p className="text-gray-600 font-sans text-center max-w-md">
          No software matches your current filters. Try adjusting your search or clearing filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(199px, 1fr))' }}>
      {software.map((softwareItem) => {
        const appCount = (appsBySoftwareId[softwareItem.id] || []).length;

        return (
          <SoftwareTile
            key={softwareItem.id}
            software={softwareItem}
            appCount={appCount}
            appsLoading={appsLoading}
          />
        );
      })}
    </div>
  );
}
