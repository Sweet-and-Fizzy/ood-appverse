import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppverseData } from '../hooks/useAppverseData';
import { useBrowseFilters } from '../hooks/useBrowseFilters';
import { useTracking } from '../hooks/useTracking';
import ErrorMessage from '../components/common/ErrorMessage';
import BrowseTabs from '../components/common/BrowseTabs';
import SearchBar from '../components/home/SearchBar';
import FilterSidebar from '../components/home/FilterSidebar';
import FilterDrawer from '../components/home/FilterDrawer';
import RepoGrid from '../components/home/RepoGrid';
import { deriveAvailableOptions } from '../utils/deriveFilterOptions';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

export default function ReposHome() {
  const { repos, software, filterOptions, loading, error, refetch } = useAppverseData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const filters = useMemo(() => {
    const parsed = {};
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'search') {
        if (parsed[key]) parsed[key].push(value);
        else parsed[key] = [value];
      }
    }
    return parsed;
  }, [searchParams]);

  const hasFilterParams = useMemo(() => {
    for (const [key] of searchParams.entries()) {
      if (key !== 'search') return true;
    }
    return false;
  }, [searchParams]);

  const track = useTracking();
  const searchTimerRef = useRef(null);
  const resultCountRef = useRef(0);

  useEffect(() => () => clearTimeout(searchTimerRef.current), []);
  useEffect(() => { track('repos_view'); }, [track]);

  const [showFilters, setShowFilters] = useState(hasFilterParams);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) newParams.set('search', query);
    else newParams.delete('search');
    setSearchParams(newParams);

    clearTimeout(searchTimerRef.current);
    if (query) {
      searchTimerRef.current = setTimeout(() => {
        track('search', { search_query: query, result_count: resultCountRef.current, scope: 'repos' });
      }, 500);
    }
  };

  const handleFilterChange = useCallback((newFilters) => {
    // Diff old vs new filters for tracking
    const oldHadValues = Object.values(filters).some(v => v.length > 0);
    const newHasValues = Object.values(newFilters).some(v => Array.isArray(v) && v.length > 0);

    if (oldHadValues && !newHasValues) {
      // All filters cleared
      track('filter_clear_all');
    } else {
      // Find added/removed filter values
      const allKeys = new Set([...Object.keys(filters), ...Object.keys(newFilters)]);
      for (const key of allKeys) {
        const oldVals = filters[key] || [];
        const newVals = newFilters[key] || [];
        for (const v of newVals) {
          if (!oldVals.includes(v)) {
            track('filter_apply', { filter_type: key, filter_value: v });
          }
        }
        for (const v of oldVals) {
          if (!newVals.includes(v)) {
            track('filter_remove', { filter_type: key, filter_value: v });
          }
        }
      }
    }

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
  }, [filters, searchQuery, setSearchParams, track]);

  // Monorepos display: only repos with more than one app. This STRUCTURAL
  // filter runs BEFORE useBrowseFilters so single-app repos never enter
  // matching or option derivation. (Single-app repos stay in the cache for
  // RepoDetail/AppRow — this filter is display-only.)
  const monorepos = (repos || []).filter((r) => (r.apps?.length ?? 0) > 1);

  const displayedRepos = useBrowseFilters(monorepos, {
    kind: 'repo',
    searchQuery,
    filters: {
      topics: filters.topics || [],
      appType: filters.appType || [],
      tags: filters.tags || [],
      organizations: filters.organizations || [],
    },
    repos,
    software,
  });
  // Track the count actually shown.
  resultCountRef.current = displayedRepos.length;

  // Available filter options reflect the STRUCTURAL candidate set (monorepos),
  // NOT the search/facet-filtered result, so facets stay stable as the user
  // selects. Only options reachable from a displayed monorepo appear.
  const availableOptions = useMemo(
    () => deriveAvailableOptions(monorepos, 'repo', { software, repos }),
    [monorepos, software, repos]
  );

  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  return (
    <div className="mb-4 bg-white">
      <div className="mx-6 mt-6 mb-4">
        <h2 className="text-3xl font-serif font-bold text-appverse-black mb-2">Monorepos</h2>
        <p className="text-base font-sans text-appverse-black max-w-2xl">
          Browse Appverse apps grouped into Monorepos — source repositories that ship more than one app from one place.
        </p>
      </div>

      <div className="mx-6 my-6 bg-appverse-black px-4 py-3 rounded-appverse">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            onClick={() => {
              track('filter_toggle', { action: showFilters ? 'close' : 'open' });
              setShowFilters(!showFilters);
            }}
            className="flex items-center gap-2 text-white font-sans font-medium hover:opacity-80 transition-opacity"
          >
            {showFilters ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          <BrowseTabs />
          <div className="w-80">
            <SearchBar value={searchQuery} onChange={handleSearchChange} placeholder="Search Monorepos" />
          </div>
        </div>
      </div>

      <FilterDrawer
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        filterOptions={availableOptions}
      />

      <div className="mx-6 mb-6">
        <div className="flex gap-8">
          {showFilters && (
            <div className="hidden lg:block">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                filterOptions={availableOptions}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <RepoGrid repos={displayedRepos} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
