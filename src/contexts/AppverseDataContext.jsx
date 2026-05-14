/**
 * AppverseDataContext
 *
 * Provides global data for software, apps, and collections throughout the
 * application. Fetches from static JSON cache on mount.
 *
 * Usage:
 *   import { useAppverseData } from '../hooks/useAppverseData'
 *   const { software, collections, appsBySoftwareId, loading, error } = useAppverseData()
 */
import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { fetchStaticCache } from '../utils/api';
import { slugify } from '../utils/slugify';
import { useConfig } from './ConfigContext';

export const AppverseDataContext = createContext(null);

export function AppverseDataProvider({ children }) {
  const config = useConfig();
  const [data, setData] = useState({
    software: [],
    appsBySoftwareId: {},
    collections: [],
    filterOptions: { tags: [], appType: [], topics: [], license: [], organizations: [] },
    loading: true,
    error: null
  });

  const fetchData = () => {
    setData(prev => ({ ...prev, loading: true, error: null }));

    fetchStaticCache(config)
      .then(({ software, appsBySoftwareId, collections, filterOptions }) => {
        setData({
          software,
          appsBySoftwareId,
          collections,
          filterOptions,
          loading: false,
          error: null,
        });
      })
      .catch(error => {
        console.error('Failed to fetch appverse data:', error);
        setData(prev => ({ ...prev, loading: false, error }));
      });
  };

  // Fetch on mount. Deps intentionally empty to match the existing
  // AppverseDataContext behavior: siteBaseUrl is read once from
  // ConfigContext on initial mount. If ConfigContext ever becomes
  // dynamic, both the current code and this fetch effect would need to
  // update together — defer that change to a separate task.
  useEffect(() => {
    fetchData();
  }, []);

  // Software slug map: slugify(title) → software object (preserved from
  // earlier behavior — used by SoftwareDetail's slug route).
  const softwareSlugMap = useMemo(() => {
    const map = {};
    for (const sw of data.software) {
      if (sw.title) {
        map[slugify(sw.title)] = sw;
      }
    }
    return map;
  }, [data.software]);

  // Collection slug map: prefer server-provided `slug` (from pathauto in
  // Drupal), fall back to slugify(title) defensively for items that
  // somehow lack a slug.
  const collectionSlugMap = useMemo(() => {
    const map = {};
    for (const c of data.collections) {
      const key = c.slug || (c.title ? slugify(c.title) : null);
      if (key) map[key] = c;
    }
    return map;
  }, [data.collections]);

  const getSoftwareBySlug = useCallback((slug) => softwareSlugMap[slug] || null, [softwareSlugMap]);
  const getCollectionBySlug = useCallback((slug) => collectionSlugMap[slug] || null, [collectionSlugMap]);

  // Backward-compatible alias.
  const slugMap = softwareSlugMap;

  const contextValue = {
    ...data,
    slugMap,
    softwareSlugMap,
    collectionSlugMap,
    getSoftwareBySlug,
    getCollectionBySlug,
    refetch: fetchData,
  };

  return (
    <AppverseDataContext.Provider value={contextValue}>
      {children}
    </AppverseDataContext.Provider>
  );
}
