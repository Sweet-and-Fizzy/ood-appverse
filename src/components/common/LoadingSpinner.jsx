/**
 * LoadingSpinner Component
 * Displays a centered loading spinner with optional message
 */
export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
      {/* Spinner SVG */}
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-appverse-gray border-t-appverse-red mb-4"></div>

      {/* Loading message */}
      <p className="text-appverse-black text-lg font-sans">
        {message}
      </p>
    </div>
  );
}
