import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const milestones = [
  {
    version: "v1.0",
    date: "Dec 2025",
    title: "Initial Launch",
    status: "completed",
    items: ["Follow Score Engine", "Radar Charts", "PnL Tracking", "Basic Wallet Analysis"]
  },
  {
    version: "v1.1",
    date: "Q1 2026",
    title: "Enhanced Analytics",
    status: "upcoming",
    items: ["Historical Score Tracking", "Comparative Analysis", "Market Category Breakdown"]
  },
  {
    version: "v1.2",
    date: "Q2 2026",
    title: "Portfolio Features",
    status: "upcoming",
    items: ["Watchlist Functionality", "Multiple Wallet Tracking", "Email Alerts"]
  },
  {
    version: "v2.0",
    date: "Q3 2026",
    title: "Advanced AI",
    status: "upcoming",
    items: ["ML Prediction Models", "Whale Tracking", "Copy Trading Signals"]
  }
];

export function Roadmap() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-20 text-center text-white"
        >
          Development Roadmap
        </motion.h2>
        
        <div className="relative">
          {/* THE SOLAR LASER LINE 
             - w-1: Slightly thicker
             - bg-gradient: Fades in/out at top/bottom, strong orange in middle
             - shadow: Heavy orange glow
             - box-shadow: Creates the "laser" radiance
          */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 z-0">
             <div className="w-full h-full bg-gradient-to-b from-transparent via-[#FF8C00] to-transparent opacity-80 shadow-[0_0_20px_#FF8C00] drop-shadow-[0_0_15px_rgba(255,140,0,0.8)]" />
          </div>

          <div className="space-y-12">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0;
              
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  
                  {/* CONTENT COLUMN */}
                  <div className="flex-1 w-full md:w-1/2 pl-20 md:pl-0 md:px-12 mb-4 md:mb-0">
                    
                    {/* THE CARD */}
                    <div className={`relative p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-primary/50 transition-all group ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      
                      {/* Version & Date Header */}
                      <div className={`flex items-center gap-3 mb-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                         <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{m.version}</span>
                         <span className="text-xs text-gray-500 flex items-center gap-1">
                            {m.status === 'completed' ? <CheckCircle2 className="w-3 h-3 text-primary" /> : <Clock className="w-3 h-3" />}
                            {m.date}
                         </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{m.title}</h3>
                      
                      {/* Feature List */}
                      <ul className={`space-y-2 ${isEven ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                        {m.items.map((item, j) => (
                           <li key={j} className={`flex items-center gap-2 text-gray-400 text-sm ${isEven ? 'md:flex-row-reverse' : ''}`}>
                             <Circle className="w-1.5 h-1.5 fill-primary text-primary shrink-0" />
                             <span>{item}</span>
                           </li>
                        ))}
                      </ul>

                      {/* Desktop Connector Beam */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-[1px] bg-gradient-to-r from-primary/50 to-transparent ${isEven ? '-right-12 rotate-180' : '-left-12'}`} />
                    </div>
                  </div>

                  {/* CENTER MARKER DOT (Orbital Node) */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-primary shadow-[0_0_15px_#FF8C00] z-10 mt-6 md:mt-0">
                    {/* Pulsing Core */}
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                  </div>

                  {/* EMPTY SPACER COLUMN */}
                  <div className="hidden md:block flex-1" />

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}