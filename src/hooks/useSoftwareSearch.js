/**
 * useSoftwareSearch Hook
 *
 * Client-side search across software and app data.
 * This hook can be replaced with server-side search if needed.
 *
 * Search fields:
 * - Software title
 * - Software description (body text, HTML stripped)
 * - Software tags
 * - Software topics
 * - App titles
 * - App organizations
 * - App tags
 *
 * @param {Array} software - Array of software items with resolved data
 * @param {Object} appsBySoftwareId - Map of software ID to apps array
 * @param {string} searchQuery - Search query string
 * @returns {Array} Filtered software items matching the search query
 */

import { useMemo } from 'react';

/**
 * Strip HTML tags from a string
 */
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function useSoftwareSearch(software, appsBySoftwareId, searchQuery) {
  return useMemo(() => {
    if (!software) return [];
    if (!searchQuery || searchQuery.trim() === '') return software;

    const query = searchQuery.toLowerCase().trim();

    return software.filter(softwareItem => {
      // 1. Search software title
      const title = softwareItem.attributes?.title?.toLowerCase() || '';
      if (title.includes(query)) return true;

      // 2. Search software description (strip HTML first)
      const bodyProcessed = softwareItem.attributes?.body?.processed || '';
      const bodyValue = softwareItem.attributes?.body?.value || '';
      const description = stripHtml(bodyProcessed || bodyValue).toLowerCase();
      if (description.includes(query)) return true;

      // 3. Search software tags
      const softwareTags = softwareItem.tags?.map(t => t.name.toLowerCase()) || [];
      if (softwareTags.some(tag => tag.includes(query))) return true;

      // 4. Search software topics
      const softwareTopics = softwareItem.topics?.map(t => t.name.toLowerCase()) || [];
      if (softwareTopics.some(topic => topic.includes(query))) return true;

      // 5. Search apps associated with this software
      const apps = appsBySoftwareId[softwareItem.id] || [];
      for (const app of apps) {
        // Search app title
        const appTitle = app.attributes?.title?.toLowerCase() || '';
        if (appTitle.includes(query)) return true;

        // Search app organization
        const orgName = app.organization?.name?.toLowerCase() || '';
        if (orgName.includes(query)) return true;

        // Search app tags
        const appTags = app.tags?.map(t => t.name.toLowerCase()) || [];
        if (appTags.some(tag => tag.includes(query))) return true;
      }

      return false;
    });
  }, [software, appsBySoftwareId, searchQuery]);
}
