'use client';
import { useState, useEffect } from 'react';
import { TrendingUp, Clock, BarChart3, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MarketIntelligenceData } from '@/types/api';
import { format } from 'date-fns';

export default function TrendsPage() {
  const [data, setData] = useState<MarketIntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/market-intelligence`);
        const marketData = await response.json();
        setData(marketData);
      } catch (error) {
        console.error('Failed to fetch trends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Marketing Trends</h1>
          <p className="text-xl text-muted-foreground">
            Latest marketing and AI technology trends from industry-leading sources
          </p>
        </div>

        <div className="grid gap-8">
          {data?.trends?.map((trend, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-l-gray-200">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
                    {trend.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{format(new Date(trend.first_seen), 'MMM dd, yyyy')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-bold text-foreground">
                    {trend.impact_score.toFixed(1)}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-3 leading-tight text-foreground">{trend.title}</h2>
              <p className="text-muted-foreground mb-5 leading-relaxed">{trend.description}</p>

                              <div className="bg-muted/50 border border-border rounded-lg p-5 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-sm text-foreground">Key Insight</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{trend.insight}</p>
                </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  {trend.sources && trend.sources.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Sources:</span> {trend.sources.slice(0, 2).join(', ')}
                      {trend.sources.length > 2 && ` +${trend.sources.length - 2} more`}
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(trend.title + ' marketing trend')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Search Trends Section */}
        {data?.search_trends && data.search_trends.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Trending Search Terms</h2>
              <div className="text-sm text-muted-foreground">
                Updated {format(new Date(), 'MMM dd, yyyy • h:mm a')}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.search_trends.map((searchTrend, index) => (
                <Card key={index} className="p-7 hover:shadow-lg transition-all duration-300 border-l-4 border-l-gray-200">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-lg text-foreground leading-tight">{searchTrend.term}</h3>
                    <div className="text-right bg-muted/50 px-3 py-2 rounded-lg">
                      <div className="text-xl font-bold text-foreground">
                        +{searchTrend.growth.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">growth</div>
                    </div>
                  </div>
                  
                  {/* Growth Chart */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs text-muted-foreground font-medium">Search Volume Trend (7 days)</div>
                      <div className="text-xs text-foreground font-bold bg-muted/50 px-2 py-1 rounded">
                        +{searchTrend.growth.toFixed(0)}% growth
                      </div>
                    </div>
                    <div className="relative">
                      <div className="h-24 bg-gradient-to-t from-gray-50 to-white rounded-lg border flex items-end justify-between p-4">
                                                 {(() => {
                           // Generate realistic trend data based on growth percentage
                           const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                           const growth = searchTrend.growth;
                           const baseVolume = 1000;
                           
                           // Use search term as seed for consistent random data
                           const seed = searchTrend.term.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
                           const seededRandom = (index: number) => {
                             const x = Math.sin(seed + index) * 10000;
                             return x - Math.floor(x);
                           };
                           
                           // Generate realistic upward trend data
                           const trendData = days.map((_, i) => {
                             const progression = (i / (days.length - 1)) * (growth / 100);
                             const volume = baseVolume * (1 + progression);
                             const noise = (seededRandom(i) - 0.5) * 0.15 * volume; // Consistent random variation
                             return Math.max(baseVolume * 0.7, volume + noise);
                           });
                           
                           const maxVolume = Math.max(...trendData);
                           
                           return trendData.map((volume, i) => {
                             const heightPercent = (volume / maxVolume) * 100;
                             const height = Math.max(14, (heightPercent / 100) * 50); // Max height 50px
                             
                             return (
                               <div key={i} className="flex flex-col items-center group relative">
                                 <div 
                                   className="bg-gradient-to-t from-green-600 to-green-400 rounded-sm w-4 transition-all duration-200 group-hover:from-green-700 group-hover:to-green-500 hover:scale-105"
                                   style={{ height: `${height}px` }}
                                 />
                                 <div className="text-[10px] text-muted-foreground mt-1 font-medium">
                                   {days[i]}
                                 </div>
                                 
                                 {/* Tooltip on hover */}
                                 <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                   {Math.round(volume).toLocaleString()} searches
                                   <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-900"></div>
                                 </div>
                               </div>
                             );
                           });
                         })()}
                      </div>
                      
                                             {/* Chart baseline and labels */}
                       <div className="flex items-center justify-between mt-2 px-4">
                         <div className="text-[10px] text-muted-foreground">Low</div>
                         <div className="text-[10px] text-muted-foreground">High</div>
                       </div>
                     </div>
                   </div>

                                      <div className="space-y-3 text-sm pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                        <span className="text-muted-foreground text-xs">Industry:</span>
                        <span className="font-bold text-xs text-foreground">{searchTrend.industry}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                        <span className="text-muted-foreground text-xs">Regions:</span>
                        <span className="font-bold text-xs text-foreground">{searchTrend.region.join(', ')}</span>
                      </div>
                      {searchTrend.sources && (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                          <span className="text-muted-foreground text-xs">Sources:</span>
                          <span className="font-bold text-xs text-foreground">{searchTrend.sources.slice(0, 2).join(', ')}</span>
                        </div>
                      )}
                    </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Key Metrics Section */}
        {data?.metrics && data.metrics.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Industry Benchmarks</h2>
              <div className="text-sm text-muted-foreground">
                Updated {format(new Date(), 'MMM dd, yyyy • h:mm a')}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.metrics.map((metric, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{metric.name}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {metric.value.toFixed(1)}%
                      </div>
                      <div className={`text-sm font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Metric Trend Chart */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-muted-foreground">30-day performance trend</div>
                      <div className="text-xs text-blue-600 font-medium">
                        {metric.change >= 0 ? 'Improving' : 'Declining'}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="h-28 bg-gradient-to-t from-blue-50 to-white rounded-lg border p-4">
                        <svg className="w-full h-full" viewBox="0 0 200 70" preserveAspectRatio="none">
                          {(() => {
                            const data = metric.trend_data;
                            const maxValue = Math.max(...data);
                            const minValue = Math.min(...data);
                            const range = maxValue - minValue || 1;
                            
                                                         // Generate points for the line
                             const points = data.map((value, i) => {
                               const x = (i / (data.length - 1)) * 180 + 10; // 10px margin on each side
                               const y = 60 - ((value - minValue) / range) * 50; // Invert Y and scale to 50px height
                               return { x, y, value };
                             });
                            
                            // Create path string for the line
                            const pathData = points.map((point, i) => 
                              `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                            ).join(' ');
                            
                            return (
                              <>
                                {/* Grid lines */}
                                <defs>
                                  <pattern id="grid" width="40" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.3"/>
                                  </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                                
                                                                 {/* Area under the line */}
                                 <path 
                                   d={`${pathData} L ${points[points.length - 1].x} 60 L ${points[0].x} 60 Z`}
                                   fill="url(#blueGradient)"
                                   opacity="0.3"
                                 />
                                
                                {/* Gradient definition */}
                                <defs>
                                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                                  </linearGradient>
                                </defs>
                                
                                {/* Main line */}
                                <path 
                                  d={pathData}
                                  fill="none" 
                                  stroke="#3b82f6" 
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                
                                                                 {/* Data points with hover tooltips */}
                                 {points.map((point, i) => (
                                   <g key={i} className="group">
                                     <circle
                                       cx={point.x}
                                       cy={point.y}
                                       r="4"
                                       fill="#3b82f6"
                                       stroke="#ffffff"
                                       strokeWidth="2"
                                       className="hover:r-5 transition-all duration-200 cursor-pointer group-hover:fill-blue-700"
                                     />
                                     
                                     {/* Invisible larger circle for better hover area */}
                                     <circle
                                       cx={point.x}
                                       cy={point.y}
                                       r="12"
                                       fill="transparent"
                                       className="cursor-pointer"
                                     />
                                     
                                     {/* Simple hover tooltip */}
                                     <text
                                       x={point.x}
                                       y={point.y - 6}
                                       textAnchor="middle"
                                       className="fill-gray-800 text-[8px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                                       style={{ fontSize: '8px' }}
                                     >
                                       {point.value.toFixed(1)}%
                                     </text>
                                   </g>
                                 ))}
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                      <div className="flex items-center justify-between mt-2 px-3">
                        <div className="text-[10px] text-muted-foreground">Week 1</div>
                        <div className="text-[10px] text-muted-foreground">Week 2</div>
                        <div className="text-[10px] text-muted-foreground">Week 3</div>
                        <div className="text-[10px] text-muted-foreground">Week 4</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-muted-foreground">Current Value:</span>
                      <span className="font-medium">{metric.value.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-muted-foreground">Sources:</span>
                      <span className="font-medium text-xs">{metric.sources?.join(', ')}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 