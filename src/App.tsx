import { useState } from 'react';
import { Hero } from './components/Hero';
import { WalletInput } from './components/WalletInput';
import { LoadingState } from './components/LoadingState';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { analyzeWallet } from './hooks/lib/analyzer';
import { InteractiveBackground } from './components/InteractiveBackground';

export interface TraderAnalysis {
  wallet: string;
  followScore: number;
  recommendation: 'FOLLOW' | 'CAUTION' | 'DO_NOT_FOLLOW';
  summary: string;
  scores: {
    consistency: number;
    risk: number;
    accuracy: number;
    volatility: number;
    discipline: number;
  };
  metrics: {
    totalPnL: number;
    winRate: number;
    avgROI: number;
    maxDrawdown: number;
    returnVolatility: number;
    totalTrades: number;
    activeDays: number;
  };
  strengths: string[];
  weaknesses: string[];
  recentTrades: Array<{
    market: string;
    outcome: string;
    pnl: number;
    date: string;
    roi: number;
  }>;
  pnlHistory: Array<{
    date: string;
    pnl: number;
  }>;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<TraderAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (wallet: string) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Simulate network delay for the "System Initialization" animation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await analyzeWallet(wallet);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze wallet');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-primary/30 overflow-x-hidden font-sans">
      
      {/* 1. The QELVA-Style Background Layer */}
      <InteractiveBackground />
      
      {/* 2. Main Content Layer (Z-Index to float above background) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Only show Hero when not analyzing results to keep Dashboard clean */}
        {!analysis && <Hero />}
        
        <main className="flex-grow container mx-auto px-4 pb-20">
          
          {/* Wallet Input Section */}
          {!analysis ? (
            <div className="max-w-xl mx-auto -mt-8 relative z-20">
              {/* CRITICAL: Passing isLoading to disable button during scan */}
              <WalletInput onAnalyze={handleAnalyze} isLoading={loading} />
              
              {error && (
                <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center justify-center text-destructive font-mono text-sm backdrop-blur-md animate-in fade-in slide-in-from-top-2">
                  ERROR: {error}
                </div>
              )}
            </div>
          ) : null}

          {/* Loading View */}
          {loading && <LoadingState />}
          
          {/* Results Dashboard */}
          {analysis && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Dashboard analysis={analysis} onReset={handleReset} />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;