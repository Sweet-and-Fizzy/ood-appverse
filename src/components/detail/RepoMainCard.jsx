import { useRef, useEffect, useState } from 'react';
import { ChevronRight, People, StarFill } from 'react-bootstrap-icons';
import MarkdownRenderer from '../common/MarkdownRenderer';
import OrgLink from '../common/OrgLink';
import { useTracking } from '../../hooks/useTracking';

export default function RepoMainCard({ repo }) {
  const track = useTracking();
  const [isReadmeExpanded, setReadmeExpanded] = useState(false);
  const readmeRef = useRef(null);
  const [readmeHeight, setReadmeHeight] = useState(0);

  const repoUrl = repo.repoUrl;
  const readme = repo.readme;
  const stars = typeof repo.stars === 'number' ? repo.stars : null;
  const lastUpdated = repo.lastUpdated;
  const orgName = repo.organization?.name;
  const maintainerName = repo.maintainer?.name;
  const tags = repo.tags || [];

  // field_appverse_lastupdated is a Unix timestamp in SECONDS; JS needs ms.
  const formattedDate = lastUpdated
    ? new Date(lastUpdated * 1000).toLocaleDateString('en-US', {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
      })
    : null;

  // Measure README height for the smooth expand/collapse animation
  useEffect(() => {
    if (isReadmeExpanded && readmeRef.current) {
      setReadmeHeight(Math.min(readmeRef.current.scrollHeight, 350));
    } else {
      setReadmeHeight(0);
    }
  }, [isReadmeExpanded, readme]);

  return (
    <div className="border border-appverse-gray rounded-appverse overflow-hidden bg-white">
      {/* !p-5: Drupal theme has .p-5 with !important, so we need to override it */}
      <div className="!p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left: heading, org, maintainer, SHOW README */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-sans font-bold text-appverse-black mb-1">
              Main Repo
            </h3>
            {orgName && (
              <p className="text-sm font-sans text-appverse-black mb-1">
                <OrgLink name={orgName} />
              </p>
            )}
            {maintainerName && (
              <p className="flex items-center gap-1 text-sm font-sans text-appverse-black mb-2">
                <People className="w-3.5 h-3.5" />
                <span>{maintainerName}</span>
              </p>
            )}
            {readme && (
              <button
                onClick={() => {
                  track('readme_toggle', {
                    scope: 'repo',
                    repo_slug: repo.slug,
                    action: isReadmeExpanded ? 'collapse' : 'expand',
                  });
                  setReadmeExpanded(!isReadmeExpanded);
                }}
                className="inline-flex items-center gap-2 text-appverse-black hover:text-gray-600 transition-colors font-sans font-semibold text-sm whitespace-nowrap focus:outline-none mt-2"
              >
                <span
                  className={`grid place-items-center w-5 h-5 rounded-full bg-appverse-red transition-transform duration-200 ${
                    isReadmeExpanded ? 'rotate-90' : ''
                  }`}
                >
                  <ChevronRight
                    className="w-3.5 h-3 text-white"
                    style={{ stroke: 'white', strokeWidth: 1, transform: 'translateX(0.5px)' }}
                  />
                </span>
                {isReadmeExpanded ? 'HIDE README' : 'SHOW README'}
              </button>
            )}
          </div>

          {/* Middle: Repo-level tag chips */}
          {tags.length > 0 && (
            <div className="w-[180px] flex-shrink-0 flex flex-wrap gap-2 items-start">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2.5 py-1 text-xs font-sans text-appverse-black bg-appverse-gray rounded"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Right: VIEW REPO (top), stats box (below) */}
          <div className="flex flex-col gap-2 flex-shrink-0 items-start">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track('view_repo', {
                    scope: 'repo',
                    repo_slug: repo.slug,
                    github_url: repoUrl,
                  })
                }
                className="inline-flex items-center gap-2 text-appverse-black visited:text-appverse-black hover:text-gray-600 transition-colors font-sans font-semibold text-sm whitespace-nowrap"
              >
                <span className="grid place-items-center w-5 h-5 rounded-full bg-appverse-red">
                  <ChevronRight
                    className="w-3.5 h-3 text-white"
                    style={{ stroke: 'white', strokeWidth: 1, transform: 'translateX(0.5px)' }}
                  />
                </span>
                VIEW REPO
              </a>
            )}
            {(stars !== null || formattedDate) && (
              <div className="bg-appverse-gray/30 rounded px-3 py-2 text-sm font-sans text-appverse-black min-w-[160px]">
                {stars !== null && (
                  <p className="flex items-center gap-1">
                    <span className="font-bold">{stars}</span>{' '}
                    <StarFill className="w-3 h-3" /> on GitHub
                  </p>
                )}
                {formattedDate && (
                  <p>
                    <span className="font-bold">{formattedDate}</span> last commit
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dark README panel — animated height */}
      {readme && (
        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: isReadmeExpanded ? `${readmeHeight}px` : '0px' }}
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
