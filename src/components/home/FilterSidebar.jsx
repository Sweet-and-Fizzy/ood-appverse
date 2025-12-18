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
export default function FilterSidebar({ filters, onFilterChange }) {
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
        <h2 className="text-xl font-serif font-bold text-appverse-black mb-6">
          Filters
        </h2>

        {filterSections.map((section) => (
          <div key={section.key} className="mb-8">
            <h3 className="text-sm font-sans font-semibold text-appverse-black mb-3 uppercase tracking-wide">
              {section.title}
            </h3>

            <div className="space-y-2">
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
                      className="w-4 h-4 text-appverse-red border-appverse-gray rounded focus:ring-appverse-red focus:ring-2"
                    />
                    <span className="ml-3 text-sm font-sans text-appverse-black group-hover:text-appverse-red transition-colors">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

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
