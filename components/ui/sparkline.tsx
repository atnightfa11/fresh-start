"use client";
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';

interface SparklineProps {
  data: number[];
}

export function Sparkline({ data }: SparklineProps) {
  // Ensure data exists and is array
  const validData = Array.isArray(data) ? data : [];
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const max = Math.max(...validData);
  const min = Math.min(...validData);
  const range = max - min || 1; // Prevent division by zero
  
  const gradientId = `gradient-${data.join('-')}`;
  const isPositiveTrend = data[0] < data[data.length - 1];
  const lineColor = isPositiveTrend ? "#10b981" : "#ef4444";
  
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative w-full h-16">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M0,100 L0,${100 - ((data[0] - min) / range) * 100} ${points} L100,100 Z`}
          fill={`url(#${gradientId})`}
        />
        <polyline
          points={points}
          fill="none"
          stroke={lineColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((_, i) => (
          <rect
            key={i}
            x={`${(i / (data.length - 1)) * 100}%`}
            y="0"
            width="2%"
            height="100%"
            fill="transparent"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            data-tooltip-id="sparkline-tooltip"
          />
        ))}
      </svg>
      
      <Tooltip
        id="sparkline-tooltip"
        className="!bg-background !text-foreground !border !border-border !rounded-lg !shadow-lg !px-3 !py-2"
        render={({ content }) => (
          <>
            <div className="font-medium">
              {hoverIndex !== null ? validData[hoverIndex].toFixed(1) + '%' : ''}
            </div>
            <div className="text-muted-foreground text-xs">
              {hoverIndex !== null ? `Day ${hoverIndex + 1}` : ''}
            </div>
          </>
        )}
      />
    </div>
  );
} 