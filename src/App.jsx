/**
 * Main App component
 * Routes are synced with browser URL in both dev and production
 */
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
import { AppverseDataProvider } from './contexts/AppverseDataContext'
import { FlagProvider } from './contexts/FlagContext'
import { usePageTracking } from './hooks/usePageTracking'
import SoftwareHome from './pages/SoftwareHome'
import SoftwareDetail from './pages/SoftwareDetail'
import CollectionsHome from './pages/CollectionsHome'
import CollectionDetail from './pages/CollectionDetail'
import BundlesPlaceholder from './pages/BundlesPlaceholder'
import ClassroomsPlaceholder from './pages/ClassroomsPlaceholder'

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
  usePageTracking()

  return (
    <AppverseDataProvider>
      <FlagProvider>
        <div className="appverse-container">
          <Routes>
            <Route path="/" element={<SoftwareHome />} />
            <Route path="/collections" element={<CollectionsHome />} />
            <Route path="/bundles" element={<BundlesPlaceholder />} />
            <Route path="/for-classrooms" element={<ClassroomsPlaceholder />} />
            <Route path="/collection/:slug" element={<CollectionDetail />} />
            {/* Slug route: /gimp → looks up "gimp" in slugMap */}
            <Route path="/:slug" element={<SoftwareDetail />} />
            {/* Legacy route redirects: /appverse/* → /* */}
            <Route path="/appverse/*" element={<LegacyRedirect />} />
            {/* Catch-all: redirect any unmatched route to main page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </FlagProvider>
    </AppverseDataProvider>
  )
}
