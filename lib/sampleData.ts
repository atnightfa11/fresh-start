import { MarketIntelligenceData } from "@/types/api";

export const sampleMarketData: MarketIntelligenceData = {
  trends: [
    {
      title: "AI in Retail",
      description: "AI transforming customer experiences",
      impact_score: 4.5,
      category: "Retail",
      first_seen: new Date("2024-01-15"),
      last_updated: new Date(),
      insight: "Retailers using AI personalization see 35% higher conversion rates"
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
      name: "Engagement Rate",
      value: 68.3,
      change: 12.4,
      trend_data: [60, 65, 68, 70, 72, 68, 67]
    }
  ],
  news: [],
  opportunities: [],
  insights: [],
  lastUpdated: new Date()
}; 