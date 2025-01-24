export interface Trend {
  topic: string;
  metrics: string[];
  technical_details: string;
  adoption_rate: number;
}

export interface Insight {
  area: string;
  analysis: string;
  implications: string[];
  case_study: string;
  confidence_score: number;
}

export interface NewsItem {
  headline: string;
  category: string;
  summary: string;
  impact_analysis: string;
  technical_implications: string;
  date: string;
  source: string;
  relevance_score: number;
}

export interface Opportunity {
  domain: string;
  technical_potential: string;
  requirements: string[];
  roi_projection: string;
  implementation_complexity: 'High' | 'Medium' | 'Low';
  market_readiness: number;
}

export interface MarketIntelligenceData {
  trends: Trend[];
  insights: Insight[];
  news: NewsItem[];
  opportunities: Opportunity[];
  timestamp?: string;
} 