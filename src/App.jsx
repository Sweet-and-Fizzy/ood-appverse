/**
 * Main App component
 * Routes are synced with browser URL in both dev and production
 */
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppverseDataProvider } from './contexts/AppverseDataContext'
import SoftwareHome from './pages/SoftwareHome'
import SoftwareDetail from './pages/SoftwareDetail'

export default function App() {
  return (
    <AppverseDataProvider>
      <div className="appverse-container">
        <main>
          <Routes>
            <Route path="/appverse/" element={<SoftwareHome />} />
            {/* UUID route (backward compatibility) */}
            <Route path="/appverse/software/:id" element={<SoftwareDetail />} />
            {/* Slug route: /appverse/abaqus → looks up "abaqus" in slugMap */}
            <Route path="/appverse/:slug" element={<SoftwareDetail />} />
            {/* Catch-all: redirect any unmatched route to main page */}
            <Route path="*" element={<Navigate to="/appverse/" replace />} />
          </Routes>
        </main>
      </div>
    </AppverseDataProvider>
  )
}
