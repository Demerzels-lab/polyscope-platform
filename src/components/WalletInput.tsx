import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface WalletInputProps {
  onAnalyze: (wallet: string) => void;
  error: string | null;
}

export function WalletInput({ onAnalyze, error }: WalletInputProps) {
  const [wallet, setWallet] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wallet.trim()) {
      onAnalyze(wallet.trim());
    }
  };

  const isValidAddress = wallet.length === 0 || /^0x[a-fA-F0-9]{40}$/.test(wallet);

  return (
    <section className="pb-20 px-4">
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="Enter Polymarket wallet address (0x...)"
              className={`w-full pl-12 pr-32 py-4 bg-gray-900 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                !isValidAddress ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
              }`}
            />
            <button
              type="submit"
              disabled={!wallet.trim() || !isValidAddress}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              Analyze
            </button>
          </div>
          
          {!isValidAddress && (
            <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Please enter a valid Ethereum address (0x followed by 40 hex characters)
            </p>
          )}
          
          {error && (
            <div className="mt-3 p-3 bg-red-900/30 border border-red-800 rounded-lg flex items-center gap-2 text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Example: 0x1234567890abcdef1234567890abcdef12345678
        </p>
      </div>
    </section>
  );
}
