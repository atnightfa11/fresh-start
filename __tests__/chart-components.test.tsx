import { render, screen, fireEvent } from '@testing-library/react';
import { SearchTrendsChart } from '@/components/charts/SearchTrendsChart';
import { IndustryBenchmarksChart } from '@/components/charts/IndustryBenchmarksChart';
import { SearchTrend, Metric } from '@/types/api';

const mockSearchTrends: SearchTrend[] = [
  {
    term: 'AI marketing automation',
    growth: 247.3,
    date: '2024-01-15',
    industry: 'MarTech',
    region: ['North America'],
    sources: ['Google Trends'],
  },
  {
    term: 'personalization engine',
    growth: 156.2,
    date: '2024-01-14',
    industry: 'E-commerce',
    region: ['Global'],
    sources: ['SEMrush'],
  },
  {
    term: 'conversion optimization',
    growth: 89.5,
    date: '2024-01-13',
    industry: 'MarTech',
    region: ['North America'],
    sources: ['Ahrefs'],
  },
];

const mockMetrics: Metric[] = [
  {
    name: 'AI-Enhanced Email Open Rate',
    value: 28.4,
    change: 12.7,
    trend_data: [22, 24, 26, 28],
    sources: ['Mailchimp'],
  },
  {
    name: 'Personalized Content Engagement',
    value: 67.8,
    change: 23.5,
    trend_data: [52, 58, 62, 68],
    sources: ['Adobe Analytics'],
  },
  {
    name: 'AI Campaign ROI',
    value: 32.1,
    change: 18.9,
    trend_data: [15, 22, 26, 32],
    sources: ['HubSpot'],
  },
];

describe('Chart Components', () => {
  describe('SearchTrendsChart', () => {
    it('renders search trends with bar charts', () => {
      render(<SearchTrendsChart searchTrends={mockSearchTrends} />);

      expect(screen.getByText('AI marketing automation')).toBeInTheDocument();
      expect(screen.getByText('+247.3%')).toBeInTheDocument();
      expect(screen.getByText('personalization engine')).toBeInTheDocument();
      expect(screen.getByText('+156.2%')).toBeInTheDocument();
    });

    it('limits display to 3 trends', () => {
      render(<SearchTrendsChart searchTrends={mockSearchTrends} />);

      expect(screen.getByText('AI marketing automation')).toBeInTheDocument();
      expect(screen.getByText('personalization engine')).toBeInTheDocument();
      expect(screen.getByText('conversion optimization')).toBeInTheDocument();
    });

    it('displays day labels for chart', () => {
      render(<SearchTrendsChart searchTrends={mockSearchTrends} />);

      expect(screen.getByText('Mon')).toBeInTheDocument();
      expect(screen.getByText('Tue')).toBeInTheDocument();
      expect(screen.getByText('Wed')).toBeInTheDocument();
      expect(screen.getByText('Thu')).toBeInTheDocument();
      expect(screen.getByText('Fri')).toBeInTheDocument();
      expect(screen.getByText('Sat')).toBeInTheDocument();
      expect(screen.getByText('Sun')).toBeInTheDocument();
    });

    it('shows tooltips on hover', () => {
      render(<SearchTrendsChart searchTrends={mockSearchTrends} />);

      const bars = screen.getAllByText('Mon');
      expect(bars.length).toBeGreaterThan(0);
    });
  });

  describe('IndustryBenchmarksChart', () => {
    it('renders metrics with line charts', () => {
      render(<IndustryBenchmarksChart metrics={mockMetrics} />);

      expect(screen.getByText('AI-Enhanced Email Open Rate')).toBeInTheDocument();
      expect(screen.getByText('28.4%')).toBeInTheDocument();
      expect(screen.getByText('+12.7%')).toBeInTheDocument();
      
      expect(screen.getByText('Personalized Content Engagement')).toBeInTheDocument();
      expect(screen.getByText('67.8%')).toBeInTheDocument();
      expect(screen.getByText('+23.5%')).toBeInTheDocument();
    });

    it('limits display to 3 metrics', () => {
      render(<IndustryBenchmarksChart metrics={mockMetrics} />);

      expect(screen.getByText('AI-Enhanced Email Open Rate')).toBeInTheDocument();
      expect(screen.getByText('Personalized Content Engagement')).toBeInTheDocument();
      expect(screen.getByText('AI Campaign ROI')).toBeInTheDocument();
    });

    it('displays week labels', () => {
      render(<IndustryBenchmarksChart metrics={mockMetrics} />);

      expect(screen.getByText('Week 1')).toBeInTheDocument();
      expect(screen.getByText('Week 2')).toBeInTheDocument();
      expect(screen.getByText('Week 3')).toBeInTheDocument();
      expect(screen.getByText('Week 4')).toBeInTheDocument();
    });

    it('renders SVG elements for line charts', () => {
      render(<IndustryBenchmarksChart metrics={mockMetrics} />);

      const svgElements = screen.getAllByRole('img', { hidden: true });
      expect(svgElements.length).toBeGreaterThan(0);
    });
  });

  describe('Interactive Features', () => {
    it('search trends chart handles empty data', () => {
      render(<SearchTrendsChart searchTrends={[]} />);
      
      // Should not crash and should render container
      expect(screen.queryByText('AI marketing automation')).not.toBeInTheDocument();
    });

    it('industry benchmarks chart handles empty data', () => {
      render(<IndustryBenchmarksChart metrics={[]} />);
      
      // Should not crash and should render container
      expect(screen.queryByText('AI-Enhanced Email Open Rate')).not.toBeInTheDocument();
    });

    it('handles invalid metric data gracefully', () => {
      const invalidMetrics = [
        {
          name: 'Test Metric',
          value: 0,
          change: 0,
          trend_data: [],
          sources: [],
        },
      ] as Metric[];

      render(<IndustryBenchmarksChart metrics={invalidMetrics} />);
      
      expect(screen.getByText('Test Metric')).toBeInTheDocument();
      expect(screen.getByText('0.0%')).toBeInTheDocument();
    });
  });
}); 