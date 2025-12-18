/**
 * FilterSidebar Component
 * Displays filter options for software browsing
 *
 * NOTE: Only shows filters that are actually available in the API.
 * Currently only software type (open source vs licensed) is available.
 *
 * Props:
 * @param {Object} filters - Current filter values
 * @param {Function} onFilterChange - Callback when filters change
 */
import { useState } from 'react';

export default function FilterSidebar({ filters, onFilterChange }) {
  // Track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({ type: true });
  // Only show filters that actually exist in the API
  const filterSections = [
    {
      title: 'Type',
      key: 'type',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Open Source', value: 'open_source_software' },
        { label: 'Licensed Software', value: 'licensed_software' }
      ]
    }
  ];

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
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
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
