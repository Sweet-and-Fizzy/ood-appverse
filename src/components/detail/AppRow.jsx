/**
 * AppRow Component
 * Individual app row with README toggle - matches mockup design
 *
 * Props:
 * @param {Object} app - App object from API with resolved taxonomy terms
 * @param {boolean} isExpanded - Whether README is expanded
 * @param {Function} onToggle - Callback when toggle is clicked
 */
import { useRef, useEffect, useState } from 'react';
import { ChevronRight, StarFill } from 'react-bootstrap-icons';
import MarkdownRenderer from '../common/MarkdownRenderer';
import FlagButton from '../common/FlagButton';
import { useFlag } from '../../contexts/FlagContext';
import { useTracking } from '../../hooks/useTracking';

export default function AppRow({ app, isExpanded, onToggle }) {
  const { getFlagCountAdjustment } = useFlag();
  const track = useTracking();

  const title = app.attributes?.title || 'Untitled App';
  const githubUrl = app.attributes?.field_appverse_github_url?.uri;
  // Raw markdown content for README
  const readme = app.attributes?.field_appverse_readme?.value;
  const lastUpdated = app.attributes?.field_appverse_lastupdated;
  const baseFlagCount = app.attributes?.flag_count || 0;
  // Adjust flag count based on user's flag actions (updated after server confirms)
  const flagCount = baseFlagCount + getFlagCountAdjustment(app.id);
  const githubStars = app.attributes?.field_appverse_stars ?? 0;

  // Resolved taxonomy terms from API
  const organization = app.organization;
  const tags = app.tags || [];

  // App identifiers for flagging
  const appId = app.id; // UUID
  const nid = app.attributes?.drupal_internal__nid; // needed for entity_id when creating a flagging

  // For smooth height animation of README panel
  const readmeRef = useRef(null);
  const [readmeHeight, setReadmeHeight] = useState(0);

  // Measure and update height when expanded or content changes
  // Use 350px max to match the inner panel's max-height
  useEffect(() => {
    if (isExpanded && readmeRef.current) {
      const contentHeight = readmeRef.current.scrollHeight;
      setReadmeHeight(Math.min(contentHeight, 350));
    } else {
      setReadmeHeight(0);
    }
  }, [isExpanded, readme]);

  // Format date as M/DD/YY per mockup style
  // field_appverse_lastupdated is a Unix timestamp in SECONDS, JS needs milliseconds
  const formattedDate = lastUpdated
    ? new Date(lastUpdated * 1000).toLocaleDateString('en-US', {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
      })
    : null;

  // Reusable button components to avoid duplication
  const ViewRepoButton = () => githubUrl && (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('view_repo', { app_title: title, github_url: githubUrl })}
      className="inline-flex items-center gap-2 text-appverse-black visited:text-appverse-black hover:text-gray-600 transition-colors font-sans font-semibold text-sm whitespace-nowrap"
    >
      <span className="grid place-items-center w-5 h-5 rounded-full bg-appverse-red">
        <ChevronRight className="w-3.5 h-3 text-white" style={{ stroke: 'white', strokeWidth: 1, transform: 'translateX(0.5px)' }} />
      </span>
      VIEW REPO
    </a>
  );

  const ShowReadmeButton = ({ className = '' }) => readme && (
    <button
      onClick={() => {
        track('readme_toggle', { app_title: title, action: isExpanded ? 'collapse' : 'expand' });
        onToggle();
      }}
      className={`inline-flex items-center gap-2 text-appverse-black hover:text-gray-600 transition-colors font-sans font-semibold text-sm whitespace-nowrap focus:outline-none ${className}`}
    >
      <span
        className={`grid place-items-center w-5 h-5 rounded-full bg-appverse-red transition-transform duration-200 ${
          isExpanded ? 'rotate-90' : ''
        }`}
      >
        <ChevronRight className="w-3.5 h-3 text-white" style={{ stroke: 'white', strokeWidth: 1, transform: 'translateX(0.5px)' }} />
      </span>
      {isExpanded ? 'HIDE README' : 'SHOW README'}
    </button>
  );

  const TagList = () => tags.length > 0 && (
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
  );

  return (
    <div className="border border-appverse-gray rounded-appverse overflow-hidden bg-white">
      {/* !p-5: Drupal theme has .p-5 with !important, so we need to override it */}
      <div className="!p-5">
        {/* Desktop layout - 3 column (hidden on mobile) */}
        <div className="hidden md:flex md:gap-6">
          {/* Left column: title, org, show readme */}
          <div className="flex-1 min-w-0 flex flex-col">
            <h3 className="text-xl font-sans font-bold text-appverse-black mb-1">
              {title}
            </h3>
            {organization && (
              <p className="text-sm font-sans text-appverse-black">
                {organization.name}
              </p>
            )}
            <div className="mt-auto pt-3">
              <ShowReadmeButton />
            </div>
          </div>

          {/* Middle column: tags */}
          <div className="w-[180px] flex-shrink-0">
            <TagList />
          </div>

          {/* Right column: view repo + stats box */}
          <div className="flex flex-col gap-2 flex-shrink-0 items-start">
            <ViewRepoButton />
            <div className="bg-appverse-gray/30 rounded px-3 py-2 text-sm font-sans text-appverse-black min-w-[160px]">
              <p className="flex items-center gap-1">
                <span className="font-bold">{githubStars}</span> <StarFill className="w-3 h-3" /> on GitHub
              </p>
              <p className="flex items-center justify-between">
                <span><span className="font-bold">{flagCount}</span> reported usages</span>
                {nid && <FlagButton appId={appId} nid={nid} compact />}
              </p>
              {formattedDate && (
                <p><span className="font-bold">{formattedDate}</span> last commit</p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile layout - stacked (hidden on desktop) */}
        <div className="md:hidden">
          {/* Two column layout: left content, right stats */}
          <div className="flex gap-4 items-start">
            {/* Left: Title, org, tags, buttons */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-sans font-bold text-appverse-black mb-1">
                {title}
              </h3>
              {organization && (
                <p className="text-sm font-sans text-appverse-black mb-2">
                  {organization.name}
                </p>
              )}
              {/* Tags */}
              {tags.length > 0 && (
                <div className="mb-3">
                  <TagList />
                </div>
              )}
              {/* Action buttons */}
              <div className="flex flex-row flex-wrap gap-4">
                <ViewRepoButton />
                <ShowReadmeButton />
              </div>
            </div>

            {/* Right: Stats box */}
            <div className="bg-appverse-gray/30 rounded px-3 py-2 text-sm font-sans text-appverse-black min-w-[160px] w-fit flex-shrink-0">
              <p className="flex items-center gap-1">
                <span className="font-bold">{githubStars}</span> <StarFill className="w-3 h-3" /> on GitHub
              </p>
              <p className="flex items-center justify-between">
                <span><span className="font-bold">{flagCount}</span> reported usages</span>
                {nid && <FlagButton appId={appId} nid={nid} compact />}
              </p>
              {formattedDate && (
                <p><span className="font-bold">{formattedDate}</span> last commit</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* README panel - GitHub-style markdown rendering, dark mode */}
      {/* Animated height transition for smooth expand/collapse */}
      {readme && (
        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: isExpanded ? `${readmeHeight}px` : '0px' }}
        >
          <div
            ref={readmeRef}
            className="border-t border-gray-700 !p-5 bg-[#1e1e1e] max-h-[350px] overflow-y-auto"
          >
            <MarkdownRenderer content={readme} className="font-sans" darkMode />
          </div>
        </div>
      )}
    </div>
  );
}
