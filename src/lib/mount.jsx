/**
 * Production embedding entry point (CDN and React component)
 * Uses BrowserRouter to sync with the browser URL
 * The embedded widget controls routing for /appverse/* paths
 */
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'
import '../index.css'

/**
 * Mount the AppVerse browser to a DOM element
 * @param {string} elementId - The ID of the element to mount to
 * @returns {Object} - Object with unmount function
 */
function mount(elementId) {
  const container = document.getElementById(elementId)

  if (!container) {
    console.error(`AppVerse: Element with id "${elementId}" not found`)
    return null
  }

  const root = createRoot(container)

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
