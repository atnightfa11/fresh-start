"use client";

import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const metricDescriptions = {
  "Engagement Rate": "Measures user interaction with AI-powered content. Higher engagement correlates with better conversion rates.",
  "Conversion Rate": "Percentage of users completing desired actions. Directly impacts ROI of marketing campaigns.",
  "ROI Improvement": "Return on investment from AI-driven optimizations compared to traditional methods."
};

export function MetricTooltip({ metric }: { metric: string }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px] bg-background border-border">
        <p className="font-medium text-foreground mb-1">{metric}</p>
        <p className="text-muted-foreground text-sm">
          {metricDescriptions[metric as keyof typeof metricDescriptions]}
        </p>
      </TooltipContent>
    </Tooltip>
  );
} 