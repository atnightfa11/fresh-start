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
            className="group flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-muted/5 transition-all"
          >
            <div className="space-y-1">
              <h3 className="font-medium text-foreground">{trend.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {trend.description}
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="px-2 py-1 rounded-full bg-muted text-foreground/80">
                  {trend.category}
                </span>
                <span className="text-muted-foreground">
                  First seen: {new Date(trend.first_seen).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">
                  {trend.impact_score.toFixed(1)}
                </p>
                <span className="text-sm text-muted-foreground">Impact Score</span>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 