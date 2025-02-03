import { useEffect, useState } from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero section skeleton */}
        <div className="space-y-4 mb-16 text-center">
          <div className="h-12 w-2/3 bg-gray-800 rounded-lg mx-auto animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-800 rounded mx-auto animate-pulse" />
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[var(--color-surface)] rounded-xl p-6 space-y-4">
              <div className="h-6 w-1/3 bg-gray-800 rounded animate-pulse" />
              <div className="h-48 bg-gray-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 