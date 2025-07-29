import { Metadata } from 'next';
import { Wrench, Star, ExternalLink, Calendar, Users, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchMarketIntelligence } from '@/lib/server-api';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'AI Marketing Tools Directory | Neural Signal',
  description: 'Comprehensive directory of AI-powered marketing technologies. 200+ tools reviewed and analyzed with features, pricing, and target audience insights.',
  openGraph: {
    title: 'AI Marketing Tools Directory | Neural Signal',
    description: 'Comprehensive directory of AI-powered marketing technologies. 200+ tools reviewed and analyzed with features, pricing, and target audience insights.',
    type: 'website',
    url: '/tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neural Signal Marketing Tools Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Marketing Tools Directory | Neural Signal',
    description: 'Comprehensive directory of AI-powered marketing technologies.',
    images: ['/og-image.png'],
  },
};

export default async function ToolsPage() {
  // Fetch data server-side
  const data = await fetchMarketIntelligence();

  // Generate unique categories from tools
  const categories = ['all', ...Array.from(new Set(data?.tools?.map(tool => tool.category) || []))];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Wrench className="h-8 w-8 text-cyan-500" />
            <h1 className="text-3xl font-bold text-foreground">Marketing Tools</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Comprehensive directory of AI-powered marketing technologies
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge 
                key={category} 
                variant="secondary"
                className="px-3 py-1 text-xs cursor-pointer hover:bg-cyan-100 transition-colors"
              >
                {category === 'all' ? 'All Categories' : category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6">
          {data.tools.map((tool, index) => (
            <Card key={index} className="p-6 border-l-4 border-l-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{tool.name}</h3>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {tool.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">By</span>
                      <span className="text-sm font-medium text-foreground">{tool.company}</span>
                    </div>
                    {tool.launch_date && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(tool.launch_date), 'MMM yyyy')}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tool.key_features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Target Audience */}
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">Pricing</h4>
                      <p className="text-sm text-muted-foreground">{tool.pricing_info}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">Target Audience</h4>
                      <p className="text-sm text-muted-foreground">{tool.target_audience}</p>
                    </div>
                  </div>

                  {/* Website and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-4">
                      {tool.website_url && (
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          <a 
                            href={tool.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-cyan-600 transition-colors"
                          >
                            {new URL(tool.website_url).hostname}
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href={tool.website_url || `https://www.google.com/search?q=${encodeURIComponent(tool.name + ' ' + tool.company)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 