/**
 * SoftwareTile Component
 * Individual card displaying software info
 *
 * Props:
 * @param {Object} software - Software object from API
 * @param {number} appCount - Number of apps for this software
 */
import { Link } from 'react-router-dom';
import { slugify } from '../../utils/slugify';

export default function SoftwareTile({ software, appCount = 0 }) {
  const softwareTitle = software.attributes?.title || 'Untitled Software';
  const logoUrl = software.logoUrl;

  // Generate slug from title for semantic URL
  const slug = slugify(softwareTitle);

  // Format app count text
  const appCountText = appCount === 1 ? '1 repo' : `${appCount} repos`;

  // Debug: Log if logo URL exists but might be broken
  const handleImageError = (e) => {
    console.error(`Failed to load logo for ${softwareTitle}:`, logoUrl);
  };

  return (
    <Link
      to={`/appverse/${slug}`}
      className="block group"
    >
      <div className="flex flex-col items-center gap-4 border-appverse-black border-2 rounded-lg p-6 bg-white h-[199px] min-w-[199px] hover:border-red-500 transition-all duration-200">

        {/* Logo section - fixed height container */}
        <div className="h-[60px] w-full flex items-center justify-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${softwareTitle} logo`}
              className="max-h-[60px] max-w-full object-contain"
              onError={handleImageError}
            />
          ) : (
            // Placeholder if no logo
            <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600 leading-none">
                {softwareTitle.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Software name */}
        <h3 className="text-xl font-semibold text-center text-gray-900 line-clamp-2">
          {softwareTitle}
        </h3>

        {/* App count badge */}
        <div className="mt-auto">
          <span className="inline-flex items-center gap-1.5 text-base font-medium">
            <span className="relative inline-flex items-center justify-center w-5 h-5 bg-appverse-blue rounded-full">
              <span className="text-[10px] font-bold text-white leading-none">
                {appCount}
              </span>
            </span>
            <span className="text-appverse-black">{appCountText}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
