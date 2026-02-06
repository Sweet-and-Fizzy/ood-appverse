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
  const [flaggedIds, setFlaggedIds] = useState(new Set());
  // Map of appId → flaggingId (needed for DELETE)
  const [flaggingMap, setFlaggingMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userUuid, setUserUuid] = useState(null);
  const [pendingIds, setPendingIds] = useState(new Set());
  // Track flag count adjustments for each app (updated only after server confirms)
  // Map of appId → number (cumulative delta: +1 for flag, -1 for unflag)
  const [flagCountAdjustments, setFlagCountAdjustments] = useState({});

  // Check authentication and fetch flagged apps on mount
  useEffect(() => {
    const init = async () => {
      const result = await checkAuthAndFetchFlags(config.apiBaseUrl, config.siteBaseUrl);
      setAuthenticated(result.authenticated);
      setUserUuid(result.userUuid || null);
      setFlaggedIds(new Set(result.flaggedIds));
      setFlaggingMap(result.flaggingMap || {});
      setLoading(false);
    };

    init();
  }, [config.apiBaseUrl, config.siteBaseUrl]);

  const isFlagged = useCallback((appId) => {
    return flaggedIds.has(appId);
  }, [flaggedIds]);

  const isPending = useCallback((appId) => {
    return pendingIds.has(appId);
  }, [pendingIds]);

  const getFlagCountAdjustment = useCallback((appId) => {
    return flagCountAdjustments[appId] || 0;
  }, [flagCountAdjustments]);

  /**
   * Toggle flag state for an app (with optimistic update).
   * @param {string} appId - App UUID (used for local state tracking and flagged_entity relationship)
   * @param {number} nid - Drupal node ID (used for creating flagging entity)
   */
  const toggleFlag = useCallback(async (appId, nid) => {
    if (!authenticated) return;
    if (pendingIds.has(appId)) return;
    if (!userUuid) {
      console.error('[FlagContext] Cannot toggle flag: no user UUID available');
      return;
    }

    const wasFlagged = flaggedIds.has(appId);

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
        const flaggingId = flaggingMap[appId];
        if (!flaggingId) {
          throw new Error(`No flagging UUID found for app ${appId}`);
        }
        await unflagApp(flaggingId, config.apiBaseUrl, config.siteBaseUrl);
        setFlaggingMap(prev => {
          const next = { ...prev };
          delete next[appId];
          return next;
        });
        // Update flag count adjustment after server confirms unflag
        setFlagCountAdjustments(prev => ({
          ...prev,
          [appId]: (prev[appId] || 0) - 1
        }));
      } else {
        const result = await flagApp(appId, nid, userUuid, config.apiBaseUrl, config.siteBaseUrl);
        setFlaggingMap(prev => ({ ...prev, [appId]: result.flaggingId }));
        // Update flag count adjustment after server confirms flag
        setFlagCountAdjustments(prev => ({
          ...prev,
          [appId]: (prev[appId] || 0) + 1
        }));
      }
    } catch (error) {
      console.error('[FlagContext] toggleFlag failed, rolling back:', error);
      // Rollback on failure
      setFlaggedIds(prev => {
        const next = new Set(prev);
        if (wasFlagged) {
          next.add(appId);
        } else {
          next.delete(appId);
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
  }, [authenticated, userUuid, flaggedIds, flaggingMap, pendingIds, config.apiBaseUrl, config.siteBaseUrl]);

  const value = {
    authenticated,
    loading,
    isFlagged,
    isPending,
    toggleFlag,
    getFlagCountAdjustment,
    siteBaseUrl: config.siteBaseUrl,
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
