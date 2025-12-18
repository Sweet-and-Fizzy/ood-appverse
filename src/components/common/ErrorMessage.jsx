/**
 * ErrorMessage Component
 * Displays error messages with retry option
 */
export default function ErrorMessage({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12 px-4">
      {/* Error icon */}
      <div className="w-16 h-16 rounded-full bg-appverse-pink flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-appverse-red"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Error message */}
      <h2 className="text-2xl font-serif text-appverse-black mb-2">
        Unable to Load Data
      </h2>
      <p className="text-appverse-black text-center max-w-md mb-6">
        {error?.message || 'An unexpected error occurred. Please try again.'}
      </p>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-appverse-red text-white rounded-appverse font-sans font-semibold hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
