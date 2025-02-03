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
import { Sparkline } from "./ui/sparkline";

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

  if (!data?.metrics?.length) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No metrics available
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Live Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.metrics?.map((metric, index) => (
          <div key={index} className="bg-card rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{metric?.name || 'Unnamed Metric'}</h3>
              <span className="text-primary">
                {(metric?.value ?? 0).toFixed(1)}%
              </span>
            </div>
            <Sparkline data={metric?.trend_data || []} />
          </div>
        ))}
      </div>
    </div>
  );
} 