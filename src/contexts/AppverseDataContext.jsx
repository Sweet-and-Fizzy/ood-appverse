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
    softwareLoading: true,
    appsLoading: true,
    error: null
  });

  /**
   * Merge tags from two filter option sources, deduplicating by ID
   */
  const mergeTags = (existingTags, newTags) => {
    const tagMap = {};
    for (const tag of existingTags) tagMap[tag.id] = tag;
    for (const tag of newTags) tagMap[tag.id] = tag;
    return Object.values(tagMap).sort((a, b) => a.name.localeCompare(b.name));
  };

  /**
   * Fetch all data from API
   * Software and apps are fetched concurrently but update state independently
   * so the grid can render as soon as software arrives.
   */
  const fetchData = () => {
    setData(prev => ({ ...prev, softwareLoading: true, appsLoading: true, error: null }));

    // Fetch software — update state as soon as it resolves
    fetchAllSoftware(config)
      .then(({ software, included: softwareIncluded }) => {
        const softwareFilterOptions = extractFilterOptionsFromSoftware(softwareIncluded);
        setData(prev => ({
          ...prev,
          software,
          softwareLoading: false,
          filterOptions: {
            ...prev.filterOptions,
            topics: softwareFilterOptions.topics,
            license: softwareFilterOptions.license,
            tags: mergeTags(prev.filterOptions.tags, softwareFilterOptions.tags)
          }
        }));
      })
      .catch(error => {
        console.error('Failed to fetch software:', error);
        setData(prev => ({ ...prev, softwareLoading: false, error }));
      });

    // Fetch apps — update state as soon as it resolves
    fetchAllApps(config)
      .then(({ apps, included: appsIncluded }) => {
        const appsFilterOptions = extractFilterOptionsFromApps(appsIncluded);
        const appsBySoftwareId = groupAppsBySoftware(apps);
        setData(prev => ({
          ...prev,
          apps,
          appsBySoftwareId,
          appsLoading: false,
          filterOptions: {
            ...prev.filterOptions,
            appType: appsFilterOptions.appType,
            tags: mergeTags(prev.filterOptions.tags, appsFilterOptions.tags)
          }
        }));
      })
      .catch(error => {
        console.error('Failed to fetch apps:', error);
        setData(prev => ({ ...prev, appsLoading: false, error }));
      });
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
    // Backward-compatible loading: true only while software is loading (grid not yet visible)
    loading: data.softwareLoading,
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
