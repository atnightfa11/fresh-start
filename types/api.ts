export interface Metric {
  name: string;
  value: number;
  change: number;
  category: string;
  trend_data: number[];
  forecast?: number[];
  last_updated: Date;
  confidence_interval?: [number, number];
  sources?: string[];
}

export interface Trend {
  title: string;
  description: string;
  impact_score: number;
  category: string;
  first_seen: Date;
  last_updated: Date;
  insight: string;
  sources?: string[];
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



export interface NewsArticle {
  headline: string;
  source: string;
  url?: string;
  summary: string;
  business_impact: string;
  published_date: Date;
  category: string;
}

export interface Tool {
  name: string;
  company: string;
  description: string;
  category: string;
  key_features: string[];
  pricing_info?: string;
  target_audience: string;
  launch_date?: Date;
  website_url?: string;
}

export interface CaseStudy {
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: string[];
  source: string;
}

export interface MarketIntelligenceData {
  trends: Trend[];
  news: NewsArticle[];
  tools: Tool[];
  case_studies: CaseStudy[];
  search_trends: SearchTrend[];
  metrics: Metric[];
  generated_at: Date;
}



