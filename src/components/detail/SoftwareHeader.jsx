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
    <div className="flex flex-col">
      {/* Back button */}
      <Link
        to="/appverse/"
        className="inline-flex items-center text-appverse-blue hover:text-appverse-red transition-colors mb-6 font-sans"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Back to Software Grid
      </Link>

      {/* Logo section */}
      <div className="flex items-center justify-center mb-4">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${title} logo`}
            className="w-32 h-32 object-contain"
          />
        ) : (
          <div className="w-32 h-32 rounded-appverse bg-appverse-gray flex items-center justify-center">
            <span className="text-5xl font-serif font-bold text-white">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-serif font-bold text-appverse-black text-center mb-4">
        {title}
      </h1>

      {/* Links */}
      <div className="flex flex-col gap-2 mb-4">
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-appverse-blue hover:text-appverse-red transition-colors font-sans text-sm"
          >
            <Globe className="w-4 h-4" />
            WWW
          </a>
        )}

        {docsUrl && (
          <a
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-appverse-blue hover:text-appverse-red transition-colors font-sans text-sm"
          >
            <Book className="w-4 h-4" />
            DOCS
          </a>
        )}

        {softwareType === 'open_source_software' && (
          <div className="inline-flex items-center justify-center gap-2 text-appverse-blue font-sans text-sm">
            <span>📄</span>
            OPEN-SOURCE
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <div
          className="text-sm font-sans text-gray-700 mb-4 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}
