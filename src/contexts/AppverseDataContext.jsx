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
import { createContext, useState, useEffect } from 'react';
import { fetchAllSoftware, fetchAllApps, groupAppsBySoftware } from '../utils/api';

export const AppverseDataContext = createContext(null);

/**
 * @typedef {Object} AppverseData
 * @property {Array} software - All software items with logo URLs resolved
 * @property {Array} apps - All app items
 * @property {Object} appsBySoftwareId - Apps grouped by software UUID
 * @property {boolean} loading - Loading state
 * @property {Error|null} error - Error object if fetch failed
 * @property {Function} refetch - Function to manually refetch data
 */

export function AppverseDataProvider({ children }) {
  const [data, setData] = useState({
    software: [],
    apps: [],
    appsBySoftwareId: {},
    loading: true,
    error: null
  });

  /**
   * Fetch all data from API
   */
  const fetchData = async () => {
    setData(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Fetch both endpoints in parallel
      const [software, apps] = await Promise.all([
        fetchAllSoftware(),
        fetchAllApps()
      ]);

      // Group apps by software ID
      const appsBySoftwareId = groupAppsBySoftware(apps);

      setData({
        software,
        apps,
        appsBySoftwareId,
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

  const contextValue = {
    ...data,
    refetch: fetchData // Allow manual refetch if needed
  };

  return (
    <AppverseDataContext.Provider value={contextValue}>
      {children}
    </AppverseDataContext.Provider>
  );
}
