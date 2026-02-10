/**
 * Configuration context for AppVerse
 * Allows runtime configuration of API endpoints and other settings
 */
import { createContext, useContext } from 'react'

const ConfigContext = createContext({
  apiBaseUrl: '/api',
  siteBaseUrl: '',
  tracking: true,
  dataLayerName: 'dataLayer'
})

export function ConfigProvider({ config, children }) {
  const value = {
    apiBaseUrl: config?.apiBaseUrl ?? '/api',
    siteBaseUrl: config?.siteBaseUrl ?? '',
    tracking: config?.tracking !== false,
    dataLayerName: config?.dataLayerName ?? 'dataLayer'
  }

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  return useContext(ConfigContext)
}
