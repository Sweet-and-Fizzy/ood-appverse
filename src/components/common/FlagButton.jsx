/**
 * FlagButton Component
 * Toggle button for flagging/unflagging apps
 *
 * Props:
 * @param {string} appId - App UUID (used for tracking flag state)
 * @param {number} nid - Drupal node ID (needed for entity_id when creating a flagging)
 * @param {string} className - Additional CSS classes
 */
import { Flag, FlagFill } from 'react-bootstrap-icons';
import { useFlag } from '../../contexts/FlagContext';

export default function FlagButton({ appId, nid, className = '' }) {
  const { authenticated, loading, isFlagged, isPending, toggleFlag } = useFlag();

  // Don't render for unauthenticated users
  if (!authenticated && !loading) {
    return null;
  }

  const flagged = isFlagged(appId);
  const pending = isPending(appId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFlag(appId, nid);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || pending}
      className={`inline-flex items-center gap-2 text-appverse-black hover:text-gray-600
        transition-colors font-sans font-semibold text-sm whitespace-nowrap
        focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label={flagged ? 'Remove from my apps' : 'Add to my apps'}
      title={flagged ? 'Remove from my apps' : 'Add to my apps'}
    >
      <span className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
        flagged ? 'bg-appverse-green' : 'bg-appverse-red'
      }`}>
        {pending ? (
          // Loading spinner
          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : flagged ? (
          <FlagFill className="w-3 h-3 text-white" />
        ) : (
          <Flag className="w-3 h-3 text-white" />
        )}
      </span>
      {flagged ? 'MY APP' : 'FLAG APP'}
    </button>
  );
}
