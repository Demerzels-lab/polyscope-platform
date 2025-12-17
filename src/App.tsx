import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Removed Link import
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
// Removed WalletInput import as it is now in Hero
import { LoadingState } from './components/LoadingState';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { analyzeWallet } from './hooks/lib/analyzer';
import { InteractiveBackground } from './components/InteractiveBackground';
import { HowItWorks } from './components/sections/HowItWorks';
import { Roadmap } from './components/sections/Roadmap';
import { FAQ } from './components/sections/FAQ';
import { DocsPage } from './pages/Docs';

// ... (TraderAnalysis interface remains exactly the same) ...
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

function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<TraderAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (wallet: string) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
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
    <div className="relative min-h-screen flex flex-col">
       <AnimatePresence mode='wait'>
         {!analysis ? (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* UPDATE: Hero now takes onAnalyze and isLoading */}
            <Hero onAnalyze={handleAnalyze} isLoading={loading} />
            
            {/* REMOVED: The standalone WalletInput section that was here */}
            
            <div className="max-w-xl mx-auto relative z-20 px-4">
              {error && (
                <div className="mb-20 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center justify-center text-destructive font-mono text-sm backdrop-blur-md">
                  ERROR: {error}
                </div>
              )}
            </div>

            {loading && <LoadingState />}
            
            {!loading && (
              <div className="relative z-10 space-y-0">
                 <motion.div
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6 }}
                 >
                   <HowItWorks />
                 </motion.div>

                 <Roadmap />

                 <motion.div
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6 }}
                 >
                   <FAQ />
                 </motion.div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 pb-20 pt-10"
          >
            <Dashboard analysis={analysis} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="relative min-h-screen text-white selection:bg-primary/30 overflow-x-hidden font-sans">
        <InteractiveBackground />
        
        <div className="relative z-10">
          {/* UPDATE: Removed the top-right <nav> element entirely */}

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/docs" element={<DocsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;