import { ArrowLeft, TrendingUp, TrendingDown, Target, Shield, BarChart2, Activity, Clock, Award, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { TraderAnalysis } from '../App';

interface DashboardProps {
  analysis: TraderAnalysis;
  onReset: () => void;
}

export function Dashboard({ analysis, onReset }: DashboardProps) {
  const { followScore, recommendation, summary, scores, metrics, strengths, weaknesses, recentTrades, pnlHistory } = analysis;

  return (
    <div className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Analyze Another Wallet
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ScoreCard score={followScore} recommendation={recommendation} wallet={analysis.wallet} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <SummaryCard summary={summary} strengths={strengths} weaknesses={weaknesses} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
          <MetricCard icon={<TrendingUp />} label="Total PnL" value={`$${metrics.totalPnL.toLocaleString()}`} positive={metrics.totalPnL >= 0} />
          <MetricCard icon={<Target />} label="Win Rate" value={`${metrics.winRate}%`} positive={metrics.winRate >= 50} />
          <MetricCard icon={<BarChart2 />} label="Avg ROI" value={`${metrics.avgROI}%`} positive={metrics.avgROI >= 0} />
          <MetricCard icon={<Shield />} label="Max Drawdown" value={`${metrics.maxDrawdown}%`} positive={metrics.maxDrawdown < 25} />
          <MetricCard icon={<Activity />} label="Total Trades" value={metrics.totalTrades.toString()} />
          <MetricCard icon={<Clock />} label="Active Days" value={metrics.activeDays.toString()} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Radar</h3>
            <RadarChartComponent scores={scores} />
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Cumulative PnL</h3>
            <PnLChartComponent data={pnlHistory} />
          </div>
        </div>

        <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Trades</h3>
          <TradesTable trades={recentTrades} />
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ score, recommendation, wallet }: { score: number; recommendation: string; wallet: string }) {
  const getRecommendationStyle = () => {
    switch (recommendation) {
      case 'FOLLOW': return { bg: 'bg-green-900/30', border: 'border-green-700', text: 'text-green-400', label: 'FOLLOW' };
      case 'CAUTION': return { bg: 'bg-yellow-900/30', border: 'border-yellow-700', text: 'text-yellow-400', label: 'CAUTION' };
      default: return { bg: 'bg-red-900/30', border: 'border-red-700', text: 'text-red-400', label: 'DO NOT FOLLOW' };
    }
  };

  const style = getRecommendationStyle();
  const scoreColor = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
      <p className="text-sm text-gray-400 mb-2 truncate" title={wallet}>{wallet.slice(0, 10)}...{wallet.slice(-8)}</p>
      
      <div className="relative w-40 h-40 mx-auto my-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
          <circle 
            cx="50" cy="50" r="45" fill="none" 
            stroke={scoreColor}
            strokeWidth="10" 
            strokeLinecap="round"
            strokeDasharray={`${score * 2.83} 283`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color: scoreColor }}>{score}</span>
          <span className="text-xs text-gray-500">FOLLOW SCORE</span>
        </div>
      </div>

      <div className={`inline-flex items-center gap-2 px-4 py-2 ${style.bg} ${style.border} border rounded-full`}>
        {recommendation === 'FOLLOW' && <CheckCircle className="w-4 h-4" />}
        {recommendation === 'CAUTION' && <AlertTriangle className="w-4 h-4" />}
        {recommendation === 'DO_NOT_FOLLOW' && <XCircle className="w-4 h-4" />}
        <span className={`font-semibold ${style.text}`}>{style.label}</span>
      </div>
    </div>
  );
}

function SummaryCard({ summary, strengths, weaknesses }: { summary: string; strengths: string[]; weaknesses: string[] }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-3">Intelligence Summary</h3>
      <p className="text-gray-300 mb-6">{summary}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="flex items-center gap-2 text-green-400 font-medium mb-3">
            <Award className="w-4 h-4" /> Strengths
          </h4>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="flex items-center gap-2 text-red-400 font-medium mb-3">
            <AlertTriangle className="w-4 h-4" /> Weaknesses
          </h4>
          <ul className="space-y-2">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, positive }: { icon: React.ReactNode; label: string; value: string; positive?: boolean }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
        positive === undefined ? 'bg-blue-600/20 text-blue-400' :
        positive ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
      }`}>
        {icon}
      </div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-lg font-semibold ${
        positive === undefined ? 'text-white' :
        positive ? 'text-green-400' : 'text-red-400'
      }`}>{value}</p>
    </div>
  );
}

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
  const levels = 5;
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
    <div className="flex justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid levels */}
        {Array.from({ length: levels }).map((_, level) => {
          const radius = ((level + 1) / levels) * maxRadius;
          const points = metrics.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;
          }).join(' ');
          return <polygon key={level} points={points} fill="none" stroke="#374151" strokeWidth="1" />;
        })}
        
        {/* Axis lines */}
        {metrics.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + maxRadius * Math.cos(angle)}
              y2={center + maxRadius * Math.sin(angle)}
              stroke="#374151"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Data polygon */}
        <polygon points={polygonPoints} fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Data points */}
        {metrics.map((m, i) => {
          const p = getPoint(m.value, i);
          return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3b82f6" />;
        })}
        
        {/* Labels */}
        {metrics.map((m, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = maxRadius + 25;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#9ca3af"
              fontSize="11"
            >
              {m.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function PnLChartComponent({ data }: { data: TraderAnalysis['pnlHistory'] }) {
  if (data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>;
  
  const width = 500;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const pnlValues = data.map(d => d.pnl);
  const minPnl = Math.min(...pnlValues, 0);
  const maxPnl = Math.max(...pnlValues, 0);
  const pnlRange = maxPnl - minPnl || 1;
  
  const getX = (index: number) => padding.left + (index / (data.length - 1 || 1)) * chartWidth;
  const getY = (value: number) => padding.top + chartHeight - ((value - minPnl) / pnlRange) * chartHeight;
  
  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.pnl)}`).join(' ');
  const areaPath = `${linePath} L ${getX(data.length - 1)} ${getY(minPnl)} L ${getX(0)} ${getY(minPnl)} Z`;
  
  return (
    <div className="overflow-x-auto">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* Y axis */}
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + chartHeight} stroke="#374151" />
        
        {/* X axis */}
        <line x1={padding.left} y1={padding.top + chartHeight} x2={padding.left + chartWidth} y2={padding.top + chartHeight} stroke="#374151" />
        
        {/* Y axis labels */}
        {[0, 0.5, 1].map((ratio, i) => {
          const value = minPnl + ratio * pnlRange;
          const y = getY(value);
          return (
            <g key={i}>
              <line x1={padding.left - 5} y1={y} x2={padding.left} y2={y} stroke="#374151" />
              <text x={padding.left - 10} y={y} textAnchor="end" dominantBaseline="middle" fill="#9ca3af" fontSize="10">
                ${Math.round(value)}
              </text>
            </g>
          );
        })}
        
        {/* Grid lines */}
        {[0, 0.5, 1].map((ratio, i) => {
          const y = padding.top + ratio * chartHeight;
          return <line key={i} x1={padding.left} y1={y} x2={padding.left + chartWidth} y2={y} stroke="#1f2937" strokeDasharray="4,4" />;
        })}
        
        {/* Area */}
        <path d={areaPath} fill="url(#areaGrad)" />
        
        {/* Line */}
        <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Data points */}
        {data.map((d, i) => (
          <circle key={i} cx={getX(i)} cy={getY(d.pnl)} r="3" fill="#3b82f6" />
        ))}
      </svg>
    </div>
  );
}

function TradesTable({ trades }: { trades: TraderAnalysis['recentTrades'] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Market</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Outcome</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">PnL</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">ROI</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Date</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, i) => (
            <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
              <td className="py-3 px-4 text-sm text-gray-300 max-w-[200px] truncate">{trade.market}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                  trade.outcome === 'WIN' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                }`}>
                  {trade.outcome === 'WIN' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {trade.outcome}
                </span>
              </td>
              <td className={`py-3 px-4 text-sm text-right font-medium ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
              </td>
              <td className={`py-3 px-4 text-sm text-right ${trade.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trade.roi >= 0 ? '+' : ''}{trade.roi}%
              </td>
              <td className="py-3 px-4 text-sm text-right text-gray-500">
                {new Date(trade.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
