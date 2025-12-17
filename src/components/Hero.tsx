import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, TrendingUp, Shield, FileText, Github, Twitter, Copy, Check } from 'lucide-react';
import { PrivacyOrbit } from './PrivacyOrbit';
import { WalletInput } from './WalletInput';

interface HeroProps {
  onAnalyze: (wallet: string) => Promise<void>;
  isLoading: boolean;
}

export function Hero({ onAnalyze, isLoading }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const caAddress = "DDLgZscBViQ4BMzdT53X8tHLZvHASZposb3Lh1xSpump";

  const handleCopy = () => {
    navigator.clipboard.writeText(caAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-20 pb-16 px-4 relative overflow-hidden">
      {/* Container with Grid Layout for Side-by-Side Effect */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: Text Content & Interaction */}
        <div className="text-center lg:text-left space-y-8 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                AI-POWERED INTEL
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block text-white">PolyScope</span>
                <span className="bg-gradient-to-r from-primary via-orange-400 to-accent bg-clip-text text-transparent">
                    Tactical Engine
                </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Analyze any Polymarket trader's wallet address. Get comprehensive 
                performance evaluation, risk assessment, and data-driven intelligence.
            </p>

            {/* ACTION SECTION */}
            <div className="pt-4 max-w-md mx-auto lg:mx-0">
                
                {/* Embedded Wallet Input (Always visible, disabled via prop if needed) */}
                <WalletInput onAnalyze={onAnalyze} isLoading={isLoading} />

                {/* Documentation Link & Socials Container */}
                <div className="flex flex-col gap-6 mt-8">
                    
                    {/* ACTION ROW: Docs & Socials */}
                    <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4">
                        <Link 
                            to="/docs" 
                            className="group inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-lg text-sm font-medium text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                        >
                            <FileText className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                            <span>Access Documentation</span>
                        </Link>

                        <div className="flex gap-3">
                            <a 
                                href="https://github.com/Demerzels-lab/polyscope-platform" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 rounded-lg text-gray-400 hover:text-white transition-all"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a 
                                href="https://x.com/PolyscopeAI" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 rounded-lg text-gray-400 hover:text-white transition-all"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* CA SECTION: Glass Container with Copy Function (FULL ADDRESS) */}
                    {/* <div className="flex items-center justify-center lg:justify-start">
                        <div 
                          className="group flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/5 rounded-full hover:border-primary/20 transition-all cursor-pointer"
                          onClick={handleCopy}
                        >
                            <span className="text-xs font-bold text-gray-500 group-hover:text-primary transition-colors">CA:</span>
                            <span className="font-mono text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors break-all">
                                {caAddress}
                            </span>
                            <div className="w-px h-4 bg-white/10 mx-1"></div>
                            
                            {copied ? (
                                <Check className="w-3.5 h-3.5 text-green-400 animate-in zoom-in" />
                            ) : (
                                <Copy className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                            )}
                        </div>
                    </div> */}

                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: The Privacy Orbit */}
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
      
      {/* 1. GLASS BASE */}
      <div className="absolute inset-0 bg-white/3 backdrop-blur-md border border-white/10 rounded-2xl transition-colors duration-500 group-hover:border-primary/40 group-hover:bg-primary/5" />
      
      {/* 2. HOVER GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 3. CONTENT */}
      <div className="relative z-10">
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