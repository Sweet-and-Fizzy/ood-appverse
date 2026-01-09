/**
 * FilterDrawer Component
 * Mobile-friendly drawer wrapper for FilterSidebar
 * Shows as slide-out overlay on mobile, passes through to inline sidebar on desktop
 */
import { useEffect } from 'react';
import { X } from 'react-bootstrap-icons';
import FilterSidebar from './FilterSidebar';
import { useFixedHeaderOffset } from '../../hooks/useFixedHeaderOffset';

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  filterOptions
}) {
  // Detect fixed header (e.g., Drupal navbar) to offset drawer position
  const headerOffset = useFixedHeaderOffset();

  // Prevent body scroll when drawer is open on mobile only
  useEffect(() => {
    // lg breakpoint is 1024px - only lock scroll on mobile
    const isMobile = () => window.innerWidth < 1024;

    const updateOverflow = () => {
      if (isOpen && isMobile()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    updateOverflow();
    window.addEventListener('resize', updateOverflow);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', updateOverflow);
    };
  }, [isOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - mobile only */}
      <div
        className="lg:hidden fixed inset-0 bg-black/50 z-40"
        style={{ top: headerOffset }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel - mobile only */}
      <div
        className="lg:hidden fixed left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white shadow-xl flex flex-col"
        style={{ top: headerOffset }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-serif font-bold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto p-4">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            filterOptions={filterOptions}
            isInDrawer={true}
          />
        </div>
      </div>
    </>
  );
}
