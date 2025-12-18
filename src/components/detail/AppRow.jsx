/**
 * AppRow Component
 * Individual app row with README toggle
 *
 * Props:
 * @param {Object} app - App object from API
 * @param {boolean} isExpanded - Whether README is expanded
 * @param {Function} onToggle - Callback when toggle is clicked
 */
import { Calendar3, Github, ChevronUp, ChevronDown } from 'react-bootstrap-icons';

export default function AppRow({ app, isExpanded, onToggle }) {
  const title = app.attributes?.title || 'Untitled App';
  const description = app.attributes?.body?.processed || app.attributes?.body?.value || '';
  const githubUrl = app.attributes?.field_appverse_github_url?.uri;
  const readme = app.attributes?.field_appverse_readme?.processed || app.attributes?.field_appverse_readme?.value;
  const lastUpdated = app.attributes?.field_appverse_lastupdated;

  // Format date
  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Not available';

  return (
    <div className="border-2 border-appverse-gray rounded-appverse overflow-hidden">
      {/* App header row */}
      <div className="p-6 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-serif font-bold text-appverse-black mb-2">
              {title}
            </h3>

            {description && (
              <div
                className="text-gray-700 font-sans mb-4 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            <div className="flex items-center gap-6 text-sm font-sans text-gray-600">
              {lastUpdated && (
                <div className="flex items-center">
                  <Calendar3 className="w-4 h-4 mr-1.5" />
                  Last updated: {formattedDate}
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 flex-shrink-0">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-appverse-black text-white font-sans font-semibold rounded-appverse hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <Github className="w-5 h-5 mr-2" />
                View Repository
              </a>
            )}

            {readme && (
              <button
                onClick={onToggle}
                className="inline-flex items-center px-4 py-2 border-2 border-appverse-red text-appverse-red font-sans font-semibold rounded-appverse hover:bg-appverse-pink transition-colors whitespace-nowrap"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-5 h-5 mr-2" />
                    Hide README
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5 mr-2" />
                    Show README
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* README panel (expanded) */}
      {isExpanded && readme && (
        <div className="bg-appverse-pink border-t-2 border-appverse-gray p-6">
          <div
            className="prose max-w-none font-sans"
            dangerouslySetInnerHTML={{ __html: readme }}
          />
        </div>
      )}
    </div>
  );
}
