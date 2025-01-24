import { useEffect, useState } from 'react';

export const LoadingSkeleton = () => {
  const [waitTime, setWaitTime] = useState(0);
  const [message, setMessage] = useState('Loading your market insights...');

  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setWaitTime(elapsed);
      
      // Update message based on wait time - keeping messages lighter
      if (elapsed > 20) {
        setMessage('Almost there! Backend is warming up...');
      } else if (elapsed > 10) {
        setMessage('Analyzing market trends and opportunities...');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-20 px-4">
      {/* Title skeleton */}
      <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse mb-4" />
      
      {/* Loading message */}
      <div className="text-center mb-8">
        <p className="text-lg font-medium text-gray-600">{message}</p>
        {waitTime > 15 && (
          <p className="text-sm text-gray-500 mt-2">
            First load takes a moment - it'll be quicker next time!
          </p>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-500 animate-loading"
          style={{ 
            width: `${Math.min(90, waitTime * 3)}%`
          }}
        />
      </div>

      {/* Content skeleton */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-4/6 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 