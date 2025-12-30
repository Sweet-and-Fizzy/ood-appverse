/**
 * FilterSidebar Component
 * Displays filter options for software browsing
 *
 * Props:
 * @param {Object} filters - Current filter values (keyed by filter type, values are arrays of IDs)
 * @param {Function} onFilterChange - Callback when filters change
 * @param {Object} filterOptions - Available filter options from API
 * @param {Array} filterOptions.tags - [{id, name}, ...]
 * @param {Array} filterOptions.appType - [{id, name}, ...]
 */
import { useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';

export default function FilterSidebar({ filters, onFilterChange, filterOptions = {} }) {
  // Track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    topics: true,   // Start expanded
    appType: true,  // Start expanded
    license: true,  // Start expanded
    tags: false
  });

  // Build filter sections from API data
  const filterSections = [
    filterOptions.topics?.length > 0 && {
      key: 'topics',
      title: 'Topics',
      options: filterOptions.topics.map(item => ({
        value: item.id,
        label: item.name.replace(/_/g, ' ')  // "engineering_and_technology" → "engineering and technology"
      }))
    },
    filterOptions.appType?.length > 0 && {
      key: 'appType',
      title: 'Type',
      options: filterOptions.appType.map(item => ({
        value: item.id,
        label: item.name.replace(/_/g, ' ')  // "batch_connect" → "batch connect"
      }))
    },
    filterOptions.license?.length > 0 && {
      key: 'license',
      title: 'License',
      options: filterOptions.license.map(item => ({
        value: item.id,
        label: item.name
      }))
    },
    filterOptions.tags?.length > 0 && {
      key: 'tags',
      title: 'Tags',
      options: filterOptions.tags.map(item => ({
        value: item.id,
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
    <aside className="w-64 pr-8 flex-shrink-0">
      <div className="sticky top-4">

        {filterSections.map((section) => {
          const isExpanded = expandedSections[section.key];

          return (
            <div key={section.key} className="mb-4">
              <button
                onClick={() => setExpandedSections({
                  ...expandedSections,
                  [section.key]: !isExpanded
                })}
                className="w-full flex items-center justify-between bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                <h3 className="text-base font-serif font-bold text-gray-900">
                  {section.title}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              {isExpanded && (
                <div className="mt-3 space-y-2 px-2">
                  {section.options.map((option) => {
                    const checked = isChecked(section.key, option.value);

                    return (
                      <label
                        key={option.value}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="checkbox"
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
