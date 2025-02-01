"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { MarketIntelligenceData } from "@/types/api";

const trendVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05 }
  }),
};

interface TrendingTopicsProps {
  data: MarketIntelligenceData;
}

export default function TrendingTopics({ data }: TrendingTopicsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Trending AI Topics
        </h2>
        <div className="flex items-center space-x-1 text-sm text-green-500">
          <TrendingUp className="h-4 w-4" />
          <span>Updated now</span>
        </div>
      </div>

      <div className="space-y-4">
        {data.trends.map((trend, index) => (
          <motion.div
            key={trend.title}
            variants={trendVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="group flex flex-col md:flex-row items-start justify-between p-6 rounded-2xl border-2 border-border/30 bg-background hover:border-primary/20 transition-all"
          >
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-foreground">{trend.title}</h3>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-900/20 text-blue-400">
                  {trend.category}
                </span>
              </div>
              <p className="text-muted-foreground text-base line-clamp-2">
                {trend.description}
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="text-right">
                <p className={`text-3xl font-bold ${trend.impact_score >= 4 ? 'text-green-500' : 'text-red-500'}`}>
                  {trend.impact_score >= 0 ? '+' : ''}{trend.impact_score.toFixed(1)}%
                </p>
                <span className="text-sm text-muted-foreground">Impact Score</span>
              </div>
              <ArrowUpRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 