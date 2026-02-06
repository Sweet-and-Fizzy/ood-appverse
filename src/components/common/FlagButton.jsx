/**
 * FlagButton Component
 * Toggle button for flagging/unflagging apps
 *
 * Props:
 * @param {string} appId - App UUID (used for tracking flag state)
 * @param {number} nid - Drupal node ID (needed for entity_id when creating a flagging)
 * @param {boolean} compact - If true, show only the icon (no text)
 * @param {string} className - Additional CSS classes
 */
import { Plus, FlagFill } from 'react-bootstrap-icons';
import { useFlag } from '../../contexts/FlagContext';

export default function FlagButton({ appId, nid, compact = false, className = '' }) {
  const { authenticated, loading, isFlagged, isPending, toggleFlag, siteBaseUrl } = useFlag();

  const flagged = authenticated ? isFlagged(appId) : false;
  const pending = authenticated ? isPending(appId) : false;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!authenticated) {
      // Redirect anonymous users to Drupal's Flag module URL
      // This will prompt login and complete the flag action after authentication
      const flagUrl = `${siteBaseUrl}/flag/flag/appverse_apps/node/${nid}`;
      window.location.href = flagUrl;
      return;
    }

    toggleFlag(appId, nid);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || pending}
      className={`inline-flex items-center gap-2 text-appverse-black hover:text-gray-600
        transition-colors font-sans font-semibold text-sm whitespace-nowrap
        focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label={flagged ? 'Remove from my apps' : 'We use this App'}
      title={flagged ? 'Remove from my apps' : 'We use this App'}
    >
      <span className={`grid place-items-center w-5 h-5 rounded transition-colors ${
        flagged ? 'bg-appverse-green' : 'bg-appverse-red'
      }`}>
        {pending ? (
          // Loading spinner
          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : flagged ? (
          <FlagFill className="w-3 h-3 text-white" />
        ) : (
          <Plus className="w-3.5 h-3.5 text-white" style={{ stroke: 'white', strokeWidth: 1 }} />
        )}
      </span>
      {!compact && (flagged ? 'FLAGGED' : 'FLAG APP')}
    </button>
  );
}
