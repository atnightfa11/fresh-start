"use client";

import { motion } from "framer-motion";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { MarketIntelligenceData } from "@/types/api";
import { formatPercentage } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { MetricTooltip } from "@/components/MetricContext";
import { useAnimatedMetrics } from "@/hooks/useAnimatedMetrics";
import { useTimeAgo } from "@/hooks/useTimeAgo";

const metricVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface LiveMetricsProps {
  data: MarketIntelligenceData;
}

const metricRecommendations = {
  "Engagement Rate": (change: number) => 
    change >= 0 ? "Continue current optimization strategies" 
    : "Review content quality and targeting parameters",
  "Conversion Rate": (change: number) =>
    change >= 0 ? "Consider increasing budget for high-performing campaigns"
    : "A/B test landing pages and CTAs",
  // Add more metric-specific recommendations
};

export default function LiveMetrics({ data }: LiveMetricsProps) {
  const animatedValues = useAnimatedMetrics(data?.metrics);
  const lastUpdated = useTimeAgo(data?.lastUpdated || new Date());

  // Move conditional return AFTER hooks
  if (!data?.metrics || !data.lastUpdated) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <p>No performance data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">
        Performance Metrics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            variants={metricVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="bg-background p-6 rounded-2xl border-2 border-border/30 hover:border-primary/20 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground/90">{metric.name}</h3>
                <MetricTooltip metric={metric.name} />
              </div>
              <span className={`text-sm font-medium ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change).toFixed(1)}%
              </span>
            </div>
            
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <p className="text-4xl font-bold text-foreground">
                  {animatedValues[index].toFixed(1)}%
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`font-medium ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.change >= 0 ? '▲' : '▼'} {Math.abs(metric.change).toFixed(1)}%
                  </span>
                  <span className="text-muted-foreground">
                    vs. last month
                  </span>
                </div>
              </div>
              <div className="w-40 h-16 relative">
                <Sparklines data={metric.trend_data}>
                  <SparklinesLine 
                    color={metric.change >= 0 ? "#10b981" : "#ef4444"} 
                    style={{ strokeWidth: 2 }}
                  />
                </Sparklines>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-muted/20">
              <p className="text-sm text-muted-foreground">
                {metricRecommendations[metric.name as keyof typeof metricRecommendations]?.(metric.change)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-6 border-t border-border/50">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Updated {lastUpdated}</span>
          <div className="flex items-center space-x-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Live data</span>
          </div>
        </div>
      </div>
    </div>
  );
} 