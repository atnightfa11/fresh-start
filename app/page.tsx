'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Brain, TrendingUp, Newspaper, Share2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { LoadingSkeleton } from '../components/loading-skeleton';
import type { MarketIntelligenceData } from '../types/api';
import { cn } from "../lib/utils";

const useMarketingData = () => {
  const [data, setData] = useState<MarketIntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const startTime = Date.now();
        const response = await fetch(`${apiUrl}/api/market-intelligence`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseText = await response.text();
        const responseData = JSON.parse(responseText) as MarketIntelligenceData;
        
        // Ensure loading shows for at least 2 seconds
        const elapsedTime = Date.now() - startTime;
        const minimumLoadingTime = 2000; // 2 seconds
        
        if (elapsedTime < minimumLoadingTime) {
          await new Promise(resolve => setTimeout(resolve, minimumLoadingTime - elapsedTime));
        }
        
        setData(responseData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refetchTrigger]);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return { data, loading, error, refetch };
};

interface DebugPanelProps {
  data: MarketIntelligenceData | null;
  loading: boolean;
  error: string | null;
}

const DebugPanel = ({ data, loading, error }: DebugPanelProps) => {
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black/80 text-white rounded-lg max-w-md text-xs">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div>Loading: {String(loading)}</div>
      <div>Error: {error || 'none'}</div>
      <div>Has Data: {String(Boolean(data))}</div>
      {data && (
        <div>
          <div>Trends: {data.trends?.length || 0}</div>
          <div>Insights: {data.insights?.length || 0}</div>
          <div>News: {data.news?.length || 0}</div>
          <div>Opportunities: {data.opportunities?.length || 0}</div>
        </div>
      )}
    </div>
  );
};

const getProgressWidth = (value: number) => `w-[${(value * 100).toFixed(0)}%]`;

export default function Home() {
  const { data, loading, error, refetch } = useMarketingData();
  const [activeTab, setActiveTab] = useState('news');

  // Debug logging
  useEffect(() => {
    console.log('Current data state:', data);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [data, loading, error]);

  const tabItems = [
    { value: 'news', icon: Newspaper, label: 'News' },
    { value: 'insights', icon: Brain, label: 'Insights' },
    { value: 'trends', icon: TrendingUp, label: 'Trends' },
    { value: 'opportunities', icon: Share2, label: 'Opportunities' }
  ];

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-center bg-gradient-text mb-8">
            AI Marketing Intelligence Hub
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Latest Marketing Intelligence - Updated {new Date().toLocaleDateString()}
          </p>
        </div>
        <Button 
          onClick={refetch} 
          variant="outline" 
          size="lg"
          className="gap-2 bg-white/80 hover:bg-white/90 border-blue-100 transition-all duration-300"
          aria-label="Refresh data"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Refresh
        </Button>
      </header>

      <nav className="mt-6" aria-label="Content sections">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full flex space-x-2 bg-white/80 p-1.5 rounded-xl border border-blue-100/20 shadow-md">
            {tabItems.map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 px-4",
                  "data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-blue-50/30",
                  "data-[state=active]:text-blue-700 data-[state=active]:shadow-md",
                  "rounded-lg transition-all duration-200 hover:bg-white/50"
                )}
                aria-label={`View ${label}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="news" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(data?.news) && data.news.map((item, index) => (
                <Card key={index} className="bg-gradient-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <CardTitle className="text-xl font-bold text-primary mb-4">{item.headline}</CardTitle>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between text-sm">
                        <a 
                          href={item.source_url || `https://www.google.com/search?q=${encodeURIComponent(item.source + ' ' + item.headline)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                        >
                          {item.source}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <time className="text-muted-foreground" dateTime={item.date}>
                          {item.date}
                        </time>
                      </div>
                      <p className="text-base leading-relaxed text-muted-foreground">{item.summary}</p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-base mb-2 text-primary">Impact Analysis</h4>
                          <p className="text-base leading-relaxed text-muted-foreground">{item.impact_analysis}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-semibold text-base mb-2 text-primary">Technical Implications</h4>
                          <p className="text-base leading-relaxed text-muted-foreground">{item.technical_implications}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(data?.insights) && data.insights.map((insight, index) => (
                <Card key={index} className="bg-gradient-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <CardTitle className="text-xl font-bold text-primary mb-4">{insight.area}</CardTitle>
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed text-muted-foreground">{insight.analysis}</p>
                      <div>
                        <h4 className="font-semibold text-base mb-3 text-primary">Key Implications</h4>
                        <ul className="list-none space-y-3">
                          {Array.isArray(insight.implications) && insight.implications.map((imp, i) => (
                            <li key={i} className="text-base text-muted-foreground flex items-start gap-3">
                              <span className="text-primary mt-1">•</span>
                              <span className="leading-relaxed">{imp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold text-base mb-3 text-primary">Case Study</h4>
                        <p className="text-base leading-relaxed text-muted-foreground">{insight.case_study}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Signal Strength:</span>
                            <div className="progress-bar w-24">
                              <div 
                                className="h-2 bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${(insight.confidence_score * 100).toFixed(0)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">
                              {(insight.confidence_score * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(data?.trends) && data.trends.map((trend, index) => (
                <Card key={index} className="bg-gradient-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <CardTitle className="text-xl font-bold text-primary mb-4">{trend.topic}</CardTitle>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">Adoption Rate:</span>
                        <div className="progress-bar w-32">
                          <div 
                            className="h-2 bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${(trend.adoption_rate * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">
                          {(trend.adoption_rate * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-base leading-relaxed text-muted-foreground">{trend.technical_details}</p>
                      <div>
                        <h4 className="font-semibold text-base mb-3 text-primary">Key Metrics</h4>
                        <ul className="list-none space-y-3">
                          {Array.isArray(trend.metrics) && trend.metrics.map((metric, i) => (
                            <li key={i} className="text-base text-muted-foreground flex items-start gap-3">
                              <span className="text-primary mt-1">•</span>
                              <span className="leading-relaxed">{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(data?.opportunities) && data.opportunities.map((opp, index) => (
                <Card key={index} className="bg-gradient-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <CardTitle className="text-xl font-bold text-primary mb-4">{opp.domain}</CardTitle>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-base mb-3 text-primary">Technical Potential</h4>
                        <p className="text-base leading-relaxed text-muted-foreground">{opp.technical_potential}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-base mb-3 text-primary">Requirements</h4>
                        <ul className="list-none space-y-3">
                          {Array.isArray(opp.requirements) && opp.requirements.map((req, i) => (
                            <li key={i} className="text-base text-muted-foreground flex items-start gap-3">
                              <span className="text-primary mt-1">•</span>
                              <span className="leading-relaxed">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold text-base mb-3 text-primary">ROI Projection</h4>
                        <p className="text-base leading-relaxed text-muted-foreground">{opp.roi_projection}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1.5 bg-muted text-sm font-medium text-muted-foreground rounded-full">
                          {opp.implementation_complexity}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground">Market Readiness:</span>
                          <div className="progress-bar w-32">
                            <div 
                              className="h-2 bg-primary rounded-full transition-all duration-500"
                              style={{ width: `${(opp.market_readiness * 100).toFixed(0)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">
                            {(opp.market_readiness * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </nav>

      {process.env.NODE_ENV === 'development' && (
        <aside aria-label="Debug information">
          <DebugPanel data={data} loading={loading} error={error} />
        </aside>
      )}
    </main>
  );
}