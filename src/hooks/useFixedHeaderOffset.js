/**
 * useFixedHeaderOffset Hook
 * Detects fixed/sticky headers on the page and returns their combined height as an offset.
 * Useful for positioning fixed elements (like drawers) below existing headers.
 *
 * Currently detects:
 * - Drupal primary navbar: nav.navbar.fixed-top
 * - Drupal secondary navbar: nav.navbar.secondary-nav
 *
 * @returns {number} The total height in pixels to offset from the top
 */
import { useState, useEffect } from 'react';

// Selectors for fixed/sticky headers to detect
const FIXED_HEADER_SELECTORS = [
  'nav.navbar.fixed-top',
  'nav.navbar.secondary-nav',
  // Add other fixed header selectors here as needed
];

export function useFixedHeaderOffset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const detectHeaderOffset = () => {
      let totalOffset = 0;

      for (const selector of FIXED_HEADER_SELECTORS) {
        const element = document.querySelector(selector);
        if (element) {
          // Get the element's bounding rect to account for actual rendered height
          const rect = element.getBoundingClientRect();
          // Only add if element is at or near top of viewport (is actually fixed/sticky)
          if (rect.top >= 0 && rect.top < 100) {
            totalOffset = Math.max(totalOffset, rect.bottom);
          } else if (rect.top < 0) {
            // Element starts above viewport, add its visible portion
            totalOffset = Math.max(totalOffset, rect.bottom);
          }
        }
      }

      setOffset(totalOffset);
    };

    // Detect on mount
    detectHeaderOffset();

    // Re-detect on resize (header height might change)
    window.addEventListener('resize', detectHeaderOffset);
    return () => window.removeEventListener('resize', detectHeaderOffset);
  }, []);

  return offset;
}
