/**
 * SoftwareHeader Component
 * Displays software logo, title, description, and links
 *
 * Props:
 * @param {Object} software - Software object from API
 */
import { Link } from 'react-router-dom';
import { ChevronLeft, Globe, Book } from 'react-bootstrap-icons';

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
        <ChevronLeft className="w-5 h-5 mr-2" />
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
                <Globe className="w-5 h-5 mr-2" />
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
                <Book className="w-5 h-5 mr-2" />
                Documentation
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
