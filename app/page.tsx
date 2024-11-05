'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, Newspaper, Share2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-72 bg-gray-200 rounded-lg w-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 rounded-lg bg-gray-200 h-64" />
      ))}
    </div>
  </div>
);

const ErrorState = ({ error, retry }) => (
  <Alert variant="destructive" className="my-6">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription className="flex items-center justify-between">
      <span>{error}</span>
      <button
        onClick={retry}
        className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors flex items-center gap-2"
      >
        <RefreshCcw className="h-4 w-4" /> Retry
      </button>
    </AlertDescription>
  </Alert>
);

const TabTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

interface TrendData {
  topic: string;
  metrics: string[];
  technical_details: string;
  adoption_rate: number;
}

interface InsightData {
  area: string;
  analysis: string;
  implications: string[];
  case_study: string;
  confidence_score: number;
}

interface NewsData {
  headline: string;
  category: "Industry Move" | "Product Launch" | "Research" | "Regulation";
  summary: string;
  impact_analysis: string;
  technical_implications: string;
  date: string;
  source: string;
  relevance_score: number;
}

interface OpportunityData {
  domain: string;
  technical_potential: string;
  requirements: string[];
  roi_projection: string;
  implementation_complexity: string;
  market_readiness: number;
}

interface TimelineData {
  date: string;
  value: number;
  event: string;
  technical_milestone: string;
}

interface MarketData {
  intelligence: {
    trends: TrendData[];
    insights: InsightData[];
    news: NewsData[];
    opportunities: OpportunityData[];
    timestamp: string;
  };
  visualizations: {
    trend_timeline: TimelineData[];
  };
}

export default function Dashboard() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('trends');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/market-intelligence');
      if (!response.ok) {
        const errorDetail = await response.json();
        throw new Error(errorDetail.detail || 'Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <CardTitle className="text-gray-900">AI Marketing Intelligence Hub</CardTitle>
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={fetchData}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </motion.button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue="trends">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {[
              { value: 'trends', icon: TrendingUp, label: 'Trends' },
              { value: 'insights', icon: Brain, label: 'Insights' },
              { value: 'news', icon: Newspaper, label: 'News' },
              { value: 'opportunities', icon: Share2, label: 'Opportunities' }
            ].map(({ value, icon: Icon, label }) => (
              <TabsTrigger key={value} value={value} className="transition-all duration-200">
                <motion.div
                  className="flex items-center gap-2"
                  initial={false}
                  animate={{ scale: activeTab === value ? 1.05 : 1 }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </motion.div>
              </TabsTrigger>
            ))}
          </TabsList>

          {error ? (
      <ErrorState error={error} retry={fetchData} />
    ) : (
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <TabTransition>
            <TabsContent value="trends">
              <div className="space-y-8">
                {/* Chart Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  AI Marketing Technology Adoption Trends
                </h2>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data?.visualizations.trend_timeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date"
                        label={{ 
                          value: 'Timeline', 
                          position: 'bottom', 
                          offset: 0 
                        }}
                      />
                      <YAxis
                        domain={[0, 100]}
                        label={{ 
                          value: 'Adoption Rate (%)', 
                          angle: -90, 
                          position: 'insideLeft',
                          offset: -5
                        }}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload as TimelineData;
                            return (
                              <div className="bg-white p-4 shadow-lg rounded-lg border">
                                <p className="font-semibold">
                                  {`Q${label.split('-Q')[1]} ${label.split('-')[0]}`}
                                </p>
                                <p className="text-blue-600">
                                  {`${data.value}% Industry Adoption`}
                                </p>
                                <div className="border-t mt-2 pt-2">
                                  <p className="text-sm font-medium text-gray-900">Key Milestone:</p>
                                  <p className="text-sm text-gray-600">{data.event}</p>
                                </div>
                                <div className="mt-2">
                                  <p className="text-xs text-gray-500">{data.technical_milestone}</p>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line
                        name="Industry Adoption Rate"
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-gray-500 mt-2 text-center">
                  Data represents aggregate adoption rates across major marketing platforms and enterprises
                </div>
              </div>

                {/* Trends Grid */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Key Technology Trends
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.intelligence.trends.map((trend, index) => (
                      <Card key={index} className="p-6 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg mb-4 text-gray-900">{trend.topic}</h3>
                        <div className="space-y-4">
                          {trend.metrics.map((metric, idx) => (
                            <div key={idx} className="flex gap-3 items-start">
                              <div className="text-blue-600 mt-1.5 text-lg">•</div>
                              <p className="text-gray-700 text-sm leading-relaxed">{metric}</p>
                            </div>
                          ))}
                          <div className="pt-4 text-sm text-gray-600 border-t mt-4">
                            {trend.technical_details}
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-sm font-medium text-blue-600">
                            Adoption Rate: {Math.round(trend.adoption_rate * 100)}%
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="insights">
              <div className="space-y-8">
                {data?.intelligence.insights.map((insight, index) => (
                  <Card key={index} className="p-6 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-xl text-gray-900">{insight.area}</h3>
                            <div className="text-sm font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                              Confidence: {Math.round(insight.confidence_score * 100)}%
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{insight.analysis}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Key Implications:</h4>
                          <div className="grid gap-3">
                            {insight.implications.map((imp, idx) => (
                              <div key={idx} className="flex gap-3 items-start">
                                <div className="text-blue-600 mt-1.5 text-lg">•</div>
                                <p className="text-gray-700">{imp}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <h4 className="font-semibold text-gray-900 mb-3">Case Study:</h4>
                          <p className="text-gray-700 leading-relaxed">{insight.case_study}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="news">
              <div className="space-y-6">
                {data?.intelligence.news.map((item, index) => (
                  <Card key={index} className="p-6 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-bold text-xl text-gray-900">{item.headline}</h3>
                        <span className={`shrink-0 text-sm font-medium px-3 py-1 rounded-full ${
                          item.category === "Industry Move" ? "bg-blue-50 text-blue-700" :
                          item.category === "Product Launch" ? "bg-green-50 text-green-700" :
                          item.category === "Research" ? "bg-purple-50 text-purple-700" :
                          "bg-orange-50 text-orange-700"
                        }`}>
                          {item.category}
                        </span>
                      </div>

                      <p className="text-gray-700 leading-relaxed">{item.summary}</p>

                      <div className="grid md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900">Impact Analysis:</h4>
                          <p className="text-gray-700 leading-relaxed">{item.impact_analysis}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900">Technical Implications:</h4>
                          <p className="text-gray-700 leading-relaxed">{item.technical_implications}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t mt-2">
                        <div className="text-sm text-gray-600">
                          Published: {item.date} • Source: {item.source}
                        </div>
                        <div className="text-sm font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                          Relevance: {Math.round(item.relevance_score * 100)}%
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="opportunities">
              <div className="space-y-6">
                {data?.intelligence.opportunities.map((opp, index) => (
                  <Card key={index} className="p-6 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-xl text-gray-900 mb-2">{opp.domain}</h3>
                          <p className="text-gray-700 leading-relaxed">{opp.technical_potential}</p>
                        </div>
                        <div className="text-sm font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 shrink-0">
                          Market Readiness: {Math.round(opp.market_readiness * 100)}%
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Requirements:</h4>
                        <div className="grid gap-3">
                          {opp.requirements.map((req, idx) => (
                            <div key={idx} className="flex gap-3 items-start">
                              <div className="text-blue-600 mt-1.5 text-lg">•</div>
                              <p className="text-gray-700">{req}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900">ROI Projection:</h4>
                          <p className="text-blue-700 font-medium">{opp.roi_projection}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900">Implementation Complexity:</h4>
                          <p className="text-gray-700 font-medium">{opp.implementation_complexity}</p>
                          </div>
                        </div>
                      </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </TabTransition>
        )}
      </AnimatePresence>
    )}
  </Tabs>
  </CardContent>
  </Card>
  </div>
  );
}