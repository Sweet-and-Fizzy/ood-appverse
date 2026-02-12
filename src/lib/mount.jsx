/**
 * Production embedding entry point (CDN and React component)
 * Uses HashRouter for hash-based routing (e.g., /#/abaqus)
 * Hash routing avoids conflicts with server-side routing (e.g., Drupal)
 */
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from '../App'
import { ConfigProvider } from '../contexts/ConfigContext'
import '../fonts.css'
import '../index.css'

/**
 * Mount the AppVerse browser to a DOM element
 * @param {string|HTMLElement} elementOrId - The ID of the element or a DOM element to mount to
 * @param {Object} config - Configuration options
 * @param {string} config.apiBaseUrl - Base URL for API calls (default: '/api')
 * @param {string} config.siteBaseUrl - Base URL for site assets (default: '')
 * @param {boolean} config.tracking - Enable GTM dataLayer event tracking (default: true)
 * @param {string} config.dataLayerName - Name of the dataLayer array on window (default: 'dataLayer')
 * @returns {Object} - Object with unmount function
 */
function mount(elementOrId, config = {}) {
  const container = typeof elementOrId === 'string'
    ? document.getElementById(elementOrId)
    : elementOrId

  if (!container) {
    console.error(`AppVerse: Element with id "${elementOrId}" not found`)
    return null
  }

  const root = createRoot(container)

  root.render(
    <HashRouter>
      <ConfigProvider config={config}>
        <App />
      </ConfigProvider>
    </HashRouter>
  )

  return {
    unmount: () => {
      root.unmount()
    },
  }
}

// Named export for both ES modules and UMD
// With UMD, this becomes AppVerse.mount()
export { mount }
