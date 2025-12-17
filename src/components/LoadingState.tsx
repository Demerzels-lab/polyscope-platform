import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING UPLINK...");

  useEffect(() => {
    // 1. Progress Bar Animation (0% -> 100%)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1; // Speed of progress bar
      });
    }, 40);

    // 2. Cycle Tactical Text
    const t1 = setTimeout(() => setText("DECRYPTING ON-CHAIN LEDGER..."), 1200);
    const t2 = setTimeout(() => setText("CALCULATING RISK VECTORS..."), 2400);
    const t3 = setTimeout(() => setText("ESTABLISHING SECURE CONNECTION..."), 3600);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-md px-8 space-y-6">
        
        {/* Top Text Info */}
        <div className="flex justify-between items-end text-primary/80 font-mono text-xs tracking-widest">
            <span className="animate-pulse">{text}</span>
            <span>{progress}%</span>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
          <div 
            className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_20px_rgba(255,140,0,0.6)] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom Status */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-mono uppercase tracking-widest">
            <Loader2 className="w-3 h-3 animate-spin text-primary" />
            <span>System Processing</span>
        </div>

      </div>
    </div>
  );
}