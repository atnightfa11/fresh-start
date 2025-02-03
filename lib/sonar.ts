import { MarketIntelligenceData } from "@/types/api";
import { useState, useEffect } from "react";

const SONAR_API_KEY = process.env.NEXT_PUBLIC_SONAR_API_KEY;
const SONAR_ENDPOINT = "https://api.sonar.pro/v1/insights";

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
      forecast: [68, 69, 71]
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
  lastUpdated: new Date()
};

export async function fetchSonarData(): Promise<MarketIntelligenceData> {
  try {
    console.log("Sonar API Request:", {
      endpoint: SONAR_ENDPOINT,
      headers: {
        Authorization: `Bearer ${SONAR_API_KEY?.slice(0, 5)}...` // Partial key for security
      }
    });

    const response = await fetch(SONAR_ENDPOINT, {
      headers: {
        "Authorization": `Bearer ${SONAR_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Sonar API error: ${response.statusText}`);
    }

    const data: MarketIntelligenceData = await response.json();
    
    // Transform Sonar API response to match our schema
    return {
      ...data,
      lastUpdated: new Date(data.lastUpdated || Date.now()),
      trends: data.trends.map(t => ({
        ...t,
        insight: t.insight || "Significant impact detected in this sector"
      }))
    };
    
  } catch (error) {
    console.error("Sonar API integration failed:", error);
    return {
      ...sampleMarketData,
      lastUpdated: new Date()
    };
  }
}

export function useLiveMarketData() {
  const [data, setData] = useState<MarketIntelligenceData>(sampleMarketData);
  
  useEffect(() => {
    const interval = setInterval(async () => {
      const newData = await fetchSonarData();
      setData(newData);
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return data;
} 