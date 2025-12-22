/**
 * Production embedding entry point (CDN and React component)
 * Uses BrowserRouter to sync with the browser URL
 * The embedded widget controls routing for /appverse/* paths
 */
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from '../App'
import '../index.css'

/**
 * Mount the AppVerse browser to a DOM element
 * @param {string} elementId - The ID of the element to mount to
 * @param {Object} options - Configuration options
 * @param {boolean} options.useHash - Use HashRouter instead of BrowserRouter (for demos)
 * @returns {Object} - Object with unmount function
 */
function mount(elementId, options = {}) {
  const container = document.getElementById(elementId)

  if (!container) {
    console.error(`AppVerse: Element with id "${elementId}" not found`)
    return null
  }

  const root = createRoot(container)
  const Router = options.useHash ? HashRouter : BrowserRouter

  root.render(
    <Router>
      <App />
    </Router>
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
