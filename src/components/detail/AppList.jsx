/**
 * AppList Component
 * List of apps with expandable READMEs
 *
 * Props:
 * @param {Array} apps - Array of app objects
 * @param {string} expandedAppId - ID of currently expanded app
 * @param {Function} onToggleApp - Callback when app is toggled
 */
import AppRow from './AppRow';

export default function AppList({ apps, expandedAppId, onToggleApp }) {
  // Handle empty state
  if (!apps || apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 rounded-full bg-appverse-gray flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-serif font-bold text-appverse-black mb-2">
          No Apps Found
        </h3>
        <p className="text-gray-600 font-sans text-center max-w-md">
          There are no applications implementing this software yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-appverse-black">
          Applications
        </h2>
        <span className="text-sm font-sans text-gray-600">
          {apps.length} {apps.length === 1 ? 'app' : 'apps'}
        </span>
      </div>

      <div className="space-y-4">
        {apps.map((app) => (
          <AppRow
            key={app.id}
            app={app}
            isExpanded={expandedAppId === app.id}
            onToggle={() => onToggleApp(app.id)}
          />
        ))}
      </div>
    </div>
  );
}
