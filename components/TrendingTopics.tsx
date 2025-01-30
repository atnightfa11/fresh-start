import { useEffect, useState } from 'react';
import { TrendChart } from './TrendChart';

interface Trend {
  topic: string;
  growth: string;
}

interface TrendData {
  date: string;
  value: number;
}

export default function TrendingTopics() {
  const [trends, setTrends] = useState<Trend[]>([]);
  
  const mockData: TrendData[] = [
    { date: '2024-01', value: 45 },
    { date: '2024-02', value: 78 },
    { date: '2024-03', value: 127 },
    { date: '2024-04', value: 165 },
    { date: '2024-05', value: 221 },
  ];

  useEffect(() => {
    // Implement API call to fetch trending topics
    // This is a placeholder for demonstration
    const mockTrends: Trend[] = [
      { topic: 'GPT-4 Marketing', growth: '+127%' },
      { topic: 'AI Content Strategy', growth: '+89%' },
      { topic: 'Neural Advertising', growth: '+64%' },
    ];
    setTrends(mockTrends);
  }, []);

  return (
    <div className="space-y-6">
      <TrendChart data={mockData} />
      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface)] hover:bg-opacity-80 transition-colors">
            <span className="font-medium">{trend.topic}</span>
            <span className="text-green-400">{trend.growth}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 