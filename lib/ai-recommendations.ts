import type { Metric, Trend } from "@/types/api";

export function generateRecommendation(metric: Metric, trends: Trend[]) {
  return `
    Based on ${metric.name} change of ${metric.change}% and ${trends.length} active trends:
    ${metric.change >= 0 ? 'Capitalize' : 'Mitigate'} this movement by 
    ${getSectorActions(metric.category)}. Key opportunities: 
    ${trends.slice(0,3).map(t => t.title).join(', ')}
  `;
}

function getSectorActions(category: string): string {
  const actions: Record<string, string> = {
    retail: "optimizing product recommendations",
    finance: "enhancing fraud detection models",
    marketing: "refining audience segmentation",
    default: "reviewing campaign parameters"
  };
  return actions[category.toLowerCase()] || actions.default;
} 