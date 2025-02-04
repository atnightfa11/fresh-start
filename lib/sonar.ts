import { MarketIntelligenceData } from "@/types/api";
import { useState, useEffect } from "react";

const MARKET_INTEL_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/market-intelligence`;

const sampleMarketData: MarketIntelligenceData = {
  trends: [
    {
      title: "AI-Powered Personalization",
      description: "Growing adoption of AI-driven customer experiences",
      impact_score: 9.2,
      category: "Marketing Tech",
      first_seen: new Date("2024-01-15"),
      last_updated: new Date(),
      insight: "Personalization drives 35% higher conversion rates"
    }
  ],
  search_trends: [
    {
      term: "Generative AI",
      growth: 240,
      date: "2024-03-01",
      industry: "Marketing",
      region: ["Global"],
      sources: ["Google Trends", "Internal Data"],
      sentiment: "positive" as const
    }
  ],
  metrics: [
    {
      name: "Engagement Rate",
      value: 68.3,
      change: 12.4,
      category: "Marketing",
      trend_data: [60, 65, 68, 70, 72, 68, 67],
      forecast: [68, 69, 71],
      last_updated: new Date()
    }
  ],
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

// Add full response validation
function validateMarketData(data: any): data is MarketIntelligenceData {
  return (
    Array.isArray(data?.trends) &&
    Array.isArray(data?.metrics) &&
    Array.isArray(data?.search_trends) &&
    (typeof data?.generated_at === 'string' || data?.generated_at instanceof Date)
  );
}

export async function fetchMarketInsights() {
  try {
    const response = await fetch(MARKET_INTEL_ENDPOINT);
    
    if (!response.ok) {
      // Handle HTTP errors explicitly
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const responseData = await response.json();
    
    if (!validateMarketData(responseData)) {
      console.error('Invalid API response structure:', responseData);
      return sampleMarketData;
    }
    
    const generatedAt = typeof responseData.generated_at === 'string'
      ? new Date(responseData.generated_at as string).toISOString()
      : responseData.generated_at.toISOString();

    return {
      ...responseData,
      generated_at: generatedAt
    };
  } catch (error) {
    console.error('Network error:', error);
    // Return extended sample data for better UI fallback
    return {
      ...sampleMarketData,
      generated_at: new Date(),
      _error: error instanceof Error ? error.message : 'Connection failed'
    };
  }
}

export function useLiveMarketData() {
  const [data, setData] = useState<MarketIntelligenceData>(sampleMarketData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const newData = await fetchMarketInsights();
        setData(newData as MarketIntelligenceData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to refresh');
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, error };
} 