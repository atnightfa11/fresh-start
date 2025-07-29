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
    <div className="pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Marketing Trends</h1>
          <p className="text-xl text-muted-foreground">
            Latest marketing and AI technology trends from industry-leading sources
          </p>
        </div>

        <div className="grid gap-8">
          {data.trends.map((trend, index) => (
            <Card key={trend.title} className="p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-l-cyan-500">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
                    {trend.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{format(new Date(trend.first_seen), 'MMM dd, yyyy')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-cyan-50 px-3 py-1 rounded-full">
                  <BarChart3 className="h-4 w-4 text-cyan-600" />
                  <span className="text-sm font-bold text-cyan-800">
                    {trend.impact_score.toFixed(1)}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-3 leading-tight text-foreground">{trend.title}</h2>
              <p className="text-muted-foreground mb-5 leading-relaxed">{trend.description}</p>

              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-cyan-600" />
                  <span className="font-semibold text-cyan-800 text-sm">Key Insight</span>
                </div>
                <p className="text-cyan-800 text-sm leading-relaxed">{trend.insight}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  {trend.sources && trend.sources.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Sources:</span> {trend.sources.slice(0, 2).join(', ')}
                      {trend.sources.length > 2 && ` +${trend.sources.length - 2} more`}
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(trend.title + ' marketing trend')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Search Trends Section */}
        {data?.search_trends && data.search_trends.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Trending Search Terms</h2>
              <div className="text-sm text-muted-foreground">
                Updated {format(new Date(), 'MMM dd, yyyy • h:mm a')}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.search_trends.map((searchTrend, index) => (
                <Card key={index} className="p-7 hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-lg text-foreground leading-tight">{searchTrend.term}</h3>
                    <div className="text-right bg-green-50 px-3 py-2 rounded-lg">
                      <div className="text-xl font-bold text-green-700">
                        +{searchTrend.growth.toFixed(1)}%
                      </div>
                      <div className="text-xs text-green-600 font-medium">growth</div>
                    </div>
                  </div>
                  
                  {/* Use the SearchTrendsChart component */}
                  <SearchTrendsChart searchTrends={[searchTrend]} />

                  <div className="space-y-3 text-sm pt-3 border-t border-gray-200 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-muted-foreground text-xs">Industry:</span>
                      <span className="font-bold text-xs text-foreground">{searchTrend.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-muted-foreground text-xs">Regions:</span>
                      <span className="font-bold text-xs text-foreground">{searchTrend.region.join(', ')}</span>
                    </div>
                    {searchTrend.sources && (
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-muted-foreground text-xs">Sources:</span>
                        <span className="font-bold text-xs text-foreground">{searchTrend.sources.slice(0, 2).join(', ')}</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Key Metrics Section */}
        {data?.metrics && data.metrics.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Industry Benchmarks</h2>
              <div className="text-sm text-muted-foreground">
                Updated {format(new Date(), 'MMM dd, yyyy • h:mm a')}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.metrics.map((metric, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{metric.name}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {metric.value.toFixed(1)}%
                      </div>
                      <div className={`text-sm font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Use the IndustryBenchmarksChart component */}
                  <IndustryBenchmarksChart metrics={[metric]} />

                  <div className="space-y-3 text-sm mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-muted-foreground">Current Value:</span>
                      <span className="font-medium">{metric.value.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-muted-foreground">Sources:</span>
                      <span className="font-medium text-xs">{metric.sources?.join(', ')}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 