"use client";

import { motion } from "framer-motion";
import { Sparkline } from "./ui/sparkline";
import { animated, useSpring } from '@react-spring/web';
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { MarketIntelligenceData, Metric } from "@/types/api";

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

interface MetricCardProps {
  metric: Metric;
  index: number;
}

const MetricCard = ({ metric, index }: MetricCardProps) => {
  const styles = useSpring({
    from: { value: 0 },
    to: { value: metric.value },
    config: { tension: 300, friction: 40 }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 hover:border-purple-500/30 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold text-lg">{metric.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Industry benchmark: {(metric.value * 0.85).toFixed(1)}%
          </p>
        </div>
        <div className="flex items-center gap-2">
        <span className={`text-xl font-semibold ${
            metric.change >= 0 ? 'text-purple-400' : 'text-rose-400'
          }`}>
            <animated.span style={{ display: 'inline' }}>
              {styles.value.to((val: number) => `${val.toFixed(1)}%`)}
            </animated.span>
          </span>
          {metric.change >= 0 ? (
            <ArrowUp className="h-5 w-5 text-purple-400" />
          ) : (
            <ArrowDown className="h-5 w-5 text-rose-400" />
          )}
        </div>
      </div>
      <Sparkline data={metric.trend_data} />
    </motion.div>
  );
};

export default function LiveMetrics({ data }: LiveMetricsProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Real-Time AI Marketing Signals</h2>
          <p className="text-muted-foreground max-w-2xl">
            Live tracking of AI adoption rates, campaign performance, and market shifts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.metrics?.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}