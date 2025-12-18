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
      {/* Search icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
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

      {/* Search input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border-2 border-appverse-gray rounded-appverse font-sans text-appverse-black placeholder-gray-400 focus:outline-none focus:border-appverse-red transition-colors"
      />

      {/* Clear button (only show when there's text) */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-appverse-black transition-colors"
          aria-label="Clear search"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
