'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Brain, TrendingUp, Newspaper, Share2, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { LoadingSkeleton } from '../components/loading-skeleton';

const useMarketingData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching data from API...');
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/market-intelligence`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response text length:', responseText.length);
      console.log('First 500 characters of response:', responseText.substring(0, 500));

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${responseText}`);
      }

      try {
        const responseData = JSON.parse(responseText);
        console.log('Successfully parsed response data');
        console.log('Data structure:', {
          hasTrends: Boolean(responseData.trends),
          trendsLength: responseData.trends?.length,
          hasInsights: Boolean(responseData.insights),
          insightsLength: responseData.insights?.length,
          hasNews: Boolean(responseData.news),
          newsLength: responseData.news?.length,
          hasOpportunities: Boolean(responseData.opportunities),
          opportunitiesLength: responseData.opportunities?.length,
        });
        
        // Validate the data structure
        if (!responseData.trends || !responseData.insights || !responseData.news || !responseData.opportunities) {
          console.error('Missing required data sections:', {
            trends: !responseData.trends,
            insights: !responseData.insights,
            news: !responseData.news,
            opportunities: !responseData.opportunities
          });
          throw new Error('Invalid data structure received from API');
        }
        
        // Set the data only if it has the correct structure
        setData(responseData);
        setError(null);
        console.log('Data successfully set to state');
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        console.error('Response text that failed to parse:', responseText);
        throw new Error('Failed to parse response data');
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
      console.log('Fetch completed, loading set to false');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    console.log('Refetching data...');
    fetchData();
  };

  return { data, loading, error, refetch };
};

const DebugPanel = ({ data, loading, error }) => {
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

export default function Home() {
  const { data, loading, error, refetch } = useMarketingData();
  const [activeTab, setActiveTab] = useState('trends');

  // Debug logging
  useEffect(() => {
    console.log('Current data state:', data);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [data, loading, error]);

  const tabItems = [
    { value: 'trends', icon: TrendingUp, label: 'Trends' },
    { value: 'insights', icon: Brain, label: 'Insights' },
    { value: 'news', icon: Newspaper, label: 'News' },
    { value: 'opportunities', icon: Share2, label: 'Opportunities' },
  ];

  if (loading) {
    return (
      <div className="p-4 md:p-10 mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            AI Marketing Intelligence Hub
          </h1>
          <p className="text-sm text-muted-foreground">
            Loading data... Please wait.
          </p>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-10 mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">
            AI Marketing Intelligence Hub
          </h1>
          <Button onClick={refetch} className="gap-2">
            <RefreshCw />
            Retry
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="mt-2">
            <div className="font-semibold">Error loading data:</div>
            <div className="mt-1">{error}</div>
            <div className="mt-2 text-sm">
              Please check the browser console for more details or try refreshing the page.
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Add explicit check for data existence
  if (!data || !data.trends || !data.insights || !data.news || !data.opportunities) {
    return (
      <div className="p-4 md:p-10 mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">
            AI Marketing Intelligence Hub
          </h1>
          <Button onClick={refetch} className="gap-2">
            <RefreshCw />
            Retry
          </Button>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No data available. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Marketing Intelligence Hub
          </h1>
          <p className="text-base text-muted-foreground">
            Latest Market Intelligence • Updated {new Date().toLocaleDateString()}
          </p>
        </div>
        <Button onClick={refetch} variant="outline" size="sm" className="gap-2 hover:bg-blue-50 transition-colors">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full flex space-x-2 bg-muted/50 p-1 rounded-lg">
            {tabItems.map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex-1 flex items-center gap-2 py-2 px-4 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all duration-200"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="trends" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(data?.trends) && data.trends.map((trend, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 border-none bg-gradient-to-br from-white to-blue-50/50">
                  <CardTitle className="text-xl mb-3 text-blue-900">{trend.topic}</CardTitle>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-blue-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                          style={{ width: `${(trend.adoption_rate * 100).toFixed(0)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        {(trend.adoption_rate * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{trend.technical_details}</p>
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-blue-900">Key Metrics:</h4>
                      <ul className="list-none space-y-1">
                        {Array.isArray(trend.metrics) && trend.metrics.map((metric, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(data?.insights) && data.insights.map((insight, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 border-none bg-gradient-to-br from-white to-purple-50/50">
                  <CardTitle className="text-xl mb-3 text-purple-900">{insight.area}</CardTitle>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{insight.analysis}</p>
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-purple-900">Implications:</h4>
                      <ul className="list-none space-y-1">
                        {Array.isArray(insight.implications) && insight.implications.map((imp, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-purple-500 mt-1">•</span>
                            {imp}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2 text-purple-900">Case Study:</h4>
                      <p className="text-sm text-gray-600">{insight.case_study}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-purple-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-600 rounded-full transition-all duration-500" 
                          style={{ width: `${(insight.confidence_score * 100).toFixed(0)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-purple-600">
                        {(insight.confidence_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(data?.news) && data.news.map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 border-none bg-gradient-to-br from-white to-green-50/50">
                  <CardTitle className="text-xl mb-3 text-green-900">{item.headline}</CardTitle>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-green-600">
                      <span className="font-medium">{item.source}</span>
                      <span>{item.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.summary}</p>
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-green-900">Impact Analysis:</h4>
                      <p className="text-sm text-gray-600">{item.impact_analysis}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2 text-green-900">Technical Implications:</h4>
                      <p className="text-sm text-gray-600">{item.technical_implications}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-green-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-600 rounded-full transition-all duration-500" 
                            style={{ width: `${(item.relevance_score * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <span className="text-green-600 font-medium">
                          {(item.relevance_score * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(data?.opportunities) && data.opportunities.map((opp, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 border-none bg-gradient-to-br from-white to-amber-50/50">
                  <CardTitle className="text-xl mb-3 text-amber-900">{opp.domain}</CardTitle>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-amber-900">Technical Potential:</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{opp.technical_potential}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-amber-900">Requirements:</h4>
                      <ul className="list-none space-y-1">
                        {Array.isArray(opp.requirements) && opp.requirements.map((req, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2 text-amber-900">ROI Projection:</h4>
                      <p className="text-sm text-gray-600">{opp.roi_projection}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                        {opp.implementation_complexity}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-amber-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-600 rounded-full transition-all duration-500" 
                            style={{ width: `${(opp.market_readiness * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <span className="text-amber-600 font-medium">
                          {(opp.market_readiness * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <DebugPanel data={data} loading={loading} error={error} />
    </main>
  );
}