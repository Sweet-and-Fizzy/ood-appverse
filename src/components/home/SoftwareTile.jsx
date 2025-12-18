/**
 * SoftwareTile Component
 * Individual card displaying software info
 *
 * Props:
 * @param {Object} software - Software object from API
 * @param {number} appCount - Number of apps for this software
 */
import { Link } from 'react-router-dom';

export default function SoftwareTile({ software, appCount = 0 }) {
  const softwareTitle = software.attributes?.title || 'Untitled Software';
  const logoUrl = software.logoUrl;
  const softwareType = software.attributes?.field_appverse_software_type;

  // Format app count text
  const appCountText = appCount === 1 ? '1 repo' : `${appCount} repos`;

  return (
    <Link
      to={`/appverse/software/${software.id}`}
      className="block group"
    >
      <div className="relative flex flex-col items-center border-gray-500 border-2 rounded-lg p-6 bg-white h-full hover:border-red-500 transition-all duration-200">

        {/* Logo section */}
        <div className="flex items-center justify-center h-32 w-full mb-4">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${softwareTitle} logo`}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            // Placeholder if no logo
            <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-7xl font-bold text-gray-600">
                {softwareTitle.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Software name */}
        <h3 className="text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-semibold text-center text-gray-900">
          {softwareTitle}
        </h3>

        {/* App count badge */}
        <div className="mt-auto pt-4 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-medium">
            <span className="relative inline-flex items-center justify-center w-5 h-5 bg-blue-600 rounded-full">
              <span className="text-[10px] font-bold text-white leading-none">
                {appCount}
              </span>
            </span>
            {appCountText}
          </span>
        </div>
      </div>
    </Link>
  );
}
