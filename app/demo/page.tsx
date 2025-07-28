'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            Live Demo Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our professional marketing intelligence platform with real data from industry-leading sources.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Market Trends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Latest AI and marketing technology trends with business impact analysis.
              </p>
              <Link href="/trends">
                <Button className="w-full">
                  View Trends
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Industry Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Breaking news, case studies, and expert analysis from top industry sources.
              </p>
              <Link href="/insights">
                <Button className="w-full">
                  View Insights
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">AI Marketing Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Comprehensive directory of AI-powered marketing technologies and platforms.
              </p>
              <Link href="/tools">
                <Button className="w-full">
                  View Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Join leading marketing teams who rely on Neural Signal for strategic decision-making.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button size="lg">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/insights">
              <Button variant="outline" size="lg">
                Explore Platform
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 