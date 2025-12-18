/**
 * SoftwareDetail Page
 * Displays software details and list of implementing apps
 */
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchSoftwareById, fetchAppsBySoftware } from '../utils/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SoftwareHeader from '../components/detail/SoftwareHeader';
import AppList from '../components/detail/AppList';

export default function SoftwareDetail() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [software, setSoftware] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get expanded app ID from URL params
  const expandedAppId = searchParams.get('app');

  // Fetch software and apps data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Fetch both in parallel
        const [softwareData, appsData] = await Promise.all([
          fetchSoftwareById(id),
          fetchAppsBySoftware(id)
        ]);

        setSoftware(softwareData);
        setApps(appsData);
      } catch (err) {
        console.error('Failed to fetch software detail:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle app toggle
  const handleToggleApp = (appId) => {
    const newParams = new URLSearchParams(searchParams);

    if (expandedAppId === appId) {
      // Collapse: remove app param
      newParams.delete('app');
    } else {
      // Expand: set app param
      newParams.set('app', appId);
    }

    setSearchParams(newParams);
  };

  // Handle retry
  const handleRetry = () => {
    // Re-trigger the fetch by clearing and setting software
    setSoftware(null);
    setApps([]);
    setLoading(true);
    setError(null);

    // Re-fetch
    fetchSoftwareById(id)
      .then(data => setSoftware(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));

    fetchAppsBySoftware(id)
      .then(data => setApps(data))
      .catch(err => console.error('Failed to fetch apps:', err));
  };

  // Show loading state
  if (loading) {
    return <LoadingSpinner message="Loading software details..." />;
  }

  // Show error state
  if (error) {
    return <ErrorMessage error={error} onRetry={handleRetry} />;
  }

  // Show not found if no software
  if (!software) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] py-12 px-4">
        <h2 className="text-2xl font-serif text-appverse-black mb-2">
          Software Not Found
        </h2>
        <p className="text-appverse-black text-center max-w-md">
          The software you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-6 py-8">
        {/* Software header */}
        <SoftwareHeader software={software} />

        {/* App list */}
        <AppList
          apps={apps}
          expandedAppId={expandedAppId}
          onToggleApp={handleToggleApp}
        />
      </div>
    </div>
  );
}
