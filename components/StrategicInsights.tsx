"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { MarketIntelligenceData } from "@/types/api";

const insightVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 }
  }),
};

export function StrategicInsights({ insights }: { insights: MarketIntelligenceData['insights'] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 text-purple-400">
        <BrainCircuit className="h-6 w-6" />
        <h2 className="text-2xl font-semibold">Strategic Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            variants={insightVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="p-6 border border-border/50 rounded-xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] hover:border-purple-400/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium">{insight.title}</h3>
              <span className="text-sm bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full">
                {insight.timeframe}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">{insight.content}</p>
            <div className="flex flex-wrap gap-2">
              {insight.impact_areas.map((area) => (
                <span 
                  key={area}
                  className="text-xs px-2 py-1 bg-purple-900/20 text-purple-300 rounded-full"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 