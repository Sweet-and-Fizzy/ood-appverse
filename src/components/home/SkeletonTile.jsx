/**
 * SkeletonTile Component
 * Animated placeholder matching SoftwareTile dimensions for loading state
 */
export default function SkeletonTile() {
  return (
    <div className="flex flex-col items-center gap-4 border-gray-200 border-2 rounded-lg p-6 bg-white h-[199px] animate-pulse">
      {/* Logo placeholder */}
      <div className="h-[60px] w-full flex items-center justify-center">
        <div className="w-16 h-16 rounded-lg bg-gray-200" />
      </div>

      {/* Title placeholder */}
      <div className="w-3/4 h-6 bg-gray-200 rounded" />

      {/* Badge placeholder */}
      <div className="mt-auto flex items-center gap-1.5">
        <div className="w-5 h-5 bg-gray-200 rounded-full" />
        <div className="w-16 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
