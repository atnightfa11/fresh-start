import { MarketIntelligenceData } from '@/types/api';

export async function fetchMarketingData() {
  try {
    const response = await fetch('/api/market-intelligence');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: MarketIntelligenceData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
} 