/**
 * SoftwareDetail Page
 * Displays software details and list of implementing apps
 *
 * URL pattern: /:slug (e.g., /gimp)
 *
 * Query params:
 * - ?app=<slug|uuid> - Expands the README for a specific app
 */
import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { fetchSoftwareById, fetchAppsBySoftware } from '../utils/api';
import { useAppverseData } from '../hooks/useAppverseData';
import { useConfig } from '../contexts/ConfigContext';
import { slugify } from '../utils/slugify';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SoftwareHeader from '../components/detail/SoftwareHeader';
import AppList from '../components/detail/AppList';

/**
 * Check if a string looks like a UUID
 */
function isUUID(str) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export default function SoftwareDetail() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get config for API calls
  const config = useConfig();

  // Get slugMap from context (for slug → software lookup)
  const { getSoftwareBySlug, loading: contextLoading } = useAppverseData();

  const [software, setSoftware] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get expanded app param from URL (could be UUID or slug)
  const expandedAppParam = searchParams.get('app');

  // Slug could be a human-readable slug (e.g., "gimp") or a UUID for backward compat
  const isSlugLookup = slug && !isUUID(slug);

  // Fetch software and apps data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        let softwareId = slug;
        let softwareData = null;

        if (isSlugLookup) {
          // Wait for context to load before looking up slug
          if (contextLoading) return;

          // Look up software by slug from context
          const contextSoftware = getSoftwareBySlug(slug);
          if (!contextSoftware) {
            setSoftware(null);
            setApps([]);
            setLoading(false);
            return;
          }
          softwareId = contextSoftware.id;

          // Fetch full software data (context has basic data, API has full data with resolved fields)
          softwareData = await fetchSoftwareById(softwareId, config);
        } else {
          // Direct UUID - fetch from API
          softwareData = await fetchSoftwareById(softwareId, config);
        }

        // Fetch apps
        const appsData = await fetchAppsBySoftware(softwareId, config);

        setSoftware(softwareData);
        setApps(appsData);
      } catch (err) {
        console.error('Failed to fetch software detail:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug, isSlugLookup, contextLoading, getSoftwareBySlug, config]);

  // Build app slug maps for URL-friendly ?app= params
  // Format: "org-name--app-title" or just "app-title" if no org
  const { appSlugToId, appIdToSlug } = useMemo(() => {
    const slugToId = {};
    const idToSlug = {};

    for (const app of apps) {
      const title = app.attributes?.title || '';
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

  // Handle app toggle - uses slug in URL
  const handleToggleApp = (appId) => {
    const newParams = new URLSearchParams(searchParams);
    const appSlug = appIdToSlug[appId];

    if (expandedAppId === appId) {
      // Collapse: remove app param
      newParams.delete('app');
    } else {
      // Expand: set app param (use slug if available, fallback to UUID)
      newParams.set('app', appSlug || appId);
    }

    setSearchParams(newParams);
  };

  // Handle retry
  const handleRetry = () => {
    // Re-trigger the fetch by clearing and setting software
    setSoftware(null);
    setApps([]);
    setLoading(true);
    setError(null);

    // Determine software ID (from slug if needed)
    let softwareId = slug;
    if (isSlugLookup) {
      const contextSoftware = getSoftwareBySlug(slug);
      if (!contextSoftware) {
        setError(new Error('Software not found'));
        setLoading(false);
        return;
      }
      softwareId = contextSoftware.id;
    }

    // Re-fetch
    fetchSoftwareById(softwareId, config)
      .then(data => setSoftware(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));

    fetchAppsBySoftware(softwareId, config)
      .then(data => setApps(data))
      .catch(err => console.error('Failed to fetch apps:', err));
  };

  // Show loading state
  // Also show spinner while context is loading for slug routes (needed to resolve slug → UUID)
  if (loading || (isSlugLookup && contextLoading)) {
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
    <div className="min-h-screen bg-white">
      <div className="px-6 py-8">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-appverse-black hover:text-appverse-red transition-colors mb-6"
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

        {/* Two-column layout per mockup */}
        <div className="flex gap-12">
          {/* Left column - Software info sidebar */}
          <div className="w-[280px] flex-shrink-0">
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
