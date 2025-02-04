"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Lightbulb, Clock, Activity } from "lucide-react";
import { MarketIntelligenceData } from "../types/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";

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
        {data.trends?.map((trend, index) => (
          <motion.div key={trend.title} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-sm py-1 px-3">
                  {trend.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    First detected: {format(new Date(trend.first_seen), 'MMM dd')}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{trend.title}</h3>
              
              <div className="bg-blue-50/20 p-4 rounded-lg border border-blue-500/20 mb-4">
                <div className="flex items-center gap-2 text-blue-300 mb-2">
                  <Lightbulb className="h-5 w-5" />
                  <span className="font-medium">Strategic Insight</span>
                </div>
                <p className="text-muted-foreground">
                  {trend.insight || "No insight provided"}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center gap-1">
                        <Activity className="h-5 w-5 text-purple-500" />
                        <span className="text-2xl font-bold">
                          {trend.impact_score.toFixed(1)}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Impact Score (1-10 scale)</p>
                      <p>Combined market and technical impact</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  View Strategy <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 