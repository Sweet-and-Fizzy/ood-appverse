/**
 * Main App component
 * Routes are synced with browser URL in both dev and production
 */
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
import { AppverseDataProvider } from './contexts/AppverseDataContext'
import SoftwareHome from './pages/SoftwareHome'
import SoftwareDetail from './pages/SoftwareDetail'

/**
 * Redirect component for legacy /appverse/* routes
 * Preserves query parameters when redirecting to new simplified routes
 */
function LegacyRedirect() {
  const { '*': splat } = useParams()
  const location = useLocation()
  // Redirect /appverse/foo?bar=baz → /foo?bar=baz
  const newPath = `/${splat || ''}${location.search}`
  return <Navigate to={newPath} replace />
}

export default function App() {
  return (
    <AppverseDataProvider>
      <div className="appverse-container">
        <main>
          <Routes>
            <Route path="/" element={<SoftwareHome />} />
            {/* Slug route: /gimp → looks up "gimp" in slugMap */}
            <Route path="/:slug" element={<SoftwareDetail />} />
            {/* Legacy route redirects: /appverse/* → /* */}
            <Route path="/appverse/*" element={<LegacyRedirect />} />
            {/* Catch-all: redirect any unmatched route to main page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AppverseDataProvider>
  )
}
