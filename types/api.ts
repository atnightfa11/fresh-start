export interface Metric {
  name: string;
  value: number;
  change: number;
  category: string;
  trend_data: number[];
  forecast?: number[];
  last_updated: Date;
  confidence_interval?: [number, number];
}

export interface Trend {
  title: string;
  description: string;
  impact_score: number;
  category: string;
  first_seen: Date;
  last_updated: Date;
  insight: string;
}

export interface SearchTrend {
  term: string;
  growth: number;
  date: string;
  industry: string;
  region: string[];
  sources: string[];
  sentiment: "positive" | "neutral" | "negative";
}

export interface Insight {
  title: string;
  content: string;
  confidence: number;
  impact_areas: string[];
  timeframe: "short" | "medium" | "long";
}

export interface NewsItem {
  title: string;
  source: string;
  date: Date;
  summary: string;
  url: string;
}

export interface Opportunity {
  category: string;
  description: string;
  potential_impact: number;
  timeframe: "short" | "medium" | "long";
}

export interface MarketIntelligenceData {
  trends: Trend[];
  search_trends: SearchTrend[];
  metrics: Metric[];
  insights: Insight[];
  news: NewsItem[];
  opportunities: Opportunity[];
  generated_at: Date;
}



