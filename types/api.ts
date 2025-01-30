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
  source: string;
  source_url?: string;
  date: string;
  summary: string;
  impact_analysis: string;
  technical_implications: string;
  category: string;
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
  search_trends: Array<{
    term: string;
    growth: number;
    industry?: string;
    region: string[];
    sentiment?: 'positive' | 'negative' | 'neutral';
  }>;
  trends: Array<{
    title: string;
    description: string;
    impact_score: number;
    category: string;
  }>;
  insights: Array<{
    title: string;
    content: string;
    confidence: number;
    source?: string;
  }>;
  news: Array<{
    title: string;
    url: string;
    source: string;
    published_date: string;
    summary: string;
  }>;
  opportunities: Array<{
    title: string;
    description: string;
    potential_impact: number;
    difficulty: 'low' | 'medium' | 'high';
  }>;
} 