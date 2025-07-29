import { Metadata } from 'next';
import { TrendingUp, Clock, BarChart3, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SearchTrendsChart } from '@/components/charts/SearchTrendsChart';
import { IndustryBenchmarksChart } from '@/components/charts/IndustryBenchmarksChart';
import { fetchMarketIntelligence } from '@/lib/server-api';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Marketing Trends & Analytics | Neural Signal',
  description: 'Discover the latest AI and marketing technology trends from industry leaders. Real-time search trends, industry benchmarks, and strategic insights.',
  openGraph: {
    title: 'Marketing Trends & Analytics | Neural Signal',
    description: 'Discover the latest AI and marketing technology trends from industry leaders. Real-time search trends, industry benchmarks, and strategic insights.',
    type: 'website',
    url: '/trends',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neural Signal Marketing Trends Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing Trends & Analytics | Neural Signal',
    description: 'Discover the latest AI and marketing technology trends from industry leaders.',
    images: ['/og-image.png'],
  },
};

export default async function TrendsPage() {
  // Fetch data server-side
  const data = await fetchMarketIntelligence();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-8 w-8 text-cyan-500" />
            <h1 className="text-3xl font-bold text-foreground">Marketing Trends</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Latest AI and marketing technology trends from industry leaders
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Last updated: {format(new Date(data.generated_at), 'MMM d, yyyy h:mm a')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trends List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Current Trends</h2>
            
            {data.trends.map((trend, index) => (
              <Card key={trend.title} className="p-6 border-l-4 border-l-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{trend.title}</h3>
                      <Badge variant="secondary" className="text-xs font-medium">
                        {trend.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{trend.description}</p>
                    
                    {trend.insight && (
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-foreground leading-relaxed">{trend.insight}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                          <span className="text-sm font-medium text-foreground">
                            Impact: {trend.impact_score}/5
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(trend.first_seen), 'MMM d')}
                        </span>
                      </div>
                      
                      <Button asChild variant="outline" size="sm">
                        <a 
                          href={`https://www.google.com/search?q=${encodeURIComponent(trend.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Details
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar with Charts */}
          <div className="space-y-8">
            {/* Trending Search Terms */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="h-5 w-5 text-cyan-500" />
                <h3 className="text-lg font-semibold text-foreground">Trending Search Terms</h3>
              </div>
              <SearchTrendsChart searchTrends={data.search_trends} />
            </Card>

            {/* Industry Benchmarks */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="h-5 w-5 text-cyan-500" />
                <h3 className="text-lg font-semibold text-foreground">Industry Benchmarks</h3>
              </div>
              <IndustryBenchmarksChart metrics={data.metrics} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 