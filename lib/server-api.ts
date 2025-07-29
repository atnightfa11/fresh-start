import { MarketIntelligenceData } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export async function fetchMarketIntelligence(): Promise<MarketIntelligenceData> {
  try {
    // Use absolute URL for server-side fetching
    const url = `${API_BASE_URL}/api/market-intelligence`;
    
    const response = await fetch(url, {
      // Enable caching for better performance
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate the response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid API response format');
    }

    return data as MarketIntelligenceData;
  } catch (error) {
    console.error('Failed to fetch market intelligence:', error);
    
    // Return fallback data to ensure the page still renders
    return getFallbackData();
  }
}

function getFallbackData(): MarketIntelligenceData {
  return {
    trends: [],
    news: [],
    tools: [],
    case_studies: [],
    search_trends: [],
    metrics: [],
    generated_at: new Date(),
  };
} 