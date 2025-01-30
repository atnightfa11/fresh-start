export async function fetchMarketingData() {
  try {
    const response = await fetch('/api/market-intelligence');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
} 