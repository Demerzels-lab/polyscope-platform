import { Activity, BarChart2, Shield, Target, Brain, Eye } from 'lucide-react';

export function LoadingState() {
  return (
    <section className="min-h-[50vh] flex items-center justify-center px-4 relative z-20">
      <div className="text-center w-full max-w-md">
        
        {/* Central Animated Loader */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          {/* Outer Ring - Slow Spin Gold */}
          <div className="absolute inset-0 rounded-full border border-accent/20 border-t-accent animate-spin-slow shadow-[0_0_20px_rgba(255,215,0,0.1)]" />
          
          {/* Inner Ring - Fast Spin Orange */}
          <div className="absolute inset-4 rounded-full border-2 border-primary/30 border-b-primary animate-spin shadow-[0_0_15px_rgba(255,140,0,0.2)]" />
          
          {/* Center Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
                <Eye className="w-10 h-10 text-primary animate-pulse relative z-10" />
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-white mb-1 tracking-widest uppercase font-mono">
            System Processing
        </h2>
        <p className="text-xs text-primary/60 mb-8 font-mono animate-pulse">
            DECRYPTING_ONCHAIN_DATA...
        </p>
        
        <div className="space-y-3">
          <LoadingStep 
            icon={<BarChart2 className="w-4 h-4" />} 
            text="Parsing Transaction History" 
            delay={0} 
          />
          <LoadingStep 
            icon={<Target className="w-4 h-4" />} 
            text="Calculating Win Rates & ROI" 
            delay={1} 
          />
          <LoadingStep 
            icon={<Shield className="w-4 h-4" />} 
            text="Assessing Risk Profile" 
            delay={2} 
          />
          <LoadingStep 
            icon={<Brain className="w-4 h-4" />} 
            text="Generating Strategy Model" 
            delay={3} 
          />
        </div>
      </div>
    </section>
  );
}

function LoadingStep({ icon, text, delay }: { icon: React.ReactNode; text: string; delay: number }) {
  return (
    <div 
      className="flex items-center gap-4 p-3 bg-card/10 border border-white/5 rounded-lg backdrop-blur-sm animate-pulse"
      style={{ 
        animationDuration: '2s',
        animationDelay: `${delay * 0.4}s`,
        animationFillMode: 'both'
      }}
    >
      <div className="w-8 h-8 bg-primary/10 rounded border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_10px_rgba(255,140,0,0.1)]">
        {icon}
      </div>
      <span className="text-sm text-gray-400 font-mono tracking-wide">{text}</span>
      
      {/* Loading Bar Simulator */}
      <div className="ml-auto w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
            className="h-full bg-accent/80 animate-[accordion-down_1s_ease-in-out_infinite]"
            style={{ width: '100%', animationDelay: `${delay * 0.5}s`, transformOrigin: 'left' }} 
        />
      </div>
    </div>
  );
}