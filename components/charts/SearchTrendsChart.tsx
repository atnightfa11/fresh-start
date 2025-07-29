'use client';
import { SearchTrend } from '@/types/api';

interface SearchTrendsChartProps {
  searchTrends: SearchTrend[];
}

export function SearchTrendsChart({ searchTrends }: SearchTrendsChartProps) {
  // Generate consistent bar chart data
  const generateChartData = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const baseValue = 20 + Math.sin(i * 0.5) * 15;
      const variation = Math.sin(i * 1.2) * 8;
      return Math.max(5, baseValue + variation);
    });
  };

  const chartData = generateChartData();
  const maxValue = Math.max(...chartData);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-4">
      {searchTrends.slice(0, 3).map((trend, index) => (
        <div key={trend.term} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">{trend.term}</span>
            <span className="text-sm text-muted-foreground">+{trend.growth.toFixed(1)}%</span>
          </div>
          
          {/* Bar Chart */}
          <div className="flex items-end space-x-1 h-16 px-2">
            {chartData.map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group">
                <div
                  className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm hover:from-cyan-400 hover:to-cyan-300 transition-colors cursor-pointer relative"
                  style={{ height: `${(value / maxValue) * 100}%` }}
                >
                  {/* Hover tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {days[i]}: {value.toFixed(1)}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-1">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 