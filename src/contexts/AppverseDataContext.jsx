/**
 * AppverseDataContext
 *
 * Provides global data for software and apps throughout the application.
 * Fetches from static JSON cache on mount.
 *
 * Usage:
 *   import { useAppverseData } from '../hooks/useAppverseData'
 *   const { software, appsBySoftwareId, loading, error } = useAppverseData()
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
    filterOptions: { tags: [], appType: [], topics: [], license: [] },
    loading: true,
    error: null
  });

  const fetchData = () => {
    setData(prev => ({ ...prev, loading: true, error: null }));

    fetchStaticCache(config)
      .then(({ software, appsBySoftwareId, filterOptions }) => {
        setData({
          software,
          appsBySoftwareId,
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

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Build slug map: slugify(title) → software object
  const slugMap = useMemo(() => {
    const map = {};
    for (const sw of data.software) {
      if (sw.title) {
        map[slugify(sw.title)] = sw;
      }
    }
    return map;
  }, [data.software]);

  const getSoftwareBySlug = useCallback((slug) => {
    return slugMap[slug] || null;
  }, [slugMap]);

  const contextValue = {
    ...data,
    slugMap,
    getSoftwareBySlug,
    refetch: fetchData,
  };

  return (
    <AppverseDataContext.Provider value={contextValue}>
      {children}
    </AppverseDataContext.Provider>
  );
}
