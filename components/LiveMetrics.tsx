"use client";

import { useState, useEffect } from 'react';
import { TrendChart } from './TrendChart';
import { LoadingChart } from './LoadingChart';
import { fetchMarketingData } from '@/lib/api';
import { MarketIntelligenceData } from '@/types/api';

interface MetricData {
  date: string;
  value: number;
}

export default function LiveMetrics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MetricData[]>([]);
  const [metrics, setMetrics] = useState({
    engagement: 0,
    conversion: 0
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const apiData = await fetchMarketingData();
        
        // Transform search trends into chart data
        const trendData = apiData.search_trends?.map((trend, index) => ({
          date: new Date(Date.now() - (index * 30 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 7),
          value: trend.growth
        })) || [];

        setData(trendData);

        // Calculate average metrics
        const avgEngagement = apiData.trends?.reduce((acc, curr) => acc + curr.impact_score, 0) / (apiData.trends?.length || 1);
        const avgConversion = avgEngagement * 0.4; // Example conversion calculation

        setMetrics({
          engagement: Number(avgEngagement.toFixed(1)),
          conversion: Number(avgConversion.toFixed(1))
        });

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load metrics');
        console.error('Error loading metrics:', err);
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
    <div className="space-y-4">
      <TrendChart data={data} />
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[var(--color-surface)]">
          <div className="text-sm text-gray-400">Engagement Rate</div>
          <div className="text-2xl font-semibold">{metrics.engagement}%</div>
          <div className="text-sm text-green-400">+{(metrics.engagement * 0.1).toFixed(1)}%</div>
        </div>
        <div className="p-4 rounded-lg bg-[var(--color-surface)]">
          <div className="text-sm text-gray-400">Conversion Rate</div>
          <div className="text-2xl font-semibold">{metrics.conversion}%</div>
          <div className="text-sm text-green-400">+{(metrics.conversion * 0.1).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
} 