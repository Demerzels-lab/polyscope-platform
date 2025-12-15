import { Activity, TrendingUp, Shield } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30">
            <Activity className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            PolyScope
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          AI-Powered Trader Intelligence Platform
        </p>
        
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          Analyze any Polymarket trader's wallet address to receive a comprehensive 
          performance evaluation, risk assessment, and data-driven follow recommendation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <FeatureCard 
            icon={<TrendingUp className="w-5 h-5" />}
            title="Performance Analysis"
            description="Deep dive into win rates, ROI, and trading patterns"
          />
          <FeatureCard 
            icon={<Shield className="w-5 h-5" />}
            title="Risk Assessment"
            description="Evaluate drawdown, volatility, and position sizing"
          />
          <FeatureCard 
            icon={<Activity className="w-5 h-5" />}
            title="Follow Score"
            description="Proprietary 0-100 score with clear recommendations"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
