'use client';

export default function Page() {
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