/**
 * AppRow Component
 * Individual app row with README toggle
 *
 * Props:
 * @param {Object} app - App object from API
 * @param {boolean} isExpanded - Whether README is expanded
 * @param {Function} onToggle - Callback when toggle is clicked
 */
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
                  <svg
                    className="w-4 h-4 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
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
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
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
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    Hide README
                  </>
                ) : (
                  <>
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
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
