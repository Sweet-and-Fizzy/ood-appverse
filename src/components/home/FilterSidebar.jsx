/**
 * FilterSidebar Component
 * Displays filter options for software browsing
 *
 * Props:
 * @param {Object} filters - Current filter values (keyed by filter type, values are arrays of term names)
 * @param {Function} onFilterChange - Callback when filters change
 * @param {Object} filterOptions - Available filter options from API
 * @param {Array} filterOptions.tags - [{id, name}, ...]
 * @param {Array} filterOptions.appType - [{id, name}, ...]
 */
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';

export default function FilterSidebar({ filters, onFilterChange, filterOptions = {} }) {
  // Track which sections are expanded (header collapse/expand)
  // Default all sections to expanded so users see all filter options
  const [expandedSections, setExpandedSections] = useState({
    topics: true,
    appType: true,
    tags: true
  });

  // Number of items before we make the list scrollable
  const SCROLL_THRESHOLD = 8;

  // Refs to scrollable containers for each section
  const scrollContainerRefs = useRef({});

  // Scroll first selected filter into view on initial load
  const hasScrolledRef = useRef(false);
  useEffect(() => {
    if (hasScrolledRef.current) return;

    const hasActiveFilters = Object.keys(filters).some(key => filters[key]?.length > 0);
    if (!hasActiveFilters) {
      // console.log('[FilterSidebar] No active filters, skipping scroll');
      return;
    }

    // Check if filterOptions has data (needed for checkboxes to exist)
    const hasFilterOptions = Object.keys(filterOptions).some(key => filterOptions[key]?.length > 0);
    if (!hasFilterOptions) {
      // console.log('[FilterSidebar] No filter options yet, waiting...');
      return;
    }

    // console.log('[FilterSidebar] Attempting scroll - filters:', filters, 'filterOptions keys:', Object.keys(filterOptions));

    // Use requestAnimationFrame to ensure DOM has painted, then a small delay for Drupal
    const attemptScroll = () => {
      // console.log('[FilterSidebar] Running scroll attempt');
      let scrolledAny = false;

      Object.keys(filters).forEach(sectionKey => {
        const container = scrollContainerRefs.current[sectionKey];
        // console.log(`[FilterSidebar] Section "${sectionKey}" - container:`, !!container);

        if (!container) return;

        // Find the first selected value for this section
        const firstValue = filters[sectionKey]?.[0];
        if (!firstValue) {
          // console.log(`[FilterSidebar] Section "${sectionKey}" - no first value`);
          return;
        }

        // Find the checkbox with this value and scroll its label into view
        const selector = `input[data-value="${CSS.escape(firstValue)}"]`;
        const checkbox = container.querySelector(selector);
        // console.log(`[FilterSidebar] Section "${sectionKey}" - looking for "${firstValue}", found:`, !!checkbox);

        if (checkbox) {
          const label = checkbox.closest('label');
          if (label) {
            label.scrollIntoView({ block: 'center', behavior: 'instant' });
            // console.log(`[FilterSidebar] Scrolled "${firstValue}" into view in section "${sectionKey}"`);
            scrolledAny = true;
          }
        }
      });

      if (scrolledAny) {
        hasScrolledRef.current = true;
      }
    };

    // Wait for React to commit, then wait for browser paint, then scroll
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          attemptScroll();
        });
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [filters, filterOptions]);

  // Build filter sections from API data (per mockup: Topics, Type, Tags)
  // Use term name as value for URL-friendly params (not UUIDs)
  const filterSections = [
    filterOptions.topics?.length > 0 && {
      key: 'topics',
      title: 'Topics',
      options: filterOptions.topics.map(item => ({
        value: item.name,  // Use name for URL params
        label: item.name.replace(/_/g, ' ')  // "engineering_and_technology" → "engineering and technology"
      }))
    },
    filterOptions.appType?.length > 0 && {
      key: 'appType',
      title: 'Type',
      options: filterOptions.appType.map(item => ({
        value: item.name,  // Use name for URL params
        label: item.name.replace(/_/g, ' ')  // "batch_connect" → "batch connect"
      }))
    },
    filterOptions.tags?.length > 0 && {
      key: 'tags',
      title: 'Tags',
      options: filterOptions.tags.map(item => ({
        value: item.name,  // Use name for URL params
        label: item.name
      }))
    }
  ].filter(Boolean);  // Remove falsy entries

  const handleCheckboxChange = (sectionKey, optionValue, isChecked) => {
    // Handle "All" selection
    if (optionValue === 'all') {
      const newFilters = { ...filters };
      delete newFilters[sectionKey];
      onFilterChange(newFilters);
      return;
    }

    const currentValues = filters[sectionKey] || [];
    const newValues = isChecked
      ? [...currentValues, optionValue]
      : currentValues.filter(v => v !== optionValue);

    onFilterChange({
      ...filters,
      [sectionKey]: newValues.length > 0 ? newValues : undefined
    });
  };

  const isChecked = (sectionKey, optionValue) => {
    if (optionValue === 'all') {
      return !filters[sectionKey] || filters[sectionKey].length === 0;
    }
    return (filters[sectionKey] || []).includes(optionValue);
  };

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2">

        {filterSections.map((section) => {
          const isExpanded = expandedSections[section.key];

          return (
            <div key={section.key} className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSections({
                  ...expandedSections,
                  [section.key]: !isExpanded
                })}
                className="w-full flex items-center justify-between bg-gray-100 px-4 py-2 hover:bg-gray-200 transition-colors"
              >
                <h3 className="text-base font-serif font-bold text-gray-900">
                  {section.title} ({section.options.length})
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              {isExpanded && (
                <div
                  ref={el => scrollContainerRefs.current[section.key] = el}
                  className={`px-4 py-3 space-y-2 ${section.options.length > SCROLL_THRESHOLD ? 'max-h-64 overflow-y-auto' : ''}`}
                >
                  {section.options.map((option) => {
                    const checked = isChecked(section.key, option.value);

                    return (
                      <label
                        key={option.value}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          data-value={option.value}
                          checked={checked}
                          onChange={(e) => handleCheckboxChange(
                            section.key,
                            option.value,
                            e.target.checked
                          )}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="ml-3 text-sm font-sans text-gray-900">
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Clear filters button (only show if filters are active) */}
        {Object.keys(filters).some(key => filters[key]?.length > 0) && (
          <button
            onClick={() => onFilterChange({})}
            className="w-full mt-4 px-4 py-2 text-sm font-sans font-semibold text-appverse-red border-2 border-appverse-red rounded-appverse hover:bg-appverse-pink transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  );
}
