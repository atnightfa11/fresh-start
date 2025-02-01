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
import { fetchSonarData } from "@/lib/sonar";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { DataCard } from '@/components/ui/data-card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

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
  const [data, setData] = useState<MarketIntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const sonarData = await fetchSonarData();
        setData(sonarData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleGetStarted = () => {
    // Add your onboarding logic here
    console.log('Get Started clicked');
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-2xl font-semibold text-red-500">
            Connection Issue
          </h1>
          <p className="text-muted-foreground">
            Unable to connect to intelligence service. Please check:
          </p>
          <ul className="list-disc text-left space-y-2 text-sm text-muted-foreground mx-auto w-fit">
            <li>Internet connection</li>
            <li>Service status</li>
            <li>Browser permissions</li>
          </ul>
          <Button 
            variant="default" 
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* New Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-pulse opacity-20 -z-10" />
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent leading-tight">
            AI Marketing Intelligence
            <br />
            <span className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Real-Time Market Tracking
            </span>
          </h1>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg"
              className="gap-3 px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 transition-all"
            >
              Get Live Insights
              <ArrowUpRight className="h-5 w-5 mt-0.5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="text-lg rounded-xl px-8 py-6 border-2 hover:bg-foreground/5"
            >
              Watch Product Demo
            </Button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingSkeleton />
          ) : data ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              <TrendingTopics data={data} />
              <LiveMetrics data={data} />
              <Section size="lg">
                <DataCard className="text-center p-12">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                      Deep Strategic Insights
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Coming soon: AI-powered strategic recommendations and market opportunity analysis.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Notify Me When Launched
                    </Button>
                  </div>
                </DataCard>
              </Section>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}