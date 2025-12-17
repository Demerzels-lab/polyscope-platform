import { useState, useEffect } from 'react';
import { Search, AlertCircle, ScanLine, ArrowRight } from 'lucide-react';

interface WalletInputProps {
  onAnalyze: (wallet: string) => void;
  isLoading?: boolean;
}

export function WalletInput({ onAnalyze, isLoading = false }: WalletInputProps) {
  const [wallet, setWallet] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // 1. ROBUST VALIDATION: Check trimmed length and Regex
  // Regex: Starts with 0x, followed by exactly 40 hex characters (0-9, a-f, A-F)
  const isValidAddress = wallet.trim().length === 0 || /^0x[a-fA-F0-9]{40}$/.test(wallet.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = wallet.trim();
    if (trimmed && isValidAddress) {
      onAnalyze(trimmed);
    }
  };

  return (
    <section className="px-4 relative z-20">
      <div className="max-w-xl mx-auto lg:mx-0">
        <form onSubmit={handleSubmit} className="relative group">
          
          <div className="absolute -top-7 left-1 text-[10px] font-mono text-primary/60 tracking-[0.2em] uppercase">
             System_Target_Acquisition //
          </div>

          <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
            {/* Icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none z-10">
                {isLoading ? <ScanLine className="w-5 h-5 animate-pulse" /> : <Search className="w-5 h-5" />}
            </div>

            {/* Input */}
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter Polymarket wallet address (0x...)"
              disabled={isLoading}
              className={`
                w-full pl-12 pr-36 py-4 
                bg-void/80 backdrop-blur-xl 
                border rounded-xl 
                text-white placeholder-gray-600 
                font-mono text-sm 
                shadow-2xl outline-none transition-all
                ${!isValidAddress 
                    ? 'border-destructive/50 focus:border-destructive' 
                    : 'border-white/10 focus:border-primary/50 hover:border-primary/30'
                }
              `}
            />

            {/* Analyze Button */}
            <button
              type="submit"
              // 2. DISABLE LOGIC: Only disable if empty, invalid, or loading
              disabled={!wallet.trim() || !isValidAddress || isLoading}
              className={`
                absolute right-2 top-1/2 -translate-y-1/2 
                px-5 py-2 rounded-lg
                text-sm font-bold tracking-wide
                flex items-center gap-2 
                transition-all duration-300
                ${(!wallet.trim() || !isValidAddress || isLoading)
                  ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-transparent'
                  : 'bg-primary hover:bg-orange-600 text-white shadow-[0_0_15px_rgba(255,140,0,0.3)] border border-primary/50 cursor-pointer'
                }
              `}
            >
              {isLoading ? 'SCANNING' : 'ANALYZE'}
              {!isLoading && <ArrowRight className="w-3 h-3" />}
            </button>
          </div>
          
          {/* Error Message */}
          {!isValidAddress && (
            <div className="absolute top-full left-0 mt-3 p-3 w-full bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 backdrop-blur-md animate-accordion-down">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
              <p className="text-xs text-destructive font-mono">
                ERROR: INVALID_CHECKSUM. MUST BE 42-CHAR ETH ADDRESS (0x...).
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}