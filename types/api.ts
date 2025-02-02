export interface Trend {
  topic: string;
  metrics: string[];
  technical_details: string;
  adoption_rate: number;
  insight?: string;
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
  trends: Array<{
    title: string;
    description: string;
    impact_score: number;
    category: string;
    first_seen: Date;
    last_updated: Date;
    insight?: string;
  }>;
  search_trends: Array<{
    term: string;
    growth: number;
    date: string;
    industry: string;
    region: string[];
    sources: string[];
    sentiment: 'positive' | 'neutral' | 'negative';
  }>;
  insights: Array<{
    title: string;
    content: string;
    confidence: number;
    source?: string;
    impact_areas: string[];
    timeframe: 'short' | 'medium' | 'long';
  }>;
  metrics: Array<{
    name: string;
    value: number;
    change: number;
    trend_data: number[];
  }>;
  news: Array<{
    title: string;
    url: string;
    source: string;
    published_date: string;
    summary: string;
    relevance_score: number;
    key_entities: string[];
  }>;
  opportunities: Array<{
    title: string;
    description: string;
    potential_impact: number;
    difficulty: 'low' | 'medium' | 'high';
    timeframe: string;
    required_resources: string[];
  }>;
  lastUpdated: Date;
}

interface SonarMetricResponse {
  metric_name: string;
  current_value: string;
  change_percentage: string;
  historical_values: number[];
}