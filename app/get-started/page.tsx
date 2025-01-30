export default function GetStartedPage() {
  return (
    <div className="pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center mb-6 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          Get Started with Neural Signal
        </h1>
        <div className="space-y-8">
          <div className="p-6 rounded-xl bg-[var(--color-surface)]">
            <h2 className="text-xl font-semibold mb-4">Track AI Marketing Trends</h2>
            <p className="text-gray-400">
              Monitor real-time AI marketing trends, performance metrics, and strategic insights.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-[var(--color-surface)]">
            <h2 className="text-xl font-semibold mb-4">Data-Driven Insights</h2>
            <p className="text-gray-400">
              Access AI-powered analytics and recommendations for your marketing strategy.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-[var(--color-surface)]">
            <h2 className="text-xl font-semibold mb-4">Stay Ahead of the Curve</h2>
            <p className="text-gray-400">
              Get early insights into emerging AI marketing trends and opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 