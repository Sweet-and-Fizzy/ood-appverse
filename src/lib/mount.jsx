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
 * @param {string} elementId - The ID of the element to mount to
 * @param {Object} config - Configuration options
 * @param {string} config.apiBaseUrl - Base URL for API calls (default: '/api')
 * @param {string} config.siteBaseUrl - Base URL for site assets (default: '')
 * @returns {Object} - Object with unmount function
 */
function mount(elementId, config = {}) {
  const container = document.getElementById(elementId)

  if (!container) {
    console.error(`AppVerse: Element with id "${elementId}" not found`)
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
