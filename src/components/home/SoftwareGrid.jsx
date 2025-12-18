/**
 * SoftwareGrid Component
 * Displays grid of software tiles with filtering and search
 *
 * Props:
 * @param {Array} software - Array of software items to display
 * @param {Object} appsBySoftwareId - Apps grouped by software ID
 */
import SoftwareTile from './SoftwareTile';

export default function SoftwareGrid({ software, appsBySoftwareId }) {
  // Handle empty state
  if (!software || software.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 rounded-full bg-appverse-gray flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {software.map((softwareItem) => {
        const appCount = (appsBySoftwareId[softwareItem.id] || []).length;

        return (
          <SoftwareTile
            key={softwareItem.id}
            software={softwareItem}
            appCount={appCount}
          />
        );
      })}
    </div>
  );
}
