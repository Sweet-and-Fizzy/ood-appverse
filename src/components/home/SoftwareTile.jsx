/**
 * SoftwareTile Component
 * Individual card displaying software info
 *
 * The title link is the card's main link; an ::after overlay stretches its
 * clickable area over the whole card. Interactive children that must stay
 * clickable on their own (the "Add an app" button and the matching-app links)
 * sit above the overlay with `relative z-10`. Links can't be nested, so the
 * card itself is not wrapped in a <Link>.
 *
 * Props:
 * @param {Object} software - Software object from API. During a search it may
 *   carry `matchedApps` (from utils/matchedApps getMatchedApps).
 * @param {string} searchQuery - Current search text, used to highlight matches
 */
import { Link } from 'react-router-dom';
import { StarFill } from 'react-bootstrap-icons';
import { slugify } from '../../utils/slugify';
import { splitOnMatch, matchedAppsLabel, visibleMatches } from '../../utils/matchedApps';
import { useTracking } from '../../hooks/useTracking';

const MAX_MATCHED_APPS = 3;

/**
 * Render text with the first match of the query wrapped in <mark>.
 */
function Highlighted({ text, query }) {
  const { before, match, after } = splitOnMatch(text, query);
  if (!match) return text;
  return (
    <>
      {before}
      <mark className="bg-appverse-highlight text-inherit p-0 rounded-sm">{match}</mark>
      {after}
    </>
  );
}

export default function SoftwareTile({ software, searchQuery = '' }) {
  const track = useTracking();
  const softwareTitle = software.title || 'Untitled Software';
  const logoUrl = software.logoUrl;
  const appCount = software.appCount || 0;
  const matchedApps = software.matchedApps || [];
  const { shown, moreCount } = visibleMatches(matchedApps, MAX_MATCHED_APPS);

  // Generate slug from title for semantic URL
  const slug = slugify(softwareTitle);

  // Format app count text (number is shown in circle, so just singular/plural)
  const appCountText = appCount === 1 ? 'app' : 'apps';

  // Debug: Log if logo URL exists but might be broken
  const handleImageError = (e) => {
    console.error(`Failed to load logo for ${softwareTitle}:`, logoUrl);
  };

  return (
    <div
      data-testid="software-tile"
      className="relative flex flex-col items-center gap-4 border-appverse-black border-2 rounded-lg p-6 bg-white min-h-[199px] hover:border-red-500 transition-all duration-200"
    >

      {/* Logo section - fixed height container */}
      <div className="h-[60px] w-full flex items-center justify-center">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${softwareTitle} logo`}
            className="max-h-[60px] max-w-full object-contain"
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          // Placeholder if no logo
          <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-600 leading-none">
              {softwareTitle.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Software name: the card's main link. Its ::after overlay covers the card. */}
      <h3 className="text-xl font-semibold text-center text-gray-900 line-clamp-2">
        <Link
          to={`/${slug}`}
          className="after:absolute after:inset-0 after:rounded-lg"
          onClick={() => track('software_click', {
            software_title: softwareTitle,
            software_slug: slug,
            app_count: appCount
          })}
        >
          {softwareTitle}
        </Link>
      </h3>

      {/* App count badge or Add Repos button */}
      <div className="mt-auto">
        <span
          role={appCount === 0 ? 'button' : undefined}
          onClick={appCount === 0 ? (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/appverse/add-repo';
          } : undefined}
          className={`inline-flex items-center gap-1.5 text-base font-medium ${
            appCount === 0 ? 'relative z-10 cursor-pointer hover:opacity-80 transition-opacity' : ''
          }`}
        >
          <span className={`grid place-items-center w-5 h-5 rounded-full ${
            appCount === 0 ? 'bg-appverse-green' : 'bg-appverse-blue'
          }`}>
            {appCount === 0 ? (
              <StarFill className="w-2.5 h-2.5 text-white -translate-y-[0.5px]" />
            ) : (
              <span className="text-[10px] font-bold text-white -translate-y-[2px]">
                {appCount}
              </span>
            )}
          </span>
          <span className={appCount === 0 ? 'text-appverse-green' : 'text-appverse-black'}>
            {appCount === 0 ? 'Add an app' : appCountText}
          </span>
        </span>
      </div>

      {/* Apps that matched the search when the software title didn't (D8-3084) */}
      {shown.length > 0 && (
        <div data-testid="matched-apps" className="w-full border-t border-appverse-gray pt-3 text-left">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-600">
            {matchedAppsLabel(matchedApps.length)}
          </p>
          <ul className="flex flex-col gap-2">
            {shown.map(({ app, matchType, tag }) => {
              const appTitle = app.title || 'Untitled App';
              return (
                <li key={app.id} data-testid="matched-app-row" className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 grid place-items-center w-6 h-6 rounded bg-gray-200 text-gray-600 text-xs font-bold"
                  >
                    {appTitle.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <Link
                      to={`/${slug}?app=${encodeURIComponent(app.id)}`}
                      data-testid="matched-app-link"
                      className="relative z-10 min-w-0 text-sm text-appverse-black underline break-words line-clamp-2 hover:text-appverse-red"
                      onClick={() => track('matched_app_click', {
                        software_title: softwareTitle,
                        app_title: appTitle,
                        search_query: searchQuery,
                        match_type: matchType
                      })}
                    >
                      {matchType === 'title' ? <Highlighted text={appTitle} query={searchQuery} /> : appTitle}
                    </Link>
                    {matchType === 'tag' && tag && (
                      <span
                        data-testid="matched-app-tag"
                        className="px-1.5 py-0.5 text-xs text-appverse-black bg-appverse-gray rounded break-words"
                      >
                        <Highlighted text={tag.name} query={searchQuery} />
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {moreCount > 0 && (
            <p className="mt-2 text-sm text-gray-600">+ {moreCount} more</p>
          )}
        </div>
      )}
    </div>
  );
}
