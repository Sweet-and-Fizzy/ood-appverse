/**
 * AppRow Component
 * Individual app row with README toggle - matches mockup design
 *
 * Props:
 * @param {Object} app - App object from API with resolved taxonomy terms
 * @param {boolean} isExpanded - Whether README is expanded
 * @param {Function} onToggle - Callback when toggle is clicked
 */
import { StarFill } from 'react-bootstrap-icons';
import MarkdownRenderer from '../common/MarkdownRenderer';

export default function AppRow({ app, isExpanded, onToggle }) {
  const title = app.attributes?.title || 'Untitled App';
  const githubUrl = app.attributes?.field_appverse_github_url?.uri;
  // Raw markdown content for README
  const readme = app.attributes?.field_appverse_readme?.value;
  const lastUpdated = app.attributes?.field_appverse_lastupdated;

  // Resolved taxonomy terms from API
  const organization = app.organization;
  const tags = app.tags || [];

  // Format date as M/DD/YY per mockup style
  // field_appverse_lastupdated is a Unix timestamp in SECONDS, JS needs milliseconds
  const formattedDate = lastUpdated
    ? new Date(lastUpdated * 1000).toLocaleDateString('en-US', {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
      })
    : null;

  return (
    <div className="border border-appverse-gray rounded-appverse overflow-hidden bg-white">
      {/* App header row - 3 column layout */}
      <div className="p-5">
        <div className="flex gap-6">
          {/* Left column: title, org, date */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-sans font-bold text-appverse-black mb-1">
              {title}
            </h3>

            {organization && (
              <p className="text-sm font-sans text-appverse-black mb-2">
                {organization.name}
              </p>
            )}

            {formattedDate && (
              <p className="text-sm font-sans text-appverse-black">
                <span className="font-semibold">LAST COMMIT:</span> {formattedDate}
              </p>
            )}
          </div>

          {/* Middle column: tags (aligned left within column) */}
          <div className="w-[180px] flex-shrink-0">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-2.5 py-1 text-xs font-sans text-appverse-black bg-appverse-gray rounded"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right column: action buttons (VIEW REPO top, SHOW README bottom) */}
          <div className="flex flex-col justify-between flex-shrink-0 min-h-[70px]">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-appverse-black hover:text-gray-600 transition-colors font-sans font-semibold text-sm whitespace-nowrap"
              >
                <span className="w-5 h-5 rounded-full bg-appverse-red flex items-center justify-center">
                  <StarFill className="w-3 h-3 text-white" />
                </span>
                VIEW REPO
              </a>
            )}

            {readme && (
              <button
                onClick={onToggle}
                className="inline-flex items-center gap-2 text-appverse-black hover:text-gray-600 transition-colors font-sans font-semibold text-sm whitespace-nowrap mt-auto"
              >
                <span
                  className={`w-5 h-5 rounded-full bg-appverse-red flex items-center justify-center transition-transform ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                >
                  {/* Custom CSS chevron - rotated bordered square */}
                  <span
                    className="w-1.5 h-1.5 border-r-2 border-b-2 border-white rotate-[-45deg] ml-[-2px]"
                  />
                </span>
                {isExpanded ? 'HIDE README' : 'SHOW README'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* README panel (expanded) - GitHub-style markdown rendering, dark mode */}
      {isExpanded && readme && (
        <div className="border-t border-gray-700 p-5 bg-[#1e1e1e] max-h-[350px] overflow-y-auto">
          <MarkdownRenderer content={readme} className="font-sans" darkMode />
        </div>
      )}
    </div>
  );
}
