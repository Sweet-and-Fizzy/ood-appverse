/**
 * MatchReasons Component
 * Explains why a search result card matched the query (D8-3084, D8-3117).
 *
 * Shows, in order: matching apps (by app title or app tag), then a
 * "Matched on" block for the item's own matching tags, topics, repo
 * maintainer, repo organization, and a description snippet.
 *
 * Match links sit above the card's stretched-link overlay with `relative z-10`
 * so they stay clickable on their own; chips and text are not links. All text
 * is rendered as React text nodes (never as HTML).
 *
 * Props:
 * @param {Object|null} reasons - Result of utils/matchedApps getMatchReasons
 * @param {string} searchQuery - Current search text, used to highlight matches
 * @param {string} appLinkBase - Route the app links point at (e.g. `/${slug}`
 *   or `/repo/${slug}`); links append `?app=<app.id>`
 * @param {Object} trackContext - Merged into the matched_app_click payload
 * @param {Function} track - Tracking function from useTracking
 */
import { Link } from 'react-router-dom';
import { splitOnMatch, matchedAppsLabel, visibleMatches } from '../../utils/matchedApps';

const MAX_MATCHED_APPS = 3;
const MARK_CLASS = 'bg-appverse-highlight text-inherit p-0 rounded-sm';
const CHIP_CLASS = 'px-1.5 py-0.5 text-xs text-appverse-black bg-appverse-gray rounded break-words';
const HEADING_CLASS = 'mb-2 text-xs font-bold uppercase tracking-wider text-gray-600';

/**
 * Render text with the first match of the query wrapped in <mark>.
 */
function Highlighted({ text, query }) {
  const { before, match, after } = splitOnMatch(text, query);
  if (!match) return text;
  return (
    <>
      {before}
      <mark className={MARK_CLASS}>{match}</mark>
      {after}
    </>
  );
}

export default function MatchReasons({
  reasons,
  searchQuery = '',
  appLinkBase,
  trackContext = {},
  track = () => {},
}) {
  if (!reasons) return null;

  const apps = reasons.apps || [];
  const tags = reasons.tags || [];
  const topics = reasons.topics || [];
  const { maintainer, organization, description } = reasons;
  const { shown, moreCount } = visibleMatches(apps, MAX_MATCHED_APPS);

  const hasOther = tags.length > 0 || topics.length > 0 || !!maintainer ||
    !!organization || !!description;
  if (shown.length === 0 && !hasOther) return null;

  return (
    <div data-testid="match-reasons" className="border-t border-appverse-gray pt-3 text-left w-full">
      {shown.length > 0 && (
        <div data-testid="matched-apps" className={hasOther ? 'mb-3' : undefined}>
          <p className={HEADING_CLASS}>
            {matchedAppsLabel(apps.length)}
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
                      to={`${appLinkBase}?app=${encodeURIComponent(app.id)}`}
                      data-testid="matched-app-link"
                      className="relative z-10 min-w-0 text-sm text-appverse-black underline break-words line-clamp-2 hover:text-appverse-red"
                      onClick={() => track('matched_app_click', {
                        ...trackContext,
                        app_title: appTitle,
                        search_query: searchQuery,
                        match_type: matchType
                      })}
                    >
                      {matchType === 'title' ? <Highlighted text={appTitle} query={searchQuery} /> : appTitle}
                    </Link>
                    {matchType === 'tag' && tag && (
                      <span data-testid="matched-app-tag" className={CHIP_CLASS}>
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

      {hasOther && (
        <div>
          <p className={HEADING_CLASS}>Matched on</p>
          <div className="flex flex-col gap-2">
            {tags.length > 0 && (
              <ul className="flex flex-wrap items-center gap-1.5" aria-label="Matching tags">
                {tags.map(({ name }) => (
                  <li key={`tag-${name}`} data-testid="match-reason-tag" className={CHIP_CLASS}>
                    <span className="text-gray-600">Tag: </span>
                    <Highlighted text={name} query={searchQuery} />
                  </li>
                ))}
              </ul>
            )}
            {topics.length > 0 && (
              <ul className="flex flex-wrap items-center gap-1.5" aria-label="Matching topics">
                {topics.map(({ name }) => (
                  <li key={`topic-${name}`} data-testid="match-reason-topic" className={CHIP_CLASS}>
                    <span className="text-gray-600">Topic: </span>
                    <Highlighted text={name} query={searchQuery} />
                  </li>
                ))}
              </ul>
            )}
            {maintainer && (
              <p data-testid="match-reason-maintainer" className="text-sm text-gray-600">
                Maintainer: <Highlighted text={maintainer} query={searchQuery} />
              </p>
            )}
            {organization && (
              <p data-testid="match-reason-organization" className="text-sm text-gray-600">
                Organization: <Highlighted text={organization} query={searchQuery} />
              </p>
            )}
            {description && (
              <p data-testid="match-reason-description" className="text-sm text-gray-600 line-clamp-3">
                {description.before}
                <mark className={MARK_CLASS}>{description.match}</mark>
                {description.after}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
