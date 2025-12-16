import { ArrowLeft, TrendingUp, TrendingDown, Target, Shield, BarChart2, Activity, Clock,  AlertTriangle, CheckCircle, XCircle, ScanLine, AlertCircle } from 'lucide-react';
import type { TraderAnalysis } from '../App';

interface DashboardProps {
  analysis: TraderAnalysis;
  onReset: () => void;
}

export function Dashboard({ analysis, onReset }: DashboardProps) {
  const { followScore, recommendation, summary, scores, metrics, strengths, weaknesses, recentTrades, pnlHistory } = analysis;

  return (
    <div className="px-4 py-8 relative z-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation */}
        <button
          onClick={onReset}
          className="group flex items-center gap-2 text-primary/60 hover:text-primary transition-colors font-mono text-sm tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          RETURN_TO_SCANNER
        </button>

        {/* Top Section: Score & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ScoreCard score={followScore} recommendation={recommendation} wallet={analysis.wallet} />
          </div>
          <div className="lg:col-span-2">
            <SummaryCard summary={summary} strengths={strengths} weaknesses={weaknesses} />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <MetricCard icon={<TrendingUp />} label="Total PnL" value={`$${metrics.totalPnL.toLocaleString()}`} positive={metrics.totalPnL >= 0} />
          <MetricCard icon={<Target />} label="Win Rate" value={`${metrics.winRate}%`} positive={metrics.winRate >= 50} />
          <MetricCard icon={<BarChart2 />} label="Avg ROI" value={`${metrics.avgROI}%`} positive={metrics.avgROI >= 0} />
          <MetricCard icon={<Shield />} label="Max Drawdown" value={`${metrics.maxDrawdown}%`} positive={metrics.maxDrawdown < 25} invert />
          <MetricCard icon={<Activity />} label="Total Trades" value={metrics.totalTrades.toString()} />
          <MetricCard icon={<Clock />} label="Active Days" value={metrics.activeDays.toString()} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* 1. TACTICAL RADAR */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <ScanLine className="w-32 h-32 text-primary" />
            </div>
            <div className="p-6 border-b border-white/5 bg-white/5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono tracking-wider">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                    TACTICAL_RADAR //
                </h3>
            </div>
            <div className="p-6">
                <RadarChartComponent scores={scores} />
            </div>
          </div>
          
          {/* 2. CUMULATIVE PERFORMANCE */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono tracking-wider">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    CUMULATIVE_PERFORMANCE //
                </h3>
            </div>
            <div className="p-6">
                <PnLChartComponent data={pnlHistory} />
            </div>
          </div>
        </div>

        {/* 3. RECENT TRANSACTIONS TABLE */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono tracking-wider">
                <Activity className="w-4 h-4 text-primary" />
                RECENT_TRANSACTIONS //
            </h3>
          </div>
          <TradesTable trades={recentTrades} />
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS (Updated with Glassmorphism)
// ----------------------------------------------------------------------

function ScoreCard({ score, recommendation, wallet }: { score: number; recommendation: string; wallet: string }) {
  const getRecommendationStyle = () => {
    switch (recommendation) {
      case 'FOLLOW': return { bg: 'bg-primary/10', border: 'border-primary/50', text: 'text-primary', label: 'FOLLOW_TARGET', icon: CheckCircle };
      case 'CAUTION': return { bg: 'bg-accent/10', border: 'border-accent/50', text: 'text-accent', label: 'PROCEED_WITH_CAUTION', icon: AlertTriangle };
      default: return { bg: 'bg-red-500/10', border: 'border-red-500/50', text: 'text-red-500', label: 'AVOID_INTERACTION', icon: XCircle };
    }
  };

  const style = getRecommendationStyle();
  const Icon = style.icon;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="h-full rounded-2xl border border-primary/30 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(255,140,0,0.1)] flex flex-col items-center justify-center relative overflow-hidden p-6">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <p className="font-mono text-[10px] text-primary/60 mb-6 tracking-[0.2em] uppercase border border-primary/20 px-2 py-1 rounded">
        ID: {wallet.slice(0, 4)}...{wallet.slice(-4)}
      </p>
      
      <div className="relative w-48 h-48 mb-6 group cursor-default">
        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />
        <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <circle 
            cx="50" cy="50" r={radius} fill="none" 
            stroke="url(#scoreGradient)" 
            strokeWidth="6" 
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,140,0,0.5)]">
            {score}
          </span>
          <span className="text-[10px] text-primary/80 font-mono tracking-[0.2em] mt-1">SCORE</span>
        </div>
      </div>

      <div className={`flex items-center gap-2 px-4 py-2 ${style.bg} ${style.border} border rounded-lg backdrop-blur-md shadow-lg`}>
        <Icon className={`w-4 h-4 ${style.text}`} />
        <span className={`text-xs font-bold tracking-wider ${style.text}`}>{style.label}</span>
      </div>
    </div>
  );
}

function SummaryCard({ summary, strengths, weaknesses }: { summary: string; strengths: string[]; weaknesses: string[] }) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
      <div className="p-6 border-b border-white/5 bg-white/5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono tracking-wider">
          <ScanLine className="w-4 h-4 text-accent" />
          INTEL_SUMMARY //
        </h3>
      </div>
      
      <div className="p-8 flex-grow flex flex-col justify-center">
        <p className="text-gray-300 mb-8 leading-relaxed font-light text-lg">
          {summary}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 rounded-xl p-5 border border-white/5">
            <h4 className="flex items-center gap-2 text-primary font-mono text-xs tracking-wider mb-4 border-b border-primary/20 pb-2 uppercase">
              Strengths
            </h4>
            <ul className="space-y-3">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-xl p-5 border border-white/5">
            <h4 className="flex items-center gap-2 text-red-400 font-mono text-xs tracking-wider mb-4 border-b border-red-500/20 pb-2 uppercase">
              Weaknesses
            </h4>
            <ul className="space-y-3">
              {weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <AlertCircle className="w-4 h-4 text-red-500/80 shrink-0 mt-0.5" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, positive, invert }: { icon: React.ReactNode; label: string; value: string; positive?: boolean; invert?: boolean }) {
  let valueColor = 'text-white';
  if (positive === true) valueColor = 'text-accent'; 
  if (positive === false) valueColor = 'text-red-400';

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 transition-all duration-300 hover:bg-white/10 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,140,0,0.1)] group">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 rounded-md bg-black/20 text-gray-400 group-hover:text-primary transition-colors">
            <div className="w-4 h-4">{icon}</div>
        </div>
        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{label}</p>
      </div>
      <p className={`text-xl font-bold font-mono ${valueColor} group-hover:scale-105 transition-transform origin-left`}>
        {value}
      </p>
    </div>
  );
}

// ----------------------------------------------------------------------
// CHART COMPONENTS (Visuals Only)
// ----------------------------------------------------------------------

function RadarChartComponent({ scores }: { scores: TraderAnalysis['scores'] }) {
  const metrics = [
    { name: 'Consistency', value: scores.consistency },
    { name: 'Risk Mgmt', value: scores.risk },
    { name: 'Accuracy', value: scores.accuracy },
    { name: 'Stability', value: 100 - scores.volatility },
    { name: 'Discipline', value: scores.discipline },
  ];
  
  const size = 240;
  const center = size / 2;
  const maxRadius = 90;
  const angleStep = (2 * Math.PI) / metrics.length;
  
  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    };
  };
  
  const polygonPoints = metrics.map((m, i) => {
    const p = getPoint(m.value, i);
    return `${p.x},${p.y}`;
  }).join(' ');
  
  return (
    <div className="flex justify-center py-4 relative">
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative z-10">
        {/* Grid */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => {
           const radius = scale * maxRadius;
           const points = metrics.map((_, j) => {
             const angle = j * angleStep - Math.PI / 2;
             return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;
           }).join(' ');
           return <polygon key={i} points={points} fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />;
        })}
        {/* Axes */}
        {metrics.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return <line key={i} x1={center} y1={center} x2={center + maxRadius * Math.cos(angle)} y2={center + maxRadius * Math.sin(angle)} stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />;
        })}
        {/* Shape */}
        <polygon points={polygonPoints} fill="rgba(255, 140, 0, 0.2)" stroke="#FF8C00" strokeWidth="2" strokeLinejoin="round" />
        {/* Dots */}
        {metrics.map((m, i) => {
          const p = getPoint(m.value, i);
          return <circle key={i} cx={p.x} cy={p.y} r="3" fill="#FFD700" className="drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />;
        })}
        {/* Labels */}
        {metrics.map((m, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = maxRadius + 20;
          return (
            <text key={i} x={center + labelRadius * Math.cos(angle)} y={center + labelRadius * Math.sin(angle)} textAnchor="middle" dominantBaseline="middle" fill="#9ca3af" fontSize="10" className="font-mono uppercase tracking-wide">
              {m.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function PnLChartComponent({ data }: { data: TraderAnalysis['pnlHistory'] }) {
  if (data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-500 font-mono">NO_DATA</div>;
  
  const width = 500;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const pnlValues = data.map(d => d.pnl);
  const minPnl = Math.min(...pnlValues, 0);
  const maxPnl = Math.max(...pnlValues, 0);
  const pnlRange = maxPnl - minPnl || 1;
  
  const getX = (i: number) => padding.left + (i / (data.length - 1)) * chartWidth;
  const getY = (v: number) => padding.top + chartHeight - ((v - minPnl) / pnlRange) * chartHeight;
  
  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.pnl)}`).join(' ');
  const areaPath = `${linePath} L ${getX(data.length - 1)} ${getY(minPnl)} L ${getX(0)} ${getY(minPnl)} Z`;
  
  return (
    <div className="overflow-x-auto">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid Lines */}
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + chartHeight} stroke="rgba(255,255,255,0.1)" />
        <line x1={padding.left} y1={getY(0)} x2={padding.left + chartWidth} y2={getY(0)} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
        
        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={linePath} fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
      </svg>
    </div>
  );
}

function TradesTable({ trades }: { trades: TraderAnalysis['recentTrades'] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            <th className="py-4 px-6 text-xs font-mono text-gray-400 uppercase tracking-wider">Market</th>
            <th className="py-4 px-6 text-xs font-mono text-gray-400 uppercase tracking-wider">Outcome</th>
            <th className="py-4 px-6 text-xs font-mono text-gray-400 uppercase tracking-wider text-right">PnL</th>
            <th className="py-4 px-6 text-xs font-mono text-gray-400 uppercase tracking-wider text-right">ROI</th>
            <th className="py-4 px-6 text-xs font-mono text-gray-400 uppercase tracking-wider text-right">Date</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
              <td className="py-4 px-6 text-sm text-gray-300 font-medium max-w-[200px] truncate group-hover:text-white transition-colors">
                {trade.market}
              </td>
              <td className="py-4 px-6">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase border ${
                  trade.outcome === 'WIN' 
                    ? 'bg-primary/10 text-primary border-primary/20' 
                    : 'bg-white/5 text-gray-500 border-white/10'
                }`}>
                  {trade.outcome === 'WIN' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {trade.outcome}
                </span>
              </td>
              <td className={`py-4 px-6 text-sm text-right font-mono ${trade.pnl >= 0 ? 'text-accent' : 'text-red-400'}`}>
                {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
              </td>
              <td className={`py-4 px-6 text-sm text-right font-mono ${trade.roi >= 0 ? 'text-accent' : 'text-red-400'}`}>
                {trade.roi >= 0 ? '+' : ''}{trade.roi}%
              </td>
              <td className="py-4 px-6 text-sm text-right text-gray-500 font-mono">
                {new Date(trade.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}