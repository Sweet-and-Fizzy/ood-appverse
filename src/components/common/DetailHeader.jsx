import { Link } from 'react-router-dom';
import { ChevronLeft, Share } from 'react-bootstrap-icons';

export default function DetailHeader({ backTo, backLabel, usingButtonLabel, usingButtonUrl, shareTitle }) {
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: shareTitle || document.title, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  };

  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <Link to={backTo} className="inline-flex items-center text-appverse-red font-sans font-medium hover:underline">
        <ChevronLeft className="w-4 h-4" />
        {backLabel}
      </Link>
      <div className="flex items-center gap-3">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 border border-appverse-red text-appverse-red font-sans font-medium rounded-appverse hover:bg-appverse-red hover:text-white transition-colors"
        >
          <Share className="w-4 h-4" />
          Share
        </button>
        {usingButtonLabel && usingButtonUrl && (
          <a
            href={usingButtonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-appverse-red text-white font-sans font-medium rounded-appverse hover:bg-red-700 transition-colors"
          >
            {usingButtonLabel}
          </a>
        )}
      </div>
    </div>
  );
}
