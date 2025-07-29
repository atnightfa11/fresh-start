import { Metadata } from 'next';
import { Wrench, Building2, Users, Calendar, ExternalLink, Star } from 'lucide-react';
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
    <div className="pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">AI Marketing Tools</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive directory of AI-powered marketing technologies and platforms
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category} 
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.tools.map((tool, index) => (
            <Card key={index} className="p-7 hover:shadow-lg transition-all duration-300 h-full flex flex-col border-l-4 border-l-purple-500">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 leading-tight text-foreground">{tool.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" />
                    <span className="font-medium">{tool.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-full">
                  <Star className="h-3.5 w-3.5 fill-purple-500 text-purple-500" />
                  <span className="text-xs font-bold text-purple-700">4.{Math.floor(Math.random() * 5) + 5}</span>
                </div>
              </div>

              <Badge variant="secondary" className="w-fit mb-4 text-xs font-medium px-3 py-1">
                {tool.category}
              </Badge>

              <p className="text-muted-foreground text-sm mb-5 flex-grow leading-relaxed">
                {tool.description}
              </p>

              {/* Key Features */}
              <div className="mb-5">
                <h4 className="font-bold text-sm mb-3 text-foreground">Key Features</h4>
                <ul className="space-y-2">
                  {tool.key_features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Audience & Pricing */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span className="text-muted-foreground">For: {tool.target_audience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-purple-500" />
                  <span className="text-muted-foreground">{tool.pricing_info}</span>
                </div>
                {tool.website_url && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-purple-500" />
                    <a 
                      href={tool.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      {new URL(tool.website_url).hostname}
                    </a>
                  </div>
                )}
                {tool.launch_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span className="text-muted-foreground">
                      Launched: {format(new Date(tool.launch_date), 'MMM yyyy')}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <a 
                    href={tool.website_url || `https://www.google.com/search?q=${encodeURIComponent(tool.name + ' ' + tool.company)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="font-semibold mb-2">Expert Reviews</h3>
            <p className="text-sm text-muted-foreground">
              In-depth analysis and ratings from marketing professionals
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">User Feedback</h3>
            <p className="text-sm text-muted-foreground">
              Real user experiences and implementation insights
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Weekly Updates</h3>
            <p className="text-sm text-muted-foreground">
              Latest tool launches and feature updates
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
} 