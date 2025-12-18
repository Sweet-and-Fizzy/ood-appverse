/**
 * Custom hook to access AppVerse data context
 * Provides type-safe access to the data provider
 */
import { useContext } from 'react';
import { AppverseDataContext } from '../contexts/AppverseDataContext';

export function useAppverseData() {
  const context = useContext(AppverseDataContext);

  if (!context) {
    throw new Error('useAppverseData must be used within AppverseDataProvider');
  }

  return context;
}
