'use client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DataError from '@/components/DataError';
import LoadingSkeleton from '@/components/loading-skeleton';
import TrendingTopics from '@/components/TrendingTopics';
import LiveMetrics from '@/components/LiveMetrics';
import { useLiveMarketData } from '@/lib/sonar';

export default function Page() {
  const { data, error } = useLiveMarketData();

  if (error) {
    return <DataError error={error} resetErrorBoundary={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen">
      <Hero />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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