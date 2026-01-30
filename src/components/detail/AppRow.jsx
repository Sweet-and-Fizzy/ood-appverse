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
import { StarFill } from 'react-bootstrap-icons';
import MarkdownRenderer from '../common/MarkdownRenderer';
import FlagButton from '../common/FlagButton';

export default function AppRow({ app, isExpanded, onToggle }) {
  const title = app.attributes?.title || 'Untitled App';
  const githubUrl = app.attributes?.field_appverse_github_url?.uri;
  // Raw markdown content for README
  const readme = app.attributes?.field_appverse_readme?.value;
  const lastUpdated = app.attributes?.field_appverse_lastupdated;

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
      className="inline-flex items-center gap-2 text-appverse-black hover:text-gray-600 transition-colors font-sans font-semibold text-sm whitespace-nowrap"
    >
      <span className="w-5 h-5 rounded-full bg-appverse-red flex items-center justify-center">
        <StarFill className="w-3 h-3 text-white" />
      </span>
      VIEW REPO
    </a>
  );

  const ShowReadmeButton = ({ className = '' }) => readme && (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 text-appverse-black hover:text-gray-600 transition-colors font-sans font-semibold text-sm whitespace-nowrap focus:outline-none ${className}`}
    >
      <span
        className={`w-5 h-5 rounded-full bg-appverse-red flex items-center justify-center transition-transform duration-200 ${
          isExpanded ? 'rotate-90' : ''
        }`}
      >
        <span className="w-1.5 h-1.5 border-r-2 border-b-2 border-white rotate-[-45deg] ml-[-2px]" />
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
          {/* Left column: title, org, date */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-sans font-bold text-appverse-black mb-1">
              {title}
            </h3>
            {organization && (
              <p className="text-sm font-sans text-appverse-black mb-2">
                {organization.name}
              </p>
            )}
            {formattedDate && (
              <p className="text-sm font-sans text-appverse-black">
                <span className="font-semibold">LAST COMMIT:</span> {formattedDate}
              </p>
            )}
          </div>

          {/* Middle column: tags */}
          <div className="w-[180px] flex-shrink-0">
            <TagList />
          </div>

          {/* Right column: action buttons (vertical) */}
          <div className="flex flex-col gap-2 flex-shrink-0 w-[150px]">
            <ViewRepoButton />
            {/* TODO: Uncomment this and/or replace when new UI is specified */}
            {/* {nid && <FlagButton appId={appId} nid={nid} />} */}
            <ShowReadmeButton className="mt-auto" />
          </div>
        </div>

        {/* Mobile layout - stacked (hidden on desktop) */}
        <div className="md:hidden">
          {/* Title, org, date */}
          <h3 className="text-xl font-sans font-bold text-appverse-black mb-1">
            {title}
          </h3>
          {organization && (
            <p className="text-sm font-sans text-appverse-black mb-2">
              {organization.name}
            </p>
          )}
          {formattedDate && (
            <p className="text-sm font-sans text-appverse-black">
              <span className="font-semibold">LAST COMMIT:</span> {formattedDate}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-4">
              <TagList />
            </div>
          )}

          {/* Action buttons (horizontal row) */}
          <div className="flex flex-row flex-wrap gap-4 mt-4">
            <ViewRepoButton />
            {nid && <FlagButton appId={appId} nid={nid} />}
            <ShowReadmeButton />
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
