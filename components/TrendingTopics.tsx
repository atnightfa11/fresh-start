"use client";

import { useEffect, useState } from 'react';
import { TrendChart } from './TrendChart';
import { fetchMarketingData } from '@/lib/api';
import { MarketIntelligenceData } from '@/types/api';
import { LoadingChart } from './LoadingChart';

interface TrendData {
  date: string;
  value: number;
}

export default function TrendingTopics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trends, setTrends] = useState<MarketIntelligenceData['trends']>([]);
  const [chartData, setChartData] = useState<TrendData[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchMarketingData();
        
        // Set trends
        setTrends(data.trends || []);

        // Transform search trends into chart data
        const searchTrendData = data.search_trends?.map((trend, index) => ({
          date: new Date(Date.now() - (index * 30 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 7),
          value: trend.growth
        })) || [];

        setChartData(searchTrendData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trends');
        console.error('Error loading trends:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <LoadingChart />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <TrendChart data={chartData} />
      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface)] hover:bg-opacity-80 transition-colors">
            <span className="font-medium">{trend.title}</span>
            <span className="text-green-400">
              {trend.impact_score > 0 ? '+' : ''}{trend.impact_score}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 