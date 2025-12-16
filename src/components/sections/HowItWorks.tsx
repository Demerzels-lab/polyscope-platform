import { Database, Calculator, Activity, Target, FileText, BarChart } from 'lucide-react';

const steps = [
  { icon: Database, title: "1. Data Collection", desc: "Retrieves full trading history and standardizes position data from Polymarket." },
  { icon: Calculator, title: "2. Metric Calculation", desc: "Computes Win Rate, ROI, Drawdown, and volatility metrics." },
  { icon: Activity, title: "3. Component Scoring", desc: "Evaluates Risk, Consistency, Accuracy, and Discipline on a 0-100 scale." },
  { icon: Target, title: "4. Follow Score", desc: "Aggregates components into a single 'Follow Score' using our weighted formula." },
  { icon: FileText, title: "5. Recommendation", desc: "Generates FOLLOW, CAUTION, or DO NOT FOLLOW signals based on strict thresholds." },
  { icon: BarChart, title: "6. Report Generation", desc: "Visualizes data via Radar Charts and PnL timelines for instant insights." },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-black/20 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-orange-200 bg-clip-text text-transparent">Analysis Pipeline</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            PolyScope employs a sophisticated multi-stage analysis pipeline to transform raw blockchain data into actionable trader intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="group p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}