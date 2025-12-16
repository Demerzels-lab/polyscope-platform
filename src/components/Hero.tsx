import { Activity, TrendingUp, Shield } from 'lucide-react';
import { PrivacyOrbit } from './PrivacyOrbit'; // Import the new component

export function Hero() {
  return (
    <section className="pt-20 pb-16 px-4 relative overflow-hidden">
      {/* Container with Grid Layout for Side-by-Side Effect */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: Text Content */}
        <div className="text-center lg:text-left space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                AI-POWERED INTEL
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block text-white">PolyScope</span>
                <span className="bg-gradient-to-r from-primary via-orange-400 to-accent bg-clip-text text-transparent">
                    Tactical Engine
                </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Analyze any Polymarket trader's wallet address. Get comprehensive 
                performance evaluation, risk assessment, and data-driven intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button className="px-8 py-3 bg-primary hover:bg-orange-600 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(255,140,0,0.4)] transition-all transform hover:scale-105">
                    Launch App
                </button>
                <button className="px-8 py-3 bg-transparent border border-white/10 hover:border-primary/50 text-white rounded-lg transition-all hover:bg-white/5">
                    View Docs
                </button>
            </div>
        </div>

        {/* RIGHT COLUMN: The Privacy Orbit (The 1:1 Mimic) */}
        <div className="relative mt-12 lg:mt-0">
            <PrivacyOrbit />
        </div>

      </div>

      {/* Feature Cards Grid (Below the fold) */}
      <div className="max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <FeatureCard 
        icon={<TrendingUp className="w-6 h-6" />}
        title="Performance Analysis"
        description="Deep dive into win rates, ROI, and trading patterns with granular precision."
        />
        <FeatureCard 
        icon={<Shield className="w-6 h-6" />}
        title="Risk Assessment"
        description="Evaluate max drawdown, volatility, and position sizing against market standards."
        />
        <FeatureCard 
        icon={<Activity className="w-6 h-6" />}
        title="Follow Score"
        description="Proprietary 0-100 score engine giving you clear, data-driven actionable signals."
        />
    </div>
    </section>
  );
}

// Place this at the bottom of src/components/Hero.tsx

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group relative p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
      
      {/* 1. GLASS BASE: Very transparent background with blur */}
      <div className="absolute inset-0 bg-white/3 backdrop-blur-md border border-white/10 rounded-2xl transition-colors duration-500 group-hover:border-primary/40 group-hover:bg-primary/5" />
      
      {/* 2. HOVER GLOW: A subtle gradient blob that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 3. CONTENT (Relative z-index to sit on top of glass) */}
      <div className="relative z-10">
        {/* Icon Container - Glowing Tactical Orange */}
        <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(255,140,0,0.1)]">
          <div className="text-primary group-hover:text-accent transition-colors duration-300">
            {icon}
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
}