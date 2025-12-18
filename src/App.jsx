/**
 * Main App component
 * Routes are synced with browser URL in both dev and production
 */
import { Routes, Route, Navigate } from 'react-router-dom'
import SoftwareGrid from './pages/SoftwareGrid'
import SoftwareDetail from './pages/SoftwareDetail'

export default function App() {
  return (
    <div className="appverse-container min-h-screen bg-white">
      <main>
        <Routes>
          <Route path="/appverse/" element={<SoftwareGrid />} />
          <Route path="/appverse/software/:id" element={<SoftwareDetail />} />
          {/* Catch-all: redirect any unmatched route to main page */}
          <Route path="*" element={<Navigate to="/appverse/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
