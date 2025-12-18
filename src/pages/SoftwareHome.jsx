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
  const { software, appsBySoftwareId, loading, error, refetch } = useAppverseData();

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

    // Apply type filter (only functional filter for now)
    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter(item =>
        filters.type.includes(item.attributes?.field_appverse_software_type)
      );
    }

    // Other filters (topics, tags) are not functional yet
    // They're in the UI but don't filter results

    return filtered;
  }, [software, searchQuery, filters]);

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
      {/* Search and filter toggle section */}
      <div className="mx-6 my-6 bg-appverse-black px-6 py-3 rounded-lg">
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
