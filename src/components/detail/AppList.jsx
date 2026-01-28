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
import { FileText } from 'react-bootstrap-icons';

export default function AppList({ apps, expandedAppId, onToggleApp }) {
  // Handle empty state
  if (!apps || apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 rounded-full bg-appverse-gray flex items-center justify-center mb-4">
          <FileText className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-serif font-bold text-appverse-black mb-2">
          No Apps Found
        </h2>
        <p className="text-gray-600 font-sans text-center max-w-md">
          There are no applications implementing this software yet.
        </p>
      </div>
    );
  }

  return (
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
  );
}
