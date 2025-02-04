"use client";

import { formatDistanceToNow } from 'date-fns';
import { Server, RefreshCw } from 'lucide-react';

export default function StatusBar({ lastUpdated }: { lastUpdated: Date }) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-green-600">
            <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
            <span>Live Data Streaming Active</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="h-4 w-4" />
            <span>Updated {formatDistanceToNow(lastUpdated)} ago</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Data Sources:</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs">
              Google Trends
            </span>
            <span className="px-2 py-1 rounded-md bg-teal-500/10 text-teal-400 text-xs">
              SEMrush
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 