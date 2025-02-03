'use client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Header from '@/components/Header';
import DataError from '@/components/DataError';
import LoadingSkeleton from '@/components/loading-skeleton';
import TrendingTopics from '@/components/TrendingTopics';
import LiveMetrics from '@/components/LiveMetrics';
import { useLiveMarketData } from '@/lib/sonar';

export default function Page() {
  const data = useLiveMarketData();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <ErrorBoundary FallbackComponent={DataError}>
            <Suspense fallback={<LoadingSkeleton />}>
              <TrendingTopics data={data} />
              <LiveMetrics data={data} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}