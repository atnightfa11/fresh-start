import { MarketIntelligenceData } from "@/types/api";

export const sampleMarketData: MarketIntelligenceData = {
  trends: [{
    title: "AI-Powered Personalization",
    description: "Growing adoption of AI-driven customer experiences",
    impact_score: 9.2,
    category: "Marketing Tech",
    first_seen: new Date("2024-01-15"),
    last_updated: new Date(),
    insight: "Personalization drives 35% higher conversion rates"
  }],
  search_trends: [{
    term: "Generative AI",
    growth: 240,
    date: "2024-03-01",
    industry: "Marketing",
    region: ["Global"],
    sources: ["Google Trends", "Internal Data"],
    sentiment: "positive" as const
  }],
  metrics: [{
    name: "AI Ad Spend Efficiency",
    value: 68.3,
    change: 12.4,
    category: "Marketing",
    trend_data: [60, 65, 68, 70, 72, 68, 67],
    forecast: [68, 69, 71],
    last_updated: new Date(),
    confidence_interval: [65.2, 71.4]
  }],
  insights: [{
    title: "AI Content Optimization",
    content: "Implement generative AI for dynamic content personalization",
    confidence: 0.92,
    impact_areas: ["Conversion Rates", "Engagement"],
    timeframe: "short"
  }],
  news: [],
  opportunities: [],
  generated_at: new Date()
}; 