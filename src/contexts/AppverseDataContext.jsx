/**
 * AppverseDataContext
 *
 * Provides global data for software and apps throughout the application.
 * Fetches both endpoints on mount and makes data available via context.
 *
 * Usage:
 *   import { useAppverseData } from '../hooks/useAppverseData'
 *   const { software, apps, appsBySoftwareId, loading, error } = useAppverseData()
 */
import { createContext, useState, useEffect, useMemo } from 'react';
import { fetchAllSoftware, fetchAllApps, groupAppsBySoftware, extractFilterOptionsFromApps, extractFilterOptionsFromSoftware } from '../utils/api';
import { slugify } from '../utils/slugify';
import { useConfig } from './ConfigContext';

export const AppverseDataContext = createContext(null);

/**
 * @typedef {Object} SoftwareItem
 * @property {string} id - UUID
 * @property {string} type - "node--appverse_software"
 * @property {Object} attributes
 * @property {string} attributes.title - Software name
 * @property {Object} attributes.body - {value: string, format: string, processed: string}
 * @property {Object} attributes.field_appverse_software_doc - {uri: string, title: string}
 * @property {Object} attributes.field_appverse_software_website - {uri: string, title: string}
 * @property {number} attributes.drupal_internal__nid - Drupal node ID
 * @property {string} attributes.created - ISO timestamp
 * @property {string} attributes.changed - ISO timestamp
 * @property {Object} relationships
 * @property {Object|null} relationships.field_appverse_logo - Logo media (type: "media--svg")
 * @property {Array} relationships.field_appverse_topics - Topics (taxonomy)
 * @property {Object|null} relationships.field_license - License (taxonomy)
 * @property {Array} relationships.field_tags - Tags (taxonomy)
 * @property {Array} relationships.field_domain_access - Domains
 * @property {string|null} logoUrl - Resolved logo URL (added by api.js)
 */

/**
 * @typedef {Object} AppItem
 * @property {string} id - UUID
 * @property {string} type - "node--appverse_app"
 * @property {Object} attributes
 * @property {string} attributes.title - App name
 * @property {Object} attributes.field_implementation_details - {value: string, format: string, processed: string}
 * @property {number} attributes.drupal_internal__nid - Drupal node ID
 * @property {string} attributes.created - ISO timestamp
 * @property {string} attributes.changed - ISO timestamp
 * @property {Object} relationships
 * @property {Object} relationships.field_appverse_software_implemen - Software reference
 * @property {Object|null} relationships.field_appverse_app_type - App type (taxonomy)
 * @property {Array} relationships.field_add_implementation_tags - Tags (taxonomy)
 * @property {Object|null} relationships.field_appverse_organization - Organization (taxonomy)
 * @property {Object|null} relationships.field_license - License (taxonomy)
 */

/**
 * @typedef {Object} AppverseData
 * @property {SoftwareItem[]} software - All software items with logo URLs resolved
 * @property {AppItem[]} apps - All app items
 * @property {Object.<string, AppItem[]>} appsBySoftwareId - Apps grouped by software UUID
 * @property {boolean} loading - Loading state
 * @property {Error|null} error - Error object if fetch failed
 * @property {Function} refetch - Function to manually refetch data
 */

export function AppverseDataProvider({ children }) {
  const config = useConfig();
  const [data, setData] = useState({
    software: [],
    apps: [],
    appsBySoftwareId: {},
    filterOptions: { tags: [], appType: [], topics: [], license: [] },
    loading: true,
    error: null
  });

  /**
   * Fetch all data from API
   */
  const fetchData = async () => {
    // console.log('[AppverseDataContext] Starting fetch...');
    setData(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Fetch both endpoints in parallel
      // console.log('[AppverseDataContext] Fetching software and apps...');
      const [softwareResult, appsResult] = await Promise.all([
        fetchAllSoftware(config),
        fetchAllApps(config)
      ]);
      // console.log('[AppverseDataContext] Fetch complete - software:', softwareResult.software.length, 'apps:', appsResult.apps.length);

      // Extract software and filter options from the result
      const { software, included: softwareIncluded } = softwareResult;
      const softwareFilterOptions = extractFilterOptionsFromSoftware(softwareIncluded);

      // Extract apps and filter options from the result
      const { apps, included: appsIncluded } = appsResult;
      const appsFilterOptions = extractFilterOptionsFromApps(appsIncluded);

      // Merge filter options from both sources
      // Tags exist on both Software (field_tags) and Apps (field_add_implementation_tags)
      // Merge and deduplicate by ID
      const allTagsMap = {};
      for (const tag of softwareFilterOptions.tags) {
        allTagsMap[tag.id] = tag;
      }
      for (const tag of appsFilterOptions.tags) {
        allTagsMap[tag.id] = tag;
      }
      const mergedTags = Object.values(allTagsMap).sort((a, b) => a.name.localeCompare(b.name));

      const filterOptions = {
        topics: softwareFilterOptions.topics,
        license: softwareFilterOptions.license,
        appType: appsFilterOptions.appType,
        tags: mergedTags
      };

      // Group apps by software ID
      const appsBySoftwareId = groupAppsBySoftware(apps);

      setData({
        software,
        apps,
        appsBySoftwareId,
        filterOptions,
        loading: false,
        error: null
      });

    } catch (error) {
      console.error('Failed to fetch AppVerse data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error
      }));
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Build slug map: slugify(title) → software object
  // This allows /appverse/abaqus to resolve to the correct software
  const slugMap = useMemo(() => {
    const map = {};
    for (const sw of data.software) {
      const title = sw.attributes?.title;
      if (title) {
        const slug = slugify(title);
        map[slug] = sw;
      }
    }
    return map;
  }, [data.software]);

  // Helper to get software by slug
  const getSoftwareBySlug = (slug) => {
    return slugMap[slug] || null;
  };

  const contextValue = {
    ...data,
    slugMap,
    getSoftwareBySlug,
    refetch: fetchData // Allow manual refetch if needed
  };

  return (
    <AppverseDataContext.Provider value={contextValue}>
      {children}
    </AppverseDataContext.Provider>
  );
}
