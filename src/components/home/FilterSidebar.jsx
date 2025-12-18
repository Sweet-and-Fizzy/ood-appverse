/**
 * FilterSidebar Component
 * Displays filter options for software browsing
 *
 * NOTE: These filters are UI-only placeholders. The backend doesn't
 * currently provide the necessary fields (topics, tags, institution).
 * This component is structured to be URL-param ready for future functionality.
 *
 * Props:
 * @param {Object} filters - Current filter values
 * @param {Function} onFilterChange - Callback when filters change
 */
export default function FilterSidebar({ filters, onFilterChange }) {
  // Placeholder data - these will eventually come from API
  const filterSections = [
    {
      title: 'Topics',
      key: 'topics',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Bioinformatics (20)', value: 'bioinformatics' },
        { label: 'Biological Sciences (18)', value: 'biological-sciences' },
        { label: 'Biology (12)', value: 'biology' },
        { label: 'Computer Science (10)', value: 'computer-science' },
        { label: 'Earth & Environmental (10)', value: 'earth-environmental' },
        { label: 'Engineering & Technology (10)', value: 'engineering-technology' },
        { label: 'Mathematics (8)', value: 'mathematics' },
        { label: 'Physical Sciences', value: 'physical-sciences' }
      ]
    },
    {
      title: 'Type',
      key: 'type',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Batch Connect', value: 'batch-connect' },
        { label: 'Passenger App', value: 'passenger-app' },
        { label: 'Licensed Software', value: 'licensed_software' },
        { label: 'Open-source Software', value: 'open_source_software' },
        { label: 'Widget', value: 'widget' },
        { label: 'Dashboard', value: 'dashboard' }
      ]
    },
    {
      title: 'Tags',
      key: 'tags',
      options: [
        { label: 'All', value: 'all' },
        { label: 'parallel-computing', value: 'parallel-computing' },
        { label: 'cloud-computing', value: 'cloud-computing' },
        { label: 'workflow-management', value: 'workflow-management' },
        { label: 'data-analysis', value: 'data-analysis' }
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
          Topics
        </h2>

        {filterSections.map((section) => (
          <div key={section.key} className="mb-8">
            {section.key !== 'topics' && (
              <h3 className="text-sm font-sans font-semibold text-appverse-black mb-3 uppercase tracking-wide">
                {section.title}
              </h3>
            )}

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

            {section.key === 'topics' && (
              <button className="mt-3 text-sm font-sans text-appverse-blue hover:text-appverse-red transition-colors">
                See 10 More
              </button>
            )}
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
