/**
 * Development entry point (npm run dev)
 * Uses HashRouter for hash-based routing (e.g., /#/abaqus)
 * Hash routing avoids conflicts with server-side routing (e.g., Drupal)
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { ConfigProvider } from './contexts/ConfigContext'
import './fonts.css'
import './index.css'

// Dev config: API and static files are proxied to the Drupal backend
const config = {
  apiBaseUrl: '/api',
  siteBaseUrl: ''
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
