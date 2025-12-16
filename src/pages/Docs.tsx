import { useState } from 'react';
import { Book, Shield, Target, HelpCircle, Map, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = {
  intro: {
    title: "Introduction",
    icon: Book,
    content: (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-white mb-6">PolyScope Intelligence Platform</h1>
        <p className="text-xl text-gray-300">PolyScope is an enterprise-grade AI-powered analytics platform designed to evaluate Polymarket traders.</p>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="text-lg font-bold text-primary mb-2">Core Purpose</h3>
          <p className="text-gray-400">To provide objective, quantitative evaluation of prediction market traders, removing emotional bias from follow decisions.</p>
        </div>
      </div>
    )
  },
  scoring: {
    title: "Scoring Methodology",
    icon: Target,
    content: (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-white">The Follow Score Formula</h1>
        <div className="p-6 bg-black/40 rounded-xl font-mono text-sm text-green-400 border border-white/10 overflow-x-auto">
          Follow Score = 0.30 * Consistency + 0.25 * Risk + 0.25 * Accuracy + 0.10 * (Inv.Volatility) + 0.10 * Discipline
        </div>
        
        <div className="grid gap-6">
            <ScoreDetail title="Consistency (30%)" desc="Measures PnL stability and trading regularity. Penalizes 'one-hit wonders'." />
            <ScoreDetail title="Risk (25%)" desc="Evaluates position sizing, overexposure, and drawdown control." />
            <ScoreDetail title="Accuracy (25%)" desc="Pure prediction correctness based on Win Rate and Profit Factor." />
            <ScoreDetail title="Volatility (10%)" desc="Inverted score. Lower volatility equals a higher score." />
            <ScoreDetail title="Discipline (10%)" desc="Detects emotional trading: holding losers too long or selling winners too early." />
        </div>
      </div>
    )
  },
  howitworks: {
    title: "How It Works",
    icon: FileText,
    content: (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Analysis Pipeline</h1>
        <p className="text-gray-400">Our 6-stage process ensures data integrity and analytical depth.</p>
        <ul className="space-y-4 mt-6">
            <li className="flex gap-4"><span className="font-mono text-primary">01.</span> <span>Data Collection (Polymarket API)</span></li>
            <li className="flex gap-4"><span className="font-mono text-primary">02.</span> <span>Normalization (Timestamp alignment)</span></li>
            <li className="flex gap-4"><span className="font-mono text-primary">03.</span> <span>Metric Calculation (ROI, Drawdown)</span></li>
            <li className="flex gap-4"><span className="font-mono text-primary">04.</span> <span>Score Computation (Weighted Algorithms)</span></li>
            <li className="flex gap-4"><span className="font-mono text-primary">05.</span> <span>Follow Recommendation Logic</span></li>
            <li className="flex gap-4"><span className="font-mono text-primary">06.</span> <span>Report Generation</span></li>
        </ul>
      </div>
    )
  },
  roadmap: {
    title: "Roadmap",
    icon: Map,
    content: (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Development Timeline</h1>
        <div className="space-y-8 mt-8 border-l border-white/10 ml-2 pl-8">
            <RoadmapItem ver="v1.0" date="Dec 2024" title="Initial Release" status="live" />
            <RoadmapItem ver="v1.1" date="Q1 2025" title="Historical Tracking" status="planned" />
            <RoadmapItem ver="v1.2" date="Q2 2025" title="Multi-Wallet Portfolio" status="planned" />
            <RoadmapItem ver="v2.0" date="Q3 2025" title="AI Prediction Models" status="planned" />
        </div>
      </div>
    )
  },
  faq: {
    title: "FAQ",
    icon: HelpCircle,
    content: (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Frequently Asked Questions</h1>
        <div className="space-y-6">
            <QA q="How accurate is the score?" a="It uses statistical models based on historical data. While past performance doesn't guarantee future results, high scores effectively filter out inexperienced traders." />
            <QA q="Is my data stored?" a="No. PolyScope runs in real-time and does not database your queries." />
            <QA q="What does 'CAUTION' mean?" a="It means the trader is profitable but shows signs of instability (high drawdown) or relies too heavily on a single big win." />
        </div>
      </div>
    )
  },
  risk: {
    title: "Risk Disclosure",
    icon: Shield,
    content: (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-red-400">Risk Disclosure</h1>
        <div className="p-6 bg-red-950/20 border border-red-500/20 rounded-xl text-gray-300 leading-relaxed">
            <p className="mb-4">Prediction markets involve significant risk. You may lose your entire investment.</p>
            <p>PolyScope scores are informational tools only and do not constitute financial advice. Following a trader with a high score does not guarantee profit.</p>
        </div>
      </div>
    )
  }
};

function ScoreDetail({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="border-b border-white/10 pb-4">
            <h4 className="font-bold text-primary mb-1">{title}</h4>
            <p className="text-sm text-gray-400">{desc}</p>
        </div>
    );
}

function RoadmapItem({ ver, date, title, status }: { ver: string, date: string, title: string, status: string }) {
    return (
        <div className="relative">
            <span className={`absolute -left-[37px] top-1.5 w-3 h-3 rounded-full ${status === 'live' ? 'bg-primary' : 'bg-gray-700'}`}></span>
            <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{ver}</span>
                <span className="text-xs text-gray-500">{date}</span>
            </div>
            <h3 className="font-bold text-white">{title}</h3>
        </div>
    )
}

function QA({ q, a }: { q: string, a: string }) {
    return (
        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
            <h4 className="font-bold text-white mb-2">{q}</h4>
            <p className="text-gray-400 text-sm">{a}</p>
        </div>
    )
}

export function DocsPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof sections>('intro');
  const ActiveContent = sections[activeTab].content;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/10 bg-black/50 p-6 flex flex-col sticky top-0 h-auto md:h-screen overflow-y-auto">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to App
        </Link>
        
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Documentation</h2>
        
        <nav className="space-y-1">
          {(Object.entries(sections) as [keyof typeof sections, typeof sections['intro']][]).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                activeTab === key 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 max-w-4xl mx-auto w-full">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {ActiveContent}
        </div>
      </main>
    </div>
  );
}