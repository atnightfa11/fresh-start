import { MarketIntelligenceData } from "@/types/api";

const SONAR_API_KEY = process.env.NEXT_PUBLIC_SONAR_API_KEY;
const SONAR_ENDPOINT = "https://api.sonar.pro/v1/insights";

export async function fetchSonarData(): Promise<MarketIntelligenceData> {
  try {
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
        region: metric.regions
      })),
      metrics: data.performance_metrics.map((metric: any) => ({
        name: metric.metric_name,
        value: metric.current_value,
        change: metric.change_percentage,
        trend_data: metric.historical_values
      }))
    };
    
  } catch (error) {
    console.error("Sonar API integration failed:", error);
    throw new Error("Failed to fetch data from Sonar Pro");
  }
} 