/**
 * SoftwareHome Page
 * Main landing page showing software grid with search and filters
 */
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppverseData } from '../hooks/useAppverseData';
import { useSoftwareSearch } from '../hooks/useSoftwareSearch';
import ErrorMessage from '../components/common/ErrorMessage';
import SearchBar from '../components/home/SearchBar';
import FilterSidebar from '../components/home/FilterSidebar';
import FilterDrawer from '../components/home/FilterDrawer';
import SoftwareGrid from '../components/home/SoftwareGrid';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

export default function SoftwareHome() {
  // Get data from context
  const { software, appsBySoftwareId, filterOptions, loading, error, refetch } = useAppverseData();

  // Debug: Log render timing
  // console.log('[SoftwareHome] Render - loading:', loading, '| software count:', software?.length ?? 0);

  // URL params for filter persistence
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state for search
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  // Parse filters from URL params
  const filters = useMemo(() => {
    const parsed = {};
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'search') {
        // Support multiple values: ?tags=docker&tags=gpu
        if (parsed[key]) {
          parsed[key].push(value);
        } else {
          parsed[key] = [value];
        }
      }
    }
    return parsed;
  }, [searchParams]);

  // Check if any filter params exist in URL (excluding search)
  const hasFilterParams = useMemo(() => {
    for (const [key] of searchParams.entries()) {
      if (key !== 'search') {
        return true;
      }
    }
    return false;
  }, [searchParams]);

  // Local state for filter visibility
  // Default to hidden, but show if URL has filter params
  const [showFilters, setShowFilters] = useState(hasFilterParams);

  // Handle search change
  const handleSearchChange = (query) => {
    setSearchQuery(query);

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    const newParams = new URLSearchParams();

    // Preserve search query
    if (searchQuery) {
      newParams.set('search', searchQuery);
    }

    // Add filter params
    Object.entries(newFilters).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        values.forEach(value => {
          newParams.append(key, value);
        });
      }
    });

    setSearchParams(newParams);
  };

  // Apply search across software and apps
  // NOTE: To switch to server-side search, replace useSoftwareSearch with a different hook
  // that makes API calls with search parameters instead of filtering client-side
  const searchedSoftware = useSoftwareSearch(software, appsBySoftwareId, searchQuery);

  // Apply taxonomy filters to searched results
  const filteredSoftware = useMemo(() => {
    if (!searchedSoftware) return [];

    let filtered = [...searchedSoftware];

    // Apply Topics filter (directly on Software - only Software has topics)
    // Filter values are term names, not UUIDs
    if (filters.topics && filters.topics.length > 0) {
      filtered = filtered.filter(softwareItem => {
        const softwareTopicNames = softwareItem.topics?.map(t => t.name) || [];
        return filters.topics.some(topicName => softwareTopicNames.includes(topicName));
      });
    }

    // Apply Type filter (only Apps have type)
    // Need to look up app type names from the included data
    if (filters.appType && filters.appType.length > 0) {
      filtered = filtered.filter(softwareItem => {
        const softwareApps = appsBySoftwareId[softwareItem.id] || [];
        return softwareApps.some(app => {
          // App type name is resolved in the apps data
          const appTypeName = app.appType?.name;
          return appTypeName && filters.appType.includes(appTypeName);
        });
      });
    }

    // Apply Tags filter with OR logic:
    // Show software if Software has the tag (field_tags) OR any App has the tag (field_add_implementation_tags)
    // Filter values are term names, not UUIDs
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(softwareItem => {
        // Check Software's own tags (resolved names)
        const softwareTagNames = softwareItem.tags?.map(t => t.name) || [];
        const softwareHasTag = filters.tags.some(tagName => softwareTagNames.includes(tagName));
        if (softwareHasTag) return true;

        // Check Apps' tags (resolved names)
        const softwareApps = appsBySoftwareId[softwareItem.id] || [];
        const appHasTag = softwareApps.some(app => {
          const appTagNames = app.tags?.map(t => t.name) || [];
          return filters.tags.some(tagName => appTagNames.includes(tagName));
        });

        return appHasTag;
      });
    }

    // Sort alphabetically by title
    filtered.sort((a, b) => {
      const nameA = (a.title || '').toLowerCase();
      const nameB = (b.title || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });

    return filtered;
  }, [searchedSoftware, filters, appsBySoftwareId]);

  // Show error state
  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header section */}
      <div className="mx-6 mt-6 mb-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-serif font-bold text-appverse-black mb-2">
              Welcome to the Appverse
            </h1>
            <p className="text-base font-sans text-appverse-black max-w-2xl">
              The Open OnDemand Appverse is a community-driven catalog of scientific software, interactive applications, dashboards, and widgets with shared deployment configurations that HPC centers can use to extend their Open OnDemand portals.
            </p>
          </div>
          <a
            href="/node/add/appverse_app"
            className="w-full lg:w-auto text-center lg:flex-shrink-0 py-3 px-6 bg-appverse-red text-white font-sans font-semibold rounded-appverse hover:bg-red-700 transition-colors"
          >
            Add an app
          </a>
        </div>
      </div>

      {/* Search and filter toggle section */}
      <div className="mx-6 my-6 bg-appverse-black px-4 py-3 rounded-appverse">
        <div className="flex items-center justify-between gap-4">
          {/* Toggle filters button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-white font-sans font-medium hover:opacity-80 transition-opacity"
          >
            {showFilters ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Search bar */}
          <div className="w-80">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for apps"
            />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <FilterDrawer
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />

      {/* Main content: Sidebar + Grid */}
      <div className="mx-6 mb-6">
        <div className="flex gap-8">
          {/* Filter sidebar - desktop only (hidden on mobile, drawer handles it) */}
          {showFilters && (
            <div className="hidden lg:block">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                filterOptions={filterOptions}
              />
            </div>
          )}

          {/* Software grid */}
          <main className="flex-1 min-w-0">
            {/* Grid */}
            <SoftwareGrid
              software={filteredSoftware}
              appsBySoftwareId={appsBySoftwareId}
              loading={loading}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
