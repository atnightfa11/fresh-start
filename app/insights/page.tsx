import { Metadata } from 'next';
import { Newspaper, Building2, TrendingUp, Clock, ArrowUpRight, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

export default async function InsightsPage() {
  // Fetch data server-side
  const data = await fetchMarketIntelligence();

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
          <div className="px-6 py-3 font-medium text-sm border-b-2 border-cyan-500 text-cyan-600">
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              Industry News
            </div>
          </div>
          <div className="px-6 py-3 font-medium text-sm border-b-2 border-transparent text-muted-foreground">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Case Studies
            </div>
          </div>
        </div>

        {/* News Tab */}
        <div className="grid gap-6 mb-16">
          {data?.news?.map((article, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">{article.category}</Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{format(new Date(article.published_date), 'MMM dd, yyyy')}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground bg-green-50 px-3 py-1 rounded-full font-medium">
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
                    href={article.url || `https://www.google.com/search?q=${encodeURIComponent(article.headline)}`}
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

        {/* Case Studies Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Case Studies</h2>
          <div className="grid gap-8">
            {data?.case_studies?.map((caseStudy, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
                      <Building2 className="h-4 w-4 text-purple-600" />
                      <span className="font-bold text-sm text-purple-800">{caseStudy.company}</span>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">{caseStudy.industry}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground bg-purple-50 px-3 py-1 rounded-full font-medium">
                    {caseStudy.source}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-5 leading-tight text-foreground">{caseStudy.title}</h2>

                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  <div className="bg-red-50 p-5 rounded-lg border border-red-200">
                    <h3 className="font-bold text-red-800 mb-3 text-sm">Challenge</h3>
                    <p className="text-red-700 text-sm leading-relaxed">{caseStudy.challenge}</p>
                  </div>
                  <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                    <h3 className="font-bold text-blue-800 mb-3 text-sm">Solution</h3>
                    <p className="text-blue-700 text-sm leading-relaxed">{caseStudy.solution}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-green-800 mb-4 text-sm">Results</h3>
                  <p className="text-green-700 mb-5 text-sm leading-relaxed">{caseStudy.results}</p>
                  
                  <div className="grid md:grid-cols-3 gap-3">
                    {caseStudy.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 text-center border border-green-300 shadow-sm">
                        <div className="font-bold text-green-800 text-xs">{metric}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Industry: {caseStudy.industry} • Source: 
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(caseStudy.source)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      {caseStudy.source}
                    </a>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(caseStudy.title + ' case study')}`}
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
        </div>
      </div>
    </div>
  );
} 