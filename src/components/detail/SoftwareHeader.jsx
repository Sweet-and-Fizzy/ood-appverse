/**
 * SoftwareHeader Component
 * Displays software logo, title, description, links, and taxonomy tags
 *
 * Props:
 * @param {Object} software - Software object from API with resolved taxonomy terms
 */
import { Globe, Book, FileEarmarkLock, FileEarmarkCode } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useTracking } from '../../hooks/useTracking';

export default function SoftwareHeader({ software }) {
  const track = useTracking();
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
  // Mark each with its type so we can link to the correct filter
  const allTags = [
    ...topics.map(t => ({ ...t, filterType: 'topics' })),
    ...tags.map(t => ({ ...t, filterType: 'tags' }))
  ];

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
          <div className="w-20 h-20 rounded-appverse bg-gray-200 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-600 leading-none">
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
            onClick={() => track('external_link', { software_title: title, link_type: 'website', link_url: websiteUrl })}
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
            onClick={() => track('external_link', { software_title: title, link_type: 'docs', link_url: docsUrl })}
            className="inline-flex items-center gap-1.5 text-appverse-black hover:text-appverse-red transition-colors"
          >
            <Book className="w-4 h-4" />
            DOCS
          </a>
        )}

        {license && (
          <span className="inline-flex items-center gap-1.5 text-appverse-black">
            {isOpenSource ? (
              <FileEarmarkCode className="w-4 h-4" />
            ) : (
              <FileEarmarkLock className="w-4 h-4" />
            )}
            {isOpenSource ? 'OPEN-SOURCE' : 'COMMERCIAL'}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <div
          className="text-sm font-sans text-appverse-black leading-relaxed mb-4 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      {/* Tags as bordered pills */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Link
              key={tag.id}
              to={`/appverse?${tag.filterType}=${encodeURIComponent(tag.name)}`}
              className="px-2.5 py-1 text-xs font-sans text-appverse-black border border-appverse-black rounded hover:bg-appverse-gray transition-colors"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
