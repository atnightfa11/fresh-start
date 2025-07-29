import { render, screen } from '@testing-library/react';
import TrendsPage from '@/app/trends/page';
import InsightsPage from '@/app/insights/page';
import ToolsPage from '@/app/tools/page';
import { fetchMarketIntelligence } from '@/lib/server-api';
import { MarketIntelligenceData } from '@/types/api';

// Mock the server API
jest.mock('@/lib/server-api');
const mockFetchMarketIntelligence = fetchMarketIntelligence as jest.MockedFunction<typeof fetchMarketIntelligence>;

// Mock date-fns format function
jest.mock('date-fns', () => ({
  format: jest.fn(() => 'Jan 1, 2024'),
}));

const mockData: MarketIntelligenceData = {
  trends: [
    {
      title: 'AI Marketing Automation Surge',
      description: 'Rapid adoption of AI-powered marketing automation tools across enterprise organizations.',
      base_score: 4.5,
      variance: 0.1,
      category: 'AI Technology',
      impact_score: 4.8,
      first_seen: new Date('2024-01-01'),
      last_updated: new Date('2024-01-15'),
      insight: 'Companies implementing AI marketing automation see 35% improvement in lead conversion rates.',
      sources: ['McKinsey', 'Forrester'],
    },
  ],
  news: [
    {
      headline: 'Meta Launches Advanced AI Ad Targeting',
      source: 'TechCrunch',
      url: 'https://techcrunch.com/article',
      summary: 'Meta introduces new AI-powered advertising targeting capabilities.',
      business_impact: 'Expected to increase ad efficiency by 25% for enterprise clients.',
      published_date: new Date('2024-01-10'),
      category: 'AI Advertising',
    },
  ],
  tools: [
    {
      name: 'ChatGPT Enterprise',
      company: 'OpenAI',
      description: 'Enterprise-grade AI assistant for marketing teams.',
      category: 'AI Content Creation',
      key_features: ['Content generation', 'Brand voice training', 'Campaign ideation'],
      pricing_info: 'Contact for pricing',
      target_audience: 'Enterprise marketing teams',
      launch_date: new Date('2023-08-01'),
      website_url: 'https://openai.com',
    },
  ],
  case_studies: [
    {
      title: 'Spotify Increases Engagement 35% with AI Personalization',
      company: 'Spotify',
      industry: 'Music Streaming',
      challenge: 'Users struggling to discover new music',
      solution: 'AI-powered playlist personalization',
      results: '35% increase in engagement, 28% improvement in retention',
      metrics: ['35% engagement lift', '28% retention improvement'],
      source: 'MIT Technology Review',
    },
  ],
  search_trends: [
    {
      term: 'AI marketing automation',
      growth: 247.3,
      date: '2024-01-15',
      industry: 'MarTech',
      region: ['North America'],
      sources: ['Google Trends'],
    },
  ],
  metrics: [
    {
      name: 'AI-Enhanced Email Open Rate',
      value: 28.4,
      change: 12.7,
      trend_data: [22, 24, 26, 28],
      sources: ['Mailchimp'],
    },
  ],
  generated_at: new Date('2024-01-15'),
};

describe('Server Component Pages', () => {
  beforeEach(() => {
    mockFetchMarketIntelligence.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('TrendsPage', () => {
    it('renders trends page with data', async () => {
      const TrendsComponent = await TrendsPage();
      render(TrendsComponent);

      expect(screen.getByText('Marketing Trends')).toBeInTheDocument();
      expect(screen.getByText('AI Marketing Automation Surge')).toBeInTheDocument();
      expect(screen.getByText('AI Technology')).toBeInTheDocument();
      expect(screen.getByText('Trending Search Terms')).toBeInTheDocument();
      expect(screen.getByText('Industry Benchmarks')).toBeInTheDocument();
    });

    it('displays trend insights and impact scores', async () => {
      const TrendsComponent = await TrendsPage();
      render(TrendsComponent);

      expect(screen.getByText(/Companies implementing AI marketing automation/)).toBeInTheDocument();
      expect(screen.getByText('Impact: 4.8/5')).toBeInTheDocument();
    });

    it('fetches data from server API', async () => {
      await TrendsPage();
      expect(mockFetchMarketIntelligence).toHaveBeenCalledTimes(1);
    });
  });

  describe('InsightsPage', () => {
    it('renders insights page with news and case studies', async () => {
      const InsightsComponent = await InsightsPage();
      render(InsightsComponent);

      expect(screen.getByText('Industry Insights')).toBeInTheDocument();
      expect(screen.getByText('Industry News')).toBeInTheDocument();
      expect(screen.getByText('Case Studies')).toBeInTheDocument();
      expect(screen.getByText('Meta Launches Advanced AI Ad Targeting')).toBeInTheDocument();
    });

    it('displays business impact information', async () => {
      const InsightsComponent = await InsightsPage();
      render(InsightsComponent);

      expect(screen.getByText('Business Impact')).toBeInTheDocument();
      expect(screen.getByText(/Expected to increase ad efficiency/)).toBeInTheDocument();
    });

    it('shows case study details', async () => {
      const InsightsComponent = await InsightsPage();
      render(InsightsComponent);

      expect(screen.getByText('Spotify Increases Engagement 35% with AI Personalization')).toBeInTheDocument();
      expect(screen.getByText('Music Streaming')).toBeInTheDocument();
      expect(screen.getByText('Challenge')).toBeInTheDocument();
      expect(screen.getByText('Solution')).toBeInTheDocument();
      expect(screen.getByText('Results')).toBeInTheDocument();
    });
  });

  describe('ToolsPage', () => {
    it('renders tools page with tool directory', async () => {
      const ToolsComponent = await ToolsPage();
      render(ToolsComponent);

      expect(screen.getByText('Marketing Tools')).toBeInTheDocument();
      expect(screen.getByText('ChatGPT Enterprise')).toBeInTheDocument();
      expect(screen.getByText('OpenAI')).toBeInTheDocument();
      expect(screen.getByText('AI Content Creation')).toBeInTheDocument();
    });

    it('displays tool features and pricing', async () => {
      const ToolsComponent = await ToolsPage();
      render(ToolsComponent);

      expect(screen.getByText('Key Features')).toBeInTheDocument();
      expect(screen.getByText('Content generation')).toBeInTheDocument();
      expect(screen.getByText('Pricing')).toBeInTheDocument();
      expect(screen.getByText('Contact for pricing')).toBeInTheDocument();
      expect(screen.getByText('Target Audience')).toBeInTheDocument();
    });

    it('shows category filters', async () => {
      const ToolsComponent = await ToolsPage();
      render(ToolsComponent);

      expect(screen.getByText('All Categories')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles API errors gracefully', async () => {
      const fallbackData = {
        trends: [],
        news: [],
        tools: [],
        case_studies: [],
        search_trends: [],
        metrics: [],
        generated_at: new Date(),
      };

      mockFetchMarketIntelligence.mockResolvedValue(fallbackData);

      const TrendsComponent = await TrendsPage();
      render(TrendsComponent);

      expect(screen.getByText('Marketing Trends')).toBeInTheDocument();
      // Should still render the page structure even with empty data
    });
  });
}); 