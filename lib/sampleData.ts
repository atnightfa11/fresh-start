import { MarketIntelligenceData } from "@/types/api";

export const sampleMarketData: MarketIntelligenceData = {
  trends: [
    {
      title: "AI-Powered Campaign Optimization",
      description: "AI-driven marketing automation trends",
      impact_score: 9.2,
      category: "Marketing Tech",
      first_seen: new Date("2024-03-01"),
      last_updated: new Date(),
      insight: "Marketers using AI automation see 40% higher ROI"
    }
  ],
  search_trends: [
    {
      term: "AI Marketing Automation",
      growth: 240,
      date: "2024-03-01",
      industry: "E-commerce",
      region: ["Global"],
      sources: ["Google Trends", "Market Research"],
      sentiment: "positive" as const
    }
  ],
  metrics: [
    {
      name: "ROI",
      value: 4.5,
      change: 1.3,
      category: "Performance",
      trend_data: [3.8, 4.1, 4.3, 4.5]
    }
  ],
  news: [],
  opportunities: [],
  insights: [],
  lastUpdated: new Date()
}; 