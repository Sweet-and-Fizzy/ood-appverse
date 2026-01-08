/**
 * Development entry point (npm run dev)
 * Uses HashRouter for hash-based routing (e.g., /#/appverse/abaqus)
 * Hash routing avoids conflicts with server-side routing (e.g., Drupal)
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { ConfigProvider } from './contexts/ConfigContext'
import './fonts.css'
import './index.css'

// Dev/Netlify config: API is proxied, but assets need full URL
const config = {
  apiBaseUrl: '/api',
  siteBaseUrl: 'https://md-2622-accessmatch.pantheonsite.io'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ConfigProvider config={config}>
        <App />
      </ConfigProvider>
    </HashRouter>
  </StrictMode>
)
