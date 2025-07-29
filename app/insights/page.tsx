'use client';
import { useState, useEffect } from 'react';
import { Newspaper, Building2, TrendingUp, Clock, ArrowUpRight, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MarketIntelligenceData } from '@/types/api';
import { format } from 'date-fns';

export default function InsightsPage() {
  const [data, setData] = useState<MarketIntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'news' | 'case_studies'>('news');

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/market-intelligence`);
        const marketData = await response.json();
        setData(marketData);
      } catch (error) {
        console.error('Failed to fetch insights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Industry Insights</h1>
          <p className="text-xl text-muted-foreground">
            Latest marketing news, case studies, and expert analysis from top industry sources
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'news'
                ? 'border-cyan-500 text-cyan-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              Industry News
            </div>
          </button>
          <button
            onClick={() => setActiveTab('case_studies')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'case_studies'
                ? 'border-cyan-500 text-cyan-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Case Studies
            </div>
          </button>
        </div>

        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="grid gap-6">
            {data?.news?.map((article, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-l-gray-200">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">{article.category}</Badge>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{format(new Date(article.published_date), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full font-medium">
                    {article.source}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-3 leading-tight text-foreground">{article.headline}</h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">{article.summary}</p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-800 text-sm">Business Impact</span>
                  </div>
                  <p className="text-green-800 text-sm">{article.business_impact}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Newspaper className="h-4 w-4" />
                    <span>Source: {article.source}</span>
                    {article.url && (
                      <span className="text-blue-600">• {new URL(article.url).hostname}</span>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={article.url || `https://${article.source.toLowerCase().replace(/\s+/g, '')}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Full Article
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Case Studies Tab */}
        {activeTab === 'case_studies' && (
          <div className="grid gap-8">
            {data?.case_studies?.map((caseStudy, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-l-gray-200">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-bold text-sm text-foreground">{caseStudy.company}</span>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">{caseStudy.industry}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full font-medium">
                    {caseStudy.source}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-5 leading-tight text-foreground">{caseStudy.title}</h2>

                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  <div className="bg-muted/50 p-5 rounded-lg border border-border">
                    <h3 className="font-bold text-foreground mb-3 text-sm">Challenge</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{caseStudy.challenge}</p>
                  </div>
                  <div className="bg-muted/50 p-5 rounded-lg border border-border">
                    <h3 className="font-bold text-foreground mb-3 text-sm">Solution</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{caseStudy.solution}</p>
                  </div>
                </div>

                <div className="bg-muted/50 border border-border rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-foreground mb-4 text-sm">Results</h3>
                  <p className="text-muted-foreground mb-5 text-sm leading-relaxed">{caseStudy.results}</p>
                  
                  <div className="grid md:grid-cols-3 gap-3">
                    {caseStudy.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-background rounded-lg p-3 text-center border border-border shadow-sm">
                        <div className="font-bold text-foreground text-xs">{metric}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Industry: {caseStudy.industry} • Source: 
                    <a 
                      href={`https://${caseStudy.source.toLowerCase().replace(/\s+/g, '')}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      {caseStudy.source}
                    </a>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={`https://${caseStudy.source.toLowerCase().replace(/\s+/g, '')}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Full Case Study
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 