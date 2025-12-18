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
      <div className="border-2 border-appverse-gray rounded-appverse p-6 hover:border-appverse-red hover:shadow-lg transition-all duration-200 bg-white h-full flex flex-col">

        {/* Logo section */}
        <div className="flex items-center justify-center h-32 mb-4">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${softwareTitle} logo`}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            // Placeholder if no logo
            <div className="w-24 h-24 rounded-appverse bg-appverse-gray flex items-center justify-center">
              <span className="text-3xl font-serif font-bold text-white">
                {softwareTitle.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Software name */}
        <h3 className="text-xl font-serif font-bold text-appverse-black mb-2 group-hover:text-appverse-red transition-colors text-center">
          {softwareTitle}
        </h3>

        {/* App count badge */}
        <div className="mt-auto pt-4 flex items-center justify-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-appverse-black text-white text-sm font-sans font-semibold">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {appCountText}
          </span>
        </div>
      </div>
    </Link>
  );
}
