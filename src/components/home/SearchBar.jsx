/**
 * SearchBar Component
 * Provides text search input for filtering software
 *
 * Props:
 * @param {string} value - Current search value
 * @param {Function} onChange - Callback when search changes
 * @param {string} placeholder - Placeholder text
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search software...'
}) {
  return (
    <div className="relative w-full max-w-2xl">
      {/* Search input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-4 pr-12 py-2 border border-gray-300 bg-white rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 hover:border-gray-400 focus:ring-0 transition-colors"
      />

      {/* Search icon */}
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <svg
          className="h-4 w-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
