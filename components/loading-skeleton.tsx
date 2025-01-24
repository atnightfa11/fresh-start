export const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="bg-gray-200 rounded-lg h-64" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-200 rounded-lg h-48" />
      ))}
    </div>
  </div>
); 