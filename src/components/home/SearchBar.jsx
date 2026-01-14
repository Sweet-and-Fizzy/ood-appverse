/**
 * SearchBar Component
 * Provides text search input for filtering software
 *
 * Props:
 * @param {string} value - Current search value
 * @param {Function} onChange - Callback when search changes
 * @param {string} placeholder - Placeholder text
 */
import { Search } from 'react-bootstrap-icons';

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
        className="w-full pl-4 pr-10 py-2 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 hover:border-gray-400 focus:ring-0 transition-colors rounded-appverse"
      />

      {/* Search icon */}
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-600" />
      </div>
    </div>
  );
}
