/**
 * SoftwareTile Component
 * Individual card displaying software info
 *
 * Props:
 * @param {Object} software - Software object from API
 * @param {number} appCount - Number of apps for this software
 */
import { Link } from 'react-router-dom';
import { StarFill } from 'react-bootstrap-icons';
import { slugify } from '../../utils/slugify';

export default function SoftwareTile({ software, appCount = 0 }) {
  const softwareTitle = software.attributes?.title || 'Untitled Software';
  const logoUrl = software.logoUrl;

  // Generate slug from title for semantic URL
  const slug = slugify(softwareTitle);

  // Format app count text (number is shown in circle, so just singular/plural)
  const appCountText = appCount === 1 ? 'app' : 'apps';

  // Debug: Log if logo URL exists but might be broken
  const handleImageError = (e) => {
    console.error(`Failed to load logo for ${softwareTitle}:`, logoUrl);
  };

  return (
    <Link
      to={`/${slug}`}
      className="block group"
    >
      <div className="flex flex-col items-center gap-4 border-appverse-black border-2 rounded-lg p-6 bg-white h-[199px] hover:border-red-500 transition-all duration-200">

        {/* Logo section - fixed height container */}
        <div className="h-[60px] w-full flex items-center justify-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${softwareTitle} logo`}
              className="max-h-[60px] max-w-full object-contain"
              loading="lazy"
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

        {/* App count badge or Add Repos button */}
        <div className="mt-auto">
          <span
            role={appCount === 0 ? 'button' : undefined}
            onClick={appCount === 0 ? (e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = '/node/add/appverse_app';
            } : undefined}
            className={`inline-flex items-center gap-1.5 text-base font-medium ${
              appCount === 0 ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
            }`}
          >
            <span className={`grid place-items-center w-5 h-5 rounded-full ${
              appCount === 0 ? 'bg-appverse-green' : 'bg-appverse-blue'
            }`}>
              {appCount === 0 ? (
                <StarFill className="w-2.5 h-2.5 text-white -translate-y-[0.5px]" />
              ) : (
                <span className="text-[10px] font-bold text-white -translate-y-[2px]">
                  {appCount}
                </span>
              )}
            </span>
            <span className={appCount === 0 ? 'text-appverse-green' : 'text-appverse-black'}>
              {appCount === 0 ? 'Add an app' : appCountText}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
