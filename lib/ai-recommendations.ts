export function generateRecommendation(metric: Metric, trends: Trend[]) {
  return `
    Based on ${metric.name} change of ${metric.change}% and ${trends.length} active trends:
    ${metric.change >= 0 ? 'Capitalize' : 'Mitigate'} this movement by 
    ${getSectorActions(metric.category)}. Key opportunities: 
    ${trends.slice(0,3).map(t => t.title).join(', ')}
  `;
} 