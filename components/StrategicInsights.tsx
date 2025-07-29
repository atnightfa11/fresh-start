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

export function StrategicInsights({ news }: { news: MarketIntelligenceData['news'] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 text-purple-400">
        <BrainCircuit className="h-6 w-6" />
        <h2 className="text-2xl font-semibold">Strategic Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((article, index) => (
          <motion.div
            key={article.headline}
            variants={insightVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="p-6 border border-border/50 rounded-xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] hover:border-purple-400/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium">{article.headline}</h3>
              <span className="text-sm bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full">
                {article.category}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">{article.summary}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-purple-900/20 text-purple-300 rounded-full">
                {article.source}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 