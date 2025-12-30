/**
 * SoftwareHeader Component
 * Displays software logo, title, description, links, and taxonomy tags
 *
 * Props:
 * @param {Object} software - Software object from API with resolved taxonomy terms
 */
import { Globe, Book, FileEarmarkLock } from 'react-bootstrap-icons';

export default function SoftwareHeader({ software }) {
  const title = software.attributes?.title || 'Untitled Software';
  const description = software.attributes?.body?.processed || software.attributes?.body?.value || '';
  const logoUrl = software.logoUrl;
  const websiteUrl = software.attributes?.field_appverse_software_website?.uri;
  const docsUrl = software.attributes?.field_appverse_software_doc?.uri;

  // Resolved taxonomy terms from API
  const license = software.license;
  const topics = software.topics || [];
  const tags = software.tags || [];

  // Combine topics and tags for display (both show as tag pills per mockup)
  const allTags = [...topics, ...tags];

  // Determine license display
  const isOpenSource = license?.name?.toLowerCase().includes('open');

  return (
    <div className="flex flex-col">
      {/* Logo section */}
      <div className="flex items-start mb-4">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${title} logo`}
            className="w-20 h-20 object-contain"
          />
        ) : (
          <div className="w-20 h-20 rounded-appverse bg-appverse-gray flex items-center justify-center">
            <span className="text-4xl font-serif font-bold text-white">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-serif font-bold text-appverse-black mb-3">
        {title}
      </h1>

      {/* Links row - horizontal like mockup */}
      <div className="flex items-center gap-4 mb-4 text-sm font-sans">
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-appverse-black hover:text-appverse-red transition-colors"
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
            className="inline-flex items-center gap-1.5 text-appverse-black hover:text-appverse-red transition-colors"
          >
            <Book className="w-4 h-4" />
            DOCS
          </a>
        )}

        {license && (
          <span className="inline-flex items-center gap-1.5 text-appverse-black">
            <FileEarmarkLock className="w-4 h-4" />
            {isOpenSource ? 'OPEN-SOURCE' : 'COMMERCIAL'}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <div
          className="text-sm font-sans text-appverse-black leading-relaxed mb-5 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      {/* Tags as bordered pills */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map((tag) => (
            <span
              key={tag.id}
              className="px-2.5 py-1 text-xs font-sans text-appverse-black border border-appverse-black rounded"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Add a repo button with corner highlight decoration */}
      <button
        className="corner-highlight w-fit py-3 px-8 bg-appverse-red text-white font-sans font-semibold rounded-appverse hover:bg-red-700 transition-colors"
        onClick={() => {
          // TODO: Implement add repo functionality
          alert('Add a repo functionality coming soon!');
        }}
      >
        Add a repo
      </button>
    </div>
  );
}
