"use client";

import { useState, useEffect } from 'react';
import { TrendChart } from './TrendChart';
import { LoadingChart } from './LoadingChart';

interface MetricData {
  date: string;
  value: number;
}

export default function LiveMetrics() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MetricData[]>([]);

  useEffect(() => {
    // Simulated data loading
    setTimeout(() => {
      setData([
        { date: '2024-01', value: 82 },
        { date: '2024-02', value: 91 },
        { date: '2024-03', value: 134 },
        { date: '2024-04', value: 156 },
        { date: '2024-05', value: 192 },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <LoadingChart />;
  }

  return (
    <div className="space-y-4">
      <TrendChart data={data} />
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[var(--color-surface)]">
          <div className="text-sm text-gray-400">Engagement Rate</div>
          <div className="text-2xl font-semibold">4.8%</div>
          <div className="text-sm text-green-400">+0.6%</div>
        </div>
        <div className="p-4 rounded-lg bg-[var(--color-surface)]">
          <div className="text-sm text-gray-400">Conversion Rate</div>
          <div className="text-2xl font-semibold">2.3%</div>
          <div className="text-sm text-green-400">+0.3%</div>
        </div>
      </div>
    </div>
  );
} 