'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import type { MarketIntelligenceData } from '../types/api';
import TrendingTopics from '@/components/TrendingTopics';
import LiveMetrics from '@/components/LiveMetrics';
import { fetchMarketingData } from '@/lib/api';

const useMarketingData = () => {
  const [data, setData] = useState<MarketIntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ai-marketing-hub-backend.onrender.com';
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const startTime = Date.now();
        const response = await fetch(`${apiUrl}/api/market-intelligence`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json() as MarketIntelligenceData;
        
        // Ensure loading shows for at least 2 seconds
        const elapsedTime = Date.now() - startTime;
        const minimumLoadingTime = 2000; // 2 seconds
        
        if (elapsedTime < minimumLoadingTime) {
          await new Promise(resolve => setTimeout(resolve, minimumLoadingTime - elapsedTime));
        }
        
        setData(responseData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refetchTrigger]);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return { data, loading, error, refetch };
};

interface DebugPanelProps {
  data: MarketIntelligenceData | null;
  loading: boolean;
  error: string | null;
}

const DebugPanel = ({ data, loading, error }: DebugPanelProps) => {
  if (process.env.NODE_ENV !== 'development') return null;
  
  console.log('Debug - Full Data:', data);
  console.log('Debug - Search Trends:', data?.search_trends);
  
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black/80 text-white rounded-lg max-w-md text-xs">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div>Loading: {String(loading)}</div>
      <div>Error: {error || 'none'}</div>
      <div>Has Data: {String(Boolean(data))}</div>
      {data && (
        <div>
          <div>Trends: {data.trends?.length || 0}</div>
          <div>Insights: {data.insights?.length || 0}</div>
          <div>News: {data.news?.length || 0}</div>
          <div>Opportunities: {data.opportunities?.length || 0}</div>
          <div>Search Trends: {data.search_trends?.length || 0}</div>
        </div>
      )}
    </div>
  );
};

const TRUSTED_SOURCES = [
  'TechCrunch',
  'Forbes',
  'Harvard Business Review',
  'MIT Technology Review',
  'Wall Street Journal',
  'Bloomberg',
  'Reuters',
  'VentureBeat',
  'Gartner',
  'McKinsey'
];

export default function Home() {
  const { data, loading, error, refetch } = useMarketingData();

  const handleGetStarted = () => {
    // Add your onboarding logic here
    console.log('Get Started clicked');
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center mb-6 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            AI marketing moves fast.
            <br />
            We track it in real-time.
          </h1>
          <p className="text-gray-400 text-center text-xl mb-8 max-w-2xl mx-auto">
            Stay ahead of AI trends with live insights, performance metrics, and strategic intelligence.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="default" onClick={handleGetStarted}>
              Get Real-Time Insights
            </Button>
            <Button variant="secondary" onClick={() => window.open('/demo', '_blank')}>
              View Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Data Grid Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Trending AI Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendingTopics />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <LiveMetrics />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Latest Insights</CardTitle>
            </CardHeader>
            <CardContent>
              Coming soon...
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}