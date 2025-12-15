import { Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-white">PolyScope</span>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            For informational purposes only. Not financial advice. 
            Past performance does not guarantee future results.
          </p>
          
          <p className="text-sm text-gray-600">
            2024 PolyScope
          </p>
        </div>
      </div>
    </footer>
  );
}
