import { Metadata } from 'next';
import { useState } from 'react';
import { Newspaper, Users, TrendingUp, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchMarketIntelligence } from '@/lib/server-api';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Industry Insights & Case Studies | Neural Signal',
  description: 'Breaking news, case studies, and expert analysis from top marketing sources. Real-time updates from industry leaders and strategic insights.',
  openGraph: {
    title: 'Industry Insights & Case Studies | Neural Signal',
    description: 'Breaking news, case studies, and expert analysis from top marketing sources. Real-time updates from industry leaders and strategic insights.',
    type: 'website',
    url: '/insights',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neural Signal Industry Insights Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industry Insights & Case Studies | Neural Signal',
    description: 'Breaking news, case studies, and expert analysis from top marketing sources.',
    images: ['/og-image.png'],
  },
};

function TabsWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export default async function InsightsPage() {
  // Fetch data server-side
  const data = await fetchMarketIntelligence();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Newspaper className="h-8 w-8 text-cyan-500" />
            <h1 className="text-3xl font-bold text-foreground">Industry Insights</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Breaking news, case studies, and expert analysis from top sources
          </p>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="news" className="flex items-center space-x-2">
              <Newspaper className="h-4 w-4" />
              <span>Industry News</span>
            </TabsTrigger>
            <TabsTrigger value="case-studies" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Case Studies</span>
            </TabsTrigger>
          </TabsList>

          {/* Industry News Tab */}
          <TabsContent value="news" className="space-y-6">
            <div className="grid gap-6">
              {data.news.map((article, index) => (
                <Card key={index} className="p-6 border-l-4 border-l-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge variant="secondary" className="text-xs font-medium">
                          {article.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(article.published_date), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                        {article.headline}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {article.summary}
                      </p>

                      {/* Business Impact */}
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">Business Impact</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {article.business_impact}
                        </p>
                      </div>

                      {/* Source and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Source:</span>
                            <span className="text-sm font-medium text-foreground">{article.source}</span>
                          </div>
                          {article.url && (
                            <div className="text-xs text-muted-foreground">
                              {new URL(article.url).hostname}
                            </div>
                          )}
                        </div>
                        
                        <Button asChild variant="outline" size="sm">
                          <a 
                            href={article.url || `https://www.google.com/search?q=${encodeURIComponent(article.headline)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read Full Article
                            <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Case Studies Tab */}
          <TabsContent value="case-studies" className="space-y-6">
            <div className="grid gap-8">
              {data.case_studies.map((caseStudy, index) => (
                <Card key={index} className="p-6 border-l-4 border-l-gray-200 hover:shadow-md transition-shadow">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="text-xs font-medium">
                          {caseStudy.industry}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{caseStudy.company}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 leading-tight">
                      {caseStudy.title}
                    </h3>

                    {/* Challenge, Solution, Results Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      {/* Challenge */}
                      <div className="bg-muted/50 rounded-lg p-4 border border-border">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Challenge</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {caseStudy.challenge}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="bg-muted/50 rounded-lg p-4 border border-border">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Solution</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {caseStudy.solution}
                        </p>
                      </div>

                      {/* Results */}
                      <div className="bg-background rounded-lg p-4 border border-border">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Results</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {caseStudy.results}
                        </p>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-3">Key Metrics</h4>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.metrics.map((metric, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-green-500/10 text-green-700 text-xs font-medium rounded-full"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Source and Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Source:</span>
                        <a 
                          href={`https://www.google.com/search?q=${encodeURIComponent(caseStudy.source)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-foreground hover:text-cyan-600 transition-colors"
                        >
                          {caseStudy.source}
                        </a>
                      </div>
                      
                      <Button asChild variant="outline" size="sm">
                        <a 
                          href={`https://www.google.com/search?q=${encodeURIComponent(caseStudy.title + ' case study')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Full Case Study
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 