'use client';
import { Metric } from '@/types/api';

interface IndustryBenchmarksChartProps {
  metrics: Metric[];
}

export function IndustryBenchmarksChart({ metrics }: IndustryBenchmarksChartProps) {
  return (
    <div className="space-y-6">
      {metrics.slice(0, 3).map((metric, index) => {
        // Generate line chart data for 4 weeks
        const weeklyData = metric.trend_data.slice(0, 4).map((value, i) => ({
          week: i + 1,
          value: value,
          x: 20 + (i * 40), // Distribute points across 160px width
          y: 50 - (value / 100) * 35, // Scale to chart height
        }));

        // Create path for the line
        const pathData = weeklyData
          .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
          .join(' ');

        // Create area path
        const areaPath = `${pathData} L ${weeklyData[weeklyData.length - 1].x} 50 L ${weeklyData[0].x} 50 Z`;

        return (
          <div key={metric.name} className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-foreground">{metric.name}</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-foreground">{metric.value.toFixed(1)}%</span>
                <span className="text-xs text-green-500">+{metric.change.toFixed(1)}%</span>
              </div>
            </div>
            
            {/* Line Chart */}
            <div className="bg-muted/50 rounded-lg p-4">
              <svg width="200" height="70" className="w-full max-w-xs">
                {/* Grid lines */}
                <defs>
                  <pattern id={`grid-${index}`} width="40" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
                  </pattern>
                </defs>
                <rect width="200" height="50" fill={`url(#grid-${index})`} />
                
                {/* Area fill */}
                <path
                  d={areaPath}
                  fill="url(#gradient)"
                  opacity="0.1"
                />
                
                {/* Line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-cyan-500"
                />
                
                {/* Data points with hover */}
                {weeklyData.map((point, i) => (
                  <g key={i} className="group">
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="3"
                      fill="currentColor"
                      className="text-cyan-500 cursor-pointer"
                    />
                    {/* Simple hover tooltip */}
                    <text
                      x={point.x}
                      y={point.y - 6}
                      textAnchor="middle"
                      className="fill-gray-800 text-[8px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                      style={{ fontSize: '8px' }}
                    >
                      {point.value.toFixed(1)}%
                    </text>
                  </g>
                ))}
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" className="text-cyan-500"/>
                    <stop offset="100%" stopColor="currentColor" className="text-cyan-500" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Week labels */}
              <div className="flex justify-between mt-2 px-2">
                {[1, 2, 3, 4].map(week => (
                  <span key={week} className="text-xs text-muted-foreground">
                    Week {week}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 