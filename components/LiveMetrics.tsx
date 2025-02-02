"use client";

import { motion } from "framer-motion";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { MarketIntelligenceData } from "@/types/api";
import { formatPercentage } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { MetricTooltip } from "@/components/MetricContext";

const metricVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface LiveMetricsProps {
  data: MarketIntelligenceData;
}

export default function LiveMetrics({ data }: LiveMetricsProps) {
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
                  {metric.value.toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">
                  {metric.change >= 0 ? 'Increase' : 'Decrease'} from last month
                </p>
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
          </motion.div>
        ))}
      </div>

      <div className="pt-6 border-t border-border/50">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
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