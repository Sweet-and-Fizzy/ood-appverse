/**
 * useFixedHeaderOffset Hook
 * Detects fixed/sticky headers on the page and returns their height as an offset.
 * Useful for positioning fixed elements (like drawers) below existing headers.
 *
 * Currently detects:
 * - Drupal navbar: nav.navbar.fixed-top
 *
 * @returns {number} The height in pixels to offset from the top
 */
import { useState, useEffect } from 'react';

export function useFixedHeaderOffset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const detectHeaderOffset = () => {
      // Check for Drupal's fixed navbar
      const drupalHeader = document.querySelector('nav.navbar.fixed-top');
      if (drupalHeader) {
        setOffset(drupalHeader.offsetHeight);
        return;
      }

      // Add other fixed header selectors here as needed
      // e.g., '.site-header.sticky', '#main-nav.fixed', etc.

      setOffset(0);
    };

    // Detect on mount
    detectHeaderOffset();

    // Re-detect on resize (header height might change)
    window.addEventListener('resize', detectHeaderOffset);
    return () => window.removeEventListener('resize', detectHeaderOffset);
  }, []);

  return offset;
}
