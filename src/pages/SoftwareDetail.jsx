/**
 * SoftwareDetail Page
 * Displays software details and list of implementing apps
 *
 * URL pattern: /:slug (e.g., /gimp)
 *
 * Query params:
 * - ?app=<slug|uuid> - Expands the README for a specific app
 */
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Link45deg, Check2 } from 'react-bootstrap-icons';
import { fetchAppsBySoftware } from '../utils/api';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isUUID(str) { return UUID_RE.test(str); }
import { useAppverseData } from '../hooks/useAppverseData';
import { useConfig } from '../contexts/ConfigContext';
import { useTracking } from '../hooks/useTracking';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { slugify } from '../utils/slugify';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SoftwareHeader from '../components/detail/SoftwareHeader';
import AppList from '../components/detail/AppList';

export default function SoftwareDetail() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const config = useConfig();
  const { getSoftwareBySlug, loading: contextLoading } = useAppverseData();
  const track = useTracking();

  // Software comes from cache (already loaded in context)
  const software = contextLoading ? null : getSoftwareBySlug(slug);

  const [apps, setApps] = useState([]);
  const [appsLoading, setAppsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Get expanded app param from URL (could be UUID or slug)
  const expandedAppParam = searchParams.get('app');

  // Fetch apps via JSON:API (need README, org, license — not in cache)
  useEffect(() => {
    if (!software) return;

    setAppsLoading(true);
    setError(null);

    fetchAppsBySoftware(software.id, config)
      .then(data => setApps(data))
      .catch(err => {
        console.error('Failed to fetch apps:', err);
        setError(err);
      })
      .finally(() => setAppsLoading(false));
  }, [software?.id, config]);

  // Track software detail view once both software and apps have loaded
  const trackedSoftwareId = useRef(null);
  useEffect(() => {
    if (software?.id && !appsLoading && trackedSoftwareId.current !== software.id) {
      trackedSoftwareId.current = software.id;
      track('software_detail_view', {
        software_title: software.title,
        software_slug: slug,
        app_count: apps.length
      });
    }
  }, [software, apps.length, appsLoading, slug, track]);

  // Build app slug maps for URL-friendly ?app= params
  // Format: "org-name--app-title" or just "app-title" if no org
  const { appSlugToId, appIdToSlug } = useMemo(() => {
    const slugToId = {};
    const idToSlug = {};

    for (const app of apps) {
      const title = app.title || '';
      const orgName = app.organization?.name || '';

      // Generate slug: "org--title" or just "title"
      const slug = orgName
        ? `${slugify(orgName)}--${slugify(title)}`
        : slugify(title);

      slugToId[slug] = app.id;
      idToSlug[app.id] = slug;
    }

    return { appSlugToId: slugToId, appIdToSlug: idToSlug };
  }, [apps]);

  // Resolve expandedAppParam to an app ID (handles both UUID and slug)
  const expandedAppId = useMemo(() => {
    if (!expandedAppParam) return null;

    // If it's a UUID, use directly
    if (isUUID(expandedAppParam)) {
      return expandedAppParam;
    }

    // Otherwise, look up slug → ID
    return appSlugToId[expandedAppParam] || null;
  }, [expandedAppParam, appSlugToId]);

  // Update document metatags for social sharing
  const expandedApp = useMemo(() => {
    if (!expandedAppId || !apps.length) return null;
    return apps.find(a => a.id === expandedAppId) || null;
  }, [expandedAppId, apps]);

  const documentMeta = useMemo(() => {
    if (!software) return null;
    const siteBaseUrl = config.siteBaseUrl || '';
    const logoUrl = software.logoUrl || '';

    if (expandedApp) {
      const appTitle = expandedApp.title || '';
      const appDesc = (expandedApp.body || '').replace(/<[^>]+>/g, '');
      const appSlug = expandedAppParam || '';
      return {
        title: `${appTitle} | Appverse`,
        description: appDesc,
        og_title: `${appTitle} | Appverse`,
        og_description: appDesc,
        og_image: logoUrl,
        og_url: `${siteBaseUrl}/appverse/${slug}?app=${appSlug}`,
      };
    }

    const title = software.title || '';
    const description = (software.body || '').replace(/<[^>]+>/g, '');
    return {
      title: `${title} | Appverse`,
      description,
      og_title: `${title} | Appverse`,
      og_description: description,
      og_image: logoUrl,
      og_url: `${siteBaseUrl}/appverse/${slug}`,
    };
  }, [software, slug, config.siteBaseUrl, expandedApp, expandedAppParam]);
  useDocumentMeta(documentMeta);

  // Handle app toggle - uses slug in URL
  const handleToggleApp = (appId) => {
    const newParams = new URLSearchParams(searchParams);
    const appSlug = appIdToSlug[appId];

    if (expandedAppId === appId) {
      newParams.delete('app');
    } else {
      newParams.set('app', appSlug || appId);
    }

    setSearchParams(newParams, { replace: true });
  };

  // Build canonical share URL (Drupal node path, not SPA hash)
  const shareUrl = slug
    ? `${window.location.origin}/appverse/${slug}`
    : window.location.href;

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      track('share_link_copy', { software_title: software?.title, share_url: shareUrl });
      setTimeout(() => setCopied(false), 2000);
    });
  }, [shareUrl, software, track]);

  // Handle retry (re-fetch apps)
  const handleRetry = () => {
    if (!software) return;
    setApps([]);
    setAppsLoading(true);
    setError(null);

    fetchAppsBySoftware(software.id, config)
      .then(data => setApps(data))
      .catch(err => setError(err))
      .finally(() => setAppsLoading(false));
  };

  // Show loading while cache is loading
  if (contextLoading) {
    return <LoadingSpinner message="Loading software details..." />;
  }

  // Show error state
  if (error) {
    return <ErrorMessage error={error} onRetry={handleRetry} />;
  }

  // Show not found if no software
  if (!software) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] py-12 px-4">
        <h2 className="text-2xl font-serif text-appverse-black mb-2">
          Software Not Found
        </h2>
        <p className="text-appverse-black text-center max-w-md">
          The software you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-4 bg-white">
      <div className="px-6 py-8">
        {/* Header row with back link and add app button */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-appverse-black hover:text-appverse-red transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Software
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="py-3 px-6 border-2 border-appverse-red text-appverse-red font-sans font-semibold rounded-appverse hover:bg-appverse-red hover:text-white transition-colors inline-flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check2 className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Link45deg className="w-4 h-4" />
                  Share
                </>
              )}
            </button>
            <a
              href="/node/add/appverse_app"
              className="py-3 px-6 bg-appverse-red text-white font-sans font-semibold rounded-appverse hover:bg-red-700 transition-colors"
            >
              Add an app
            </a>
          </div>
        </div>

        {/* Two-column layout per mockup - stacks on mobile */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left column - Software info sidebar */}
          <div className="w-full lg:w-[280px] lg:flex-shrink-0">
            <SoftwareHeader software={software} />
          </div>

          {/* Right column - App list */}
          <div className="flex-1 min-w-0">
            <AppList
              apps={apps}
              expandedAppId={expandedAppId}
              onToggleApp={handleToggleApp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
