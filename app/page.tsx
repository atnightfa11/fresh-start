'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Brain, TrendingUp, Newspaper, Share2, AlertCircle, RefreshCw } from 'lucide-react';
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
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-text mb-2">
            AI Marketing Intelligence Hub
          </h1>
          <p className="text-base text-muted-foreground">
            Latest Market Intelligence • Updated {new Date().toLocaleDateString()}
          </p>
        </div>
        <Button 
          onClick={refetch} 
          variant="outline" 
          size="lg"
          className="gap-2 bg-white/80 hover:bg-white/90 border-blue-100 transition-all duration-300"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="mt-6">
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
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="news" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(data?.news) && data.news.map((item, index) => (
                <Card key={index} className="bg-gradient-card rounded-xl overflow-hidden">
                  <div className="p-6">
                    <CardTitle className="text-xl font-bold text-primary">{item.headline}</CardTitle>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="font-semibold">{item.source}</span>
                        <span>{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-primary">Impact Analysis:</h4>
                        <p className="text-sm text-muted-foreground">{item.impact_analysis}</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2 text-primary">Technical Implications:</h4>
                        <p className="text-sm text-muted-foreground">{item.technical_implications}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full">{item.category}</span>
                        <div className="flex items-center gap-3">
                          <div className="progress-bar flex-1">
                            <div 
                              className={`progress-bar-fill ${getProgressWidth(item.relevance_score)}`}
                            />
                          </div>
                          <span className="text-muted-foreground font-semibold">
                            {(item.relevance_score * 100).toFixed(0)}%
                          </span>
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
                <Card key={index} className="bg-gradient-card rounded-xl overflow-hidden">
                  <div className="p-6">
                    <CardTitle className="text-xl font-bold text-primary">{insight.area}</CardTitle>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{insight.analysis}</p>
                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-primary">Implications:</h4>
                        <ul className="list-none space-y-2">
                          {Array.isArray(insight.implications) && insight.implications.map((imp, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {imp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2 text-primary">Case Study:</h4>
                        <p className="text-sm text-muted-foreground">{insight.case_study}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="progress-bar flex-1">
                          <div 
                            className={`progress-bar-fill ${getProgressWidth(insight.confidence_score)}`}
                          />
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground">
                          {(insight.confidence_score * 100).toFixed(0)}%
                        </span>
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
                <Card key={index} className="bg-gradient-card rounded-xl overflow-hidden">
                  <div className="p-6">
                    <CardTitle className="text-xl font-bold text-primary">{trend.topic}</CardTitle>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="progress-bar flex-1">
                          <div 
                            className={`progress-bar-fill ${getProgressWidth(trend.adoption_rate)}`}
                          />
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground">
                          {(trend.adoption_rate * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{trend.technical_details}</p>
                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-primary">Key Metrics:</h4>
                        <ul className="list-none space-y-2">
                          {Array.isArray(trend.metrics) && trend.metrics.map((metric, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {metric}
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
                <Card key={index} className="bg-gradient-card rounded-xl overflow-hidden">
                  <div className="p-6">
                    <CardTitle className="text-xl font-bold text-primary">{opp.domain}</CardTitle>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-primary">Technical Potential:</h4>
                        <p className="text-sm text-muted-foreground">{opp.technical_potential}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-primary">Requirements:</h4>
                        <ul className="list-none space-y-2">
                          {Array.isArray(opp.requirements) && opp.requirements.map((req, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2 text-primary">ROI Projection:</h4>
                        <p className="text-sm text-muted-foreground">{opp.roi_projection}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full">
                          {opp.implementation_complexity}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="progress-bar flex-1">
                            <div 
                              className={`progress-bar-fill ${getProgressWidth(opp.market_readiness)}`}
                            />
                          </div>
                          <span className="text-muted-foreground font-semibold">
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
      </div>

      {process.env.NODE_ENV === 'development' && (
        <DebugPanel data={data} loading={loading} error={error} />
      )}
    </main>
  );
}