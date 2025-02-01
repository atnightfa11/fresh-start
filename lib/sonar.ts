import { MarketIntelligenceData } from "@/types/api";

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
      last_updated: new Date()
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
      name: "ROI Improvement",
      value: 35,
      change: 12,
      trend_data: [25, 28, 32, 35]
    }
  ],
  insights: [],
  news: [],
  opportunities: []
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

    const data = await response.json();
    
    // Transform Sonar API response to match our schema
    return {
      trends: data.emerging_trends.map((trend: any) => ({
        title: trend.name,
        description: trend.description,
        impact_score: trend.impact_score,
        category: trend.category,
        first_seen: new Date(trend.first_detected),
        last_updated: new Date(trend.last_updated)
      })),
      search_trends: data.search_metrics.map((metric: any) => ({
        term: metric.keyword,
        growth: metric.growth_rate,
        date: metric.date,
        industry: metric.industry,
        region: Array.isArray(metric.regions) ? metric.regions : [metric.regions],
        sources: metric.sources || ["Unknown"],
        sentiment: metric.sentiment || "neutral"
      })),
      metrics: data.performance_metrics.map((metric: any) => {
        const rawValue = parseFloat(
          String(metric.current_value).replace(/[^0-9.-]/g, '')
        );
        const rawChange = parseFloat(
          String(metric.change_percentage).replace(/[^0-9.-]/g, '')
        );
        
        return {
          name: metric.metric_name,
          value: isNaN(rawValue) ? 0 : rawValue,
          change: isNaN(rawChange) ? 0 : rawChange,
          trend_data: metric.historical_values
        };
      }),
      insights: [],
      news: [],
      opportunities: []
    };
    
  } catch (error) {
    console.error("Sonar API integration failed:", error);
    return sampleMarketData; // Fallback to sample data
  }
} 