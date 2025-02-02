"use client";
import { useState } from 'react';

interface SparklineProps {
  data: number[];
}

export function Sparkline({ data }: SparklineProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
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
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M0,100 L0,${100 - ((data[0] - min) / range) * 100} ${points} L100,100 Z`}
          fill="url(#gradient)"
        />
        <polyline
          points={points}
          fill="none"
          stroke="rgb(34, 197, 94)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((value, i) => (
          <rect
            key={i}
            x={`${(i / (data.length - 1)) * 100}%`}
            y="0"
            width="2%"
            height="100%"
            fill="transparent"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          />
        ))}
      </svg>
      
      {hoverIndex !== null && (
        <div
          className="absolute bg-background border border-border px-3 py-2 rounded-lg shadow-lg text-sm left-[var(--sparkline-left)] -translate-x-1/2"
          // eslint-disable-next-line react/style-prop-object
          style={{ 
            '--sparkline-left': `${(hoverIndex / (data.length - 1)) * 100}%`
          } as React.CSSProperties}
        >
          <p className="font-medium">{data[hoverIndex].toFixed(1)}%</p>
          <p className="text-muted-foreground text-xs">
            Day {hoverIndex + 1}
          </p>
        </div>
      )}
    </div>
  );
} 