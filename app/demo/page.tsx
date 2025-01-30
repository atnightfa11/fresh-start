"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import TrendingTopics from '@/components/TrendingTopics';
import LiveMetrics from '@/components/LiveMetrics';

export default function DemoPage() {
  return (
    <div className="pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center mb-6 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          Live Demo
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Experience real-time AI marketing intelligence in action.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Trending AI Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendingTopics />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <LiveMetrics />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 