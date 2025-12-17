import { useState } from 'react';
import { 
  Book, Shield, Target, HelpCircle, Map, FileText, 
  ArrowLeft, Server, Code, Lock, Cpu, Database, 
  Layers, Terminal, AlertTriangle, Check, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- SUB-COMPONENTS FOR RICH UI ---

function CodeBlock({ label, code, language = 'bash' }: { label?: string, code: string, language?: string }) {
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-white/10 bg-[#0d1117]">
      {label && (
        <div className="px-4 py-2 border-b border-white/10 bg-white/5 text-xs font-mono text-gray-400 flex justify-between">
          <span>{label}</span>
          <span className="uppercase text-primary/60">{language}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-xs md:text-sm text-gray-300 leading-relaxed">
          {code}
        </pre>
      </div>
    </div>
  );
}

function ApiEndpoint({ method, path, desc }: { method: string, path: string, desc: string }) {
  const methodColor = method === 'GET' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' 
    : method === 'POST' ? 'text-green-400 bg-green-400/10 border-green-400/20' 
    : 'text-gray-400';

  return (
    <div className="group p-4 rounded-lg border border-white/5 bg-white/5 hover:border-primary/20 transition-all">
      <div className="flex items-center gap-3 mb-2">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${methodColor}`}>{method}</span>
        <code className="text-sm font-mono text-white">{path}</code>
      </div>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}

function TechBadge({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-xs text-gray-300">
      <Icon className="w-3 h-3 text-primary" />
      {label}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[], rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 my-6">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-gray-400 font-mono text-xs uppercase">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-4 py-3 font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-black/20">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-300">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- CONTENT SECTIONS ---

const sections = {
  intro: {
    title: "Introduction",
    icon: Book,
    content: (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">PolyScope Intelligence Platform</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            An enterprise-grade AI-powered analytics platform designed to evaluate prediction market traders through quantitative analysis and risk modeling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <Target className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-bold text-white mb-1">Objective Analysis</h3>
            <p className="text-xs text-gray-500">Removes emotional bias using statistical scoring models.</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <Shield className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-bold text-white mb-1">Risk Assessment</h3>
            <p className="text-xs text-gray-500">Identifies drawdown risks and overexposure patterns.</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <Cpu className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-bold text-white mb-1">Real-time Intel</h3>
            <p className="text-xs text-gray-500">Live processing of on-chain and off-chain market data.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2">Technical Stack</h2>
          <div className="flex flex-wrap gap-3">
            <TechBadge icon={Code} label="React 18 + TypeScript" />
            <TechBadge icon={Server} label="Supabase Edge Functions" />
            <TechBadge icon={Database} label="Polymarket API" />
            <TechBadge icon={Layers} label="TailwindCSS" />
            <TechBadge icon={Activity} label="ECharts Visualization" />
          </div>
        </div>
      </div>
    )
  },
  architecture: {
    title: "System Architecture",
    icon: Layers,
    content: (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">Architecture Overview</h1>
          <p className="text-gray-400">
            PolyScope utilizes a serverless event-driven architecture to ensure high availability and low-latency analysis.
          </p>
        </div>

        {/* CSS DIAGRAM */}
        <div className="p-8 rounded-xl border border-white/10 bg-[#050914] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            
            {/* Frontend */}
            <div className="p-6 rounded-lg border border-blue-500/30 bg-blue-500/10 backdrop-blur-md w-full md:w-48">
              <div className="text-blue-400 font-mono text-xs mb-2">CLIENT LAYER</div>
              <div className="font-bold text-white">React SPA</div>
              <div className="text-[10px] text-gray-500 mt-1">Vite / TypeScript</div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-gray-500">HTTPS / JSON</span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
              <ArrowLeft className="w-3 h-3 text-gray-500 rotate-180" />
            </div>

            {/* Backend */}
            <div className="p-6 rounded-lg border border-primary/30 bg-primary/10 backdrop-blur-md w-full md:w-48">
              <div className="text-primary font-mono text-xs mb-2">COMPUTE LAYER</div>
              <div className="font-bold text-white">Edge Functions</div>
              <div className="text-[10px] text-gray-500 mt-1">Deno Runtime</div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-gray-500">REST API</span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
              <ArrowLeft className="w-3 h-3 text-gray-500 rotate-180" />
            </div>

            {/* External */}
            <div className="p-6 rounded-lg border border-purple-500/30 bg-purple-500/10 backdrop-blur-md w-full md:w-48">
              <div className="text-purple-400 font-mono text-xs mb-2">DATA SOURCE</div>
              <div className="font-bold text-white">Polymarket</div>
              <div className="text-[10px] text-gray-500 mt-1">Market & Trade Data</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Data Flow Pipeline</h3>
            <ul className="space-y-3">
              {[
                "User submits 0x wallet address via HTTPS",
                "Edge Function validates address format & rate limits",
                "Server fetches trade history from Polymarket API",
                "Scoring Engine computes 5-factor component scores",
                "JSON response returned to client (< 200ms)"
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-400">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono text-primary border border-white/10">{i+1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <div>
             <h3 className="text-lg font-bold text-white mb-4">Security Measures</h3>
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300 p-2 rounded bg-white/5 border border-white/5">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span>Stateless execution (No PII storage)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300 p-2 rounded bg-white/5 border border-white/5">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>CORS & Rate Limiting enabled</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300 p-2 rounded bg-white/5 border border-white/5">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span>Input sanitization & type validation</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    )
  },
  scoring: {
    title: "Scoring Engine",
    icon: Target,
    content: (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">Scoring Methodology</h1>
          <p className="text-gray-400">
            Our proprietary algorithm normalizes trading data into a 0-100 "Follow Score". This composite metric is derived from five weighted sub-components.
          </p>
        </div>

        <div className="bg-black/40 rounded-xl border border-primary/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
                <Target className="w-24 h-24 text-primary" />
            </div>
            <h3 className="font-mono text-sm text-primary mb-2">MASTER FORMULA</h3>
            <pre className="font-mono text-sm md:text-base text-white leading-relaxed z-10 relative">
              FollowScore = round(<br/>
              &nbsp;&nbsp;0.30 * <span className="text-blue-400">Consistency</span> +<br/>
              &nbsp;&nbsp;0.25 * <span className="text-red-400">Risk</span> +<br/>
              &nbsp;&nbsp;0.25 * <span className="text-green-400">Accuracy</span> +<br/>
              &nbsp;&nbsp;0.10 * (100 - <span className="text-yellow-400">Volatility</span>) +<br/>
              &nbsp;&nbsp;0.10 * <span className="text-purple-400">Discipline</span><br/>
              )
            </pre>
        </div>
        
        <div className="space-y-6">
            <div className="border-l-2 border-blue-500 pl-4 py-1">
                <h4 className="text-blue-400 font-bold">1. Consistency Score (30%)</h4>
                <p className="text-xs text-gray-400 font-mono mt-1">Formula: 0.4*PnLStability + 0.3*(100-Dependency) + 0.3*Regularity</p>
                <p className="text-sm text-gray-300 mt-2">Evaluates PnL stability (CV), penalizes reliance on "lucky" windfall trades, and rewards regular activity.</p>
            </div>
            
            <div className="border-l-2 border-red-500 pl-4 py-1">
                <h4 className="text-red-400 font-bold">2. Risk Score (25%)</h4>
                <p className="text-xs text-gray-400 font-mono mt-1">Formula: SizingScore - OverexposurePenalty - AllInPenalty</p>
                <p className="text-sm text-gray-300 mt-2">Analyzes position sizing variance. Heavy penalties for "All-In" bets (&gt;50% portfolio) and drawdown depth.</p>
            </div>

            <div className="border-l-2 border-green-500 pl-4 py-1">
                <h4 className="text-green-400 font-bold">3. Accuracy Score (25%)</h4>
                <p className="text-xs text-gray-400 font-mono mt-1">Formula: WinRate*0.6 + ProfitFactor*0.4</p>
                <p className="text-sm text-gray-300 mt-2">Pure prediction correctness. Weighted to ensure small wins don't mask large losses.</p>
            </div>
        </div>

        <Table 
            headers={["Metric", "Good Range", "Weight Impact"]}
            rows={[
                ["Win Rate", "> 55%", "High (Accuracy)"],
                ["Max Drawdown", "< 20%", "Critical (Risk)"],
                ["Sharpe Ratio", "> 1.5", "Medium (Volatility)"],
                ["Active Days", "> 30", "Low (Consistency)"]
            ]}
        />
      </div>
    )
  },
  api: {
    title: "API Reference",
    icon: Terminal,
    content: (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">API Reference</h1>
          <p className="text-gray-400">
             Integrate PolyScope intelligence directly into your applications.
          </p>
        </div>

        <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Endpoints</h2>
            <ApiEndpoint method="POST" path="/functions/v1/analyze" desc="Analyze a wallet address and return full metric report." />
        </div>

        <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Request Schema</h2>
            <CodeBlock label="HEADERS" code={`Content-Type: application/json\nAuthorization: Bearer {anon_key}`} />
            <CodeBlock label="BODY (JSON)" language="json" code={`{\n  "wallet": "0x1234567890abcdef1234567890abcdef12345678"\n}`} />
        </div>

        <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Response Schema</h2>
            <div className="p-4 rounded-lg bg-[#0d1117] border border-white/10 text-xs font-mono text-gray-300 overflow-x-auto">
                <span className="text-purple-400">interface</span> <span className="text-yellow-400">AnalysisResponse</span> {"{"}<br/>
                &nbsp;&nbsp;wallet: <span className="text-blue-400">string</span>;<br/>
                &nbsp;&nbsp;followScore: <span className="text-blue-400">number</span>; <span className="text-gray-600">// 0-100</span><br/>
                &nbsp;&nbsp;recommendation: <span className="text-green-400">'FOLLOW'</span> | <span className="text-yellow-400">'CAUTION'</span> | <span className="text-red-400">'DO_NOT_FOLLOW'</span>;<br/>
                &nbsp;&nbsp;metrics: {"{"}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;totalPnL: <span className="text-blue-400">number</span>;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;winRate: <span className="text-blue-400">number</span>;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;maxDrawdown: <span className="text-blue-400">number</span>;<br/>
                &nbsp;&nbsp;{"}"}<br/>
                {"}"}
            </div>
        </div>

        <div>
            <h2 className="text-lg font-bold text-white mb-4">Rate Limits</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded bg-white/5 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-white">60</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Requests / Min</div>
                </div>
                <div className="p-4 rounded bg-white/5 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-white">1000</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Requests / Day</div>
                </div>
            </div>
        </div>
      </div>
    )
  },
  security: {
    title: "Security & Risk",
    icon: Lock,
    content: (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">Security & Risk Disclosure</h1>
        </div>

        <div className="p-6 bg-red-950/20 border border-red-500/30 rounded-xl relative overflow-hidden">
             <div className="flex items-start gap-4 relative z-10">
                 <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                 <div>
                     <h3 className="font-bold text-red-400 mb-2">Risk Disclosure</h3>
                     <p className="text-sm text-gray-300 leading-relaxed mb-4">
                         Prediction markets involve significant financial risk. PolyScope scores are based on historical data which does not guarantee future results.
                     </p>
                     <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                         <li>We do not provide financial advice.</li>
                         <li>Scores are informational tools, not instructions.</li>
                         <li>You may lose your entire investment following any strategy.</li>
                     </ul>
                 </div>
             </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" />
                    Infrastructure Security
                </h3>
                <ul className="space-y-2">
                    {["SOC 2 Type II Compliant Hosting", "TLS 1.3 Encryption in Transit", "Isolated Edge Execution"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                            <Check className="w-3 h-3 text-green-500" /> {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    Data Handling
                </h3>
                <ul className="space-y-2">
                    {["No PII Collection", "Ephemeral Data Processing", "No Credential Storage"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                            <Check className="w-3 h-3 text-green-500" /> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <CodeBlock 
            label="WALLET VALIDATION REGEX" 
            language="regex" 
            code={`^0x[a-fA-F0-9]{40}$`} 
        />
      </div>
    )
  }
};

// --- MAIN LAYOUT COMPONENT ---

export function DocsPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof sections>('intro');
  const ActiveContent = sections[activeTab].content;

  return (
    <div className="min-h-screen bg-[#02040a] text-white flex flex-col md:flex-row font-sans selection:bg-primary/30">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-72 border-r border-white/10 bg-black/40 backdrop-blur-xl p-6 flex flex-col sticky top-0 h-auto md:h-screen overflow-y-auto z-20">
        <div className="mb-10 pl-2">
           <div className="flex items-center gap-2 mb-6">
             <img src="/logo.jpeg" alt="PolyScope Logo" className="w-6 h-6 rounded" />
             <span className="font-bold text-lg tracking-tight">PolyScope <span className="text-xs text-gray-500 font-normal">Docs</span></span>
           </div>
           
           <Link to="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to App
           </Link>
        </div>
        
        <div className="space-y-8">
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">Getting Started</h3>
                <nav className="space-y-1">
                    {['intro', 'architecture'].map((key) => {
                        const s = sections[key as keyof typeof sections];
                        return (
                            <button key={key} onClick={() => setActiveTab(key as any)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${activeTab === key ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                                <s.icon className="w-4 h-4" /> {s.title}
                            </button>
                        )
                    })}
                </nav>
            </div>

            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">Core Concepts</h3>
                <nav className="space-y-1">
                    {['scoring', 'security'].map((key) => {
                        const s = sections[key as keyof typeof sections];
                        return (
                            <button key={key} onClick={() => setActiveTab(key as any)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${activeTab === key ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                                <s.icon className="w-4 h-4" /> {s.title}
                            </button>
                        )
                    })}
                </nav>
            </div>

            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">Developers</h3>
                <nav className="space-y-1">
                    <button onClick={() => setActiveTab('api')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${activeTab === 'api' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                        <Terminal className="w-4 h-4" /> API Reference
                    </button>
                </nav>
            </div>
        </div>

        <div className="mt-auto pt-8">
            <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                <h4 className="text-xs font-bold text-white mb-1">Need Help?</h4>
                <p className="text-[10px] text-gray-400 mb-3">Join our developer community for support.</p>
                <button className="w-full py-1.5 rounded bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">
                    Contact Support
                </button>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative overflow-y-auto h-screen scroll-smooth">
        {/* Background Noise/Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none fixed"></div>
        
        <div className="max-w-4xl mx-auto p-8 md:p-16 relative z-10">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {ActiveContent}
                </motion.div>
            </AnimatePresence>
            
            <footer className="mt-20 pt-8 border-t border-white/10 flex justify-between text-xs text-gray-500">
                <span>© 2024 PolyScope Labs</span>
                <span>Last updated: Dec 12, 2024</span>
            </footer>
        </div>
      </main>
    </div>
  );
}