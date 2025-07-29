import { fetchMarketIntelligence } from '@/lib/server-api';
import { MarketIntelligenceData } from '@/types/api';

// Mock fetch for testing
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Server API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up default environment
    process.env.NEXT_PUBLIC_BACKEND_URL = 'http://localhost:8000';
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchMarketIntelligence', () => {
    it('should fetch market intelligence data successfully', async () => {
      const mockData: MarketIntelligenceData = {
        trends: [
          {
            title: 'Test Trend',
            description: 'Test Description',
            base_score: 4.5,
            variance: 0.1,
            category: 'AI',
            impact_score: 4.8,
            first_seen: new Date(),
            last_updated: new Date(),
            insight: 'Test insight',
            sources: ['Test Source'],
          },
        ],
        news: [],
        tools: [],
        case_studies: [],
        search_trends: [],
        metrics: [],
        generated_at: new Date(),
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchMarketIntelligence();

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/market-intelligence',
        expect.objectContaining({
          next: { revalidate: 300 },
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
      expect(result).toEqual(mockData);
    });

    it('should return fallback data when fetch fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchMarketIntelligence();

      expect(result).toEqual({
        trends: [],
        news: [],
        tools: [],
        case_studies: [],
        search_trends: [],
        metrics: [],
        generated_at: expect.any(Date),
      });
    });

    it('should return fallback data when response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await fetchMarketIntelligence();

      expect(result).toEqual({
        trends: [],
        news: [],
        tools: [],
        case_studies: [],
        search_trends: [],
        metrics: [],
        generated_at: expect.any(Date),
      });
    });

    it('should handle invalid JSON response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      });

      const result = await fetchMarketIntelligence();

      expect(result).toEqual({
        trends: [],
        news: [],
        tools: [],
        case_studies: [],
        search_trends: [],
        metrics: [],
        generated_at: expect.any(Date),
      });
    });

    it('should use environment variable for API URL', async () => {
      process.env.NEXT_PUBLIC_BACKEND_URL = 'https://api.example.com';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ trends: [], news: [], tools: [], case_studies: [], search_trends: [], metrics: [], generated_at: new Date() }),
      });

      await fetchMarketIntelligence();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/api/market-intelligence',
        expect.any(Object)
      );
    });

    it('should fall back to localhost when no environment variable is set', async () => {
      delete process.env.NEXT_PUBLIC_BACKEND_URL;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ trends: [], news: [], tools: [], case_studies: [], search_trends: [], metrics: [], generated_at: new Date() }),
      });

      await fetchMarketIntelligence();

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/market-intelligence',
        expect.any(Object)
      );
    });
  });
}); 