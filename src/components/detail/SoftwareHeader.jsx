/**
 * SoftwareHeader Component
 * Displays software logo, title, description, and links
 *
 * Props:
 * @param {Object} software - Software object from API
 */
import { Link } from 'react-router-dom';

export default function SoftwareHeader({ software }) {
  const title = software.attributes?.title || 'Untitled Software';
  const description = software.attributes?.body?.processed || software.attributes?.body?.value || '';
  const logoUrl = software.logoUrl;
  const websiteUrl = software.attributes?.field_appverse_software_website?.uri;
  const docsUrl = software.attributes?.field_appverse_software_doc?.uri;
  const softwareType = software.attributes?.field_appverse_software_type;

  // Format license type for display
  const licenseLabel = softwareType === 'open_source_software' ? 'Open Source' : 'Licensed Software';
  const licenseColor = softwareType === 'open_source_software' ? 'bg-appverse-green' : 'bg-appverse-blue';

  return (
    <div className="border-b-2 border-appverse-gray pb-8 mb-8">
      {/* Back button */}
      <Link
        to="/appverse/"
        className="inline-flex items-center text-appverse-blue hover:text-appverse-red transition-colors mb-6 font-sans"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Software Grid
      </Link>

      <div className="flex gap-8">
        {/* Logo section */}
        <div className="flex-shrink-0">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${title} logo`}
              className="w-48 h-48 object-contain"
            />
          ) : (
            <div className="w-48 h-48 rounded-appverse bg-appverse-gray flex items-center justify-center">
              <span className="text-6xl font-serif font-bold text-white">
                {title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Info section */}
        <div className="flex-1">
          {/* Title and license badge */}
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-serif font-bold text-appverse-black">
              {title}
            </h1>
            {softwareType && (
              <span className={`px-4 py-2 ${licenseColor} text-white rounded-appverse font-sans font-semibold text-sm whitespace-nowrap`}>
                {licenseLabel}
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <div
              className="text-lg font-sans text-gray-700 mb-6 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {/* Links */}
          <div className="flex gap-4">
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-appverse-red text-white font-sans font-semibold rounded-appverse hover:opacity-90 transition-opacity"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                Website
              </a>
            )}

            {docsUrl && (
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border-2 border-appverse-red text-appverse-red font-sans font-semibold rounded-appverse hover:bg-appverse-pink transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Documentation
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
