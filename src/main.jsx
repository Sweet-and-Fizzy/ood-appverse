/**
 * Development entry point (npm run dev)
 * Uses BrowserRouter for normal browser routing (URL bar updates)
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
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
    <BrowserRouter>
      <ConfigProvider config={config}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
)
