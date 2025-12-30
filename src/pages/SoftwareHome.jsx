/**
 * SoftwareHome Page
 * Main landing page showing software grid with search and filters
 */
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppverseData } from '../hooks/useAppverseData';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SearchBar from '../components/home/SearchBar';
import FilterSidebar from '../components/home/FilterSidebar';
import SoftwareGrid from '../components/home/SoftwareGrid';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

export default function SoftwareHome() {
  // Get data from context
  const { software, appsBySoftwareId, filterOptions, loading, error, refetch } = useAppverseData();

  // URL params for filter persistence
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state for search
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  // Local state for filter visibility
  const [showFilters, setShowFilters] = useState(true);

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

  // Filter software based on search and filters
  const filteredSoftware = useMemo(() => {
    if (!software) return [];

    let filtered = [...software];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.attributes?.title?.toLowerCase().includes(query)
      );
    }

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

    return filtered;
  }, [software, searchQuery, filters, appsBySoftwareId]);

  // Show loading state
  if (loading) {
    return <LoadingSpinner message="Loading software..." />;
  }

  // Show error state
  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header section */}
      <div className="mx-6 mt-6 mb-4">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-serif font-bold text-appverse-black mb-2">
              Welcome to the Appverse
            </h1>
            <p className="text-base font-sans text-appverse-black max-w-2xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
            </p>
          </div>
          <button
            className="flex-shrink-0 py-3 px-6 bg-appverse-red text-white font-sans font-semibold rounded-appverse hover:bg-red-700 transition-colors"
            onClick={() => {
              // TODO: Implement add app functionality
              alert('Add an App functionality coming soon!');
            }}
          >
            ADD AN APP
          </button>
        </div>
      </div>

      {/* Search and filter toggle section */}
      <div className="mx-6 my-6 bg-appverse-black px-6 py-3">
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

      {/* Main content: Sidebar + Grid */}
      <div className="mx-6 mb-6">
        <div className="flex gap-8">
          {/* Filter sidebar */}
          {showFilters && (
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              filterOptions={filterOptions}
            />
          )}

          {/* Software grid */}
          <main className="flex-1 min-w-0">
            {/* Grid */}
            <SoftwareGrid
              software={filteredSoftware}
              appsBySoftwareId={appsBySoftwareId}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
