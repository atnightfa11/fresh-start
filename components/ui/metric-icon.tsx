"use client";

import { TrendingUp, BarChart3 } from "lucide-react";

interface MetricIconProps {
  type: "trend" | "chart";
  className?: string;
}

export function MetricIcon({ type, className }: MetricIconProps) {
  if (type === "chart") {
    return <BarChart3 className={className} />;
  }
  return <TrendingUp className={className} />;
} 