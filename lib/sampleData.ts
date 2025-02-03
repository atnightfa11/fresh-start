import { MarketIntelligenceData } from "@/types/api";

export const sampleMarketData: MarketIntelligenceData = {
  trends: [{
    title: 'Sample Trend',
    description: 'Example description',
    impact_score: 0,
    category: 'General',
    first_seen: new Date(),
    last_updated: new Date(),
    insight: 'Sample insight'
  }],
  search_trends: [],
  metrics: [{
    name: 'Sample Metric',
    value: 0,
    change: 0,
    category: 'General',
    trend_data: [0, 0, 0]
  }],
  insights: [],
  news: [],
  opportunities: [],
  lastUpdated: new Date()
}; 