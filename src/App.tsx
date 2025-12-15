import { useState } from 'react';
import { Hero } from './components/Hero';
import { WalletInput } from './components/WalletInput';
import { LoadingState } from './components/LoadingState';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { analyzeWallet } from './lib/analyzer';

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
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await analyzeWallet(wallet);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze wallet');
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-transparent to-purple-950/30 pointer-events-none" />
      
      <main className="relative z-10">
        {!analysis && !loading && (
          <>
            <Hero />
            <WalletInput onAnalyze={handleAnalyze} error={error} />
          </>
        )}
        
        {loading && <LoadingState />}
        
        {analysis && (
          <Dashboard analysis={analysis} onReset={resetAnalysis} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
