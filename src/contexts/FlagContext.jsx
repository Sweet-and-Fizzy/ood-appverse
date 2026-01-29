/**
 * FlagContext
 *
 * Manages flag state for authenticated users.
 * Allows users to flag apps they use with their OOD installation.
 * Provides optimistic updates with server confirmation.
 *
 * Usage:
 *   import { useFlag } from '../contexts/FlagContext'
 *   const { authenticated, isFlagged, toggleFlag, isPending } = useFlag()
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useConfig } from './ConfigContext';
import {
  checkAuthAndFetchFlags,
  flagApp,
  unflagApp,
} from '../utils/flagApi';

const FlagContext = createContext(null);

export function FlagProvider({ children }) {
  const config = useConfig();
  // Store flagged app UUIDs (not NIDs) since that's what the JSON:API returns
  const [flaggedIds, setFlaggedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  // Track in-flight requests to prevent duplicates and show loading states
  const [pendingIds, setPendingIds] = useState(new Set());

  // Check authentication and fetch flagged apps on mount
  useEffect(() => {
    const init = async () => {
      console.log('[FlagContext][2] Initializing with config:', {
        apiBaseUrl: config.apiBaseUrl,
        siteBaseUrl: config.siteBaseUrl
      });

      const result = await checkAuthAndFetchFlags(config.apiBaseUrl);
      setAuthenticated(result.authenticated);
      setFlaggedIds(new Set(result.flaggedIds));
      setLoading(false);
    };

    init();
  }, [config.apiBaseUrl, config.siteBaseUrl]);

  /**
   * Check if an app is flagged by its UUID
   * @param {string} appId - App UUID
   * @returns {boolean}
   */
  const isFlagged = useCallback((appId) => {
    return flaggedIds.has(appId);
  }, [flaggedIds]);

  /**
   * Check if a flag operation is pending for an app
   * @param {string} appId - App UUID
   * @returns {boolean}
   */
  const isPending = useCallback((appId) => {
    return pendingIds.has(appId);
  }, [pendingIds]);

  /**
   * Toggle flag state for an app (with optimistic update)
   * @param {string} appId - App UUID
   * @param {number} nid - Drupal node ID (required for flag API)
   */
  const toggleFlag = useCallback(async (appId, nid) => {
    if (!authenticated) {
      console.log('[FlagContext] toggleFlag: user not authenticated');
      return;
    }
    if (pendingIds.has(appId)) {
      console.log('[FlagContext] toggleFlag: operation already pending for', appId);
      return;
    }

    const wasFlagged = flaggedIds.has(appId);
    console.log('[FlagContext] toggleFlag:', { appId, nid, wasFlagged, action: wasFlagged ? 'unflag' : 'flag' });

    // Optimistic update
    setPendingIds(prev => new Set(prev).add(appId));
    setFlaggedIds(prev => {
      const next = new Set(prev);
      if (wasFlagged) {
        next.delete(appId);
      } else {
        next.add(appId);
      }
      return next;
    });

    try {
      if (wasFlagged) {
        await unflagApp(nid, config.siteBaseUrl);
      } else {
        await flagApp(nid, config.siteBaseUrl);
      }
      console.log('[FlagContext] toggleFlag: success');
    } catch (error) {
      console.error('[FlagContext] toggleFlag failed, rolling back:', error);
      // Rollback on failure
      setFlaggedIds(prev => {
        const next = new Set(prev);
        if (wasFlagged) {
          next.add(appId); // Re-add if unflag failed
        } else {
          next.delete(appId); // Remove if flag failed
        }
        return next;
      });
    } finally {
      setPendingIds(prev => {
        const next = new Set(prev);
        next.delete(appId);
        return next;
      });
    }
  }, [authenticated, flaggedIds, pendingIds, config.siteBaseUrl]);

  const value = {
    authenticated,
    loading,
    isFlagged,
    isPending,
    toggleFlag
  };

  return (
    <FlagContext.Provider value={value}>
      {children}
    </FlagContext.Provider>
  );
}

export function useFlag() {
  const context = useContext(FlagContext);
  if (!context) {
    throw new Error('useFlag must be used within FlagProvider');
  }
  return context;
}
