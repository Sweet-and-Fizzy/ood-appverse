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
import { Link } from 'react-router-dom';
import OrgLink from '../common/OrgLink';
import { slugify } from '../../utils/slugify';
import { repoLabel } from '../../utils/repoLabel';
import { ChevronRight, People, StarFill } from 'react-bootstrap-icons';
import MarkdownRenderer from '../common/MarkdownRenderer';
import FlagButton from '../common/FlagButton';
import { useFlag } from '../../contexts/FlagContext';
import { useTracking } from '../../hooks/useTracking';
import { useAppverseData } from '../../hooks/useAppverseData';

export default function AppRow({ app, isExpanded, onToggle, hideRepoLevel = false }) {
  const { getFlagCountAdjustment } = useFlag();
  const { repos, software } = useAppverseData();
  const track = useTracking();

  // Resolve the parent Repo for the "Part of X Repo" link
  // (cache stores repoId/repoTitle; slug requires runtime lookup)
  const parentRepo = app.repoId
    ? repos.find((c) => c.id === app.repoId)
    : null;

  // Show a Monorepo affiliation under the title in the software listing.
  // Only for multi-app repos (repoLabel returns 'Monorepo'); single-app
  // repos get no line. Suppressed on the Repo detail page (hideRepoLevel),
  // where the parent is already the page context.
  const isMonorepo = parentRepo && repoLabel(parentRepo) === 'Monorepo';

  // Resolve the software this app implements, for the logo + Software detail link.
  const implementedSoftware = app.softwareId
    ? (software || []).find((s) => s.id === app.softwareId)
    : null;

  const title = app.title || 'Untitled App';
  const githubUrl = app.githubUrl;
  // Raw markdown content for README
  const readme = app.readme;
  const lastUpdated = app.lastUpdated;
  const baseFlagCount = app.flagCount || 0;
  // Adjust flag count based on user's flag actions (updated after server confirms)
  const flagCount = baseFlagCount + getFlagCountAdjustment(app.id);
  const githubStars = app.stars ?? 0;

  // Resolved taxonomy terms from API
  const organization = app.organization;
  const maintainerName = app.maintainerName;
  const tags = app.tags || [];

  // App identifiers for flagging
  const appId = app.id; // UUID
  const nid = app.nid; // needed for entity_id when creating a flagging

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

  const ReportIssueButton = () => githubUrl && (
    <a
      href={`${githubUrl}/issues`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('report_issue', { app_title: title, github_url: githubUrl })}
      className="inline-flex items-center gap-2 text-appverse-black visited:text-appverse-black hover:text-gray-600 transition-colors font-sans font-semibold text-sm whitespace-nowrap"
    >
      <span className="grid place-items-center w-5 h-5 rounded-full bg-appverse-red">
        <ChevronRight className="w-3.5 h-3 text-white" style={{ stroke: 'white', strokeWidth: 1, transform: 'translateX(0.5px)' }} />
      </span>
      REPORT AN ISSUE
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

  const SoftwareLink = () => implementedSoftware && (
    <Link
      to={`/${slugify(implementedSoftware.title)}`}
      onClick={() => track('software_click_from_app', {
        app_title: title,
        software_title: implementedSoftware.title,
      })}
      className="inline-flex items-center gap-1.5 text-sm font-sans text-appverse-black hover:text-gray-600 transition-colors"
    >
      {implementedSoftware.logoUrl && (
        <img
          src={implementedSoftware.logoUrl}
          alt=""
          className="h-4 w-4 object-contain"
          loading="lazy"
        />
      )}
      <span>{implementedSoftware.title}</span>
    </Link>
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
          {/* Left column: title, software, org, show readme */}
          <div className="flex-1 min-w-0 flex flex-col">
            <h3 className="text-xl font-sans font-bold text-appverse-black mb-1">
              {title}
            </h3>
            {hideRepoLevel && implementedSoftware && (
              <div className="mb-1">
                <SoftwareLink />
              </div>
            )}
            {!hideRepoLevel && organization && (
              <p className="text-sm font-sans text-appverse-black">
                <OrgLink name={organization.name} />
              </p>
            )}
            {!hideRepoLevel && isMonorepo && (
              <p className="text-sm font-sans text-appverse-black">
                Part of{' '}
                <Link to={`/repo/${parentRepo.slug}`} className="text-appverse-red hover:underline">
                  {parentRepo.title} Monorepo
                </Link>
              </p>
            )}
            {hideRepoLevel && maintainerName && (
              <p className="flex items-center gap-1 text-sm font-sans text-appverse-black">
                <People className="w-3.5 h-3.5" />
                <span>{maintainerName}</span>
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

          {/* Right column: view repo, report issue + stats box */}
          <div className="flex flex-col gap-2 flex-shrink-0 items-start">
            {!hideRepoLevel && <ViewRepoButton />}
            <ReportIssueButton />
            <div className="bg-appverse-gray/30 rounded px-3 py-2 text-sm font-sans text-appverse-black min-w-[160px]">
              {!hideRepoLevel && (
                <p className="flex items-center gap-1">
                  <span className="font-bold">{githubStars}</span> <StarFill className="w-3 h-3" /> on GitHub
                </p>
              )}
              <p className="flex items-center justify-between">
                <span><span className="font-bold">{flagCount}</span> reported usages</span>
                {nid && <FlagButton appId={appId} nid={nid} compact />}
              </p>
              {!hideRepoLevel && formattedDate && (
                <p><span className="font-bold">{formattedDate}</span> last commit</p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile layout - stacked (hidden on desktop) */}
        <div className="md:hidden">
          {/* Stacked on small screens, side-by-side on sm+ */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
            {/* Left: Title, org, tags, buttons */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-sans font-bold text-appverse-black mb-1">
                {title}
              </h3>
              {hideRepoLevel && implementedSoftware && (
                <div className="mb-2">
                  <SoftwareLink />
                </div>
              )}
              {!hideRepoLevel && organization && (
                <p className="text-sm font-sans text-appverse-black mb-2">
                  <OrgLink name={organization.name} />
                </p>
              )}
              {!hideRepoLevel && isMonorepo && (
                <p className="text-sm font-sans text-appverse-black mb-2">
                  Part of{' '}
                  <Link to={`/repo/${parentRepo.slug}`} className="text-appverse-red hover:underline">
                    {parentRepo.title} Monorepo
                  </Link>
                </p>
              )}
              {hideRepoLevel && maintainerName && (
                <p className="flex items-center gap-1 text-sm font-sans text-appverse-black mb-2">
                  <People className="w-3.5 h-3.5" />
                  <span>{maintainerName}</span>
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
                {!hideRepoLevel && <ViewRepoButton />}
                <ReportIssueButton />
                <ShowReadmeButton />
              </div>
            </div>

            {/* Stats box - full width on small screens, sidebar on sm+ */}
            <div className="bg-appverse-gray/30 rounded px-3 py-2 text-sm font-sans text-appverse-black sm:min-w-[160px] sm:w-fit sm:flex-shrink-0">
              {!hideRepoLevel && (
                <p className="flex items-center gap-1">
                  <span className="font-bold">{githubStars}</span> <StarFill className="w-3 h-3" /> on GitHub
                </p>
              )}
              <p className="flex items-center justify-between">
                <span><span className="font-bold">{flagCount}</span> reported usages</span>
                {nid && <FlagButton appId={appId} nid={nid} compact />}
              </p>
              {!hideRepoLevel && formattedDate && (
                <p><span className="font-bold">{formattedDate}</span> last commit</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expansion metadata - "Part of X Repo" link.
          Only shown on Software detail (hideRepoLevel=false); on the Repo
          detail page the user is already viewing the parent, so the line
          is redundant. */}
      {isExpanded && parentRepo && !hideRepoLevel && (
        <div className="border-t border-appverse-gray !px-5 !py-3 bg-white">
          <p className="text-sm font-sans text-appverse-black mt-2">
            Part of{' '}
            <Link
              to={`/repo/${parentRepo.slug}`}
              className="text-appverse-red hover:underline"
            >
              {parentRepo.title} {repoLabel(parentRepo)}
            </Link>
          </p>
        </div>
      )}

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
