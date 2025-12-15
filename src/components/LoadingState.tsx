import { Activity, BarChart2, Shield, Target, Brain } from 'lucide-react';

export function LoadingState() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-gray-800" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Analyzing Trader Profile</h2>
        
        <div className="max-w-md mx-auto space-y-3">
          <LoadingStep icon={<BarChart2 className="w-4 h-4" />} text="Fetching trading history..." delay={0} />
          <LoadingStep icon={<Target className="w-4 h-4" />} text="Calculating performance metrics..." delay={1} />
          <LoadingStep icon={<Shield className="w-4 h-4" />} text="Evaluating risk factors..." delay={2} />
          <LoadingStep icon={<Brain className="w-4 h-4" />} text="Generating intelligence report..." delay={3} />
        </div>
      </div>
    </section>
  );
}

function LoadingStep({ icon, text, delay }: { icon: React.ReactNode; text: string; delay: number }) {
  return (
    <div 
      className="flex items-center gap-3 p-3 bg-gray-900/50 border border-gray-800 rounded-lg animate-pulse"
      style={{ animationDelay: `${delay * 0.5}s` }}
    >
      <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400">
        {icon}
      </div>
      <span className="text-gray-400">{text}</span>
    </div>
  );
}
