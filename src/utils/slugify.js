/**
 * Convert a string to a URL-friendly slug
 * @param {string} str - String to slugify (e.g., "AlphaFold", "LAMMPS")
 * @returns {string} Slug (e.g., "alphafold", "lammps")
 */
export function slugify(str) {
  if (!str) return '';

  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove non-word chars (except spaces and hyphens)
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/-+/g, '-')        // Collapse multiple hyphens
    .replace(/^-|-$/g, '');     // Remove leading/trailing hyphens
}

