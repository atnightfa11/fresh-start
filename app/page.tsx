'use client';
import { ArrowRight, TrendingUp, Newspaper, Wrench, BarChart3 } from 'lucide-react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function Page() {
  const features = [
    {
      icon: TrendingUp,
      title: "Market Trends",
      description: "Latest AI and marketing technology trends from industry leaders",
      href: "/trends",
      stats: "50+ trends tracked weekly"
    },
    {
      icon: Newspaper,
      title: "Industry Insights", 
      description: "Breaking news, case studies, and expert analysis from top sources",
      href: "/insights",
      stats: "Real-time updates from 15+ sources"
    },
    {
      icon: Wrench,
      title: "Marketing Tools",
      description: "Comprehensive directory of AI-powered marketing technologies",
      href: "/tools", 
      stats: "200+ tools reviewed and analyzed"
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Professional Marketing Intelligence Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get actionable insights from industry-leading sources to drive your marketing strategy forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow group">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-cyan-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="text-sm text-cyan-600 font-medium">{feature.stats}</div>
                  </div>
                  
                  <div className="mt-auto">
                    <Link href={feature.href}>
                      <Button variant="outline" className="w-full group-hover:bg-cyan-50 group-hover:border-cyan-200">
                        Explore {feature.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}