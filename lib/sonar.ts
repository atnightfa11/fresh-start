import { MarketIntelligenceData } from "@/types/api";
import { useState, useEffect } from "react";

const MARKET_INTEL_ENDPOINT = 'http://localhost:8000/api/market-intelligence';

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
      throw new Error('Invalid API response structure');
    }
    
    const generatedAt = typeof responseData.generated_at === 'string'
      ? new Date(responseData.generated_at as string)
      : new Date(responseData.generated_at);

    return {
      ...responseData,
      generated_at: generatedAt
    } as MarketIntelligenceData;
  } catch (error) {
    console.error('Network error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch market data');
  }
}

export function useLiveMarketData() {
  const [data, setData] = useState<MarketIntelligenceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      if (isLoading && data !== null) return; // Prevent overlapping requests
      
      setIsLoading(true);
      try {
        const newData = await fetchMarketInsights();
        
        if (isMounted) {
          setData(newData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load market data');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData(); // Fetch immediately

    // Set up interval for every 60 seconds (not too frequent)
    const interval = setInterval(() => {
      if (isMounted && !isLoading) {
        fetchData();
      }
    }, 60000);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { data, error, isLoading };
} 